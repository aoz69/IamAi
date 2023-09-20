import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const CategoryTable = () => {
  const [categories, setCategories] = useState([]);
  const [userRole, setUserRole] = useState('');
  const router = useRouter();

  const handleEditClick = (categoryId) => {
    router.push(`/pages/editCategory/${categoryId}`);
  };

  const handleDeleteClick = (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      fetch(`http://localhost:3100/delete/category/${categoryId}`, {
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

    // Fetch categories
    fetch('http://localhost:3100/fetchCate')
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.category);
      })
      .catch((error) => {
        console.error('Error fetching categories data:', error);
      });
  }, []);

  return (
    <Card>
      <div style={{ maxHeight: '400px', overflow: 'auto' }}>
        <TableContainer sx={{ minWidth: 400 }}>
          <Table aria-label='table for categories'>
            <TableHead>
              <TableRow>
                <TableCell>Category ID</TableCell>
                <TableCell>Category Name</TableCell>
                {userRole === 'admin' && (
                  <>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category._id}>
                  <TableCell>
                    <Box>
                      <Typography>{category._id}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography>{category.name}</Typography>
                    </Box>
                  </TableCell>
                  {userRole === 'admin' && (
                    <>
                      <TableCell>
                        <IconButton onClick={() => handleEditClick(category._id)}>
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleDeleteClick(category._id)}>
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
      </div>
    </Card>
  );
};

export default CategoryTable;
