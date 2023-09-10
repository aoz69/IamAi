import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const EditProductForm = () => {
  const router = useRouter();
  const { categoryId } = router.query;
  console.log("THIS IS ID SENTT: " + categoryId);

  const [category, setCategory] = useState({
    name: '',
  });
  const [alert, setAlert] = useState({ type: '', message: '' });

  useEffect(() => {
    if (categoryId) {
      fetch(`http://localhost:3100/fetchCategoryById/${categoryId}`)
        .then((response) => response.json())
        .then((data) => {
          setCategory(data.category); // Fixed: Changed setProduct to setCategory
        })
        .catch((error) => {
          console.error('Error fetching category data:', error);
        });
    }
  }, [categoryId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value }); // Fixed: Changed setProduct to setCategory
  };

  const handleUpdateCategory = async () => {
    try {
      const response = await fetch(`http://localhost:3100/updateCategory/${categoryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(category), 
      });

      if (response.ok) {
        setAlert({ type: 'success', message: 'Category updated successfully' });
        setTimeout(() => {
          setAlert({ type: '', message: '' });
          router.push('/cateTables');
        }, 2000);
      } else {
        console.error('Failed to update category:', response.statusText);
        setAlert({ type: 'error', message: 'Failed to update category' });
      }
    } catch (error) {
      console.error('Error updating category:', error);
      setAlert({ type: 'error', message: 'Failed to update category' });
    }
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label='Name'
            variant='outlined'
            name='name'
            value={category.name}
            onChange={handleInputChange}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            variant='contained'
            color='primary'
            fullWidth
            onClick={handleUpdateCategory}
          >
            Update Category
          </Button>
        </Grid>
      </Grid>
      {alert.type === 'success' && (
        <div style={{ color: 'green' }}>{alert.message}</div>
      )}
      {alert.type === 'error' && (
        <div style={{ color: 'red' }}>{alert.message}</div>
      )}
    </div>
  );
};

export default EditProductForm;
