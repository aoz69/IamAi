import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

const statusObj = {
  instock: { color: 'info' },
  lowstock: { color: 'warning' },
  sold: { color: 'success' },
  archived: { color: 'error' },
};


const formattedDate = (date)=> {

  let dateToFormat =  new Date(date);
  const year = dateToFormat.getFullYear().toString().slice();
  const month = String(dateToFormat.getMonth() + 1).padStart(2, "0");
  const day = String(dateToFormat.getDate()).padStart(2, "0");
  const finalDate = year + "/" + month + "/" + day
  return finalDate
}

const DashboardTable = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3100/fetchProducts')
      .then((response) => response.json())
      .then((data) => {
        return fetch('http://localhost:3100/fetchCate')
          .then((categoryResponse) => categoryResponse.json())
          .then((categoryData) => {
            const categoryIdToName = {};
            categoryData.category.forEach((category) => {
              categoryIdToName[category._id] = category.name;
            });
            const productsWithCategories = data.products.map((product) => ({
              ...product,
              category: categoryIdToName[product.category],
            }));
            productsWithCategories.sort((a, b) => {
              const timestampA = new Date(a.timestamp).getTime();
              const timestampB = new Date(b.timestamp).getTime();
              return timestampB - timestampA;
            });
            const recentProducts = productsWithCategories.slice(0, 5);

            setRows(recentProducts);
          });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <Card>
      <TableContainer  sx={{ minWidth: 800 }}>
        <Table aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock Count</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Expiry</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                hover
                key={index}
                sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
              >
                <TableCell
                  sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}
                >
                  <Box
                    sx={{ display: 'flex', flexDirection: 'column' }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 500,
                        fontSize: '0.875rem !important',
                      }}
                    >
                      {row.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.stock_Count}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{formattedDate(row.date)}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    color={
                      statusObj[row.status]?.color || 'default'
                    } 
                    sx={{
                      height: 24,
                      fontSize: '0.75rem',
                      textTransform: 'capitalize',
                      '& .MuiChip-label': { fontWeight: 500 },
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default DashboardTable;
