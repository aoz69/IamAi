import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';
import Table from 'src/views/dashboard/Table';
import StatisticsCard from 'src/views/dashboard/StatisticsCard';
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview';

const Dashboard = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6} lg={4}>
          <WeeklyOverview />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <StatisticsCard />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <WeeklyOverview />
        </Grid>
        <Grid item xs={12}>
          <Table />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  );
};

export default Dashboard;
