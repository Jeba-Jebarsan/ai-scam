import axios from 'axios';

// Interface for scan results
export interface ScanResult {
  id: string;
  timestamp: string;
  inputText: string;
  result: 'SCAM' | 'POSSIBLY SCAM' | 'SAFE';
  confidence: number;
  explanation: string;
  safeBrowsingResult?: SafeBrowsingResult;
}

// Interface for Safe Browsing results
export interface SafeBrowsingResult {
  isUrlThreat: boolean;
  threatType?: string;
  platformType?: string;
}

// Function to generate a UUID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// System prompt for all LLM services
const SYSTEM_PROMPT = `You are an AI Scam Detector.

Your job is to:
1. Classify the given text as either "SCAM", "POSSIBLY SCAM", or "SAFE".
2. Explain your reasoning clearly and briefly.
3. If the message contains a link, evaluate whether the link looks suspicious.

Instructions:
- Use your knowledge of common scam patterns (e.g., phishing, impersonation, urgency, reward offers, fake OTP requests).
- Be strict. If the message has scam-like traits, mark it as "SCAM" or "POSSIBLY SCAM".
- Always return both a label and an explanation.

Example format:

Label: SCAM  
Reason: The message pretends to be from a bank and urges immediate action, which is a common phishing tactic.

Now analyze the following input:
"{TEXT}"

Please respond in the following JSON format only:
{
  "result": "SCAM", "POSSIBLY SCAM", or "SAFE",
  "confidence": a number between 0 and 1,
  "explanation": "Your detailed explanation of why this is classified as it is"
}`;

// Create a fallback response for when API calls fail
const createFallbackResponse = (text: string, error: any): ScanResult => {
  return {
    id: generateId(),
    timestamp: new Date().toISOString(),
    inputText: text,
    result: 'POSSIBLY SCAM',
    confidence: 0.5,
    explanation: `Unable to fully analyze due to a technical issue. As a precaution, treat this as potentially suspicious. Error details: ${error.message || 'Unknown error'}. If this persists, please try again later or contact support.`
  };
};

// Parse response safely
const safeParseResponse = (textResponse: string): { result: string; confidence: number; explanation: string } => {
  try {
    // Try to find JSON in the response
    const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
    const jsonString = jsonMatch ? jsonMatch[0] : '{}';
    const parsedResponse = JSON.parse(jsonString);
    
    // Validate and clean the response
    return {
      result: ['SCAM', 'POSSIBLY SCAM', 'SAFE'].includes(parsedResponse.result) 
        ? parsedResponse.result 
        : 'POSSIBLY SCAM',
      confidence: typeof parsedResponse.confidence === 'number' && parsedResponse.confidence >= 0 && parsedResponse.confidence <= 1
        ? parsedResponse.confidence
        : 0.5,
      explanation: typeof parsedResponse.explanation === 'string' && parsedResponse.explanation
        ? parsedResponse.explanation
        : 'No explanation provided by the AI model.'
    };
  } catch (error) {
    console.error('Error parsing AI response:', error);
    return {
      result: 'POSSIBLY SCAM',
      confidence: 0.5,
      explanation: 'Unable to properly analyze the content due to a response parsing error. As a precaution, consider this potentially suspicious.'
    };
  }
};

// Extract URLs from text
const extractUrls = (text: string): string[] => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.match(urlRegex) || [];
};

// Safe Browsing API (Simulated)
const checkUrlSafety = async (url: string): Promise<SafeBrowsingResult> => {
  try {
    // This is a simulated response for demonstration purposes
    // In a real implementation, you would call an actual threat intelligence API
    
    // Simulate some "dangerous" URLs for testing
    const isDangerous = url.includes('suspicious') || 
                      url.includes('malware') ||
                      url.includes('phishing') ||
                      url.includes('scam') ||
                      Math.random() < 0.1; // 10% chance to be a threat for demo
    
    if (isDangerous) {
      return {
        isUrlThreat: true,
        threatType: Math.random() > 0.5 ? 'PHISHING' : 'MALWARE',
        platformType: 'ANY_PLATFORM'
      };
    }
    
    return {
      isUrlThreat: false
    };
  } catch (error) {
    console.error('Error checking URL safety:', error);
    return {
      isUrlThreat: false
    };
  }
};

// DeepSeek API Service
export const analyzeWithDeepSeek = async (text: string): Promise<ScanResult> => {
  try {
    // Check if API key is available
    const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY || 'dummy_key_for_build';
    
    // First, check if there are any URLs to scan for safety
    const urls = extractUrls(text);
    let safeBrowsingResult: SafeBrowsingResult | undefined = undefined;
    
    // If URLs are found, check the first one for safety
    if (urls.length > 0) {
      safeBrowsingResult = await checkUrlSafety(urls[0]);
      
      // If already detected a threat, we can short-circuit and return a result
      if (safeBrowsingResult.isUrlThreat) {
        return {
          id: generateId(),
          timestamp: new Date().toISOString(),
          inputText: text,
          result: 'SCAM',
          confidence: 0.95,
          explanation: `This contains a URL (${urls[0]}) that has been flagged as ${safeBrowsingResult.threatType?.toLowerCase() || 'malicious'}. Avoid visiting this site as it may compromise your security.`,
          safeBrowsingResult
        };
      }
    }

    // This is a mockup implementation as the actual DeepSeek API endpoint needs to be configured
    // Replace with your actual DeepSeek API implementation
    // For now, we'll use a mock API call that simulates the behavior
    
    const prompt = SYSTEM_PROMPT.replace("{TEXT}", text);
    
    // Mock API call with a timeout to simulate network request
    // In a real implementation, replace this with your actual DeepSeek API endpoint
    const response = await new Promise<{ data: any }>((resolve, reject) => {
      setTimeout(() => {
        // Simulating a response format similar to what we'd expect from DeepSeek
        resolve({
          data: {
            result: Math.random() > 0.5 ? 'SCAM' : 'SAFE',
            confidence: Math.random(),
            explanation: `This is a ${Math.random() > 0.5 ? 'suspicious' : 'safe'} message based on analysis.`
          }
        });
      }, 1000);
    });

    return {
      id: generateId(),
      timestamp: new Date().toISOString(),
      inputText: text,
      result: response.data.result,
      confidence: response.data.confidence || 0.5,
      explanation: response.data.explanation,
      safeBrowsingResult
    };
  } catch (error) {
    console.error('Error analyzing with DeepSeek:', error);
    return createFallbackResponse(text, error);
  }
};

// For backward compatibility, alias analyzeWithGemini to analyzeWithDeepSeek
export const analyzeWithGemini = analyzeWithDeepSeek;

// Function to save scan history to local storage
export const saveToHistory = (result: ScanResult): void => {
  try {
    const history = localStorage.getItem('scanHistory');
    const parsedHistory: ScanResult[] = history ? JSON.parse(history) : [];
    
    parsedHistory.unshift(result);
    
    // Limit history to 50 items
    const limitedHistory = parsedHistory.slice(0, 50);
    
    localStorage.setItem('scanHistory', JSON.stringify(limitedHistory));
  } catch (error) {
    console.error('Error saving to history:', error);
  }
};

// Function to get scan history from local storage
export const getHistory = (): ScanResult[] => {
  try {
    const history = localStorage.getItem('scanHistory');
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error getting history:', error);
    return [];
  }
};

// Function to clear scan history
export const clearHistory = (): void => {
  localStorage.removeItem('scanHistory');
}; 