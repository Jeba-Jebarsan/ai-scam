import { useState, useEffect } from 'react';
import { 
  Paper, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Divider, 
  Chip,
  Box,
  IconButton,
  Collapse,
  Button,
  Tooltip,
  alpha,
  useTheme
} from '@mui/material';
import { ExpandMore, ExpandLess, Delete, History as HistoryIcon } from '@mui/icons-material';
import { getHistory, clearHistory } from '../services/aiService';
import type { ScanResult } from '../services/aiService';

interface HistorySectionProps {
  latestResult: ScanResult | null;
}

const HistorySection = ({ latestResult }: HistorySectionProps) => {
  const theme = useTheme();
  const [history, setHistory] = useState<ScanResult[]>([]);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    updateHistory();
  }, [latestResult]);

  const updateHistory = () => {
    const historyData = getHistory();
    setHistory(historyData);
  };

  const handleToggleExpand = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all scan history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  // Function to determine the color based on result
  const getResultColor = (result: string) => {
    switch (result) {
      case 'SCAM':
        return 'error';
      case 'POSSIBLY SCAM':
        return 'warning';
      case 'SAFE':
        return 'success';
      default:
        return 'default';
    }
  };

  // Function to get the color for backgrounds
  const getBgColor = (resultColor: string) => {
    switch (resultColor) {
      case 'error':
        return alpha(theme.palette.error.main, 0.05);
      case 'warning':
        return alpha(theme.palette.warning.main, 0.05);
      case 'success':
        return alpha(theme.palette.success.main, 0.05);
      default:
        return alpha(theme.palette.grey[300], 0.05);
    }
  };

  if (history.length === 0) {
    return (
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3,
          borderRadius: 3,
          background: 'linear-gradient(145deg, #ffffff 0%, #f8faff 100%)',
          textAlign: 'center',
          py: 4,
          width: '100%'
        }}
      >
        <HistoryIcon sx={{ fontSize: 48, color: alpha(theme.palette.text.secondary, 0.2), mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          No Scan History
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 500, mx: 'auto' }}>
          Your scan history will appear here after you analyze messages or emails.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3,
        borderRadius: 3,
        background: 'linear-gradient(145deg, #ffffff 0%, #f8faff 100%)',
        width: '100%'
      }}
    >
      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center" 
        mb={3}
        sx={{
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          pb: 2
        }}
      >
        <Typography 
          variant="h6"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: theme.palette.primary.dark
          }}
        >
          <HistoryIcon fontSize="small" />
          Scan History
          <Chip 
            label={history.length} 
            size="small" 
            color="primary" 
            sx={{ ml: 1, height: 22, fontSize: '0.75rem' }} 
          />
        </Typography>
        <Button 
          variant="outlined" 
          color="error" 
          startIcon={<Delete />}
          onClick={handleClearHistory}
          size="small"
          sx={{ borderRadius: 2 }}
        >
          Clear History
        </Button>
      </Box>

      <List sx={{ px: 0 }}>
        {history.map((item, index) => {
          const isExpanded = expandedItems[item.id] || false;
          const resultColor = getResultColor(item.result);
          const bgColor = getBgColor(resultColor);
          
          return (
            <Paper
              key={item.id}
              elevation={0}
              sx={{ 
                mb: 2,
                borderRadius: 2,
                overflow: 'hidden',
                border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                transition: 'box-shadow 0.2s',
                '&:hover': {
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }
              }}
            >
              <ListItem 
                alignItems="flex-start"
                sx={{ 
                  px: 2,
                  py: 1.5,
                  bgcolor: isExpanded ? bgColor : 'transparent'
                }}
                secondaryAction={
                  <Tooltip title={isExpanded ? "Show less" : "Show more"}>
                    <IconButton edge="end" onClick={() => handleToggleExpand(item.id)}>
                      {isExpanded ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  </Tooltip>
                }
              >
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
                      <Typography 
                        variant="subtitle1" 
                        sx={{ 
                          maxWidth: { xs: '200px', sm: '300px', md: '400px' },
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          fontWeight: 500
                        }}
                      >
                        {item.inputText}
                      </Typography>
                      <Chip 
                        label={item.result} 
                        color={resultColor} 
                        size="small"
                        sx={{ 
                          fontWeight: 500,
                          ml: 0.5
                        }}
                      />
                    </Box>
                  }
                  secondary={
                    <Typography 
                      variant="caption" 
                      color="text.secondary"
                      component="span"
                      sx={{ display: 'block', mt: 0.5 }}
                    >
                      {new Date(item.timestamp).toLocaleString()}
                    </Typography>
                  }
                />
              </ListItem>
              
              <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <Box 
                  sx={{ 
                    px: 2, 
                    py: 1.5, 
                    bgcolor: bgColor,
                    borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`
                  }}
                >
                  <Typography 
                    variant="body2" 
                    paragraph
                    sx={{ 
                      mb: 0,
                      color: theme.palette.text.primary,
                      lineHeight: 1.6
                    }}
                  >
                    {item.explanation}
                  </Typography>
                </Box>
              </Collapse>
            </Paper>
          );
        })}
      </List>
    </Paper>
  );
};

export default HistorySection; 