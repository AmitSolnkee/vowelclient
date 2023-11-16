import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./nav.css";
const Nav = () => {
  const navigate = useNavigate();
  const [cartItem, setCartItems] = useState([]);
  const [apiCalled, setApiCalled] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && !apiCalled) {
      axios
        .get("http://localhost:5001/getcart", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setCartItems(res.data);
          setApiCalled(true);
        });
    }
  }, [apiCalled]);
  return (
    <div className="nav-container ">
      <div className="nav-top p-2 text-center bg-dark text-white">
        <span>Free shipping on order above 500</span>
      </div>
      <div className="nav-bar p-3">
        <div className="row align-items-center justify-content-between">
          <div className="col-3 col-md-3 fs-5 fs-lg-3" onClick={()=>navigate('/')}>Ecom</div>
          <div className="col-7 col-md-6 px-0 py-2 search-inp-container d-flex ">
            <input className="p-2" type="text" placeholder="Search ..." />
            <div className="p-2">
              <i className="fa fa-search fa-lg" aria-hidden="true"></i>
            </div>
          </div>
          <div className=" col-3 col-md-3 gap-4 nav-rest d-none d-md-flex align-items-center justify-content-center">
            <div
              className="fs-5 fs-lg-3 account"
              onClick={() => navigate("/login")}
            >
              Account
            </div>
            <div className="ms-lg-5 mr-2 position-relative">
              <i className="fa-solid fa-lg fa-cart-shopping" onClick={()=>navigate('/cart')} ></i>
              <div
                className="cart-item"
                style={
                  cartItem.length > 0
                    ? { display: "inline" }
                    : { display: "none" }
                }
              >
                {cartItem.length ? cartItem.length : <></>}
              </div>
            </div>
            <div>
              <i className="fa-solid fa-lg fa-user"></i>
            </div>
          </div>
          <div className="hamburger-menu col-2 d-md-none ">
            <div className="">
              <i className="fa-solid fa-bars fa-2x fa-beat"></i>
            </div>

            <div className="dropdown-menu text-center">
              <div className="dropdown-item">Account</div>
              <div className="dropdown-item">Cart</div>
            </div>
          </div>
        </div>
      </div>

      {/* Jumbortron */}

      <div className="jumbotron-container text-center  text-white position-relative">
        <div className="jumbotron-wrap mb-5">
          <h1>Welcome to Ecommerce</h1>
          {/* <h3>India's Largest Book selling platform</h3> */}
          <h5>Your One-Stop Destination for the Best Products!</h5>
          <h5>
            Discover a world of knowledge and adventure with our extensive
            collection of Products.
          </h5>
          <h5>Explore, Learn, and Immerse Yourself in the Stories.</h5>
          <a href="/shop" className="btn btn-primary btn-lg">
            Browse Products
          </a>
        </div>
      </div>
    </div>
  );
};

export default Nav;
