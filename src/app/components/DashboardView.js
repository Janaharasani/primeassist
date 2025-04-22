import { Grid, Paper, Typography, Box, IconButton, Button, LinearProgress } from '@mui/material';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import AICameraFeed from './AICameraFeed';
import StatsCard from './StatsCard';
import HeatMap from './HeatMap';
import { useObjectDetection } from '../../hooks/useObjectDetection';
import RefreshIcon from '@mui/icons-material/Refresh';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import WarningIcon from '@mui/icons-material/Warning';
import Image from 'next/image';
import MetricCard from './MetricCard';
import ConversionFunnel from './ConversionFunnel';

ChartJS.register(...registerables);

export default function DashboardView() {
  const { objects = [] } = useObjectDetection();

  const crowdData = {
    labels: ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'],
    datasets: [{
      label: 'Crowd Density',
      data: [120, 190, 300, 500, 200, 100],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.4,
      fill: true,
      backgroundColor: 'rgba(75, 192, 192, 0.1)',
    }],
  };

  const demographicData = {
    labels: ['18-25', '26-35', '36-50', '50+'],
    datasets: [{
      data: [30, 40, 20, 10],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
      ],
      borderWidth: 1,
    }],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: 'rgba(255,255,255,0.8)' }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(255,255,255,0.1)' },
        ticks: { color: 'rgba(255,255,255,0.8)' }
      },
      x: {
        grid: { color: 'rgba(255,255,255,0.1)' },
        ticks: { color: 'rgba(255,255,255,0.8)' }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: 'rgba(255,255,255,0.8)' }
      }
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '100%' }}>
      <Grid container spacing={3}>
        {/* Metric Cards */}
        <Grid item xs={12} md={4}>
          <MetricCard 
            title="Current Occupancy"
            subtitle="Real-time crowd density"
            value="76%"
            trend="up"
            trendValue="12.5% vs last hour"
            chartData={[65, 75, 70, 90, 75, 70]}
            color="#FF4B4B"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <MetricCard 
            title="Total Visitors"
            subtitle="Today's foot traffic"
            value="3,768"
            trend="up"
            trendValue="3.85% vs yesterday"
            chartData={[30, 40, 45, 50, 55, 60]}
            color="#4CAF50"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <MetricCard 
            title="Average Duration"
            subtitle="Time spent in area"
            value="23.5m"
            trend="down"
            trendValue="0.52% vs average"
            chartData={[55, 45, 50, 45, 40, 35]}
            color="#2196F3"
          />
        </Grid>

        {/* Zone Occupancy Distribution */}
        <Grid item xs={12}>
          <Paper sx={{ 
            p: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 2,
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            <Typography variant="h6" sx={{ color: 'white', mb: 3 }}>
              Zone Occupancy Distribution
            </Typography>
            <Grid container spacing={3}>
              {[
                { zone: 'Food Court', count: '156', capacity: '85%', status: 'high' },
                { zone: 'Main Plaza', count: '89', capacity: '45%', status: 'normal' },
                { zone: 'Retail Area', count: '234', capacity: '78%', status: 'medium' },
                { zone: 'Parking A', count: '67', capacity: '30%', status: 'low' }
              ].map((zone, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Box sx={{ 
                    p: 2, 
                    bgcolor: 'rgba(0,0,0,0.2)', 
                    borderRadius: 2,
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}>
                    <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>
                      {zone.zone}
                    </Typography>
                    <Typography variant="h5" sx={{ color: 'white', mb: 1 }}>
                      {zone.count}
                    </Typography>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1,
                      color: zone.status === 'high' ? '#f44336' : 
                             zone.status === 'medium' ? '#ff9800' : 
                             zone.status === 'normal' ? '#4caf50' : '#2196f3'
                    }}>
                      <Box sx={{ 
                        width: 8, 
                        height: 8, 
                        borderRadius: '50%', 
                        bgcolor: 'currentColor' 
                      }} />
                      <Typography variant="caption">
                        {zone.capacity} Capacity
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} lg={8}>
          <Paper sx={{ 
            p: 3, 
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 2,
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ color: 'white' }}>
                Live Crowd Monitoring
              </Typography>
              <Box>
                <IconButton size="small" sx={{ color: 'white' }}>
                  <RefreshIcon />
                </IconButton>
                <IconButton size="small" sx={{ color: 'white' }}>
                  <MoreVertIcon />
                </IconButton>
              </Box>
            </Box>
            <AICameraFeed />
            
            {/* AI Processing Status */}
            <Box sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  AI Processing Status
                </Typography>
                <Typography variant="body2" sx={{ color: '#4caf50' }}>
                  Active
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={85} 
                sx={{ 
                  height: 6, 
                  borderRadius: 3,
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#4caf50'
                  }
                }} 
              />
            </Box>
          </Paper>
        </Grid>

        {/* Side Stats */}
        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ 
                p: 3,
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 2,
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                  Demographic Distribution
                </Typography>
                <Box sx={{ height: 200 }}>
                  <Doughnut data={demographicData} options={doughnutOptions} />
                </Box>
              </Paper>
            </Grid>
            
            <Grid item xs={12}>
              <Paper sx={{ 
                p: 3,
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 2,
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <WarningIcon sx={{ color: '#ff9800' }} />
                  <Typography variant="h6" sx={{ color: 'white' }}>
                    Alerts
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {[
                    { time: '2 min ago', message: 'Crowd density threshold exceeded in Zone A' },
                    { time: '15 min ago', message: 'Unusual movement pattern detected' },
                    { time: '1 hour ago', message: 'Camera 3 connection unstable' }
                  ].map((alert, index) => (
                    <Box key={index} sx={{ 
                      p: 2, 
                      borderRadius: 1,
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                      <Typography variant="body2" sx={{ color: '#ff9800', mb: 0.5 }}>
                        {alert.time}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'white' }}>
                        {alert.message}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                <Button 
                  fullWidth 
                  sx={{ 
                    mt: 2,
                    color: 'white',
                    borderColor: 'rgba(255,255,255,0.3)',
                    '&:hover': {
                      borderColor: 'rgba(255,255,255,0.5)'
                    }
                  }}
                  variant="outlined"
                >
                  View All Alerts
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* Crowd Density Trends */}
        <Grid item xs={12}>
          <Paper sx={{ 
            p: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 2,
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
              Crowd Density Trends
            </Typography>
            <Box sx={{ height: 300 }}>
              <Line data={crowdData} options={chartOptions} />
            </Box>
          </Paper>
        </Grid>

        {/* Heat Map */}
        <Grid item xs={12}>
          <HeatMap />
        </Grid>

        {/* AI Visualization Section */}
        <Grid item xs={12}>
          <Paper sx={{ 
            p: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 2,
            border: '1px solid rgba(255, 255, 255, 0.1)',
            overflow: 'hidden'
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ color: 'white' }}>
                AI Vision Processing
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Live Processing Demo
              </Typography>
            </Box>
            
            <Grid container spacing={3}>
              {/* First Visualization */}
              <Grid item xs={12} md={6}>
                <Box sx={{ 
                  position: 'relative',
                  width: '100%',
                  height: '400px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  '& img': {
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%'
                  }
                }}>
                  <img
                    src="https://images.squarespace-cdn.com/content/v1/5ccedd5b0cf57d4ffa03d88a/1651682609609-0ABCS4C64JLNK9U0C0XD/02_Public-Eye-Promo%28sm%29.gif?format=2500w"
                    alt="AI Vision Processing"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <Box sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 2,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))',
                    color: 'white'
                  }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Real-time object detection and tracking
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Box sx={{ 
                        px: 1.5, 
                        py: 0.5, 
                        bgcolor: 'rgba(76, 175, 80, 0.3)', 
                        borderRadius: 1,
                        border: '1px solid rgba(76, 175, 80, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}>
                        <Box sx={{ 
                          width: 8, 
                          height: 8, 
                          borderRadius: '50%', 
                          bgcolor: '#4caf50',
                          boxShadow: '0 0 10px #4caf50'
                        }} />
                        <Typography variant="caption">Processing Active</Typography>
                      </Box>
                      <Box sx={{ 
                        px: 1.5, 
                        py: 0.5, 
                        bgcolor: 'rgba(255, 152, 0, 0.3)', 
                        borderRadius: 1,
                        border: '1px solid rgba(255, 152, 0, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}>
                        <Typography variant="caption">9 FPS</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>

              {/* Second Visualization */}
              <Grid item xs={12} md={6}>
                <Box sx={{ 
                  position: 'relative',
                  width: '100%',
                  height: '400px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  bgcolor: 'rgba(0,0,0,0.2)',
                  '& img': {
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%'
                  }
                }}>
                  <img
                    src="https://images.squarespace-cdn.com/content/v1/5ccedd5b0cf57d4ffa03d88a/c98d75cb-eaf7-4e2b-8588-54b80a2c1934/3D+animation.gif"
                    alt="3D Crowd Analysis"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <Box sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 2,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))',
                    color: 'white'
                  }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      3D Crowd Movement Analysis
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Box sx={{ 
                        px: 1.5, 
                        py: 0.5, 
                        bgcolor: 'rgba(33, 150, 243, 0.3)', 
                        borderRadius: 1,
                        border: '1px solid rgba(33, 150, 243, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}>
                        <Box sx={{ 
                          width: 8, 
                          height: 8, 
                          borderRadius: '50%', 
                          bgcolor: '#2196f3',
                          boxShadow: '0 0 10px #2196f3'
                        }} />
                        <Typography variant="caption">3D Mapping Active</Typography>
                      </Box>
                      <Box sx={{ 
                        px: 1.5, 
                        py: 0.5, 
                        bgcolor: 'rgba(156, 39, 176, 0.3)', 
                        borderRadius: 1,
                        border: '1px solid rgba(156, 39, 176, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}>
                        <Typography variant="caption">Real-time</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}