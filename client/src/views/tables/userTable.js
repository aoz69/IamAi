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



const handleDeleteClick = (userId) => {
  if (window.confirm('Are you sure you want to delete this user?')) {
    fetch(`http://localhost:3100/delete/user/${userId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert(`${data.message}`);
          window.location.reload()
        } else {
          alert(`Failed to delete user: ${data.error}`);
        }
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
        alert(error);
      });
  }
};
  


const CategoryTable = () => {
  const [users, setUsers] = useState([]);
  const router = useRouter();


  useEffect(() => {
    fetch('http://localhost:3100/user')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.data);
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
              <TableCell>User EMail</TableCell>
              <TableCell>User Role</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.name}>
                <TableCell>
                 <Box>
                    <Typography>{user.email}</Typography>
                 </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography>{user.role}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography>{user.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                <IconButton onClick={() => handleDeleteClick(user._id)}>
                  <DeleteForeverIcon />
                </IconButton>
                </TableCell>
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
