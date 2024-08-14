import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/users/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const users = await response.json();
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
          console.log('Login successful, user:', user); 
          toast.success('Login successful');
          navigate('/home');
        } else {
          console.log('Invalid email or password');
          toast.error('Invalid email or password');
        }
      } else {
        console.log('Error fetching user data');
        toast.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('An error occurred during login');
    }
  };

  return (
    <div className="container-fluid vh-100">
      <ToastContainer/>
      <div className="row h-100">
        <div 
          className="col-md-6 d-none d-md-flex align-items-center justify-content-center" 
          style={{ 
            background: 'url("https://img.freepik.com/premium-photo/children-toys-background_996086-8899.jpg") no-repeat center center', 
            backgroundSize: 'cover' 
          }}
        >
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="card p-4" style={{ width: '80%' }}>
            <h2 className="text-center">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group row">
                <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
                <div className="col-sm-9">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="password" className="col-sm-3 col-form-label">Password</label>
                <div className="col-sm-9">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">Login</button>
                <br /><br />
                <Link to="/Signup" className="btn btn-link">Don't have an account?</Link>
                <Link to="/admin" className="btn btn-link">Admin</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
