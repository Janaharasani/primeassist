// src/app/components/layout/Sidebar.js
'use client';

import { useState, useEffect } from 'react';
import { 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Divider, 
  Box, 
  Typography, 
  Avatar, 
  Collapse,
  Tooltip,
  Badge,
  styled,
  Button,
  Chip
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AnalyticsIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTheme, alpha } from '@mui/material/styles';
import { motion } from 'framer-motion';
import Image from 'next/image';
import AIStatusIndicator from './AIStatusIndicator';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const StatusIndicator = styled('div')(({ status, theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: 
    status === 'error' ? theme.palette.error.main :
    status === 'warning' ? theme.palette.warning.main :
    theme.palette.success.main,
  marginRight: theme.spacing(1),
}));

export default function Sidebar({ activeTab, setActiveTab }) {
  const theme = useTheme();
  const [openCollapse, setOpenCollapse] = useState(false);
  const [unreadAlerts, setUnreadAlerts] = useState(3);
  const [isHovered, setIsHovered] = useState(null);
  const [sidebarWidth, setSidebarWidth] = useState(280);

  const handleCollapse = () => {
    setOpenCollapse(!openCollapse);
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon />, notification: 0, status: 'normal' },
    { id: 'analytics', label: 'Analytics', icon: <AnalyticsIcon />, notification: 0, status: 'normal' },
    { 
      id: 'ai-config', 
      label: 'AI Config', 
      icon: <SettingsIcon />,
      status: 'normal'
    },
    { id: 'alerts', label: 'Alerts', icon: <NotificationsIcon />, notification: unreadAlerts, status: 'error' },
  ];

  const systemStatusItems = [
    { id: 'cpu', label: 'CPU Usage', value: '23%', status: 'normal' },
    { id: 'memory', label: 'Memory', value: '72%', status: 'warning' },
    { id: 'network', label: 'Network', value: '18%', status: 'normal' },
  ];

  const userMenuItems = [
    { id: 'profile', label: 'Profile', icon: <PersonIcon /> },
    { id: 'logout', label: 'Logout', icon: <LogoutIcon /> },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setUnreadAlerts(2);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const sidebarVariants = {
    expanded: { width: sidebarWidth },
    compact: { width: 72 },
  };

  return (
    <Box 
      component={motion.div}
      initial="expanded"
      animate="expanded"
      variants={sidebarVariants}
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#1a2035',
        borderRight: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        transition: 'all 0.3s ease',
        overflow: 'hidden',
        color: '#ffffff',
      }}
    >
      {/* Logo / Branding */}
      <Box sx={{ 
        p: 3, 
        display: 'flex', 
        flexDirection: 'column',
        gap: 2,
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
      }}>
        <Box sx={{ 
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}>
          <Box sx={{ 
            position: 'relative',
            width: 45,
            height: 45,
            borderRadius: '12px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img src="/logo.png" alt="Logo" style={{ width: '100%', height: '100%' }} />
          </Box>
          <Box>
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                fontWeight: 700,
                color: 'white',
                fontSize: '1.25rem',
                letterSpacing: '0.5px'
              }}
            >
              Prime Asset
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: alpha(theme.palette.common.white, 0.6),
                fontSize: '0.75rem',
                letterSpacing: '0.5px'
              }}
            >
              Smart Parking Solutions
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <AIStatusIndicator />
        </Box>
      </Box>

      {/* Main Menu */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', overflowX: 'hidden', py: 1 }}>
        <List component="nav" disablePadding sx={{ px: 1 }}>
          <Typography variant="caption" sx={{ 
            px: 2, 
            py: 1, 
            color: alpha(theme.palette.common.white, 0.6),
            fontSize: '0.75rem',
            fontWeight: 500,
            display: 'block'
          }}>
            MONITORING
          </Typography>
          
          {menuItems.map((item) => (
            <Box key={item.id}>
              <ListItem 
                disablePadding
                onMouseEnter={() => setIsHovered(item.id)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <ListItemButton
                  selected={activeTab === item.id}
                  onClick={() => item.subItems ? handleCollapse() : setActiveTab(item.id)}
                  sx={{
                    px: 2,
                    py: 1,
                    margin: '2px 0',
                    borderRadius: '6px',
                    '&.Mui-selected': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.2),
                      color: 'white',
                      '& .MuiListItemIcon-root': {
                        color: 'white',
                      },
                    },
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.15),
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: '36px', color: alpha(theme.palette.common.white, 0.8) }}>
                    {item.notification > 0 ? (
                      <StyledBadge badgeContent={item.notification} color="error">
                        {item.icon}
                      </StyledBadge>
                    ) : (
                      item.icon
                    )}
                    {item.status === 'error' && (
                      <Box sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: theme.palette.error.main
                      }} />
                    )}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.label} 
                    primaryTypographyProps={{
                      fontWeight: activeTab === item.id ? 600 : 400,
                      variant: 'body2',
                      color: 'inherit'
                    }} 
                  />
                  {item.subItems && (
                    openCollapse ? <ExpandLess /> : <ExpandMore />
                  )}
                </ListItemButton>
              </ListItem>

              {/* Sub-items */}
              {item.subItems && (
                <Collapse in={openCollapse} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.subItems.map((subItem) => (
                      <ListItemButton
                        key={subItem.id}
                        selected={activeTab === subItem.id}
                        onClick={() => setActiveTab(subItem.id)}
                        sx={{
                          pl: 6,
                          py: 0.75,
                          margin: '2px 0',
                          borderRadius: '6px',
                          '&.Mui-selected': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.15),
                          },
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                          },
                        }}
                      >
                        <StatusIndicator status={subItem.status} />
                        <ListItemText 
                          primary={subItem.label} 
                          primaryTypographyProps={{
                            fontSize: '0.875rem',
                            fontWeight: activeTab === subItem.id ? 500 : 400,
                            color: 'inherit'
                          }} 
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </Box>
          ))}
        </List>

        {/* System Status Section */}
        <Box sx={{ mt: 3, px: 1 }}>
          <Typography variant="caption" sx={{ 
            px: 2, 
            py: 1, 
            color: alpha(theme.palette.common.white, 0.6),
            fontSize: '0.75rem',
            fontWeight: 500,
            display: 'block'
          }}>
            SYSTEM STATUS
          </Typography>
          
          <List component="nav" disablePadding>
            {systemStatusItems.map((item) => (
              <ListItem key={item.id} disablePadding>
                <ListItemButton
                  sx={{
                    px: 2,
                    py: 1,
                    margin: '2px 0',
                    borderRadius: '6px',
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.common.white, 0.05),
                    },
                  }}
                >
                  <StatusIndicator status={item.status} />
                  <ListItemText 
                    primary={item.label} 
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                      fontWeight: 400,
                      color: 'inherit'
                    }} 
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" sx={{ 
                      fontWeight: 500,
                      color: item.status === 'warning' ? theme.palette.warning.main : 'inherit'
                    }}>
                      {item.value}
                    </Typography>
                    {item.status === 'normal' && (
                      <Chip label="Normal" size="small" sx={{ 
                        height: 20,
                        fontSize: '0.65rem',
                        bgcolor: alpha(theme.palette.success.main, 0.1),
                        color: theme.palette.success.main
                      }} />
                    )}
                    {item.status === 'warning' && (
                      <Chip label="Warning" size="small" sx={{ 
                        height: 20,
                        fontSize: '0.65rem',
                        bgcolor: alpha(theme.palette.warning.main, 0.1),
                        color: theme.palette.warning.main
                      }} />
                    )}
                  </Box>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>

      {/* Footer Section */}
      <Box sx={{ 
        borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        pt: 1,
        pb: 0
      }}>
        <Box sx={{ p: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            size="small"
            sx={{
              justifyContent: 'space-between',
              borderColor: alpha(theme.palette.divider, 0.2),
              backgroundColor: alpha(theme.palette.common.white, 0.05),
              color: 'white',
              '&:hover': {
                backgroundColor: alpha(theme.palette.common.white, 0.1),
                borderColor: alpha(theme.palette.divider, 0.3),
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <StatusIndicator status="normal" />
              <Typography variant="body2">System Status: Online</Typography>
            </Box>
            <SettingsIcon fontSize="small" />
          </Button>
        </Box>

        {/* User Profile */}
        <Box 
          sx={{ 
            p: 2, 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: alpha(theme.palette.common.white, 0.05),
            }
          }}
        >
          <Avatar 
            sx={{ 
              width: 40, 
              height: 40,
              bgcolor: 'primary.main',
              color: 'white',
              fontSize: '1rem'
            }}
          >
            JD
          </Avatar>
          <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
            <Typography variant="subtitle2" noWrap sx={{ color: 'white' }}>
              John Doe
            </Typography>
            <Typography variant="caption" noWrap sx={{ color: alpha(theme.palette.common.white, 0.6) }}>
              Admin
            </Typography>
          </Box>
          {/* <ChevronDown sx={{ color: alpha(theme.palette.common.white, 0.6) }} /> */}
        </Box>
      </Box>
    </Box>
  );
}