import React from 'react';
import { Box, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';
import SettingsIcon from '@mui/icons-material/Settings';

interface MenuItem {
  label: string;
  icon: React.ReactNode;
}

const menuItems: MenuItem[] = [
  { label: 'Dashboard', icon: <DashboardIcon /> },
  { label: 'Transactions', icon: <AccountBalanceWalletIcon /> },
  { label: 'Wallet', icon: <AccountBalanceWalletIcon /> },
  { label: 'Analytics', icon: <AnalyticsIcon /> },
  { label: 'Personal', icon: <PersonIcon /> },
  { label: 'Message', icon: <MailIcon /> },
  { label: 'Setting', icon: <SettingsIcon /> },
];

const Sidebar: React.FC = () => (
  <Box sx={{ width: 240, height: '100vh', bgcolor: '#1e1e2f', color: 'white', p: 2 }}>
    <Box sx={{ fontSize: 24, mb: 4, fontWeight: 'bold' }}>🟢 Loopr Ai</Box>
    <List>
      {menuItems.map((item, index) => (
        <ListItemButton key={index}>
          <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItemButton>
      ))}
    </List>
  </Box>
);

export default Sidebar;
