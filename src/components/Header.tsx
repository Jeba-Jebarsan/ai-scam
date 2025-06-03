import { AppBar, Toolbar, Typography, Box, useTheme, Chip } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const Header = () => {
  const theme = useTheme();

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{ 
        background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        mb: 4,
        width: '100%'
      }}
    >
      <Box 
        sx={{ 
          maxWidth: { xs: '95%', sm: '90%', md: '800px' },
          width: '100%',
          mx: 'auto',
          display: 'flex',
          justifyContent: 'flex-start'
        }}
      >
        <Toolbar disableGutters sx={{ py: 1.5, width: '100%', justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            <Box 
              display="flex" 
              alignItems="center" 
              sx={{
                background: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '50%',
                p: 1,
                mr: 2,
                boxShadow: '0 0 20px rgba(0,0,0,0.1)'
              }}
            >
              <SecurityIcon sx={{ fontSize: 28, color: 'white' }} />
            </Box>
            <Box>
              <Typography 
                variant="h5" 
                component="div" 
                sx={{ 
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: 'white',
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                Scam Detector
              </Typography>
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  opacity: 0.85,
                  color: 'white',
                  mt: -0.5
                }}
              >
                
              </Typography>
            </Box>
          </Box>
          
          <Chip
            icon={<VerifiedUserIcon fontSize="small" />}
            label="Advanced Protection"
            size="small"
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.15)',
              color: 'white',
              fontWeight: 500,
              border: '1px solid rgba(255, 255, 255, 0.3)',
              '& .MuiChip-icon': {
                color: theme.palette.success.light
              }
            }}
          />
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default Header; 