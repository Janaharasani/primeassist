'use client';

import { 
  Box, 
  Typography, 
  Paper, 
  Chip, 
  IconButton, 
  Grid,
  Button,
  Divider,
  Avatar
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { alpha, useTheme } from '@mui/material/styles';

export default function AlertsView() {
  const theme = useTheme();
  
  const alerts = [
    { 
      id: 1, 
      message: 'Critical: Overcrowding detected in Zone A',
      details: 'Occupancy exceeds 85% threshold. Immediate action required.',
      severity: 'high', 
      time: '2 mins ago',
      zone: 'Zone A',
      value: '85%'
    },
    { 
      id: 2, 
      message: 'Unusual movement pattern detected',
      details: 'Multiple rapid movements detected in restricted area B-2.',
      severity: 'medium', 
      time: '15 mins ago',
      zone: 'Zone B',
      value: '65%'
    },
    { 
      id: 3, 
      message: 'AI Model Performance Warning',
      details: 'Detection accuracy dropped below 90%. Check camera 3 positioning.',
      severity: 'medium', 
      time: '45 mins ago',
      zone: 'System',
      value: '89%'
    },
    { 
      id: 4, 
      message: 'Network Latency Detected',
      details: 'Processing delay increased to 250ms. Check network status.',
      severity: 'low', 
      time: '1 hour ago',
      zone: 'System',
      value: '250ms'
    },
    { 
      id: 5, 
      message: 'Queue Formation Alert',
      details: 'Unusual queue forming at Entry Point 2. Consider opening additional lanes.',
      severity: 'high', 
      time: '1.5 hours ago',
      zone: 'Entry',
      value: '12min'
    }
  ];

  const getAlertIcon = (severity) => {
    switch(severity) {
      case 'high':
        return <ErrorIcon sx={{ color: theme.palette.error.main }} />;
      case 'medium':
        return <WarningIcon sx={{ color: theme.palette.warning.main }} />;
      default:
        return <InfoIcon sx={{ color: theme.palette.info.main }} />;
    }
  };

  const getAlertColor = (severity) => {
    switch(severity) {
      case 'high':
        return theme.palette.error.main;
      case 'medium':
        return theme.palette.warning.main;
      default:
        return theme.palette.info.main;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h5" sx={{ color: 'white', mb: 1 }}>
            Alert Management
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            Monitoring system alerts and notifications
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {alerts.map((alert) => (
          <Grid item xs={12} key={alert.id}>
            <Paper 
              sx={{ 
                p: 2,
                backgroundColor: alpha(getAlertColor(alert.severity), 0.1),
                border: `1px solid ${alpha(getAlertColor(alert.severity), 0.2)}`,
                borderRadius: 2,
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: `0 4px 20px ${alpha(getAlertColor(alert.severity), 0.15)}`
                }
              }}
            >
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <Avatar 
                  sx={{ 
                    bgcolor: alpha(getAlertColor(alert.severity), 0.2),
                    color: getAlertColor(alert.severity)
                  }}
                >
                  {getAlertIcon(alert.severity)}
                </Avatar>
                
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600 }}>
                      {alert.message}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip 
                        label={alert.severity.toUpperCase()} 
                        size="small"
                        sx={{ 
                          bgcolor: alpha(getAlertColor(alert.severity), 0.2),
                          color: getAlertColor(alert.severity),
                          fontWeight: 600
                        }}
                      />
                      <IconButton size="small" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                  
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}>
                    {alert.details}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Chip 
                      label={`Zone: ${alert.zone}`}
                      size="small"
                      sx={{ 
                        bgcolor: 'rgba(255,255,255,0.1)',
                        color: 'rgba(255,255,255,0.8)'
                      }}
            />
            <Chip 
                      label={`Value: ${alert.value}`}
                      size="small"
                      sx={{ 
                        bgcolor: 'rgba(255,255,255,0.1)',
                        color: 'rgba(255,255,255,0.8)'
                      }}
                    />
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: 'rgba(255,255,255,0.5)',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      {alert.time}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}