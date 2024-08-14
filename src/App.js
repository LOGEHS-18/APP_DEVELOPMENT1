import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Homepage from './components/Home/Main';
import AdminLogin from './components/Admin/admin';
import Dashboard from './components/Admin/Dashboard';
import UsersPage from './components/Admin/UserPage';
import ProductsPage from './components/Admin/ProductPage';
import Cart from './components/Home/cart';
import OrdersPage from './components/Admin/OrderPage';
import OrderPreview from './components/Home/Order';
import ProfilePage from './components/Home/Profile';
import { useSelector } from 'react-redux';
import './components/Login.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const theme = useSelector((state) => state.theme);

  return (
    <Router>
      <div className={`app ${theme}`}>
        <div className='container-mt3'>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Homepage />} />
            <Route path="/Dashboard" element={<Dashboard/>}/>
            <Route path="/users" element={<UsersPage/>} />
            <Route path="/products" element={<ProductsPage/>}/>
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<OrderPreview />} />
            <Route path="/orderPage" element={<OrdersPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
