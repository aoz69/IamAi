import { useState } from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const AddCategoryPage = () => {
  const [categoryName, setCategoryName] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3100/CateModel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: categoryName,
        }),
      });

      if (response.ok) {
        setAlertMessage('Category added successfully');
        setAlertType('success');
        setTimeout(() => {
          router.push('/cateTables');
        }, 2000);
      } else {
        setAlertMessage('Failed to add category');
        setAlertType('error');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: (theme) => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Add Category
            </Typography>
          </Box>
          {alertMessage && (
            <Typography variant='body2' color={alertType} sx={{ marginBottom: 2 }}>
              {alertMessage}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label='Category Name'
              variant='outlined'
              placeholder='Enter category name'
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
            <Button
              fullWidth
              size='large'
              variant='contained'
              sx={{ marginTop: 3 }}
              type='submit'
            >
              Add Category
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddCategoryPage;
