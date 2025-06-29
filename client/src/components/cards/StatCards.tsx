import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color = '#4caf50' }) => {
  return (
    <Card
      sx={{
        backdropFilter: 'blur(12px)',
        background: 'rgba(30, 30, 47, 0.7)',
        borderRadius: 3,
        color: 'white',
        p: 3,
        boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: `0 8px 32px ${color}66`
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            mr: 2,
            fontSize: 36,
            p: 1.5,
            borderRadius: '50%',
            background: `linear-gradient(145deg, ${color}aa, ${color}55)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ opacity: 0.7, fontWeight: 600, fontSize: '0.9rem' }}>
            {title}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.3rem' }}>
            {value}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default StatCard;
