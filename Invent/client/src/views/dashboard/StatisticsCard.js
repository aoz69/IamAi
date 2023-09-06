// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import CategoryIcon from '@mui/icons-material/Category';
import QrCodeIcon from '@mui/icons-material/QrCode';
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import { useEffect, useState } from 'react';

const apiUrlProductNumber = 'http://localhost:3100/fetchProductNumb';
const apiUrlCategoryNumber = 'http://localhost:3100/fetchCateNumb';
const apiUrlRevenue = 'http://localhost:3100/rev';

const StatisticsCard = () => {
  const [productNumber, setProductNumber] = useState(null);
  const [categoryNumber, setCategoryNumber] = useState(null);
  const [revenue, setRevenue] = useState(null);

  useEffect(() => {
    // Fetch product number data from the API
    fetch(apiUrlProductNumber)
      .then((response) => response.json())
      .then((data) => {
        setProductNumber(data.productData);
      })
      .catch((error) => {
        console.error('Error fetching product number data:', error);
      });

    // Fetch category number data from the API
    fetch(apiUrlCategoryNumber)
      .then((response) => response.json())
      .then((data) => {
        setCategoryNumber(data.categoryData);
      })
      .catch((error) => {
        console.error('Error fetching category number data:', error);
      });

    // Fetch revenue data from the API
    fetch(apiUrlRevenue)
      .then((response) => response.json())
      .then((data) => {
        setRevenue(data.TotalRev);
      })
      .catch((error) => {
        console.error('Error fetching revenue data:', error);
      });
  }, []);

  return (
    <Card>
      <CardHeader
        title='Stats Overview'
        titleTypographyProps={{
          sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
        }}
        />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>

          <Grid item xs={12} sx={{ marginBottom: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                variant='rounded'
                sx={{
                  mr: 3,
                  width: 44,
                  height: 44,
                  boxShadow: 3,
                  color: 'common.white',
                  backgroundColor: 'primary.main', // You can customize the color
                }}
              >
                <CategoryIcon sx={{ fontSize: '1.75rem' }} />
              </Avatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h6'>{categoryNumber}</Typography>
                <Typography variant='subtitle2'>Category</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sx={{ marginBottom: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                variant='rounded'
                sx={{
                  mr: 3,
                  width: 44,
                  height: 44,
                  boxShadow: 3,
                  color: 'common.white',
                  backgroundColor: 'warning.main', // You can customize the color
                }}
              >
                <QrCodeIcon sx={{ fontSize: '1.75rem' }} />
              </Avatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h6'>{productNumber}</Typography>
                <Typography variant='subtitle2'>Products</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sx={{ marginBottom: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                variant='rounded'
                sx={{
                  mr: 3,
                  width: 44,
                  height: 44,
                  boxShadow: 3,
                  color: 'common.white',
                  backgroundColor: 'info.main', // You can customize the color
                }}
              >
                <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
              </Avatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h6'>Rs.{revenue}</Typography>
                <Typography variant='subtitle2'>Revenue</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StatisticsCard;