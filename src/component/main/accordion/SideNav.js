import React, { useState } from "react";
import "./SideNav.css";
import { useDispatch, useSelector } from "react-redux";

const SideNav = () => {
  const categories = ["Men", "Women", "Kids"];
  const priceRange = [
    { id: 1, min: 100, max: 240 },
    { id: 2, min: 240, max: 380 },
    { id: 3, min: 380, max: 800 },
    { id: 4, min: 800, max: 1900 },
    { id: 15, min: 1900, max: 4800 },
  ];

  return (
    <div className="side-nav-container">
      <div className="accordion accordion-flush" id="accordionFlushExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              Categories
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              <ul>
                {categories.map((category, id) => {
                  return <li key={id}>{category}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseTwo"
              aria-expanded="false"
              aria-controls="flush-collapseTwo"
            >
              Price
            </button>
          </h2>
          <div
            id="flush-collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              <div className="filter-checkbox-wrapper">
                {priceRange.map((item, id) => {
                  return (
                    <label key={id} className="checkbox-container mb-3 d-block">
                      <input type="checkbox" />
                      <span className="checkbox-text ms-4">{`₹${item.min} - ₹${item.max}`}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseThree"
              aria-expanded="false"
              aria-controls="flush-collapseThree"
            >
              Dummy
            </button>
          </h2>
          <div
            id="flush-collapseThree"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              Placeholder content for this accordion, which is intended to
              demonstrate the className. This is the third item's accordion
              body. Nothing more exciting happening here in terms of content,
              but just filling up the space to make it look, at least at first
              glance, a bit more representative of how this would look in a
              real-world application.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
