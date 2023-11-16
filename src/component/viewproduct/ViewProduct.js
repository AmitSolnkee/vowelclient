import React from "react";
import "./ViewProduct.css";
import { useLocation } from "react-router-dom";

const ViewProduct = () => {
  const location = useLocation();
  const product = location.state;
  return (
    <div className="container mt-5 text-start">
      <div className="row d-flex justify-content-center">
        <div className="col-md-4 p-5 pt-0">
          <img
            className="img-fluid mx-auto d-block "
            width={"100%"}
            alt="product-img"
            src={require("../../assets/images/" + product.img)}
            style={{ border: "2px solid grey" }}
          />
        </div>
        <div
          className="col-md-8 ps-4 mb-2"
          style={{ borderLeft: "1px solid grey" }}
        >
          <h3>{product?.productName}</h3>

          <div className=" mb-2 d-flex align-items-center">
            <div className="px-2 py-1 me-2 bg-success text-white rounded-3">
              <span className="fw-bold me-2">4.2</span>
              <i className="fa fa-star fa-lg"></i>
            </div>
            <div>
              <h6 className="mb-0 text-secondary">
                6199 Ratings and 519 reviews
              </h6>
            </div>
          </div>

          <div className="mb-2">
            <h4>Special Price</h4>
            <hr />
            <h5>₹ {product?.price}</h5>
          </div>

          <div className="discount-offers mb-3">
            <h4>Available offers</h4>
            <hr />
            <h6>
              <i className="fa-solid fa-tag fa-xl text-success me-3 align-middle"></i>
              Special PriceGet extra 17% off (price inclusive of
              cashback/coupon)
            </h6>
            <h6>
              <i className="fa-solid fa-tag fa-xl text-success me-3 align-middle"></i>
              Bank Offer10% off on Kotak Bank Credit Card, up to ₹1250 on orders
              of ₹5,000 and above
            </h6>
            <h6>
              <i className="fa-solid fa-tag fa-xl text-success me-3 align-middle"></i>
              Bank Offer10% off on RBL Bank Credit Card, up to ₹1250 on orders
              of ₹5,000 and above
            </h6>
            <h6>
              <i className="fa-solid fa-tag fa-xl text-success me-3 align-middle"></i>
              Bank Offer10% off on SBI Credit Card, up to ₹1250 on orders of
              ₹5,000 and aboveT&C
            </h6>
          </div>

          <div className="mb-2">
            <h4>Preview</h4>
            <hr />
            <h6>
              <a href={"preview not available"}>
                Preview Not available for this product
              </a>
            </h6>
          </div>

          <div className="mb-2">
            <h4>Description</h4>
            <hr />
            <div className="row">
              <div className="col-md-2">
                <img
                  className="img-thumbnail"
                  alt="img"
                  src={require("../../assets/images/" + product.img)}
                />
              </div>
              <div className="col-md-10" style={{ textAlign: "justify" }}>
                Discover unparalleled comfort and style with our latest
                collection of premium cotton essentials. Crafted for everyday
                luxury, our clothes blend quality fabrics with timeless designs,
                ensuring a perfect fit for any occasion. Embrace versatility
                with effortlessly chic pieces that effortlessly transition from
                day to night. Elevate your wardrobe with our commitment to
                sustainable fashion, where every garment tells a story of
                craftsmanship and conscious choices. Redefine your style with
                comfort, sustainability, and fashion-forward elegance in every
                stitch.Experience the perfect harmony of fashion and
                sustainability. Elevate your look with our eco-friendly,
                trend-setting pieces that make a statement without compromising
                on comfort.
              </div>
            </div>
            <p></p>
          </div>

          <div className="mb-2">
            <table class="table">
              <thead>
                <tr style={{ borderBottom: "1px solid grey" }}>
                  <th>
                    <h4>Specifications</h4>
                  </th>
                  <hr />
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Fit</td>
                  <td>Slim fit</td>
                </tr>
                <tr>
                  <td>Ocassion</td>
                  <td>Formal</td>
                </tr>
                <tr>
                  <td>Color</td>
                  <td>10 Colors available</td>
                </tr>
                <tr>
                  <td>Pack of</td>
                  <td>1</td>
                </tr>
                <tr>
                  <td>Type</td>
                  <td>Formal</td>
                </tr>
                <tr>
                  <td>Fabric</td>
                  <td>Pure Cotton</td>
                </tr>
                <tr>
                  <td>Net Qty</td>
                  <td>1</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
