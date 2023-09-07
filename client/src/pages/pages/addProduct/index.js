import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

const AddProductForm = () => {
  const router = useRouter();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    stock_Count: '',
    barcodeId: '',
    status: 'instock',
    category: '',
    date: null,
  });
  const [categories, setCategories] = useState([]);
  const [alert, setAlert] = useState({ type: '', message: '' });

  useEffect(() => {
    // Fetch categories from your API
    fetch('http://localhost:3100/fetchCate')
      .then((response) => response.json())
      .then((data) => {
        // Assuming your API response is in the format you provided
        setCategories(data.category);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleDateChange = (date) => {
    setProduct({ ...product, date });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSaveProduct = async () => {
    try {
      const response = await fetch('http://localhost:3100/addProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        setAlert({ type: 'success', message: 'Product added successfully' });
        setTimeout(() => {
          setAlert({ type: '', message: '' });
          router.push('/productTable'); // Redirect to product table page
        }, 2000);
      } else {
        setAlert({ type: 'error', message: 'Failed to add product' });
      }
    } catch (error) {
      console.error('Error adding product:', error);
      setAlert({ type: 'error', message: 'Failed to add product' });
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
            value={product.name}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label='Price'
            variant='outlined'
            name='price'
            value={product.price}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label='Stock Count'
            variant='outlined'
            name='stock_Count'
            value={product.stock_Count}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label='Barcode ID'
            variant='outlined'
            name='barcodeId'
            value={product.barcodeId}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth variant='outlined'>
            <InputLabel htmlFor='status'>Status</InputLabel>
            <Select
              label='Status'
              name='status'
              value={product.status}
              onChange={handleInputChange}
            >
              <MenuItem value='lowStock'>Low Stock</MenuItem>
              <MenuItem value='archived'>Archived</MenuItem>
              <MenuItem value='sold'>Sold</MenuItem>
              <MenuItem value='instock'>In Stock</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth variant='outlined'>
            <InputLabel htmlFor='category'>Category</InputLabel>
            <Select
              label='Category'
              name='category'
              value={product.category}
              onChange={handleInputChange}
            >
              <MenuItem value=''>Select Category</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <DatePicker
              fullWidth
              label='Date'
              inputFormat='MM/dd/yyyy'
              value={product.date}
              onChange={handleDateChange}
              renderInput={(params) => (
                <TextField {...params} fullWidth variant='outlined' />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant='contained'
            color='primary'
            fullWidth
            onClick={handleSaveProduct}
          >
            Save Product
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

export default AddProductForm;
