import { Box, Paper, Typography } from '@mui/material';
import { useMemo } from 'react';

export default function HeatMap() {
  // Mock heatmap data - in a real app this would come from your AI analysis
  const heatmapData = useMemo(() => {
    const data = [];
    const rows = 20;
    const cols = 30;
    
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        // Simulate higher density in certain areas
        const value = Math.min(
          1,
          Math.max(0,
            Math.random() * 0.2 + 
            0.5 * Math.exp(-((i - 8)**2 + (j - 10)**2)/50) +
            0.4 * Math.exp(-((i - 15)**2 + (j - 20)**2)/30)
          )
        );
        row.push(value);
      }
      data.push(row);
    }
    return data;
  }, []);

  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 2,
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ color: 'white', mb: 3 }}>
        Crowd Density Heatmap
      </Typography>
      <Box sx={{ 
        width: '100%',
        height: 400,
        display: 'grid',
        gridTemplateColumns: `repeat(${heatmapData[0].length}, 1fr)`,
        gridTemplateRows: `repeat(${heatmapData.length}, 1fr)`,
        gap: 0.5,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        padding: 2,
        borderRadius: 1,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {heatmapData.map((row, i) => 
          row.map((value, j) => (
            <Box
              key={`${i}-${j}`}
              sx={{
                backgroundColor: `rgba(255, ${Math.round(255 * (1 - value))}, 0, ${value * 0.7})`,
                borderRadius: '2px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'scale(1.5)',
                  zIndex: 1,
                  boxShadow: '0 0 10px rgba(255, 0, 0, 0.5)'
                }
              }}
              title={`Density: ${(value * 100).toFixed(1)}%`}
            />
          ))
        )}
        <Box sx={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          display: 'flex',
          gap: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: '4px 8px',
          borderRadius: 1
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 12, height: 12, backgroundColor: 'rgba(255, 0, 0, 0.7)', borderRadius: '2px' }} />
            <Typography variant="caption" sx={{ color: 'white' }}>High</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 12, height: 12, backgroundColor: 'rgba(255, 255, 0, 0.7)', borderRadius: '2px' }} />
            <Typography variant="caption" sx={{ color: 'white' }}>Medium</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 12, height: 12, backgroundColor: 'rgba(0, 255, 0, 0.7)', borderRadius: '2px' }} />
            <Typography variant="caption" sx={{ color: 'white' }}>Low</Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}