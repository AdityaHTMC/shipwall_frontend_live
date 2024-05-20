import React, { useState } from "react";
import { useApi } from "../contextApi/ApiContexts/ApiContexts";
import { MdDownload } from "react-icons/md";
const OrderTracking = () => {
  const { trackOrder, orderDetails } = useApi();
  const [orderId, setOrderId] = useState("");
  const { orderList, fetchsales, handelDownload, getOrder } = useApi();

  const handlefetchSale = async (soObjType, sotype) => {
    await fetchsales(soObjType, sotype);
  };

  const handleInputChange = (event) => {
    setOrderId(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Check if orderId is not empty before calling trackOrder
    if (orderId.trim() !== "") {
      trackOrder(orderId);
    }
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
              {orderDetails.map((item, index) => (
                <tr key={index}>
                  <td style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>
                    {item.itemName}
                  </td>
                  <td style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>
                  {item?.invDocEntry !== 0 && (
                                  <button onClick={()=>handlefetchSale(item.invDocEntry,item.invObjType)}>
                                    Invoice : <MdDownload />
                                  </button>
                                )}
                  </td>
                  <td style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>
                    {item.ordrstatus ? item.ordrstatus : "Status Not updated"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
