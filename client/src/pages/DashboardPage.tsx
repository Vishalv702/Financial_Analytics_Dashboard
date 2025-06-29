import React from 'react';
import Layout from '../components/Layout';
import DisplayStatCards from '../components/DisplayStatCards';
import OverviewChart from '../components/OverviewChart';
import DisplayRecentTransactions from '../components/DisplayRecentTransactions';
import { Box,Grid, Card, CardContent, Typography } from '@mui/material';
import TransactionsPage from '../components/Transaction';
const DashboardPage = () => {
  return (
    <Layout>
<Box display="flex" justifyContent="center" mb={2}>
  <Typography variant="h5" sx={{ color: 'white' }}>
    Welcome to Dashboard
  </Typography>
</Box>

      {/* Stat Cards */}
      <DisplayStatCards />

      {/* Chart + Recent Transactions */}
      <Grid container spacing={3} mt={1}>
        {/* Chart */}
        <Grid size={{xs:12,md:8}}>
          <Card sx={{ backgroundColor: '#1e1e2f', color: '#fff', height: '100%' }}>
            <CardContent>
              <OverviewChart />
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Transactions */}
        <Grid size={{xs:12,md:4}}>
          <Card sx={{ backgroundColor: '#1e1e2f', color: '#fff', height: '100%' }}>
            <CardContent>
              <DisplayRecentTransactions />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <TransactionsPage/>
    </Layout>
  );
};

export default DashboardPage;