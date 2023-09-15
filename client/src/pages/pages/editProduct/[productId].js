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



const EditProductForm = () => {
  const router = useRouter();
  const { productId } = router.query;
  console.log("THIS IS ID SENTT: " + productId);

  const [product, setProduct] = useState({
    name: '',
    price: '',
    stock_Count: '',
    barcodeId: '',
    status: 'instock',
    category: '',
    date: '',
  });
  const [categories, setCategories] = useState([]);
  const [alert, setAlert] = useState({ type: '', message: '' });

  useEffect(() => {
    if (productId) {
      fetch(`http://localhost:3100/fetchProductById/${productId}`)
        .then((response) => response.json())
        .then((data) => {
          setProduct(data.product);
        })
        .catch((error) => {
          console.error('Error fetching product data:', error);
        });
    }

    fetch('http://localhost:3100/fetchCate')
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.category);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, [productId]);

  const handleDateChange = (date) => {
    setProduct({ ...product, date });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleUpdateProduct = async () => {
    try {
      const response = await fetch(`http://localhost:3100/updateProduct/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product), 
      });
  
      if (response.ok) {
        setAlert({ type: 'success', message: 'Product updated successfully' });
  
        const notificationResponse = await fetch('http://localhost:3100/addNotfi', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: `Product with ID ${productId} updated successfully`,
          }),
        });
  
        if (!notificationResponse.ok) {
          console.error('Failed to add notification:', notificationResponse.statusText);
        }
  
        setTimeout(() => {
          setAlert({ type: '', message: '' });
          router.push('/productTable'); 
        }, 2000);
      } else {
        console.error('Failed to update product:', response.statusText);
        setAlert({ type: 'error', message: 'Failed to update product' });
      }
    } catch (error) {
      console.error('Error updating product:', error);
      setAlert({ type: 'error', message: 'Failed to update product' });
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
            onClick={handleUpdateProduct}
          >
            Update Product
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