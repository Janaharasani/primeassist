// src/app/components/MainContent.js
'use client';

import { Box } from '@mui/material';
import DashboardView from './DashboardView';
import AnalyticsView from './AnalyticsView';
import AIConfigView from './AIConfigView';
import AlertsView from './AlertsView';

export default function MainContent({ activeTab }) {
  return (
    <Box 
      component="main" 
      sx={{ 
        flexGrow: 1,
        width: '100%',
        maxWidth: '100%',
        height: '100%',
        overflow: 'auto',
        p: 3,
      }}
    >
      <Box sx={{ mt: 8, width: '100%' }}>
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'analytics' && <AnalyticsView />}
        {activeTab === 'ai-config' && <AIConfigView />}
        {activeTab === 'alerts' && <AlertsView />}
      </Box>
    </Box>
  );
}