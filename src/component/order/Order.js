import React, { useEffect, useState } from "react";
import "./Order.css";
import axios from "axios";

const Order = () => {
  const [orders, setorders] = useState([]);

  const [apiCalled, setApiCalled] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && !apiCalled) {
      axios
        .get("http://localhost:5001/getorder", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setorders(res.data.orders || []);
          setApiCalled(true);
        });
    }
  }, [apiCalled]);

  return (
    <div className="container order-table-container">
      <h3 className="mt-4">Order History</h3>
      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Shipping Address</th>
            <th>Total Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.order_id}>
              <td>{order.order_id}</td>
              <td>{order.shippingadress}</td>
              <td>{order.totalAmount}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
