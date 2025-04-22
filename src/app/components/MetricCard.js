'use client';

import { Paper, Typography, Box, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Line } from 'react-chartjs-2';

export default function MetricCard({ title, subtitle, value, trend, trendValue, chartData, color = '#4CAF50' }) {
  const lineChartData = {
    labels: ['', '', '', '', '', ''],
    datasets: [
      {
        data: chartData || [65, 59, 80, 81, 56, 55],
        borderColor: color,
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
  };

  return (
    <Paper sx={{ 
      p: 2.5,
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderRadius: 2,
      border: '1px solid rgba(255, 255, 255, 0.1)',
      height: '100%',
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="h6" sx={{ color: 'white', mb: 0.5 }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)', mb: 2 }}>
            {subtitle}
          </Typography>
          <Typography variant="h4" sx={{ color: 'white', mb: 1, fontWeight: 500 }}>
            {value}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: trend === 'up' ? '#4CAF50' : '#F44336',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5
            }}
          >
            {trend === 'up' ? '↑' : '↓'} {trendValue}
          </Typography>
        </Box>
        <IconButton size="small" sx={{ color: 'white' }}>
          <MoreVertIcon />
        </IconButton>
      </Box>
      <Box sx={{ height: 60, mt: 2 }}>
        <Line data={lineChartData} options={chartOptions} />
      </Box>
    </Paper>
  );
} 