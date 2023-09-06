import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const statusObj = {
  instock: { color: 'error' },
  lowstock: { color: 'warning' },
  sold: { color: 'success' },
};

const DashboardTable = () => {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetch('http://localhost:3100/fetchArchived')
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

            setRows(productsWithCategories);
          });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Card>
      <TableContainer sx={{ minWidth: 800 }}>
        <Table aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>BarcodeId</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Expiry</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow hover key={index}>
                  <TableCell>
                    <Box>
                      <Typography>{row.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>{row.barcodeId}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.expiry}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.status}
                      color={statusObj[row.status]?.color || 'default'}
                      sx={{
                        height: 24,
                        textTransform: 'capitalize',
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton>
                      <DeleteForeverIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
};

export default DashboardTable;
