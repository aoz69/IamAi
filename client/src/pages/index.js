import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';
import Table from 'src/views/dashboard/Table';
import StatisticsCard from 'src/views/dashboard/StatisticsCard';
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview';

const Dashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch('http://localhost:3100/getSession',{
    method: 'GET',
    credentials: 'include',}
    ) 
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success' && data.user) {
          setLoading(false); // User is authenticated
        } else {
         
          router.push('pages/login'); 
        }
      })
      .catch((error) => {
        console.error('Error fetching user session:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  // Render the dashboard content if the user is authenticated
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
