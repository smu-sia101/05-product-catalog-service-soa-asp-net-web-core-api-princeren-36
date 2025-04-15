import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddProduct from './pages/AddProduct';
import ViewProducts from './pages/ViewProducts';
import Main from './pages/Main';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/view" element={<ViewProducts />} />
        <Route path="/add" element={<AddProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
