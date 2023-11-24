import React from "react";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

const PayPalButton = ({ amount, onSuccess }) => {
  const navigate = useNavigate();
  const createOrder = async (data, actions) => {
    try {
      return axios
        .post("http://localhost:5001/create-order", { amount })
        .then((response) => response.data.orderId);
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  };

  const onApprove = async (data, actions) => {
    try {
      return axios
        .post("http://localhost:5001/capture-order", { orderID: data.orderID })
        .then((response) => {
          onSuccess();
          console.log("payment", response.data);
          if (response.data.status === 'COMPLETED') {
            navigate("/address");
          }
        });
    } catch (error) {
      console.error("Error capturing order:", error);
      throw error;
    }
  };

  return (
    <PayPalScriptProvider
      options={{
        clientId: "sb",
        intent: "capture",
      }}
    >
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;

//AeL6XnXTewvhfzCkjOgDw6ONCsg9Y3TsHJgAxgajjfRjDJ0THoTJ23CDR-qjj3ryuy6_GgQPHK2kjPtE

//sb-dov7c28353539@personal.example.com

//ltV.10wt
