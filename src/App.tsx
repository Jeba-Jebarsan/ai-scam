import { useState } from 'react'
import { Container, CssBaseline, ThemeProvider, createTheme, responsiveFontSizes, GlobalStyles, Box } from '@mui/material'
import Header from './components/Header'
import InputArea from './components/InputArea'
import ResultDisplay from './components/ResultDisplay'
import HistorySection from './components/HistorySection'
import Footer from './components/Footer'
import type { ScanResult } from './services/aiService'

// Create a theme instance
let theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4361ee',
      light: '#738efc',
      dark: '#2c47d1',
    },
    secondary: {
      main: '#f72585',
      light: '#ff64ad',
      dark: '#c20062',
    },
    error: {
      main: '#ef233c',
    },
    warning: {
      main: '#ff9e00',
    },
    success: {
      main: '#38b000',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#4b5563',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      '"Helvetica Neue"',
      'sans-serif',
    ].join(','),
    h5: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
          padding: '8px 20px',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingBottom: 40,
        },
      },
    },
  },
});

// Make the theme responsive
theme = responsiveFontSizes(theme);

function App() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ScanResult | null>(null)

  const handleResultsUpdate = (newResult: ScanResult) => {
    setResult(newResult)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            backgroundImage: 'linear-gradient(180deg, #f0f4ff 0%, #f8f9fa 100%)',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            minHeight: '100vh',
            maxWidth: '100%',
            overflowX: 'hidden',
          },
          '*::-webkit-scrollbar': {
            width: '8px',
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#d1d5db',
            borderRadius: '20px',
          },
          '*::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
        }}
      />
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        maxWidth: '100vw',
        margin: '0 auto',
      }}>
        <Header />
        <Box 
          component="main" 
          sx={{ 
            flex: 1, 
            width: '100%', 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            maxWidth: { xs: '95%', sm: '90%', md: '800px' },
            mx: 'auto',
            px: { xs: 2, sm: 3 }
          }}
        >
          <InputArea 
            onResultsUpdate={handleResultsUpdate} 
            setLoading={setLoading} 
            loading={loading} 
          />
          <ResultDisplay result={result} loading={loading} />
          <HistorySection latestResult={result} />
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  )
}

export default App
