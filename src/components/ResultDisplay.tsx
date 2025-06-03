import { 
  Paper, 
  Typography, 
  Box, 
  Chip, 
  Divider, 
  CircularProgress,
  Alert,
  useTheme,
  alpha,
  Button
} from '@mui/material';
import type { ScanResult } from '../services/aiService';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import ShieldIcon from '@mui/icons-material/Shield';
import LinkIcon from '@mui/icons-material/Link';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

interface ResultDisplayProps {
  result: ScanResult | null;
  loading: boolean;
}

const ResultDisplay = ({ result, loading }: ResultDisplayProps) => {
  const theme = useTheme();

  if (loading) {
    return (
      <Paper elevation={3} sx={{ 
        p: 3, 
        mb: 4, 
        textAlign: 'center',
        borderRadius: 3,
        background: 'linear-gradient(145deg, #ffffff 0%, #f8faff 100%)',
        height: 280,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
      }}>
        <CircularProgress size={60} thickness={4} />
        <Typography sx={{ mt: 3, color: 'text.secondary', fontSize: '1.1rem' }}>
          Analyzing text for potential scams...
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400, mt: 1 }}>
          Our AI is checking for suspicious patterns, urgency tactics, and other scam indicators
        </Typography>
      </Paper>
    );
  }

  if (!result) {
    return (
      <Paper elevation={3} sx={{ 
        p: 3, 
        mb: 4,
        borderRadius: 3,
        background: 'linear-gradient(145deg, #ffffff 0%, #f8faff 100%)',
        height: 240,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
      }}>
        <Box 
          sx={{ 
            width: 70, 
            height: 70, 
            borderRadius: '50%', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            mb: 2
          }}
        >
          <ShieldIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
        </Box>
        <Typography variant="h6" gutterBottom color="text.primary">
          Enter a message to analyze
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ maxWidth: 400 }}>
          Paste any suspicious message, email, or link above and click "Analyze Text" to check if it's a potential scam
        </Typography>
      </Paper>
    );
  }

  let resultColor, resultIcon, resultText, gradientColor, iconBgColor;
  
  switch (result.result) {
    case 'SCAM':
      resultColor = theme.palette.error.main;
      resultIcon = <ErrorIcon sx={{ fontSize: 30 }} />;
      resultText = 'SCAM DETECTED';
      gradientColor = alpha(theme.palette.error.main, 0.03);
      iconBgColor = alpha(theme.palette.error.main, 0.12);
      break;
    case 'POSSIBLY SCAM':
      resultColor = theme.palette.warning.main;
      resultIcon = <WarningIcon sx={{ fontSize: 30 }} />;
      resultText = 'SUSPICIOUS CONTENT';
      gradientColor = alpha(theme.palette.warning.main, 0.03);
      iconBgColor = alpha(theme.palette.warning.main, 0.12);
      break;
    case 'SAFE':
      resultColor = theme.palette.success.main;
      resultIcon = <CheckCircleIcon sx={{ fontSize: 30 }} />;
      resultText = 'SAFE MESSAGE';
      gradientColor = alpha(theme.palette.success.main, 0.03);
      iconBgColor = alpha(theme.palette.success.main, 0.12);
      break;
    default:
      resultColor = theme.palette.info.main;
      resultIcon = <WarningIcon sx={{ fontSize: 30 }} />;
      resultText = 'ANALYSIS COMPLETED';
      gradientColor = alpha(theme.palette.info.main, 0.03);
      iconBgColor = alpha(theme.palette.info.main, 0.12);
  }
  
  const confidencePercentage = Math.round(result.confidence * 100);
  const chipColor = result.result === 'SCAM' ? 'error' : 
                     result.result === 'POSSIBLY SCAM' ? 'warning' : 'success';
  
  // Extract URLs from the text
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const urls = result.inputText.match(urlRegex) || [];
  const hasSafeBrowsingResult = result.safeBrowsingResult !== undefined;

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 0, 
        mb: 4,
        borderRadius: 3,
        overflow: 'hidden',
        borderLeft: 5,
        borderColor: resultColor,
        background: `linear-gradient(145deg, white 0%, ${gradientColor} 100%)`,
        width: '100%'
      }}
    >
      <Box sx={{ 
        p: 3, 
        pb: 2,
        background: alpha(resultColor, 0.05),
        borderBottom: `1px solid ${alpha(resultColor, 0.1)}`
      }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Box 
              sx={{ 
                width: 48, 
                height: 48, 
                borderRadius: '50%', 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: iconBgColor,
                mr: 2
              }}
            >
              <Box sx={{ color: resultColor }}>
                {resultIcon}
              </Box>
            </Box>
            <Typography 
              variant="h5" 
              component="div" 
              color={resultColor} 
              sx={{ 
                fontWeight: 700,
                letterSpacing: '-0.02em'
              }}
            >
              {resultText}
            </Typography>
          </Box>
          
          <Chip 
            label={`${confidencePercentage}% Confidence`} 
            color={chipColor}
            size="medium"
            sx={{ 
              fontWeight: 500,
              px: 1,
              borderRadius: 2
            }}
          />
        </Box>
      </Box>
      
      <Box sx={{ p: 3 }}>
        {/* Show Google Safe Browsing results if available */}
        {hasSafeBrowsingResult && result.safeBrowsingResult?.isUrlThreat && (
          <Alert 
            severity="error" 
            icon={<VerifiedUserIcon />}
            sx={{ 
              mb: 3, 
              alignItems: 'flex-start',
              '& .MuiAlert-icon': {
                mt: 0.5
              }
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
              Google Safe Browsing Alert
            </Typography>
            <Typography variant="body2">
              This URL has been flagged as {result.safeBrowsingResult.threatType?.toLowerCase() || 'malicious'}.
              It may attempt to steal your personal information or install malware.
            </Typography>
          </Alert>
        )}

        {/* Display URLs detected */}
        {urls.length > 0 && (
          <Box 
            sx={{ 
              p: 2, 
              mb: 3, 
              bgcolor: alpha(theme.palette.background.default, 0.7),
              borderRadius: 2,
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
            }}
          >
            <Typography 
              variant="subtitle2" 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                mb: 1
              }}
            >
              <LinkIcon fontSize="small" />
              URLs Detected
            </Typography>
            
            {urls.map((url, index) => (
              <Box 
                key={index}
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: index === urls.length - 1 ? 0 : 1,
                  p: 1,
                  bgcolor: alpha(theme.palette.background.paper, 0.7),
                  borderRadius: 1,
                  border: `1px solid ${alpha(theme.palette.divider, 0.07)}`
                }}
              >
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontFamily: 'monospace',
                    maxWidth: '80%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {url}
                </Typography>
                
                <Chip 
                  size="small"
                  label={hasSafeBrowsingResult && result.safeBrowsingResult?.isUrlThreat ? 'Dangerous' : 'Checked'}
                  color={hasSafeBrowsingResult && result.safeBrowsingResult?.isUrlThreat ? 'error' : 'success'}
                  sx={{ height: 24 }}
                />
              </Box>
            ))}
          </Box>
        )}

        <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="text.primary">
          Analysis:
        </Typography>
        
        <Typography 
          variant="body1" 
          paragraph 
          sx={{ 
            lineHeight: 1.6,
            color: 'text.primary'
          }}
        >
          {result.explanation}
        </Typography>
        
        <Box sx={{ 
          mt: 2, 
          p: 1.5, 
          bgcolor: alpha(theme.palette.background.default, 0.5),
          borderRadius: 2,
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
        }}>
          <Typography variant="caption" color="text.secondary">
            Analyzed at: {new Date(result.timestamp).toLocaleString()}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default ResultDisplay; 