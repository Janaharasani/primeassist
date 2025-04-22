import { Card, CardContent, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

export default function StatsCard({ title, value, trend, icon, trendUp }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }} 
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      <Card sx={{ 
        height: '100%', 
        borderRadius: 2, 
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)'
      }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box>
              <Typography variant="subtitle2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
                {title}
              </Typography>
              <Typography variant="h4" sx={{ color: 'white', mb: 1, fontWeight: 600 }}>
                {value}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                {trendUp !== undefined && (
                  trendUp ? (
                    <TrendingUpIcon sx={{ fontSize: 16, color: '#4caf50' }} />
                  ) : (
                    <TrendingDownIcon sx={{ fontSize: 16, color: '#f44336' }} />
                  )
                )}
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: trendUp === undefined 
                      ? 'rgba(255, 255, 255, 0.7)' 
                      : trendUp 
                        ? '#4caf50' 
                        : '#f44336'
                  }}
                >
                  {trend}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '12px',
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '24px'
              }}
            >
              {icon}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}