import React, { useState } from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import AddProduct from './AddProduct';
import ViewProducts from './ViewProducts';
import '../styles/Main.css';

const Main = () => {
  const [view, setView] = useState('menu');
  const [editProduct, setEditProduct] = useState(null);

  const goToAdd = () => {
    setEditProduct(null);
    setView('add');
  };

  const goToEdit = (product) => {
    setEditProduct(product);
    setView('add');
  };

  const goToView = () => {
    setEditProduct(null);
    setView('view');
  };

  const goToMenu = () => {
    setEditProduct(null);
    setView('menu');
  };

  const renderContent = () => {
    switch (view) {
      case 'add':
        return <AddProduct editProduct={editProduct} goToView={goToView} />;
      case 'view':
        return <ViewProducts onEdit={goToEdit} goToAdd={goToAdd} />;
      default:
        return (
          <Box textAlign="center">
            <Typography variant="h4" gutterBottom>
              Welcome to Product Manager
            </Typography>
            <Button variant="contained" color="primary" onClick={goToAdd} sx={{ m: 1 }}>
              Add Product
            </Button>
            <Button variant="outlined" color="secondary" onClick={goToView} sx={{ m: 1 }}>
              View Products
            </Button>
          </Box>
        );
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      {view !== 'menu' && (
        <Button variant="text" onClick={goToMenu} sx={{ mb: 2 }}>
          ← Back to Menu
        </Button>
      )}
      {renderContent()}
    </Container>
  );
};

export default Main;
