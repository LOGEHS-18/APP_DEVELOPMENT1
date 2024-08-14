import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/cart/')
      .then(response => response.json())
      .then(data => {
        setCartItems(data);
        calculateTotal(data);
      });
  }, []);

  const calculateTotal = (items) => {
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const calculatedTaxes = subtotal * 0.1; // Assuming a 10% tax rate
    setTaxes(Math.round(calculatedTaxes * 100) / 100); // Round off to 2 decimal places
    setFinalAmount(subtotal + calculatedTaxes);
    setTotalAmount(Math.round(subtotal * 100) / 100); // Round off to 2 decimal places
  };

  const updateQuantity = (index, delta) => {
    const updatedCartItems = cartItems.map((item, i) => {
      if (i === index) {
        const updatedItem = { ...item, quantity: item.quantity + delta };
        return updatedItem.quantity > 0 ? updatedItem : item;
      }
      return item;
    }).filter(item => item.quantity > 0);

    setCartItems(updatedCartItems);
    calculateTotal(updatedCartItems);
  };

  const deleteItem = (index) => {
    const itemToDelete = cartItems[index];

    fetch(`http://localhost:5000/cart/${itemToDelete.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (response.ok) {
        const updatedCartItems = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedCartItems);
        calculateTotal(updatedCartItems);
      } else {
        throw new Error('Failed to delete item');
      }
    })
    .catch(error => {
      console.error(error);
    });
  };

  const handleOrder = () => {
    navigate('/order');
  };

  return (
    <div className="container mt-4">
      <h2>Shopping Cart</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td><img src={item.image} alt={item.name} style={{ width: '50px', height: '50px' }} /></td>
              <td>{item.name}</td>
              <td>
                <button className="btn btn-secondary btn-sm" onClick={() => updateQuantity(index, -1)}>-</button>
                <span className="mx-2">{item.quantity}</span>
                <button className="btn btn-secondary btn-sm" onClick={() => updateQuantity(index, 1)}>+</button>
              </td>
              <td>₹{item.price}</td>
              <td>₹{(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => deleteItem(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <button className="btn btn-primary mt-3" onClick={handleOrder}>Order</button>
      </div>
    </div>
  );
};

export default Cart;
