import React, { useEffect, useState } from "react";
import "./Admin.css";
import axios from "axios";

const Admin = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [stockQty, setStockQty] = useState("");
  const [imgUrl, setImgUrl] = useState("shop-1.jpg");
  const [price, setPrice] = useState(0);
  const [mFlag, setMflag] = useState(true);
  const [orders, setorders] = useState([]);
  const [apiCalled, setApiCalled] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      productName,
      description,
      price,
      stockQty,
      imgUrl,
    };
    const token = localStorage.getItem("token");
    axios.post("http://localhost:5001/postproduct", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    setProductName("");
    setDescription("");
    setStockQty("");
    setPrice(0);
    setImgUrl("shop-1.jpg");
    alert("Product added");
  };

  const approveOrder = (orderId) => {
    const token = localStorage.getItem("token");
    axios
      .post(
        "http://localhost:5001/approveorder",
        { orderId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        getOrder();
        alert("Order approved");
      });
  };

  function getOrder() {
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
          setorders(res.data);
          setApiCalled(true);
        });
    }
  }

  useEffect(() => {
    getOrder();
  }, [apiCalled]);

  return (
    <div className="container-fluid d-flex mt-3 p-3">
      <div className="col-lg-3 p-2 pt-0 ">
        <div className="border py-3 mb-2" onClick={() => setMflag(true)}>
          <h6>Add products</h6>
        </div>
        <div className="border py-3 mb-2" onClick={() => setMflag(false)}>
          <h6>Approve order</h6>
        </div>
      </div>
      {/* second column */}
      <div className=" col-lg-9 text-start product-form p-2">
        {mFlag ? (
          <>
            {" "}
            <label>
              Product Name:
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </label>
            <label>
              Description:
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </label>
            <label>
              Price:
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </label>
            <label>
              Stock Quantity:
              <input
                type="number"
                value={stockQty}
                onChange={(e) => setStockQty(e.target.value)}
                required
              />
            </label>
            <label>
              Image:
              <select
                value={imgUrl}
                className="me-2"
                onChange={(e) => setImgUrl(e.target.value)}
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={`shop-${num}.jpg`}>
                    shop-{num}.jpg
                  </option>
                ))}
              </select>
            </label>
            <button onClick={handleSubmit}>Submit</button>
          </>
        ) : (
          <>
            <table className="order-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Shipping Address</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                  <th>Approve Order</th>
                </tr>
              </thead>
              <tbody>
                {orders.orders.map((order) => (
                  <tr key={order.order_id}>
                    <td>{order.order_id}</td>
                    <td>{order.shippingadress}</td>
                    <td>{order.totalAmount}</td>
                    <td>{order.status}</td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={() => approveOrder(order.order_id)}
                      >
                        Approve
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default Admin;
