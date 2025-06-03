import { Box, Typography, Link, alpha, useTheme, Button } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import LinkIcon from '@mui/icons-material/Link';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import WebIcon from '@mui/icons-material/Web';

const Footer = () => {
  const theme = useTheme();

  const features = [
    {
      icon: <LinkIcon fontSize="small" />,
      title: "URL Analysis",
      description: "Scans URLs for suspicious patterns and known threats"
    },
    {
      icon: <MailOutlineIcon fontSize="small" />,
      title: "Email Protection",
      description: "Detects phishing attempts in emails and messages"
    },
    {
      icon: <VerifiedUserIcon fontSize="small" />,
      title: "AI-Powered Analysis",
      description: "Advanced  AI detects sophisticated scams"
    },
    {
      icon: <WebIcon fontSize="small" />,
      title: "Browser Protection",
      description: "Real-time alerts for malicious websites"
    }
  ];

  return (
    <Box 
      component="footer" 
      sx={{ 
        mt: 5, 
        mb: 3,
        position: 'relative',
        overflow: 'hidden',
        pb: 2,
        width: '100%'
      }}
    >
      <Box 
        sx={{ 
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          height: '1px',
          background: `linear-gradient(90deg, 
            transparent 0%, 
            ${alpha(theme.palette.divider, 0.2)} 20%,
            ${alpha(theme.palette.divider, 0.5)} 50%,
            ${alpha(theme.palette.divider, 0.2)} 80%,
            transparent 100%
          )`,
          maxWidth: 800
        }}
      />
      
      <Box 
        sx={{
          maxWidth: { xs: '95%', sm: '90%', md: '800px' },
          mx: 'auto',
          width: '100%',
          px: { xs: 2, sm: 3 }
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            mb: 2,
            pt: 4
          }}
        >
          <SecurityIcon 
            color="primary" 
            sx={{ 
              fontSize: 32, 
              opacity: 0.5,
              mr: 1 
            }} 
          />
          <Typography 
            variant="h6" 
            color="primary" 
            sx={{ 
              opacity: 0.7, 
              fontWeight: 700,
              letterSpacing: '-0.02em' 
            }}
          >
            Scam Detector
          </Typography>
        </Box>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          align="center" 
          sx={{ opacity: 0.8 }}
        >
          AI-Powered Phishing & Fraud Protection
        </Typography>
        
        {/* Features section */}
        <Box sx={{ mt: 3, mb: 3 }}>
          <Box 
            sx={{ 
              display: 'flex',
              flexWrap: 'wrap',
              mx: -1 // Negative margin to compensate for padding
            }}
          >
            {features.map((feature, index) => (
              <Box 
                key={index} 
                sx={{ 
                  width: { xs: '50%', sm: '25%' },
                  p: 1,
                  boxSizing: 'border-box'
                }}
              >
                <Box 
                  sx={{ 
                    p: 2,
                    height: '100%',
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.background.paper, 0.4),
                    border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center'
                  }}
                >
                  <Box 
                    sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                      mb: 1
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="subtitle2" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        
        <Box 
          sx={{ 
            mt: 2, 
            mb: 2,
            p: 2,
            mx: 'auto',
            maxWidth: '100%',
            borderRadius: 3,
            bgcolor: alpha(theme.palette.background.paper, 0.6),
            border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
          }}
        >
          <Typography 
            variant="caption" 
            color="text.secondary" 
            align="center" 
            display="block" 
            sx={{ fontWeight: 500 }}
          >
            <strong>Disclaimer:</strong> This tool provides AI-powered predictions and should not be considered a legal guarantee.
            Always exercise caution with suspicious messages.
          </Typography>
          <Typography 
            variant="caption" 
            color="text.secondary" 
            align="center" 
            display="block" 
            sx={{ mt: 1 }}
          >
            Your data is stored locally and is not sent to any server except for the AI analysis API.
          </Typography>
        </Box>
        
        <Typography 
          variant="caption" 
          color="text.secondary" 
          align="center" 
          sx={{ 
            mt: 2, 
            display: 'block',
            opacity: 0.7
          }}
        >
          © {new Date().getFullYear()} - <Link href="#" color="inherit" underline="hover">Privacy Policy</Link> - <Link href="#" color="inherit" underline="hover">Terms of Use</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer; 