import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../contextApi/AppContext";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import PaymentModal from "./../components/common/modal/PaymentModal";
import { toast } from "react-toastify";
import axios from "axios";
import Table from "react-bootstrap/Table";

import "react-toastify/dist/ReactToastify.css";

const base_url2 = "https://shipwall.au/WCF_API_HTTPS"; //SAP Base URL
const baseURL2 = "https://shipwall.au/API/shipwall"; // Node Api Base URL

const CheckOut = () => {
  const [freeCreditLimit, setFreeCreditLimit] = useState("");
  const [cashOnDelivery, setCashOnDelivery] = useState("");
  const [onlinePayment, setOnlinePayment] = useState("");

  const handleFreeCreditLimitChange = (event) => {
    setFreeCreditLimit(event.target.value);
  };
  console.log(freeCreditLimit, "fcc");

  const handleCashOnDeliveryChange = (event) => {
    setCashOnDelivery(event.target.value);
  };

  const handleOnlinePaymentChange = (event) => {
    setOnlinePayment(event.target.value);
  };

  const handleClose = () => setShow(false);

  const price = cartItem.Price || 0; // assuming a default value of 0
  const quantity = cartItem.quantity || 0; // assuming a default value of 0
  const discount = cartItem.Discount || 0; // assuming a default value of 0

  const total = price * quantity - discount;

  const subtotal = isNaN(total) || total < 0 ? 0 : total;

  const totalam = cartItem.reduce(
    (acc, item) => acc + item.price * item.quantity - (item.Discount || 0),
    0
  );

  const [Adddata, setAddData] = useState();
  const [loading, setloading] = useState(false);
  const [shippingDDdata, setShippingDDdata] = useState();
  const [billingDDdata, setBillingDDdata] = useState();
  const [show, setShow] = useState(false);

  const getDP = async () => {
    try {
      setloading(true);
      const cardCode = localStorage.getItem("username");
      const access = localStorage.getItem("accessC");
      const response = await axios.get(
        `${base_url2}/api/Masters/GetBP/${cardCode || "%20"}/C/%20/%20`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
        }
      );

      const { data } = response;

      setAddData(data[0]);
    } catch (error) {
      // toast.error('Server Down');
    } finally {
      setloading(false);
    }
  };

  const freecredit = (
    Adddata?.creditlimit -
    Adddata?.balance -
    Adddata?.soOpenAmount
  ).toFixed(2);

  console.log(freecredit, "fc");

 

  const handlePayment = () => {
    console.log("Payment done");
    // Add your payment logic here
  };

  const handleContinue = () => {
    // Calculate the sum of the values of the three input fields
    const inputValueSum = parseFloat(freeCreditLimit || 0) +
                          parseFloat(cashOnDelivery || 0) +
                          parseFloat(onlinePayment || 0);

    // Compare the sum with the totalam value
    if (inputValueSum === totalam) {
      // If they are equal, proceed with the payment
      handlePayment();
    } else {
      // If not, show an error or handle it as needed
      console.log("Error: Sum of input values does not match totalam");
      // You can also show a toast or any other notification
      toast.error("Sum of input values does not match totalam");
    }
  };

  



  return (
    <>
      <section className="bg-light py-2">
        <div className="container mt-4 mt-md-0 mt-lg-0">
          <div className="row">
            <div className="col-xl-8 col-lg-8 mb-4">
              {/* Checkout */}
              <div className="card shadow-0 border">
                <div className="p-4">
                  <h5 className="card-title mb-3 text text-bg-primary p-2 text-center mt-3">
                    Checkout
                  </h5>

                  <h5 className="card-title mb-3 text text-bg-info p-2">
                    Payment Method
                  </h5>
                  <div className="row mb-3">
                    <Table striped bordered hover size="sm">
                      <tbody>
                        <tr>
                          <td>Free Credit Limit ({freecredit}) </td>
                          <td>
                            <input
                              type="text"
                              value={freeCreditLimit}
                              onChange={(e) => handleFreeCreditLimitChange(e)}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Cash On Delivery</td>
                          <td>
                            <input
                              type="text"
                              value={cashOnDelivery}
                              onChange={handleCashOnDeliveryChange}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Online Payment</td>
                          <td>
                            <input
                              type="text"
                              value={onlinePayment}
                              onChange={handleOnlinePaymentChange}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
              {/* Checkout */}
            </div>
            <div className="col-xl-4 col-lg-4 col-12 bg-white">
              <div className="p-2">
                <h6 className="my-3 text text-bg-info text-center p-2">
                  Summary
                </h6>
                <div className="d-flex justify-content-between">
                  <p className="mb-2">Total Price:</p>
                  <p className="mb-2">{totalam}</p>
                </div>

                <hr />
                <div className="d-flex justify-content-between">
                  <p className="mb-2">Sub Total Price:</p>
                  <p className="mb-2 fw-bold">
                    <i className="fa-solid fa-dollar-sign"></i>
                    {totalam}
                  </p>
                </div>
                <div className="d-flex justify-content-between flex-end">
                  <button
                    className="btn btn-success shadow-0 border "
                    onClick={handlePayment}
                  >
                    Continue
                  </button>
                </div>
                <PaymentModal
                  amount={totalam}
                  onHide={handleClose}
                  show={show}
                  mode={selectedPaymentMethod}
                  selectedPaymentMethod={selectedPaymentMethod}
                  selectedShippingMethod={selectedShippingMethod}
                  selectedAddress={selectedAddress}
                  cartItem={cartItem}
                />
                <hr />
                <h6 className="text-dark my-4">Items in cart</h6>

                {cartItem.map((item, index) => (
                  <div
                    key={item.itemCode}
                    className="d-flex align-items-center mb-4"
                  >
                    <div className="me-3 position-relative">
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill badge-secondary">
                        1
                      </span>
                      <Link to={`/product-details/${item.itemCode}`}>
                        <img
                          src={item.image1}
                          style={{ height: 96, width: 96 }}
                          className="img-sm rounded border"
                        />
                      </Link>
                    </div>
                    <div className="">
                      <Link
                        to={`/product-details/${item.itemCode}`}
                        className="nav-link"
                      >
                        {item.itemName.slice(0, 15)}
                      </Link>
                      <p>Quantity : {item.quantity}</p>
                      <div className="price text-muted">
                        Total: {item.price * item.quantity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckOut;
