import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';

const TabAccount = () => {
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    password: '',
  });
  const [updateStatus, setUpdateStatus] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3100/getSession', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success' && data.user) {
          setUser(data.user);
          // Populate form fields with user data
          setFormData({
            name: data.user.name,
            email: data.user.email,
            role: data.user.role,
            password: '', 
          });
        } else {
          router.push('pages/login');
        }
      })
      .catch((error) => {
        console.error('Error fetching user session:', error);
      });
  }, []);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const userId = user._id;

      const requestBody = {
        id: userId,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        password: formData.password,
      };

      // Make the API request with the user's ID included in the body
      const response = await fetch(`http://localhost:3100/updateUser/${userId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      // Handle the response here
      if (response.ok) {
        // Data successfully updated, show a success message
        setUpdateStatus('success');
        setTimeout(() => setUpdateStatus(null), 3000); // Clear the message after 3 seconds
      } else {
        // Handle error response here and show an error message
        setUpdateStatus('error');
        setTimeout(() => setUpdateStatus(null), 3000); // Clear the message after 3 seconds
        console.error('Error updating data:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <CardContent>
      <form onSubmit={handleSaveChanges}>
        <Grid container spacing={7}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="email"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleFormChange}
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="User">User</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="New Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleFormChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" sx={{ marginRight: 3.5 }}>
              Save Changes
            </Button>
            {updateStatus === 'success' && (
              <span style={{ color: 'green' }}>Update successful!</span>
            )}
            {updateStatus === 'error' && (
              <span style={{ color: 'red' }}>Update failed. Please try again.</span>
            )}
          </Grid>
        </Grid>
      </form>
    </CardContent>
  );
};

export default TabAccount;
