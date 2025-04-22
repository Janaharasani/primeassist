"use client"

import { useState } from 'react';
import { Box, CssBaseline, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Drawer } from './DashboardComponents';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import AIStatusIndicator from './AIStatusIndicator';

const drawerWidth = 280;

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      backgroundColor: '#000F2B', 
      minHeight: '100vh',
      maxHeight: '100vh',
      overflow: 'hidden' // Prevent double scrollbars
    }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: '#1a2035',
        boxShadow: 'none',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            CrowdSense AI Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              backgroundColor: '#1a2035',
              borderRight: '1px solid rgba(255, 255, 255, 0.1)'
            },
          }}
        >
          <Toolbar /> {/* Add spacing for the toolbar */}
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              backgroundColor: '#1a2035',
              borderRight: '1px solid rgba(255, 255, 255, 0.1)'
            },
          }}
          open
        >
          <Toolbar /> {/* Add spacing for the toolbar */}
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          maxWidth: '100%',
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Toolbar />
        <Box sx={{ 
          p: 3,
          flexGrow: 1,
          overflow: 'auto', // Add scrollbar here
          '&::-webkit-scrollbar': {
            width: '8px',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
            },
          },
        }}>
          <MainContent activeTab={activeTab} />
        </Box>
      </Box>
    </Box>
  );
}