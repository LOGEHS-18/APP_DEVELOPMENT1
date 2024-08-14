import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/admins/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const admins = await response.json();
        const admin = admins.find(admin => admin.email === email && admin.password === password);

        if (admin) {
          console.log('Login successful, admin:', admin);  // Log the successful response data
          localStorage.setItem('accessToken', 'your-jwt-token');  // Store JWT token in localStorage
          toast.success('Login successful');
          navigate('/Dashboard');
        } else {
          console.log('Invalid email or password');
          toast.error('Invalid email or password');
        }
      } else {
        console.log('Error fetching admin data');
        toast.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('An error occurred during login');
    }
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
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
