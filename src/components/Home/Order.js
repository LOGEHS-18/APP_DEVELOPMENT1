import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderPreview = () => {
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
    const subtotal = items.reduce((acc, item) => {
      const price = Number(item.price); // Ensure price is a number
      return acc + (price * item.quantity);
    }, 0);
    const calculatedTaxes = subtotal * 0.1; // Assuming a 10% tax rate
    setTaxes(Math.round(calculatedTaxes * 100) / 100); // Round off to 2 decimal places
    setFinalAmount(subtotal + calculatedTaxes);
    setTotalAmount(Math.round(subtotal * 100) / 100); // Round off to 2 decimal places
  };

  const handleConfirmOrder = () => {
    fetch('http://localhost:5000/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cartItems,
        totalAmount,
        taxes,
        finalAmount
      }),
    })
    .then(response => response.json())
    .then(() => {
      alert("Order placed successfully , stay connected");
      navigate('/home'); // Redirect to home or another page after confirmation
    })
    .catch(error => {
      console.error('Error:', error);
      toast.error("Failed to place the order");
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Order Preview</h2>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px' }} />
                </td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>${Number(item.price).toFixed(2)}</td> {/* Ensure price is a number */}
                <td>${(Number(item.price) * item.quantity).toFixed(2)}</td> {/* Ensure price is a number */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
        <h4>Taxes (10%): ${taxes.toFixed(2)}</h4>
        <h4>Final Amount: ${finalAmount.toFixed(2)}</h4>
        <button className="btn btn-primary mt-3" onClick={handleConfirmOrder}>Confirm Order</button>
      </div>
      <ToastContainer /> 
    </div>
  );
};

export default OrderPreview;
