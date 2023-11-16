import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Address.css";
import axios from "axios";
const Address = () => {
  const [address, setAddress] = useState("");
  const [allAdd, setAllAdd] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [changeAddress, setchangeAddress] = useState({});
  const [isUpdating, setisUpdating] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const navigate = useNavigate();

  const addressHandler = (e) => {
    const { value } = e.target;
    setAddress(value);
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const token = localStorage.getItem("token");

      axios
        .post(
          "http://localhost:5001/addaddress",
          { address },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          let data = res.data;
          setAddress("");
        });
    },
    [address]
  );

  const updateAddHandler = (updateAddress) => {
    setisUpdating(true);
    setchangeAddress({ ...updateAddress });
    setAddress(updateAddress.address);
  };

  const handleUpdateAddress = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    axios
      .post(
        "http://localhost:5001/updateaddress",
        { addId: changeAddress.id, address: address },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setisUpdating(false);
        setIsloading(false);
        setAddress("");
        fetchData();
      })
      .catch((error) => {
        console.error("Error updating address:", error);
        setisUpdating(false);
        setIsloading(false);
      });
  };

  const deleteHandler = (deleteAddress) => {
    const { id: deleteId } = deleteAddress;
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:5001/deleteaddress`, {
        data: { deleteId },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        alert(res.data.message);
      })
      .catch((error) => {
        console.error("Error deleting address:", error);
      });
  };

  function fetchData() {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5001/getaddress", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const responseData = JSON.parse(res.data.userAddress) || [];

        setAllAdd(responseData);
      });
  }

  function getCart() {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5001/getcart", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => setCartItems(res.data));
  }

  useEffect(() => {
    fetchData();
    getCart();
  }, [handleSubmit]);

  // const addOrder =async () => {
  //   const token = localStorage.getItem("token");
  //   const addAmount = cartItems.reduce((acc, el) => el.qty * el.price + acc, 0);

  //   const payload = {
  //     totalAmount: addAmount.toFixed(2),
  //     shippingadress: selectedAddress,
  //     status: "pending",
  //     totalItem: cartItems.length,
  //   };

  //   axios
  //     .post("http://localhost:5001/postorder", payload, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     .then((postOrderResponse) => {
  //       alert(postOrderResponse.data.message);

  //       const deleteToken = localStorage.getItem("token");
  //       console.log('token',deleteToken)
  //       return axios.delete("http://localhost:5001/deleteCart", null, {
  //         headers: {
  //           Authorization: `Bearer ${deleteToken}`,
  //           "Content-Type": "application/json",
  //         },
  //       });
  //     })
  //     .then((deleteCartResponse) => {})
  //     .catch((error) => {
  //       console.error("Error processing order:", error);
  //     });
  // };

  const addOrder = async () => {
    const token = localStorage.getItem("token");
    const addAmount = cartItems.reduce((acc, el) => el.qty * el.price + acc, 0);
    if (!selectedAddress) {
      alert("Kindly select Address");
      return;
    }
    const payload = {
      totalAmount: addAmount.toFixed(2),
      shippingadress: selectedAddress,
      status: "pending",
      totalItem: cartItems.length,
    };

    try {
      const postOrderResponse = await axios.post(
        "http://localhost:5001/postorder",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert(postOrderResponse.data.message);
      const deleteToken = localStorage.getItem("token");

      // Make the delete cart request
      const deleteCartResponse = await axios.delete(
        "http://localhost:5001/deleteCart",
        {
          headers: {
            Authorization: `Bearer ${deleteToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/order");
    } catch (error) {
      console.error("Error processing order:", error);
    }
  };

  return (
    <>
      <div className="mt-4 address-form container text-start">
        <h2>Add Address</h2>
        <form>
          <label for="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Enter your address"
            value={address}
            required
            onChange={addressHandler}
          />
          {isUpdating ? (
            <button type="submit" onClick={handleUpdateAddress}>
              Update Address
            </button>
          ) : (
            <button type="submit" onClick={handleSubmit}>
              Add Address
            </button>
          )}
        </form>
      </div>
      <div className="container address-todo  py-5 text-start  px-5">
        {allAdd.map((item, idx) => {
          return (
            <div
              style={{ cursor: "pointer" }}
              key={idx}
              onClick={() => setSelectedAddress(item.address)}
              className={`address-container ${
                selectedAddress === item.address ? "selected-address" : ""
              }`}
            >
              <div className="fw-bold fs-5">{item.address}</div>
              <div className="font-awsome-div mt-4">
                <i
                  className=" fa fa-edit"
                  onClick={() => updateAddHandler(item)}
                />
                <i
                  className="fa fa-trash"
                  onClick={() => deleteHandler(item)}
                />
              </div>
            </div>
          );
        })}
        <div>
          <button className="btn btn-primary px-4 py-2 mt-4" onClick={addOrder}>
            {" "}
            Confirm Order
          </button>
        </div>
      </div>
    </>
  );
};

export default Address;
