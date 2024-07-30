import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', category: '', company: '', price: '' });
  const [categories, setCategories] = useState([
    'Action Figures',
    'Building Toys',
    'Educational Toys',
    'Dolls and Stuffed Animals',
    'Games and Puzzles',
    'Outdoor Toys',
    'Pretend Play Toys',
    'Creative and Art Toys',
    'Electronic Toys',
  ]);
  const [selectedCategory, setSelectedCategory] = useState('Action Figures');

  useEffect(() => {
    // Fetch products based on the selected category
    axios.get(`http://localhost:5000/${selectedCategory}`)
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, [selectedCategory]);

  const handleAddProduct = () => {
    axios.post(`http://localhost:5000/${selectedCategory}`, newProduct)
      .then(response => {
        setProducts([...products, response.data]);
        setNewProduct({ name: '', category: '', company: '', price: '' });
      })
      .catch(error => console.error('Error adding product:', error));
  };

  const handleDeleteProduct = (id) => {
    axios.delete(`http://localhost:5000/${selectedCategory}/${id}`)
      .then(() => {
        setProducts(products.filter(product => product.id !== id));
      })
      .catch(error => console.error('Error deleting product:', error));
  };

  return (
    <div>
      <h2>Products</h2>

      <div className="mb-3">
        <label htmlFor="category-select" className="form-label">Select Category</label>
        <select
          id="category-select"
          className="form-control mb-2"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <input
          type="text"
          className="form-control mb-2"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Company"
          value={newProduct.company}
          onChange={(e) => setNewProduct({ ...newProduct, company: e.target.value })}
        />
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <button onClick={handleAddProduct} className="btn btn-primary">Add Product</button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Company</th>
            <th>Price</th>
            <th>Actions</th>
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
              <td>
                <button onClick={() => handleDeleteProduct(product.id)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsPage;
