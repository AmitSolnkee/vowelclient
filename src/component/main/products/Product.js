import React, { useEffect, useState } from "react";
import "./Product.css";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    axios
      .get("http://localhost:5001/getproducts")
      .then((res) => setProductData(res.data));
  }, []);

  const viewProduct = (product) => {
    navigate("/product", { state: product });
  };

  const addToCart = async (productData) => {
    if (!isAuthenticated) {
      navigate("/login");
      alert("you need to login first");
      return;
    }
    if (isLoading) {
      return;
    }

    setisLoading(true);
    const token = localStorage.getItem('token');
    const response = await axios.post(
      "http://localhost:5001/addtocart",
      {
        product_id: productData?.product_id,
        productName: productData?.productName,
        qty: productData?.totalQty,
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
  };

  return (
    <div className="d-flex flex-wrap justify-content-center">
      {productData.map((product) => {
        return (
          <div
            key={product.product_id}
            className="mx-lg-4 mx-0 p-3 col-sm-6 col-lg-3   product-card"
          >
            <div
              className="product-img-container"
              onClick={() => viewProduct(product)}
            >
              <img
                src={require("../../../assets/images/" + product.img)}
                width={"100%"}
              />
            </div>
            <div className="mt-2 text-center">
              <h6 className="mb-1">
                <a href="#">{product.productName}</a>
              </h6>
              <p className="mb-1">₹ {product.price}</p>
            </div>
            <div className="product-rating text-center mt-0">
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star" />
            </div>

            <div
              className="addtoCart-container py-2 px-3 mt-3"
              onClick={() => addToCart(product)}
            >
              <i className="me-4 fa fa-shopping-cart" />
              <p className="mb-0"> Add to cart</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Product;
