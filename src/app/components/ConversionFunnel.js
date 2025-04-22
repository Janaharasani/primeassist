'use client';

import { Paper, Typography, Box } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from '@mui/material';

export default function ConversionFunnel() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [
      {
        label: 'Ad Impressions',
        data: [45, 55, 40, 65, 20, 40, 50, 40],
        backgroundColor: '#4364F7',
        barPercentage: 0.7,
      },
      {
        label: 'Website Session',
        data: [20, 25, 35, 25, 30, 35, 30, 35],
        backgroundColor: '#6B8AF2',
        barPercentage: 0.7,
      },
      {
        label: 'App Download',
        data: [15, 15, 20, 15, 15, 20, 15, 20],
        backgroundColor: '#99A9ED',
        barPercentage: 0.7,
      },
      {
        label: 'New Users',
        data: [10, 10, 15, 10, 10, 15, 10, 15],
        backgroundColor: '#C5CCEF',
        barPercentage: 0.7,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'start',
        labels: {
          color: 'rgba(255, 255, 255, 0.7)',
          usePointStyle: true,
          padding: 20,
          boxWidth: 8,
          boxHeight: 8,
        },
      },
    },
  };

  return (
    <Paper sx={{ 
      p: 3,
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderRadius: 2,
      border: '1px solid rgba(255, 255, 255, 0.1)',
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box>
          <Typography variant="h6" sx={{ color: 'white', mb: 0.5 }}>
            Conversion Funnel
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            Ad Impressions • Website Session • App Download • New Users
          </Typography>
        </Box>
        <IconButton size="small" sx={{ color: 'white' }}>
          <MoreVertIcon />
        </IconButton>
      </Box>
      <Box sx={{ height: 400, mt: 2 }}>
        <Bar data={data} options={options} />
      </Box>
    </Paper>
  );
} 