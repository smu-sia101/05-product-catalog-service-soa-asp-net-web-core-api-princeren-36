import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Paper, Typography, Box } from '@mui/material';
import '../styles/AddProduct.css';

const AddProduct = ({ editProduct, goToView }) => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    stock: '',
    imageUrl: ''
  });

  useEffect(() => {
    if (editProduct) {
      setProduct(editProduct);
    } else {
      setProduct({
        name: '',
        price: '',
        description: '',
        category: '',
        stock: '',
        imageUrl: ''
      });
    }
  }, [editProduct]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editProduct) {
        await axios.put(`http://localhost:5143/api/Products/${editProduct.id}`, product);
        alert('Product updated successfully!');
      } else {
        await axios.post('http://localhost:5143/api/Products', product);
        alert('Product added successfully!');
      }
      goToView();
    } catch (err) {
      console.error(err);
      alert('Failed to submit product. See console for details.');
    }
  };

  return (
    <Paper elevation={3} className="add-product-container">
      <Typography variant="h5" gutterBottom>
        {editProduct ? 'Edit Product' : 'Add New Product'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} className="add-product-form">
        <TextField label="Name" name="name" value={product.name} onChange={handleChange} fullWidth required />
        <TextField label="Price" name="price" value={product.price} onChange={handleChange} fullWidth required type="number" />
        <TextField label="Description" name="description" value={product.description} onChange={handleChange} fullWidth multiline rows={3} />
        <TextField label="Category" name="category" value={product.category} onChange={handleChange} fullWidth />
        <TextField label="Stock" name="stock" value={product.stock} onChange={handleChange} fullWidth required type="number" />
        <TextField label="Image URL" name="imageUrl" value={product.imageUrl} onChange={handleChange} fullWidth />
        <Button variant="contained" color="primary" type="submit">
          {editProduct ? 'Update Product' : 'Add Product'}
        </Button>
      </Box>
    </Paper>
  );
};

export default AddProduct;
