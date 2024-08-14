import React, { useState, useEffect } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';

const fetchJSON = async (url) => {
  const response = await fetch(url);
  return response.json();
};

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const userData = await fetchJSON('http://127.0.0.1:8000/api/users/');
      setUsers(userData);
      const productData = await fetchJSON('http://127.0.0.1:8000/api/products/');
      setProducts(productData);
    };
    getData();
  }, []);

  const handleLogout = () => {
    navigate('/login');
  };

  const addUser = async (e) => {
    e.preventDefault();
    const newUser = { email: e.target.email.value, password: e.target.password.value };
    await fetch('http://127.0.0.1:8000/api/users/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });
    setUsers([...users, newUser]);
    setShowAddUser(false);
  };

  const deleteUser = async (id) => {
    await fetch(`http://127.0.0.1:8000/api/users/${id}/`, { method: 'DELETE' });
    setUsers(users.filter(user => user.id !== id));
  };

  const addProduct = async (e) => {
    e.preventDefault();
    const newProduct = {
      name: e.target.name.value,
      category: e.target.category.value,
      company: e.target.company.value,
      price: e.target.price.value,
    };
    await fetch('http://127.0.0.1:8000/api/products/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    });
    setProducts([...products, newProduct]);
    setShowAddProduct(false);
  };

  return (
    <div className="container-fluid">
      <Navbar />

      <div className="d-flex">
        <nav className="col-md-2 bg-light p-3" style={{ height: '100vh' }}>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="nav-link" to="/users">Users</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/orders">Orders</Link>
            </li>
          </ul>
        </nav>

        <div className="col-md-10 p-3">
          <Routes>
            <Route path="users" element={
              <>
                <button className="btn btn-primary mb-3" onClick={() => setShowAddUser(true)}>Add User</button>
                {showAddUser && (
                  <form onSubmit={addUser} className="mb-3">
                    <div className="form-group">
                      <label>Email</label>
                      <input type="email" name="email" className="form-control" required />
                    </div>
                    <div className="form-group">
                      <label>Password</label>
                      <input type="password" name="password" className="form-control" required />
                    </div>
                    <button type="submit" className="btn btn-success">Add User</button>
                    <button type="button" className="btn btn-secondary ml-2" onClick={() => setShowAddUser(false)}>Cancel</button>
                  </form>
                )}
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Email</th>
                      <th>Password</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.email}</td>
                        <td>{user.password}</td>
                        <td>
                          <button className="btn btn-danger btn-sm" onClick={() => deleteUser(user.id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            } />

            <Route path="products" element={
              <>
                <button className="btn btn-primary mb-3" onClick={() => setShowAddProduct(true)}>Add Product</button>
                {showAddProduct && (
                  <form onSubmit={addProduct} className="mb-3">
                    <div className="form-group">
                      <label>Name</label>
                      <input type="text" name="name" className="form-control" required />
                    </div>
                    <div className="form-group">
                      <label>Category</label>
                      <input type="text" name="category" className="form-control" required />
                    </div>
                    <div className="form-group">
                      <label>Company</label>
                      <input type="text" name="company" className="form-control" required />
                    </div>
                    <div className="form-group">
                      <label>Price</label>
                      <input type="number" name="price" className="form-control" required />
                    </div>
                    <button type="submit" className="btn btn-success">Add Product</button>
                    <button type="button" className="btn btn-secondary ml-2" onClick={() => setShowAddProduct(false)}>Cancel</button>
                  </form>
                )}
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Company</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>{product.company}</td>
                        <td>{product.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            } />

            <Route path="orders" element={<div>Orders content here</div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// import React, { useState, useEffect } from 'react';
// import { Link, Route, Routes, useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Navbar from './Navbar';

// const fetchJSON = async (url) => {
//   const response = await fetch(url);
//   return response.json();
// };

// const Dashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [showAddUser, setShowAddUser] = useState(false);
//   const [showAddProduct, setShowAddProduct] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getData = async () => {
//       const userData = await fetchJSON('http://localhost:5000/users');
//       setUsers(userData);
//       const productData = await fetchJSON('http://localhost:5000/Action Figures'); // Modify as needed
//       setProducts(productData);
//     };
//     getData();
//   }, []);

//   const handleLogout = () => {
//     // Handle logout logic here
//     navigate('/login');
//   };

//   const addUser = async (e) => {
//     e.preventDefault();
//     const newUser = { id: users.length + 1, email: e.target.email.value, password: e.target.password.value };
//     await fetch('http://localhost:5000/users', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(newUser),
//     });
//     setUsers([...users, newUser]);
//     setShowAddUser(false);
//   };

//   const deleteUser = async (id) => {
//     await fetch(`http://localhost:5000/users/${id}`, { method: 'DELETE' });
//     setUsers(users.filter(user => user.id !== id));
//   };

//   const addProduct = async (e) => {
//     e.preventDefault();
//     const newProduct = {
//       id: products.length + 1, // Ideally, the backend should handle ID generation
//       name: e.target.name.value,
//       category: e.target.category.value,
//       company: e.target.company.value,
//       price: e.target.price.value,
//     };
//     await fetch('http://localhost:5000/Action Figures', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(newProduct),
//     });
//     setProducts([...products, newProduct]);
//     setShowAddProduct(false);
//   };

//   return (
//     <div className="container-fluid">
//       {/* Navbar */}
//      <Navbar/>

//       {/* Sidebar and Content */}
//       <div className="d-flex">
//         {/* Sidebar */}
//         <nav className="col-md-2 bg-light p-3" style={{ height: '100vh' }}>
//           <ul className="nav flex-column">
//             <li className="nav-item">
//               <Link className="nav-link" to="/users">Users</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/products">Products</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/orderPage">Orders</Link>
//             </li>
//           </ul>
//         </nav>

//         {/* Main Content */}
//         <div className="col-md-10 p-3">
//           <Routes>
//             {/* Users Page */}
//             <Route path="users" element={
//               <>
//                 <button className="btn btn-primary mb-3" onClick={() => setShowAddUser(true)}>Add User</button>
//                 {showAddUser && (
//                   <form onSubmit={addUser} className="mb-3">
//                     <div className="form-group">
//                       <label>Email</label>
//                       <input type="email" name="email" className="form-control" required />
//                     </div>
//                     <div className="form-group">
//                       <label>Password</label>
//                       <input type="password" name="password" className="form-control" required />
//                     </div>
//                     <button type="submit" className="btn btn-success">Add User</button>
//                     <button type="button" className="btn btn-secondary ml-2" onClick={() => setShowAddUser(false)}>Cancel</button>
//                   </form>
//                 )}
//                 <table className="table table-striped">
//                   <thead>
//                     <tr>
//                       <th>ID</th>
//                       <th>Email</th>
//                       <th>Password</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {users.map(user => (
//                       <tr key={user.id}>
//                         <td>{user.id}</td>
//                         <td>{user.email}</td>
//                         <td>{user.password}</td>
//                         <td>
//                           <button className="btn btn-danger btn-sm" onClick={() => deleteUser(user.id)}>Delete</button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </>
//             } />

//             {/* Products Page */}
//             <Route path="products" element={
//               <>
//                 <button className="btn btn-primary mb-3" onClick={() => setShowAddProduct(true)}>Add Product</button>
//                 {showAddProduct && (
//                   <form onSubmit={addProduct} className="mb-3">
//                     <div className="form-group">
//                       <label>Name</label>
//                       <input type="text" name="name" className="form-control" required />
//                     </div>
//                     <div className="form-group">
//                       <label>Category</label>
//                       <input type="text" name="category" className="form-control" required />
//                     </div>
//                     <div className="form-group">
//                       <label>Company</label>
//                       <input type="text" name="company" className="form-control" required />
//                     </div>
//                     <div className="form-group">
//                       <label>Price</label>
//                       <input type="number" name="price" className="form-control" required />
//                     </div>
//                     <button type="submit" className="btn btn-success">Add Product</button>
//                     <button type="button" className="btn btn-secondary ml-2" onClick={() => setShowAddProduct(false)}>Cancel</button>
//                   </form>
//                 )}
//                 <table className="table table-striped">
//                   <thead>
//                     <tr>
//                       <th>ID</th>
//                       <th>Name</th>
//                       <th>Category</th>
//                       <th>Company</th>
//                       <th>Price</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {products.map(product => (
//                       <tr key={product.id}>
//                         <td>{product.id}</td>
//                         <td>{product.name}</td>
//                         <td>{product.category}</td>
//                         <td>{product.company}</td>
//                         <td>{product.price}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </>
//             } />

//             {/* Orders Page */}
//             <Route path="orders" element={<div>Orders content here</div>} />
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
