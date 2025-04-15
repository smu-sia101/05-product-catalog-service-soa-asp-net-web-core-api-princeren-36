import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Card, CardContent, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ViewProducts = ({ onEdit, goToAdd }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5143/api/Products');
      setProducts(response.data);
    } catch (error) {
      console.error('There was an error fetching the products:', error);
    }
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`http://localhost:5143/api/Products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="view-products">
      <h1>View Products</h1>

      <TextField
        label="Search Products"
        variant="outlined"
        fullWidth
        value={search}
        onChange={handleSearch}
        style={{ marginBottom: '20px' }}
      />

      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{product.name}</Typography>
                <Typography variant="body2">{product.description}</Typography>
                <Typography variant="h6">Price: ${product.price}</Typography>
                <Typography variant="body1">Stock: {product.stock}</Typography>
                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    style={{ width: '100%', marginTop: '10px' }}
                  />
                )}

                <div style={{ marginTop: '20px' }}>
                  <IconButton
                    color="primary"
                    aria-label="edit"
                    onClick={() => onEdit(product)}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color="secondary"
                    aria-label="delete"
                    onClick={() => handleDelete(product.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <div style={{ marginTop: '20px' }}>
        <Button variant="contained" color="primary" onClick={goToAdd}>
          Add New Product
        </Button>
      </div>
    </div>
  );
};

export default ViewProducts;
