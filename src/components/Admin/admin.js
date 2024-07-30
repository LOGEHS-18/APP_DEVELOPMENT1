import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/admin?email=${email}&password=${password}`);
      const data = await response.json();
      if (data.length > 0) {
        navigate('/Dashboard');
        alert("Login successful, Thank you");
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center" style={{ background: 'url("https://img.freepik.com/premium-photo/children-toys-background_996086-8899.jpg") no-repeat center center', backgroundSize: 'cover' }}>
        </div> */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="card p-4" style={{ width: '80%' }}>
            <h2 className="text-center">ADMIN Login</h2>
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
                <Link to="/login" className="btn btn-link">Not an Admin?</Link>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center" style={{ background: 'url("https://img.freepik.com/premium-photo/children-toys-background_996086-8899.jpg") no-repeat center center', backgroundSize: 'cover' }}>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
