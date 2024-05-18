import React, { useState } from "react";
import { useApi } from "../contextApi/ApiContexts/ApiContexts";

const OrderTracking = () => {
  const { trackOrder, orderDetails } = useApi();
  const [orderId, setOrderId] = useState("");

  const handleInputChange = (event) => {
    setOrderId(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    trackOrder(orderId);
  };

  console.log("first", orderDetails);

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }} className='pt-5 pb-5'>
      <form onSubmit={handleFormSubmit}>
        <label
          htmlFor="orderIdInput"
          style={{ display: "block", marginBottom: "10px" }}
        >
          Enter Order ID:
        </label>
        <input
          type="text"
          id="orderIdInput"
          value={orderId}
          onChange={handleInputChange}
          style={{ width: "100%", padding: "10px", fontSize: "16px" }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "10px 20px",
            fontSize: "16px",
            marginTop: "10px",
            cursor: "pointer",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Track Order
        </button>
      </form>

      {orderDetails && (
        <div style={{ marginTop: "20px" }}>
          <h2>Order Details</h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>
                  Item Name
                </th>
                <th style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>
                  Invoice
                </th>
                <th style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>
                  {orderDetails[0]?.itemName}
                </td>
                <td style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>
                  {orderDetails[0]?.invoice}
                </td>
                <td style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>
                  {orderDetails && orderDetails[0] && orderDetails[0].ordrstatus
                    ? orderDetails[0].ordrstatus
                    : "Status Not updated"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
