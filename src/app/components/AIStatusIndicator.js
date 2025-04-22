// src/app/components/AIStatusIndicator.js
'use client';

import { Chip, Box } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { motion } from 'framer-motion';

export default function AIStatusIndicator() {
  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '8px',
      padding: '8px 12px',
      width: '100%'
    }}>
      <motion.div
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <CircleIcon sx={{ color: '#4caf50', fontSize: 12 }} />
      </motion.div>
      <Chip 
        label="AI Active" 
        sx={{
          backgroundColor: 'transparent',
          color: '#4caf50',
          border: '1px solid #4caf50',
          height: '24px',
          '& .MuiChip-label': {
            fontSize: '0.75rem',
            fontWeight: 500
          }
        }}
        size="small"
      />
    </Box>
  );
}