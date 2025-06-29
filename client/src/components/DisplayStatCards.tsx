import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import StatCard from './cards/StatCards';
import axios from '../utils/axios';

import SavingsIcon from '@mui/icons-material/Savings';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';

interface StatData {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

const iconMap: { [key: string]: React.ReactNode } = {
  Balance: <AccountBalanceWalletIcon />,
  Revenue: <TrendingUpIcon />,
  Expenses: <MoneyOffIcon />,
  Savings: <SavingsIcon />,
};

const colorMap: { [key: string]: string } = {
  Balance: '#00e676',
  Revenue: '#2979ff',
  Expenses: '#f44336',
  Savings: '#ff9100',
};

const DisplayStatCards: React.FC = () => {
  const [statData, setStatData] = useState<StatData[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('/dashboard/stats');
        const data = res.data;
        const formatted: StatData[] = Object.entries(data).map(([key, value]) => {
  const formattedKey = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
  return {
    title: formattedKey,
    value: `$${value}`,
    icon: iconMap[formattedKey] || null,
    color: colorMap[formattedKey] || '#fff',
  };
});


        setStatData(formatted);
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      }
    };

    fetchStats();
  }, []);

  return (
    <Grid container spacing={2}>
      {statData.map((stat, index) => (
        <Grid key={index} size={{sm:6,md:3}} >
          <StatCard {...stat} />
        </Grid>
      ))}
    </Grid>
  );
};

export default DisplayStatCards;
