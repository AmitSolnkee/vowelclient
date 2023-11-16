import React, { useEffect, useState } from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const addQty = async (productData)=>{
    if (isLoading) {
      return;
    }

    setisLoading(true);
    const token = localStorage.getItem('token');
    const response = await axios.post(
      "http://localhost:5001/addtocart",
      {
        product_id: productData?.product_id,
        price: productData?.price,
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    setisLoading(false);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5001/getcart", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => setCartItems(res.data));
  }, [isLoading]);

  return (
    <div className="cart-container container text-start">
      <table className="table container mt-5 mb-5">
        <thead>
          <tr>
            <th colSpan={2} className="text-center align-middle">
              Image
            </th>
            <th colSpan={4} className="text-center align-middle">
              Description
            </th>
            <th colSpan={2} className="text-center align-middle">
              Qty
            </th>
            <th colSpan={2} className="text-center align-middle">
              Total
            </th>
            <th colSpan={2} className="text-center align-middle">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="p-5 mt-4 border">
          {cartItems.map((item, index) => (
            <tr key={index} className="mt-5 border">
              <td colSpan={2} className="align-middle">
                <img
                  src={require(`../../assets/images/${item.img}`)}
                  alt={item.productName}
                  className="cart-item-image"
                />
              </td>
              <td colSpan={4} className="text-center align-middle">
                <div>
                  <h4>{item.productName}</h4>
                  <p>{item.authors}</p>
                </div>
              </td>
              <td colSpan={2} className="text-center align-middle">
                {item.qty}
              </td>
              <td colSpan={2} className="text-center align-middle">
                ₹ {(item.price * item.qty).toFixed(2)}
              </td>
              <td
                colSpan={2}
                className="text-center align-middle d-flex justify-content-center"
              >
                <div className="d-flex me-5">
                  <i className="me-3 fas fa-plus" onClick={()=>addQty(item)}></i>
                  <i className="fas fa-minus"></i>
                </div>
                <i className="fas fa-trash"></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="summary-container container  text-start border p-4 mt-5">
        {cartItems.length > 0 && (
          <>
            <h2 className="text-center mb-4">Order Summary</h2>
            <div className="text-start">
              <p>
                Thank you for shopping with us! Your order is ready for
                processing.
              </p>
              <p className="fw-bold">
                Total amount: ₹
                {cartItems
                  .reduce((acc, item) => {
                    if (item?.price) {
                      return acc + item.price * item.qty;
                    }
                    return acc;
                  }, 0)
                  .toFixed(2)}
              </p>
              <p>
                Please review your order details and click the "Place Order"
                button to confirm your purchase.
              </p>
            </div>
            <button
              className="btn btn-success mt-3 w-50"
              onClick={() => {
                navigate("/address");
              }}
            >
              Place Order
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
