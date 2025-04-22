// src/app/components/dashboard/AIConfigView.js
'use client';

import { 
  Box, 
  Typography, 
  Slider, 
  Switch, 
  FormControlLabel, 
  Paper, 
  Grid,
  Select,
  MenuItem,
  Tooltip,
  IconButton,
  Chip,
  FormControl,
  InputLabel,
  alpha
} from '@mui/material';
import { useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import { useTheme } from '@mui/material/styles';

export default function AIConfigView() {
  const theme = useTheme();
  const [settings, setSettings] = useState({
    // Model Configuration
    modelType: 'yolov8',
    processingMode: 'gpu',
    batchSize: 4,
    
    // Detection Settings
    confidenceThreshold: 70,
    nmsThreshold: 45,
    maxDetections: 100,
    
    // Feature Toggles
    enableRealtimeProcessing: true,
    enableObjectTracking: true,
    enableCrowdCounting: true,
    enableHeatmap: true,
    enableDwellTimeAnalysis: false,
    
    // Performance Settings
    fpsLimit: 30,
    resolutionScale: 75,
    
    // Alert Configuration
    crowdThreshold: 50,
    queueThreshold: 15,
    dwellTimeThreshold: 300,
  });

  const handleSettingChange = (name) => (event) => {
    setSettings({
      ...settings,
      [name]: event.target.value ?? event.target.checked
    });
  };

  const modelOptions = [
    { value: 'yolov8', label: 'YOLOv8 (Recommended)', description: 'Latest version with improved accuracy and speed' },
    { value: 'yolov7', label: 'YOLOv7', description: 'Stable version with good performance' },
    { value: 'ssd', label: 'SSD MobileNet', description: 'Lightweight model for edge devices' },
  ];

  const processingModes = [
    { value: 'gpu', label: 'GPU', description: 'CUDA-accelerated processing' },
    { value: 'cpu', label: 'CPU', description: 'Standard CPU processing' },
    { value: 'tpu', label: 'TPU', description: 'Edge TPU acceleration' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h5" sx={{ color: 'white', mb: 1 }}>
            AI Configuration
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            Configure AI model settings and detection parameters
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Model Selection */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ 
            p: 3, 
            backgroundColor: alpha('#1a2035', 0.5),
            backdropFilter: 'blur(10px)',
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
          }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
              Model Configuration
            </Typography>
            
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel sx={{ color: 'rgba(255,255,255,0.7)' }}>Model Type</InputLabel>
              <Select
                value={settings.modelType}
                onChange={handleSettingChange('modelType')}
                label="Model Type"
                sx={{ 
                  color: 'white',
                  '.MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255,255,255,0.2)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255,255,255,0.3)',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.primary.main,
                  }
                }}
              >
                {modelOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <Box>
                      <Typography sx={{ color: 'white' }}>{option.label}</Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                        {option.description}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel sx={{ color: 'rgba(255,255,255,0.7)' }}>Processing Mode</InputLabel>
              <Select
                value={settings.processingMode}
                onChange={handleSettingChange('processingMode')}
                label="Processing Mode"
                sx={{ 
                  color: 'white',
                  '.MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255,255,255,0.2)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255,255,255,0.3)',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.primary.main,
                  }
                }}
              >
                {processingModes.map((mode) => (
                  <MenuItem key={mode.value} value={mode.value}>
                    <Box>
                      <Typography sx={{ color: 'white' }}>{mode.label}</Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                        {mode.description}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom sx={{ color: 'white', display: 'flex', alignItems: 'center', gap: 1 }}>
                Batch Size
                <Tooltip title="Number of frames processed simultaneously">
                  <IconButton size="small">
                    <InfoIcon fontSize="small" sx={{ color: 'rgba(255,255,255,0.5)' }} />
                  </IconButton>
                </Tooltip>
              </Typography>
              <Slider
                value={settings.batchSize}
                onChange={handleSettingChange('batchSize')}
                min={1}
                max={8}
                step={1}
                marks
                valueLabelDisplay="auto"
              />
            </Box>
          </Paper>
        </Grid>

        {/* Detection Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ 
            p: 3, 
            backgroundColor: alpha('#1a2035', 0.5),
            backdropFilter: 'blur(10px)',
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
          }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
              Detection Settings
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom sx={{ color: 'white', display: 'flex', alignItems: 'center', gap: 1 }}>
                Confidence Threshold: {settings.confidenceThreshold}%
                <Tooltip title="Minimum confidence score for detection">
                  <IconButton size="small">
                    <InfoIcon fontSize="small" sx={{ color: 'rgba(255,255,255,0.5)' }} />
                  </IconButton>
                </Tooltip>
              </Typography>
              <Slider
                value={settings.confidenceThreshold}
                onChange={handleSettingChange('confidenceThreshold')}
                min={0}
                max={100}
                step={5}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom sx={{ color: 'white', display: 'flex', alignItems: 'center', gap: 1 }}>
                NMS Threshold: {settings.nmsThreshold}%
                <Tooltip title="Non-maximum suppression threshold">
                  <IconButton size="small">
                    <InfoIcon fontSize="small" sx={{ color: 'rgba(255,255,255,0.5)' }} />
                  </IconButton>
                </Tooltip>
              </Typography>
              <Slider
                value={settings.nmsThreshold}
                onChange={handleSettingChange('nmsThreshold')}
                min={0}
                max={100}
                step={5}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom sx={{ color: 'white', display: 'flex', alignItems: 'center', gap: 1 }}>
                Max Detections
                <Tooltip title="Maximum number of objects to detect per frame">
                  <IconButton size="small">
                    <InfoIcon fontSize="small" sx={{ color: 'rgba(255,255,255,0.5)' }} />
                  </IconButton>
                </Tooltip>
              </Typography>
              <Slider
                value={settings.maxDetections}
                onChange={handleSettingChange('maxDetections')}
                min={10}
                max={200}
                step={10}
                valueLabelDisplay="auto"
              />
            </Box>
          </Paper>
        </Grid>

        {/* Feature Toggles */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ 
            p: 3, 
            backgroundColor: alpha('#1a2035', 0.5),
            backdropFilter: 'blur(10px)',
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
          }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
              Feature Toggles
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.enableRealtimeProcessing}
                      onChange={handleSettingChange('enableRealtimeProcessing')}
                    />
                  }
                  label={
                    <Box>
                      <Typography sx={{ color: 'white' }}>Real-time Processing</Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                        Process video frames in real-time
                      </Typography>
                    </Box>
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.enableObjectTracking}
                      onChange={handleSettingChange('enableObjectTracking')}
                    />
                  }
                  label={
                    <Box>
                      <Typography sx={{ color: 'white' }}>Object Tracking</Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                        Track objects across frames
                      </Typography>
                    </Box>
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.enableCrowdCounting}
                      onChange={handleSettingChange('enableCrowdCounting')}
                    />
                  }
                  label={
                    <Box>
                      <Typography sx={{ color: 'white' }}>Crowd Counting</Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                        Enable crowd density estimation
                      </Typography>
                    </Box>
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.enableHeatmap}
                      onChange={handleSettingChange('enableHeatmap')}
                    />
                  }
                  label={
                    <Box>
                      <Typography sx={{ color: 'white' }}>Heat Map</Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                        Generate crowd density heat maps
                      </Typography>
                    </Box>
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.enableDwellTimeAnalysis}
                      onChange={handleSettingChange('enableDwellTimeAnalysis')}
                    />
                  }
                  label={
                    <Box>
                      <Typography sx={{ color: 'white' }}>Dwell Time Analysis</Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                        Track time spent by individuals
                      </Typography>
                    </Box>
                  }
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Performance & Alerts */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ 
            p: 3, 
            backgroundColor: alpha('#1a2035', 0.5),
            backdropFilter: 'blur(10px)',
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
          }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
              Performance & Alerts
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom sx={{ color: 'white', display: 'flex', alignItems: 'center', gap: 1 }}>
                FPS Limit: {settings.fpsLimit}
                <Tooltip title="Maximum frames processed per second">
                  <IconButton size="small">
                    <InfoIcon fontSize="small" sx={{ color: 'rgba(255,255,255,0.5)' }} />
                  </IconButton>
                </Tooltip>
              </Typography>
              <Slider
                value={settings.fpsLimit}
                onChange={handleSettingChange('fpsLimit')}
                min={1}
                max={60}
                step={1}
                valueLabelDisplay="auto"
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom sx={{ color: 'white', display: 'flex', alignItems: 'center', gap: 1 }}>
                Resolution Scale: {settings.resolutionScale}%
                <Tooltip title="Input resolution scaling">
                  <IconButton size="small">
                    <InfoIcon fontSize="small" sx={{ color: 'rgba(255,255,255,0.5)' }} />
                  </IconButton>
                </Tooltip>
              </Typography>
              <Slider
                value={settings.resolutionScale}
                onChange={handleSettingChange('resolutionScale')}
                min={25}
                max={100}
                step={25}
                marks
                valueLabelDisplay="auto"
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom sx={{ color: 'white', display: 'flex', alignItems: 'center', gap: 1 }}>
                Crowd Threshold
                <Tooltip title="Alert threshold for crowd density">
                  <IconButton size="small">
                    <InfoIcon fontSize="small" sx={{ color: 'rgba(255,255,255,0.5)' }} />
                  </IconButton>
                </Tooltip>
              </Typography>
              <Slider
                value={settings.crowdThreshold}
                onChange={handleSettingChange('crowdThreshold')}
                min={0}
                max={100}
                step={5}
                valueLabelDisplay="auto"
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom sx={{ color: 'white', display: 'flex', alignItems: 'center', gap: 1 }}>
                Queue Threshold (minutes)
                <Tooltip title="Alert threshold for queue time">
                  <IconButton size="small">
                    <InfoIcon fontSize="small" sx={{ color: 'rgba(255,255,255,0.5)' }} />
                  </IconButton>
                </Tooltip>
              </Typography>
              <Slider
                value={settings.queueThreshold}
                onChange={handleSettingChange('queueThreshold')}
                min={5}
                max={30}
                step={5}
                valueLabelDisplay="auto"
              />
            </Box>

            <Box>
              <Typography gutterBottom sx={{ color: 'white', display: 'flex', alignItems: 'center', gap: 1 }}>
                Dwell Time Threshold (seconds)
                <Tooltip title="Alert threshold for dwell time">
                  <IconButton size="small">
                    <InfoIcon fontSize="small" sx={{ color: 'rgba(255,255,255,0.5)' }} />
                  </IconButton>
                </Tooltip>
              </Typography>
              <Slider
                value={settings.dwellTimeThreshold}
                onChange={handleSettingChange('dwellTimeThreshold')}
                min={60}
                max={600}
                step={60}
                valueLabelDisplay="auto"
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}