import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import YOLODetection from './YOLODetection';

export default function AICameraFeed() {
  return (
    <Box sx={{ 
      position: 'relative',
      height: 400,
      bgcolor: 'black',
      borderRadius: 1,
      overflow: 'hidden',
    }}>
      <YOLODetection />
      
      <Box sx={{
        position: 'absolute',
        bottom: 16,
        left: 16,
        bgcolor: 'rgba(0,0,0,0.7)',
        color: 'white',
        p: 1,
        borderRadius: 1,
        fontSize: '0.75rem'
      }}>
        <Typography variant="caption">
          AI analyzing crowd patterns in real-time
        </Typography>
      </Box>
    </Box>
  );
}