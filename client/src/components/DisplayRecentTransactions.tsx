import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import RecentTransactionCard from './cards/RecentTransaction';
import { Box, Typography } from '@mui/material';

const DisplayRecentTransactions: React.FC = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await axios.get('/dashboard/recent-transactions');
        setTransactions(res.data);
      } catch (err) {
        console.error('Failed to fetch recent transactions:', err);
      }
    };

    fetchRecent();
  }, []);

  return (
    <Box sx={{ backgroundColor: '#161622', borderRadius: 2, p: 2 }}>
      <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
        Recent Transactions
      </Typography>
      {transactions.map((tx, i) => (
        <RecentTransactionCard key={i} tx={tx} />
      ))}
    </Box>
  );
};

export default DisplayRecentTransactions;
