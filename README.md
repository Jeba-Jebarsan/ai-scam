# AI Scam Detector

A modern web application that analyzes text to detect potential scams, phishing attempts, and fraudulent messages. The app leverages Maki AI to provide reliable protection against online threats.

## Features

- **Multi-Level Analysis**: Classifies content as "SCAM", "POSSIBLY SCAM", or "SAFE" with confidence scores
- **URL Analysis**: Scans URLs for suspicious patterns and known threats
- **Email Protection**: Analyzes email content for phishing patterns and suspicious links
- **Advanced AI Engine**: Uses Maki AI models for thorough analysis
- **Real-Time Results**: Get instant feedback on potential threats
- **Scan History**: View and manage your previous scan results
- **Local Storage**: All history is stored locally in your browser
- **Privacy-Focused**: No data collection - all processing happens on your device or through secure API calls

## Technical Stack

- React + TypeScript
- Vite for fast development
- Material UI for responsive, modern UI
- Maki AI integration
- Local storage for history management
- Responsive design for all devices

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Create a `.env` file with your API keys:
```
VITE_MAKI_API_KEY=your_maki_api_key
```
4. Run the development server with `npm run dev`

## Usage

1. Enter or paste any suspicious text, email content, or URL
2. Click "Analyze Text" to scan for potential threats
3. View the detailed results with confidence score and explanation
4. Check the "History" section to review past scans

## License

MIT

## Acknowledgments

- Built with React and TypeScript
- Uses Material UI for styling
- Powered by Maki AI models
