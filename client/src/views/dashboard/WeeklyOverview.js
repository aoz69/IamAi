import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { PieChart, Pie, Cell, Legend } from 'recharts';

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

const MyPieChart = () => {
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
        const total = lowStockData.lowstock + archivedStockData.archived + inStockData.stock + soldStockData.soldStock;
        setChartData([
          { name: 'Low stock', value: (lowStockData.lowstock / total) * 100 },
          { name: 'Archived', value: (archivedStockData.archived / total) * 100 },
          { name: 'In stock', value: (inStockData.stock / total) * 100 },
          { name: 'Sold', value: (soldStockData.soldStock / total) * 100 },
        ]);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  if (!chartData) {
    return <Typography>Loading...</Typography>;
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <Card style={StyledCard}>
      <Typography variant="h6">Product Status</Typography>
      <PieChart width={300} height={300}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          isAnimationActive={true}
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Legend
          align="left"
          verticalAlign="bottom"
          iconSize={16}
          wrapperStyle={{ paddingBottom: '10px' }}
        />
      </PieChart>
    </Card>
  );
};

export default MyPieChart;
