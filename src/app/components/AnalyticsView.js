'use client';

import { Box, Grid, Paper, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Line, Bar } from 'react-chartjs-2';
import { useState } from 'react';

export default function AnalyticsView() {
  const [timeRange, setTimeRange] = useState('week');

  const lineChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Average Occupancy',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.4
      }
    ]
  };

  const barChartData = {
    labels: ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'],
    datasets: [
      {
        label: 'Peak Hours',
        data: [30, 45, 67, 89, 70, 35],
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white'
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'white'
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'white'
        }
      }
    }
  };

  const stats = [
    { label: 'Total Visitors', value: '12,456', change: '+12%' },
    { label: 'Avg. Duration', value: '45 min', change: '-5%' },
    { label: 'Peak Time', value: '2:30 PM', change: '0%' },
    { label: 'Capacity Usage', value: '78%', change: '+8%' }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
          Analytics Dashboard
        </Typography>
        <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
          <InputLabel sx={{ color: 'white' }}>Time Range</InputLabel>
          <Select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            label="Time Range"
            sx={{
              color: 'white',
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.3)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              }
            }}
          >
            <MenuItem value="day">Today</MenuItem>
            <MenuItem value="week">This Week</MenuItem>
            <MenuItem value="month">This Month</MenuItem>
            <MenuItem value="year">This Year</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 2,
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <Typography variant="subtitle2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                {stat.label}
              </Typography>
              <Typography variant="h4" sx={{ color: 'white', my: 1 }}>
                {stat.value}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: stat.change.startsWith('+') ? '#4caf50' : stat.change.startsWith('-') ? '#f44336' : 'white'
                }}
              >
                {stat.change} from last period
              </Typography>
            </Paper>
          </Grid>
        ))}

        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: 2,
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
              Occupancy Trends
            </Typography>
            <Line data={lineChartData} options={chartOptions} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: 2,
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
              Peak Hours Distribution
            </Typography>
            <Bar data={barChartData} options={chartOptions} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}