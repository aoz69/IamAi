import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Typography from '@mui/material/Typography';


const CategoryTable = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories data
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
      <TableContainer sx={{ minWidth: 400 }}>
        <Table aria-label='table for categories'>
          <TableHead>
            <TableRow>
              <TableCell>Category ID</TableCell>
              <TableCell>Category Name</TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default CategoryTable;
