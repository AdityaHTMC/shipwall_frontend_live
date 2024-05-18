import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../contextApi/AppContext";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import PaymentModal from "./../components/common/modal/PaymentModal";
import { toast } from 'react-toastify';
import { useApi } from "../contextApi/ApiContexts/ApiContexts";

const CheckOut = () => {
 const { cardCode , access } = useApi()
  const [copyBillingAddress, setCopyBillingAddress] = useState(false);
  const {
    cartItem,
    products,
    user,
    addShippingAddress,
    ShipingMethodPrice,
    shippingPrice,
    getBP, singleBPdata
  } = useAppContext();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [shippingAddress, setShippingAddress] = useState("");
  const [product, setProduct] = useState([]);
  const { fname, lname, email, mobile, Billing_address, shipng_address } = user;
  // const [ufname, setUfname] = useState(fname);
  // const [ulname, setUlanme] = useState(lname);
  // const [uemail, setUemail] = useState(email);
  // const [umobile, setUmobile] = useState(mobile);
  const [show, setShow] = useState(false);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("Card");
  const [selectedShippingMethod, setSelectedShippingMethod] = useState("Express-Delivery");

  const  handelShippingMethod = () =>{
    ShipingMethodPrice(selectedShippingMethod)
  }


  const handleClose = () => setShow(false);
  const handleShow = () =>{
    // if(selectedAddress === null){
    //   toast.info("plz Select Address first")
    // }else{
       setShow(true);
    // }
  } 

  const {
    CardName,
    GroupCode,
    Cellular,
    E_Mail,
    CardCode,
    GroupName,
    Addresses,
  } = singleBPdata[0] || {};

  const addresses = Addresses || {};

  const {
    Address,
    Address2,
    Address3,
    AdresType,
    Block,
    Building,
    City,
    CountryCode,
    County,
    StateCode,
    StateName,
    Street,
    StreetNo,
    ZipCode,
  } = addresses[0] || {};

  const price = cartItem.Price || 0; // assuming a default value of 0
  const quantity = cartItem.quantity || 0; // assuming a default value of 0
  const discount = cartItem.Discount || 0; // assuming a default value of 0
  
  const total = price * quantity - discount;

  const subtotal = isNaN(total) || total < 0 ? 0 : total;

  const totalam = cartItem.reduce((acc, item) => acc + item.price * item.quantity - (item.Discount || 0), 0);

  

  const handleCopyBillingAddress = () => {
    setCopyBillingAddress(!copyBillingAddress);
    if (!copyBillingAddress) {
      setShippingAddress(Billing_address ? Billing_address[0].location : "");
    } else {
      setShippingAddress("");
    }
  };

  const handleRadioChange = (event) => {
    setSelectedAddress(event.target.value);
  };

  const handleTextInputChange = (event) => {
    setShippingAddress(event.target.value);
  };

  const handleEditClick = async () => {
    await addShippingAddress(shippingAddress);
    await setShippingAddress("");
  };

  useEffect(() => {
    const fetch = async () => {
      getBP(cardCode);
    };
    fetch();
  }, []);

  return (
    <>
      <section className="bg-light py-2">
        <div className="container mt-4 mt-md-0 mt-lg-0">
          <div className="row">
            <div className="col-xl-8 col-lg-8 mb-4">
              {/* Checkout */}
              <div className="card shadow-0 border">
                <div className="p-4">
                  <h5 className="card-title mb-3 text text-bg-info p-2 text-center mt-3">
                    Checkout
                  </h5>
                  {/* <div className="row">
                    <div className="col-6 mb-3">
                      <p className="mb-0">First name</p>
                      <div className="form-outline">
                        <input
                          type="text"
                          id="typeText"
                          className="form-control"
                          value={ufname}
                          onChange={(e) => setUfname(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-6 mb-3">
                      <p className="mb-0">Last name</p>
                      <div className="form-outline">
                        <input
                          type="text"
                          id="typeText"
                          className="form-control"
                          value={ulname}
                          onChange={(e) => setUlanme(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-6 mb-3">
                      <p className="mb-0">Phone</p>
                      <div className="form-outline">
                        <input
                          type="tel"
                          id="typePhone"
                          placeholder="+916378738721"
                          className="form-control"
                          value={umobile}
                          onChange={(e) => setUmobile(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-6 mb-3">
                      <p className="mb-0">Email</p>
                      <div className="form-outline">
                        <input
                          type="email"
                          id="typeEmail"
                          placeholder="example@gmail.com"
                          className="form-control"
                          value={uemail}
                          onChange={(e) => setUemail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12 mb-3">
                      <p className="mb-0">Billing Address</p>
                      <div className="form-outline">
                        <input
                          type="text"
                          className="form-control"
                          value={
                            Billing_address ? Billing_address[0].location : ""
                          }
                          disabled
                        />
                      </div>
                    </div>
                  </div> */}
                  {/* <hr className="my-4" /> */}
                  {/* <h5 className="card-title mb-3 text text-bg-info p-2">
                    Shipping Method
                  </h5> */}
                  <div className="row mb-3">
                    <div className="col-6 mb-3">
                      {/* Default checked radio */}
                      <div className="form-check h-100 border rounded-3">
                        <div className="p-3">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                            value={"Express-Delivery"}
                            checked={selectedShippingMethod === "Express-Delivery"}
                            onChange={(e) =>
                              setSelectedShippingMethod(e.target.value)
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault1"
                          >
                            Express delivery <br />
                            <small className="text-muted">
                              3-4 days via Fedex{" "}
                            </small>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-6 mb-3">
                      {/* Default radio */}
                      <div className="form-check h-100 border rounded-3">
                        <div className="p-3">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault2"
                            value={"Post-Office"}
                            checked={selectedShippingMethod === "Post-Office"}
                            onChange={(e) =>
                              setSelectedShippingMethod(e.target.value)
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault2"
                          >
                            Post office <br />
                            <small className="text-muted">
                              20-30 days via post{" "}
                            </small>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr className="my-4" />
                  <h5 className="card-title mb-3 text text-bg-info p-2">
                    Payment Method
                  </h5>
                  <div className="row mb-3">
                    <div className="col-6 mb-3">
                      <div className="form-check h-100 border rounded-3">
                        <div className="p-3">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault1"
                            id="flexRadioDefault3"
                            value="Card"
                            checked={selectedPaymentMethod === "Card"}
                            onChange={(e) =>
                              setSelectedPaymentMethod(e.target.value)
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault3"
                          >
                            Card <br />
                            <small className="text-muted">
                              Credit Cart / Debit Card
                            </small>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="col-6 mb-3">
                      <div className="form-check h-100 border rounded-3">
                        <div className="p-3">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault1"
                            id="flexRadioDefault4"
                            value="Bank Transfer"
                            checked={selectedPaymentMethod === "Bank Transfer"}
                            onChange={(e) =>
                              setSelectedPaymentMethod(e.target.value)
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault4"
                          >
                            Bank Transfer <br />
                            <small className="text-muted">Account / IMPS</small>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* <div className="col-4 mb-3">
                      <div className="form-check h-100 border rounded-3">
                        <div className="p-3">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault1"
                            id="flexRadioDefault2"
                            value="NetBanking"
                            checked={selectedPaymentMethod === "NetBanking"}
                            onChange={(e) =>
                              setSelectedPaymentMethod(e.target.value)
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault2"
                          >
                            NetBanking <br />
                            <small className="text-muted"></small>
                          </label>
                        </div>
                      </div>
                    </div> */}
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <div className="card mb-4">
                        <h4 className="text text-bg-info p-2 text-center">
                          Shipping Address
                        </h4>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-sm-3">
                              <h5 className="mb-0">Address</h5>
                            </div>
                            <div className="col-sm-9">
                              {shipng_address ? (
                                shipng_address.map((item) => (
                                  <div key={item._id} className="row">
                                    <div className="col-1">
                                      <input
                                        type="radio"
                                        name="address"
                                        value={item.address}
                                        checked={
                                          selectedAddress === item.address
                                        }
                                        onChange={handleRadioChange}
                                      />
                                    </div>
                                    <div className="col-11 overflow-hidden">
                                    <span className="w-100 text-break">
                                      <label>{item.address}</label>
                                    </span>
                                      <hr />
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <p className="text-muted mb-0">
                                   {Building} {Block} {Street} {City} {StateName} {County}
                                </p>
                              )}

                              <>
                                {/* <hr />
                                <div className="d-flex">
                                  <input
                                    type="text"
                                    value={shippingAddress}
                                    onChange={handleTextInputChange}
                                    placeholder={"new Address"}
                                  />
                                  <button
                                    onClick={handleEditClick}
                                    className="btn btn-outline-dark m-1"
                                  >
                                    Add
                                  </button>
                                </div> */}
                              </>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                      id="flexCheckDefault1"
                      onChange={handleCopyBillingAddress}
                      checked={copyBillingAddress}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault1"
                    >
                      Same as Billing Address
                    </label>
                  </div> */}
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
                  <p className="mb-2">Total price:</p>
                  <p className="mb-2">{totalam}</p>
                </div>
                {/* <div className="d-flex justify-content-between">
                  <p className="mb-2">Discount:</p>
                  <p className="mb-2 text-danger">
                    - <i className="fa-solid fa-indian-rupee-sign"></i>
                    {total === 0 ? 0 : discount}
                  </p>
                </div> */}
                {/* <div className="d-flex justify-content-between">
                  <p className="mb-2">Shipping cost:</p>
                  <p className="mb-2 text text-success">
                    +
                    {total === 0 ? 0 : shippingCharge}
                  </p>
                </div> */}
                <div className="d-flex justify-content-between">
                  <p className="mb-2 col-3">Address:</p>
                  <p className="mb-2 col-9 overflow-hidden">
                    <span className="w-100 text-break">
                      {/* {shippingAddress ||
                        (selectedAddress && shippingAddress) ||
                        selectedAddress} */}
                        {Building} {Block} {Street} {City} {StateName} {County}
                    </span>
                  </p>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <p className="mb-2">Sub Total price:</p>
                  <p className="mb-2 fw-bold">
                    <i className="fa-solid fa-indian-rupee-sign"></i>
                    {totalam}
                  </p>
                </div>
                <div className="d-flex justify-content-between flex-end">
                  <button
                    className="btn btn-success shadow-0 border "
                    onClick={handleShow}
                  >
                    Continue
                  </button>
                </div>
                <PaymentModal
                  amount={subtotal}
                  onHide={handleClose}
                  show={show}
                  mode={selectedPaymentMethod}
                  selectedPaymentMethod={selectedPaymentMethod}
                  selectedShippingMethod={selectedShippingMethod}
                  selectedAddress={selectedAddress}
                  cartItem = {cartItem}
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
                          src={item.photo  || 'https://help.rangeme.com/hc/article_attachments/360006928633/what_makes_a_good_product_image.jpg'}
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
                        {item.itemCode}
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
