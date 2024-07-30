import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Signup() {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      if (response.ok) {
        navigate('/login');
        alert("Successfully Signedup")
      } else {
        alert('Error during signup');
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div className="container form-container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="card" style={{ width: '30rem' }}>
        <h2 className="text-center">Signup</h2>
        <form onSubmit={handleSignup}>
          <div className="form-group row">
            <label htmlFor="user" className="col-sm-3 col-form-label">User</label>
            <div className="col-sm-9">
              <input
                type="user"
                className="form-control"
                id="user"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
              />
            </div>
          </div>
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
            <button type="submit" className="btn btn-primary">Signup</button>
          </div>
          <div className="text-center">
            <Link to="/login" className="btn btn-link">Already have an account</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;