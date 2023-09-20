import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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
import QRCode from 'qrcode.react';

const statusObj = {
  instock: { color: 'info' },
  lowstock: { color: 'warning' },
  sold: { color: 'success' },
  archived: { color: 'error' },
};

const DashboardTable = ({ user }) => {
  const router = useRouter();

  const handleEditClick = (productId) => {
    router.push(`/pages/editProduct/${productId}`);
  };

  const handleDeleteClick = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      fetch(`http://localhost:3100/delete/product/${productId}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert(`${data.message}`);
            window.location.reload();
          } else {
            alert(`Failed to delete product: ${data.error}`);
          }
        })
        .catch((error) => {
          console.error('Error deleting product:', error);
          alert(error);
        });
    }
  };

  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [userRole, setUserRole] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
        // Fetch user session and get user role
        fetch('http://localhost:3100/getSession', {
          method: 'GET',
          credentials: 'include',
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.status === 'success' && data.user) {
              setUserRole(data.user.role);
            } else {
              console.error('User session not found');
            }
          })
          .catch((error) => {
            console.error('Error fetching user session:', error);
          });


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

  const formattedDate = (date) => {
    let dateToFormat = new Date(date);
    const year = dateToFormat.getFullYear().toString().slice();
    const month = String(dateToFormat.getMonth() + 1).padStart(2, '0');
    const day = String(dateToFormat.getDate()).padStart(2, '0');
    const finalDate = year + '/' + month + '/' + day;
    return finalDate;
  };

  return (
    <Card>
      <div style={{ maxHeight: '400px', overflow: 'auto' }}>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table aria-label='table in dashboard'>
            <TableHead>
              <TableRow>
                <TableCell>Barcode</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Expiry</TableCell>
                <TableCell>Status</TableCell>
                {userRole === 'Admin' && (
                  <>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow hover key={index}>
                    <TableCell>
                      <QRCode value={`https://192.168.43.114:3100/changeStatus/${row._id}`} style={{ width: '100px', height: '100px' }} />
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography>{row.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>Rs.{row.price}</TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell>{formattedDate(row.date)}</TableCell>
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
                    {userRole === 'Admin' && (
                      <>
                        <TableCell>
                          <IconButton onClick={() => handleEditClick(row._id)}>
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleDeleteClick(row._id)}>
                            <DeleteForeverIcon />
                          </IconButton>
                        </TableCell>
                      </>
                    )}
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
      </div>
    </Card>
  );
};

export default DashboardTable;
