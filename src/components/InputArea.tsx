import { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  CircularProgress, 
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Tooltip,
  Zoom
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { analyzeWithGemini, analyzeWithDeepSeek, saveToHistory } from '../services/aiService';
import type { ScanResult } from '../services/aiService';
import SendIcon from '@mui/icons-material/Send';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';

interface InputAreaProps {
  onResultsUpdate: (result: ScanResult) => void;
  setLoading: (loading: boolean) => void;
  loading: boolean;
}

const InputArea = ({ onResultsUpdate, setLoading, loading }: InputAreaProps) => {
  const [inputText, setInputText] = useState('');
  const [model, setModel] = useState('deepseek');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleModelChange = (event: SelectChangeEvent) => {
    setModel(event.target.value);
  };

  const handlePasteClick = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputText(text);
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    }
  };

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    
    setLoading(true);
    
    try {
      let result: ScanResult;
      
      // Always use DeepSeek regardless of model selection
      result = await analyzeWithDeepSeek(inputText);
      
      saveToHistory(result);
      onResultsUpdate(result);
    } catch (error) {
      console.error('Error during analysis:', error);
      alert('An error occurred during analysis. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3, 
        mb: 4,
        borderRadius: 3,
        background: 'linear-gradient(145deg, #ffffff 0%, #f8faff 100%)',
        position: 'relative',
        overflow: 'hidden',
        width: '100%'
      }}
    >
      <Box 
        sx={{ 
          position: 'absolute',
          top: 0,
          right: 0,
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, rgba(67, 97, 238, 0.08) 0%, rgba(255, 255, 255, 0) 70%)',
          zIndex: 0
        }}
      />
      
      <Box position="relative" zIndex={1}>
        <Typography 
          variant="h6" 
          gutterBottom 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            color: 'primary.dark',
            mb: 2
          }}
        >
          Enter Text to Analyze
          <Tooltip 
            title="Paste a message, email, or link here to analyze it for potential scams." 
            TransitionComponent={Zoom}
            arrow
          >
            <InfoOutlinedIcon fontSize="small" color="action" sx={{ opacity: 0.6 }} />
          </Tooltip>
        </Typography>
        
        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder="Paste a message, email, or link here to check if it's a scam..."
          value={inputText}
          onChange={handleInputChange}
          variant="outlined"
          sx={{ 
            mb: 3,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              transition: 'all 0.2s',
              '&:hover': {
                boxShadow: '0 0 0 2px rgba(67, 97, 238, 0.1)',
              },
              '&.Mui-focused': {
                boxShadow: '0 0 0 2px rgba(67, 97, 238, 0.2)',
              },
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button 
                  size="small"
                  onClick={handlePasteClick}
                  startIcon={<ContentPasteIcon fontSize="small" />}
                  sx={{ 
                    textTransform: 'none',
                    color: 'text.secondary'
                  }}
                >
                  Paste
                </Button>
              </InputAdornment>
            ),
          }}
        />
        
        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center"
          flexWrap="wrap"
          gap={2}
        >
          <Box sx={{ minWidth: 170, display: 'flex', alignItems: 'center' }}>
           
          </Box>
          
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleAnalyze}
            disabled={loading || !inputText.trim()}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
            sx={{ 
              px: 3,
              py: 1.2,
              minWidth: 150,
              boxShadow: '0 4px 14px rgba(67, 97, 238, 0.3)',
              '&:hover': {
                boxShadow: '0 6px 20px rgba(67, 97, 238, 0.4)',
              }
            }}
          >
            {loading ? 'Analyzing...' : 'Analyze Text'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default InputArea; 