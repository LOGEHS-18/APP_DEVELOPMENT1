// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Homepage from './components/Home/Main';
import { useSelector } from 'react-redux';
import './components/Login.css';
import AdminLogin from './components/Admin/admin';
import Dashboard from './components/Admin/Dashboard';
import UsersPage from './components/Admin/UserPage';
import ProductsPage from './components/Admin/ProductPage';
function App() {
  const theme = useSelector((state) => state.theme);
  return (
      <Router>
         <div className={`app ${theme}`}>

        <div className="app">
          <div className='container-mt3'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<AdminLogin/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/home"element={<Homepage/>} />
              <Route path="/Dashboard"element={<Dashboard/>} />
              <Route path="/users"element={<UsersPage/>} />
              <Route path="/products"element={<ProductsPage/>} />
            </Routes>
          </div>
        </div>
         </div>
      </Router>
  );
}

export default App;
