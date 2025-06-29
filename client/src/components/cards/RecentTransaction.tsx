// src/components/cards/RecentTransactionCard.tsx
import React from 'react';
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';

interface Transaction {
  user_id: string;
  user_profile: string;
  category: 'Revenue' | 'Expense';
  amount: number;
}

const RecentTransactionCard: React.FC<{ tx: Transaction }> = ({ tx }) => {
  const isIncome = tx.category === 'Revenue';

  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: 1.5,
        backgroundColor: '#1e1e2f',
        borderRadius: 2,
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        marginBottom: 1,
      }}
    >
      <Avatar src={tx.user_profile} alt={tx.user_id} sx={{ marginRight: 2 }} />
      <CardContent sx={{ flex: 1, padding: '8px 0' }}>
        <Typography variant="subtitle2" sx={{ color: '#ccc' }}>
          {isIncome ? 'Transfers from' : 'Transfers to'}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#fff' }}>
          {tx.user_id}
        </Typography>
      </CardContent>
      <Box sx={{ color: isIncome ? '#00e676' : '#ff9100', fontWeight: 600 }}>
        {isIncome ? '+' : '-'}${tx.amount.toFixed(2)}
      </Box>
    </Card>
  );
};

export default RecentTransactionCard;
