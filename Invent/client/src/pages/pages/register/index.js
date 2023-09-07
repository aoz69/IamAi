// ** React Imports
import { useState } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import BlankLayout from 'src/@core/layouts/BlankLayout'


import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline';
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline';

const RegistrationForm = () => {
  // ** States for form fields and password visibility
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });

  const [passwordVisibility, setPasswordVisibility] = useState({
    showPassword: false,
    showConfirmPassword: false,
  });


  const handleFormChange = (prop) => (event) => {
    setFormValues({ ...formValues, [prop]: event.target.value });
  };

  // ** Handle password visibility
  const togglePasswordVisibility = (prop) => () => {
    setPasswordVisibility({ ...passwordVisibility, [prop]: !passwordVisibility[prop] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formValues.password !== formValues.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    const formData = {
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
      role: formValues.role,
    };

    try {
      const response = await fetch('http://localhost:3100/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Registration successful');
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle network errors or other unexpected errors
    }
  };
  return (
    <Box className='content-center'>
      <Card >
        <CardHeader title='Registration' titleTypographyProps={{ variant: 'h6' }} />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Name'
                  variant='outlined'
                  placeholder='Enter your name'
                  value={formValues.name}
                  onChange={handleFormChange('name')}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type='email'
                  label='Email'
                  variant='outlined'
                  placeholder='Enter your email'
                  value={formValues.email}
                  onChange={handleFormChange('email')}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant='outlined'>
                  <InputLabel htmlFor='password'>Password</InputLabel>
                  <OutlinedInput
                    id='password'
                    type={passwordVisibility.showPassword ? 'text' : 'password'}
                    label='Password'
                    placeholder='Enter your password'
                    value={formValues.password}
                    onChange={handleFormChange('password')}
                    required
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={togglePasswordVisibility('showPassword')}
                        >
                          {passwordVisibility.showPassword ? (
                            <EyeOutline />
                          ) : (
                            <EyeOffOutline />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant='outlined'>
                  <InputLabel htmlFor='confirmPassword'>Confirm Password</InputLabel>
                  <OutlinedInput
                    id='confirmPassword'
                    type={passwordVisibility.showConfirmPassword ? 'text' : 'password'}
                    label='Confirm Password'
                    placeholder='Confirm your password'
                    value={formValues.confirmPassword}
                    onChange={handleFormChange('confirmPassword')}
                    required
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={togglePasswordVisibility('showConfirmPassword')}
                        >
                          {passwordVisibility.showConfirmPassword ? (
                            <EyeOutline />
                          ) : (
                            <EyeOffOutline />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant='outlined'>
                  <InputLabel htmlFor='role'>Role</InputLabel>
                  <Select
                    label='Role'
                    value={formValues.role}
                    onChange={handleFormChange('role')}
                    required
                  >
                    <MenuItem value=''>Select Role</MenuItem>
                    <MenuItem value='Admin'>Admin</MenuItem>
                    <MenuItem value='Staff'>Staff</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  fullWidth
                  size='large'
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
      </Box>
  );
};

RegistrationForm.getLayout = page => <BlankLayout>{page}</BlankLayout>


export default RegistrationForm;
