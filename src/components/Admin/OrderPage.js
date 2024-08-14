// src/OrdersPage.js

import React, { useEffect, useState } from 'react';
import './order.css';
const OrdersPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/orders')
            .then(response => response.json())
            .then(data => setOrders(data))
            .catch(error => console.error('Error fetching orders:', error));
    }, []);

    return (
        <div className="container mt-5">
            <h2>Orders List</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Items</th>
                        <th>Total Amount</th>
                        <th>Taxes</th>
                        <th>Final Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <React.Fragment key={order.id}>
                            <tr>
                                <td rowSpan={order.cartItems.length + 1}>{order.id}</td>
                                <td>
                                    <div>
                                        {order.cartItems.length > 0 ? (
                                            <>
                                                <img src={order.cartItems[0].image} alt={order.cartItems[0].name} width="50" />
                                                <div>{order.cartItems[0].name}</div>
                                                <div>Price: ${order.cartItems[0].price}</div>
                                                <div>Quantity: {order.cartItems[0].quantity}</div>
                                            </>
                                        ) : (
                                            'No items'
                                        )}
                                    </div>
                                </td>
                                <td rowSpan={order.cartItems.length + 1}>${order.totalAmount.toFixed(2)}</td>
                                <td rowSpan={order.cartItems.length + 1}>${order.taxes.toFixed(2)}</td>
                                <td rowSpan={order.cartItems.length + 1}>${order.finalAmount.toFixed(2)}</td>
                            </tr>
                            {order.cartItems.slice(1).map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <div>
                                            <img src={item.image} alt={item.name} width="50" />
                                            <div>{item.name}</div>
                                            <div>Price: ${item.price}</div>
                                            <div>Quantity: {item.quantity}</div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersPage;
