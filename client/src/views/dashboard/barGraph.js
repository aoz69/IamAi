import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const StyledCard = {
  maxWidth: '400px',
  padding: '16px',
  margin: 'auto',
  position: 'relative',
  textAlign: 'center',
};

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];


const MyBarChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    Promise.all([
      fetchData('http://localhost:3100/lowstockCount'),
      fetchData('http://localhost:3100/archivedCount'),
      fetchData('http://localhost:3100/inStockCount'),
      fetchData('http://localhost:3100/soldCount'),
    ])
      .then((data) => {
        const [lowStockData, archivedStockData, inStockData, soldStockData] = data;
        setChartData([
          {
            name: 'Low stock',
            lowstock: lowStockData.lowstock,
            archived: 0,
            instock: 0,
            sold: 0,
          },
          {
            name: 'Archived',
            lowstock: 0,
            archived: archivedStockData.archived,
            instock: 0,
            sold: 0,
          },
          {
            name: 'In stock',
            lowstock: 0,
            archived: 0,
            instock: inStockData.stock,
            sold: 0,
          },
          {
            name: 'Sold',
            lowstock: 0,
            archived: 0,
            instock: 0,
            sold: soldStockData.soldStock,
          },
        ]);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  if (!chartData) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Card style={StyledCard}>
      <Typography variant="h6">Product Status</Typography>
      <BarChart width={250} height={300} data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {Object.keys(chartData[0]).map((key, index) => {
          if (key !== 'name') {
            return (
              <Bar key={key} dataKey={key} fill={COLORS[index]} stackId="status" name={key} />
            );
          }
          return null;
        })}
      </BarChart>
    </Card>
  );
};

export default MyBarChart;
