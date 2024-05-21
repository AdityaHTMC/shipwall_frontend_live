import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../contextApi/AppContext";
import { useState, useEffect, useReducer } from "react";
import Button from "react-bootstrap/Button";
import PaymentModal from "./../components/common/modal/PaymentModal";
import { toast } from "react-toastify";
import axios from "axios";
import Table from "react-bootstrap/Table";

import "react-toastify/dist/ReactToastify.css";
import { useApi } from "../contextApi/ApiContexts/ApiContexts";

// const base_url = "https://shipwall.au/WCF_API_HTTPS"; //SAP Base URL
// const baseURL2 = "https://shipwall.au/API/shipwall"; // Node Api Base URL

const totalPriceReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_TOTAL_PRICE":
      return action.totalPrice;
    default:
      return state;
  }
};

const totalFreightReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_TOTAL_Freight":
      return action.totalFreight;
    default:
      return state;
  }
};

const totalSubTotalReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_TOTAL_SUBTOTAL":
      return action.totalSubTotal;
    default:
      return state;
  }
};

const totalTaxReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_TOTAL_TAX":
      return action.totalTax;
    default:
      return state;
  }
};

const CheckOut = () => {
  const { cardCode, access, base_url, baseURL2 } = useApi();
  // const cardCode = localStorage.getItem("username");
  const [copyBillingAddress, setCopyBillingAddress] = useState(false);
  const {
    cartItem,
    products,
    user,
    addShippingAddress,
    ShipingMethodPrice,
    shippingPrice,
    getBP,
    singleBPdata,
    SalseOrderPlace,
    newSalseOrderPlace,
    // base_url,
  } = useAppContext();
  const [manualAddress, setManualAddress] = useState("");
  const [note, setNote] = useState("");

  const handleManualAddressChange = (e) => {
    setManualAddress(e.target.value);
  };

  const handleAddNote = (e) => {
    setNote(e.target.value);
  };

  const [totalPrice, dispatchTotalPrice] = useReducer(totalPriceReducer, 0);
  const [totalFreight, dispatchTotalFreight] = useReducer(
    totalFreightReducer,
    0
  );
  const [totalSubTotal, dispatchTotalSubTotal] = useReducer(
    totalSubTotalReducer,
    0
  );
  const [totalTax, dispatchTotalTax] = useReducer(totalTaxReducer, 0);

  // Step 3: Update the total price whenever cartItem changes
  useEffect(() => {
    // Step 4: Calculate the total price based on cart items
    const calculatedTotalPrice = cartItem?.Items?.reduce((total, item) => {
      const price = typeof item.price === "number" ? item.price : 0;
      const quantity = typeof item.quantity === "number" ? item.quantity : 0;
      const frightAmount =
        typeof item.fright1Amount === "number" ? item.fright1Amount : 0;
      const tax =
        typeof item.taxPerc === "number"
          ? (item.quantity * item.price * item.taxPerc) / 100
          : 0;
      return total + price * quantity + frightAmount + tax;
    }, 0);

    const calculatedTotalFreight = cartItem?.Items?.reduce((total, item) => {
      const frightAmount =
        typeof item.fright1Amount === "number" ? item.fright1Amount : 0;
      return total + frightAmount;
    }, 0);

    const calculatedTotalSubTotal = cartItem?.Items?.reduce((total, item) => {
      const price = typeof item.price === "number" ? item.price : 0;
      const quantity = typeof item.quantity === "number" ? item.quantity : 0;

      return total + price * quantity;
    }, 0);

    const calculatedTotalTax = cartItem?.Items?.reduce((total, item) => {
      const tax =
        typeof item.taxPerc === "number"
          ? (item.quantity * item.price * item.taxPerc) / 100
          : 0;
      return total + tax;
    }, 0);

    // Step 5: Dispatch action to update total price
    dispatchTotalPrice({
      type: "UPDATE_TOTAL_PRICE",
      totalPrice: calculatedTotalPrice,
    });
    dispatchTotalFreight({
      type: "UPDATE_TOTAL_Freight",
      totalFreight: calculatedTotalFreight,
    });
    dispatchTotalSubTotal({
      type: "UPDATE_TOTAL_SUBTOTAL",
      totalSubTotal: calculatedTotalSubTotal,
    });
    dispatchTotalTax({
      type: "UPDATE_TOTAL_TAX",
      totalTax: calculatedTotalTax,
    });
  }, [cartItem]);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [shippingAddress, setShippingAddress] = useState("");
  const [product, setProduct] = useState([]);
  const { fname, lname, email, mobile, Billing_address, shipng_address } = user;

  const [freeCreditLimit, setFreeCreditLimit] = useState(0);
  const [cashOnDelivery, setCashOnDelivery] = useState(0);
  const [onlinePayment, setOnlinePayment] = useState(0);

  const [preventpay, setPreventpay] = useState(0);


  useEffect(() => {
    setOnlinePayment(totalPrice);
  }, [totalPrice]);

  useEffect(() => {
    const remainingAmount = totalPrice - (cashOnDelivery + freeCreditLimit);
    setOnlinePayment(remainingAmount >= 0 ? remainingAmount : 0);
  }, [cashOnDelivery, freeCreditLimit, totalPrice]);

  const handleCashOnDeliveryChange = (event) => {
    const inputValue = parseFloat(event.target.value);
    setCashOnDelivery(inputValue);
  };

  const handleFreeCreditLimitChange = (event) => {
    const inputValue = parseFloat(event.target.value);
    if (inputValue <= freecredit) {
      setFreeCreditLimit(inputValue);
    } else {
      // Optionally display an error message or take appropriate action
      toast.info("Input value exceeds available Free Credit Limit");
    }
  };

  const handleOnlinePaymentChange = (event) => {
    const inputValue = parseFloat(event.target.value);
    const maxAllowedValue = totalPrice - (cashOnDelivery + freeCreditLimit);
    if (inputValue <= maxAllowedValue && inputValue >= 0) {
      setOnlinePayment(inputValue);
    } else {
      // Handle error: Input value exceeds the allowed range
      // Optionally, display an error message or take appropriate action
    }
  };

  const inputValue = (
    freeCreditLimit +
    cashOnDelivery +
    onlinePayment
  )?.toFixed(2);

  let selectedItem;

  if (cartItem?.Items) {
    const newitem = cartItem?.Items?.map((item) => ({
      itemCode: item.itemCode,
      quantity: item.quantity,
      price: item.price,
      whsCode: "PT-FGTG",
      fright1Amount: item.fright1Amount * item.quantity,
    }));
    selectedItem = newitem;
  }

  const handlePayment = () => {
    if (preventpay === 1) {
    } else {
      SalseOrderPlace(
        selectedItem,
        cashOnDelivery || 0,
        freeCreditLimit || 0,
        onlinePayment || 0,
        manualAddress,
        note
      );
    }
  };

  const handleContinue = () => {
    setPreventpay(0);
    const inputValueSum =
      parseFloat(freeCreditLimit || 0) +
      parseFloat(cashOnDelivery || 0) +
      parseFloat(onlinePayment || 0);

    const tolerance = 0.001;
    if (Math.abs(inputValueSum - totalPrice) < tolerance) {
      if (parseFloat(onlinePayment || 0) > 0) {
        setShow(true);
        setPreventpay(1);
      } else {
        handlePayment();
      }
    } else {
      console.log("Error: Sum of input values does not match totalPrice");
      toast.error("Sum of input values does not match with Total Price");
    }
  };

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState();
  const [selectedShippingMethod, setSelectedShippingMethod] =
    useState("Express-Delivery");

  const handelShippingMethod = () => {
    ShipingMethodPrice(selectedShippingMethod);
  };

  const handleClose = () => setShow(false);

  // const price = cartItem.Price || 0; // assuming a default value of 0
  // const quantity = cartItem.quantity || 0; // assuming a default value of 0
  // const discount = cartItem.Discount || 0; // assuming a default value of 0

  // const total = price * quantity - discount;

  // const subtotal = isNaN(total) || total < 0 ? 0 : total;

  // const totalPrice = cartItem.reduce(
  //   (acc, item) => acc + item.price * item.quantity - (item.Discount || 0),
  //   0
  // );

  const handleCopyBillingAddress = () => {
    setCopyBillingAddress(!copyBillingAddress);
    if (!copyBillingAddress) {
      setShippingAddress(Billing_address ? Billing_address[0].location : "");
    } else {
      setShippingAddress("");
    }
  };

  const handleEditClick = async () => {
    await addShippingAddress(shippingAddress);
    await setShippingAddress("");
  };

  const [Adddata, setAddData] = useState();
  const [loading, setloading] = useState(false);
  const [shippingDDdata, setShippingDDdata] = useState();
  const [billingDDdata, setBillingDDdata] = useState();
  const [show, setShow] = useState(false);

  const getDP = async () => {
    try {
      setloading(true);
      // const cardCode = localStorage.getItem("username");
      // const access = localStorage.getItem("accessC");
      const response = await axios.get(
        `${base_url}/api/Masters/GetBP/${cardCode || "%20"}/C/%20/%20`,
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
  )?.toFixed(2);

// const freecredit =20

  console.log(freecredit, "fc");

  const handleShow = () => {};

  console.log(Adddata, "d");
  const { addresses } = Adddata || { addresses: [] };

  const billingAddress =
    Array.isArray(addresses) &&
    addresses.filter((address) => address.adresType === "B");
  const Shippingaddress =
    Array.isArray(addresses) &&
    addresses.filter((address) => address.adresType === "S");

  const filterAddressId =
    Array.isArray(Shippingaddress) &&
    addresses.filter((item) => item.address === shippingDDdata);

  const filterBillAddressId =
    Array.isArray(Shippingaddress) &&
    addresses.filter((item) => item.address === billingDDdata);

  console.log(filterAddressId, "fA");
  console.log(filterBillAddressId, "bA");

  console.log(billingAddress, "cart Billing ");
  console.log(Shippingaddress, "cart Shipping ");

  const handleDropdownChange = (selectedAddress) => {
    setShippingDDdata(selectedAddress);
  };

  const handleBillDDChange = (selectedAddress) => {
    setBillingDDdata(selectedAddress);
  };

  useEffect(() => {
    const f = async () => {
      await getDP();
    };
    f();
  }, []);

  useEffect(() => {
    handleDropdownChange();
  }, []);

  console.log(inputValue, "Input");

  console.log(totalPrice, "output");

  return (
    <>
      <section className="bg-light py-2">
        <div className="container">
          <div className="row">
            {/* left part start here */}
            <div className="col-sm-8 col-12 mb-4">
              {/* Checkout part start */}
              <div className="card shadow-0 border mt-5 mb-2">
                <div className="card-header">
                  <h4 className="mb-0 text-primary">
                    <b>Checkout</b>
                  </h4>
                </div>
                <div className="card-body">
                  <h5 className="text-success">Payment Method</h5>
                  {/* item start */}
                  <div className="row mt-3">
                    <div className="col-md-4">
                      <label className="pt-2 pb-2">
                        {" "}
                        <b>
                          Free Credit Limit (
                          {freecredit < 0 ? "0.00" : freecredit})
                        </b>
                      </label>
                    </div>
                    <div className="col-md-8">
                      <input
                        style={{ height: "44px" }}
                        className="form-control"
                        type="number"
                        step="0.01"
                        value={freeCreditLimit}
                        onChange={(e) => handleFreeCreditLimitChange(e)}
                        disabled={freecredit <= 0}
                      />
                    </div>
                  </div>
                  {/* item end */}

                  {/* item start */}
                  <div className="row mt-3">
                    <div className="col-md-4">
                      <label className="pt-2 pb-2">
                        <b>Cash On Delivery</b>
                      </label>
                    </div>
                    <div className="col-md-8">
                      <input
                        style={{ height: "44px" }}
                        className="form-control"
                        type="number"
                        step="0.01"
                        value={cashOnDelivery}
                        onChange={handleCashOnDeliveryChange}
                      />
                    </div>
                  </div>
                  {/* item end */}

                  {/* item start */}
                  <div className="row mt-3">
                    <div className="col-md-4">
                      <label className="pt-2 pb-2">
                        <b>Online Payment</b>
                      </label>
                    </div>
                    <div className="col-md-8">
                      <input
                        style={{ height: "44px" }}
                        className="form-control"
                        
                        type="number"
                        value={onlinePayment.toFixed(2)}
                        step="0.01"
                        onChange={handleOnlinePaymentChange}
                        disabled
                      />
                    </div>
                  </div>
                  {/* item end */}
                </div>
              </div>
              {/* Checkout part end */}

              {/* Billing Address part start */}
              <div className="card shadow-0 border mt-4 mb-4">
                <div className="card-header">
                  <h4 className="text-primary">
                    <b>Billing Address</b>
                  </h4>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-6 col-12">
                      <label className="mb-2">
                        <b>Select Billing Address ID:</b>
                      </label>{" "}
                      <select
                        className="form-control"
                        onChange={(e) => handleBillDDChange(e.target.value)}
                      >
                        <option value="">Select an address</option>
                        {billingAddress?.map((address, index) => (
                          <option key={index} value={address.address}>
                            {address.address}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-sm-6 col-12">
                      <label className="mb-2">
                        <b>Full Address</b>
                      </label>
                      {filterBillAddressId.length > 0 ? (
                        <p>
                          <i className="fas fa-map-marker-alt"></i>{" "}
                          {filterBillAddressId[0]?.street} ,{" "}
                          {filterBillAddressId[0]?.block} ,{" "}
                          {filterBillAddressId[0]?.city} ,{" "}
                          {filterBillAddressId[0]?.zipCode} ,{" "}
                          {filterBillAddressId[0]?.stateName} ,{" "}
                          {filterBillAddressId[0]?.countryName} ,{" "}
                          {filterBillAddressId[0]?.county} ,{" "}
                          {filterBillAddressId[0]?.streetNo}
                        </p>
                      ) : (
                        <p>No data found</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* Billing Address part end */}

              {/* Shipping Address part start */}
              <div className="card shadow-0 border mt-2 mb-5">
                <div className="card-header">
                  <h4 className="text-primary">
                    <b>Shipping Address</b>
                  </h4>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-6 col-12 mb-3">
                      <label className="mb-2">
                        <b>Select Shipping Address ID : </b>
                      </label>
                      <select
                        style={{ height: "44px" }}
                        className="form-control"
                        onChange={(e) => handleDropdownChange(e.target.value)}
                      >
                        <option value="">Select an address</option>
                        {Shippingaddress.map((address, index) => (
                          <option key={index} value={address.address}>
                            {address.address}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-sm-6 col-12 mb-3">
                      <label className="mb-2">
                        <b>Full Address</b>
                      </label>
                      {filterAddressId.length > 0 ? (
                        <p>
                          <i className="fas fa-map-marker-alt"></i>{" "}
                          {filterAddressId[0]?.street},{" "}
                          {filterAddressId[0]?.block},{" "}
                          {filterAddressId[0]?.city},{" "}
                          {filterAddressId[0]?.zipCode},{" "}
                          {filterAddressId[0]?.stateName},{" "}
                          {filterAddressId[0]?.countryName},
                          {filterAddressId[0]?.county},{" "}
                          {filterAddressId[0]?.streetNo}
                        </p>
                      ) : (
                        <p>No data found</p>
                      )}
                    </div>

                    <div className="col-sm-6 col-12 mb-3">
                      <label className="mb-2">
                        <b>Delivery on your work site : </b>
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        style={{ height: "80px" }}
                        value={manualAddress}
                        onChange={handleManualAddressChange}
                        placeholder="Enter your address"
                      />
                    </div>

                    <div className="col-sm-6 col-12 mb-3">
                      <label className="mb-2">
                        <b>Order Note:</b>
                      </label>
                      <textarea
                        className="form-control"
                        style={{ height: "80px" }}
                        type="text"
                        value={note}
                        onChange={handleAddNote}
                        placeholder="Enter your Order Note"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Shipping Address part end */}
            </div>
            {/* left part end here */}

            {/* right part start */}
            <div className="col-sm-4 col-12">
              <div className="card mt-5 mb-5">
                <div className="card-header">
                  <h4 className="mb-0 text-primary">
                    <b>Summary</b>
                  </h4>
                </div>
                <div className="card-body">
                  {/* <div className="d-flex justify-content-between">
                    <p className="mb-2">Sum Of Input:</p>
                    <p className="mb-2">{inputValue}</p>
                  </div> */}
                  <hr className="mt-1 mb-2" />
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">Total price:</p>
                    <p className="mb-2"> {totalPrice?.toFixed(2)}</p>
                  </div>
                  <hr className="mt-1 mb-2" />
                  <div align="right">
                    <button
                      className="btn btn-primary shadow-0 border "
                      onClick={handleContinue}
                    >
                      Continue <i class="far fa-paper-plane"></i>
                    </button>
                  </div>
                  {/* <div className="d-flex justify-content-between">
                      <p className="mb-2">Freight:</p>
                      <p className="mb-2 text-danger">{totalFreight} </p>
                    </div> */}
                  {/* <hr />
                  <div className="d-flex justify-content-between">
                      <p className="mb-2">Total tax:</p>
                      <p className="mb-2 text-danger">{totalTax}</p>
                    </div>  <hr/> */}
                  <div>
                    <PaymentModal
                      amount={onlinePayment}
                      onHide={handleClose}
                      show={show}
                      mode={selectedPaymentMethod}
                      selectedPaymentMethod={selectedPaymentMethod}
                      selectedShippingMethod={selectedShippingMethod}
                      selectedAddress={selectedAddress}
                      cartItem={cartItem}
                      cashOnDelivery={cashOnDelivery}
                      freeCreditLimit={freeCreditLimit}
                      selectedItem={selectedItem}
                      manualAddress={manualAddress}
                      note={note}
                    />
                    <h6 className="bg-warning text-dark rounded mt-3 p-2">
                      Items in Order
                    </h6>

                    {cartItem?.Items?.map((item, index) => (
                      <div
                        key={item.itemCode}
                        className="d-flex align-items-center bg-secondary-subtle rounded mb-4 p-2"
                      >
                        <div className="me-3 position-relative">
                          <Link
                          //  to={`/product-details/${item.itemCode}`}
                          >
                            <img
                              src={item.image1}
                              style={{ height: 96, width: 96 }}
                              className="img-sm rounded border"
                            />
                          </Link>
                        </div>
                        <div className="">
                          <Link
                            // to={`/product-details/${item.itemCode}`}
                            className="nav-link"
                          >
                            {item.itemName?.slice(0, 15)}
                          </Link>
                          <p>Quantity : {item.quantity}</p>
                          {/* <div className="price text-muted">
                        Total: {item.price * item.quantity}
                      </div> */}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* right part end */}
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckOut;
