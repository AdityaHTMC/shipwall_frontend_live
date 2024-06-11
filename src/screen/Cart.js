import React, { useState, useEffect, useReducer } from "react";
import "./../css/cart.css";
import { Link } from "react-router-dom";
import { useAppContext } from "../contextApi/AppContext";
import { CartItem } from "./cart-item";

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

const Cart = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { cartItem, removeCartItem, products, updateQuantity, cms } =
    useAppContext();
  const [product, setProduct] = useState([]);

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

  const decrementQuantity = async (id, currentQuantity, price) => {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1; //parseInt(currentQuantity) - 1;
      await updateQuantity(id, newQuantity, newQuantity * price);
    }
  };

  const incrementQuantity = async (id, currentQuantity, price) => {
    const newQuantity = currentQuantity + 1; // parseInt(currentQuantity) + 1;
    await updateQuantity(id, newQuantity, newQuantity * price);
  };
  
  const handleQuantity = async (e, id, price) => {
    if(Number(e.target.value) < 1){
      return
    }
    const newQuantity = Number(e.target.value) || 1 // parseInt(currentQuantity) + 1;
    await updateQuantity(id, newQuantity, newQuantity * price);
  }

  const handeCoupon = (e) => {
    e.preventDefault();
  };

  const itemsPerPage = 5;
  const totalItems = cartItem?.Items?.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const itemsToShow = cartItem?.Items?.slice(startIndex, endIndex);

  console.log(itemsToShow, "ITS");

  console.log(itemsToShow);
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  // console.log(cartItem)
  return (
    <>
      <section className="bg-light py-2">
        <div className="container mt-4 mt-md-0 mt-lg-0">
          <div className="row">
            {/* cart */}
            <div className="col-lg-9">
              <div className="card border shadow-0">
                <div className="m-4">
                  <h4 className="card-title mb-4 mt-4 text text-bg-primary p-3 text-center">
                    Your Order
                  </h4>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Product</th>
                          {/* <th>Unit</th> */}
                          <th>Quantity</th>
                          <th>Unit Price</th>
                          <th> Sub Total </th>
                          <th>Freight</th>
                          <th>Tax</th>
                          <th>Total Price</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {itemsToShow?.map((item, index) => (
                          // <tr key={item.itemCode}>
                          //   <td>
                          //     <div className="d-flex flex-column">
                          //       <Link
                          //         // to={`/product-details/${item._id}`}
                          //         className="nav-link"
                          //       >
                          //         <img
                          //           src={item.image1}
                          //           className="border rounded me-3"
                          //           style={{
                          //             maxWidth: "90px",
                          //             maxHeight: "90px",
                          //           }}
                          //           alt={""}
                          //         />
                          //         <div className="product-name">
                          //           {item.itemName
                          //             ? item.itemName?.slice(0, 15)
                          //             : ""}
                          //         </div>
                          //       </Link>
                          //     </div>
                          //   </td>
                          //   {/* <td>1</td> */}
                          //   <td>
                          //     <div className="text-muted text-nowrap align-items-center gap-1 m-auto d-flex">
                          //       <button
                          //         onClick={() =>
                          //           decrementQuantity(
                          //             item.itemCode,
                          //             item.quantity,
                          //             item.price
                          //           )
                          //         }
                          //         className="btn btn-outline-secondary border-0"
                          //       >
                          //         <i className="fa-solid fa-minus"></i>
                          //       </button>
                          //       {/* <span className="p-2">{item.quantity}</span> */}
                          //       <input
                          //         value={item.quantity}
                          //         onChange={handleQuantity}
                          //         min={1}
                          //         type="number"
                          //         placeholder=""
                          //         style={{height: 40, padding: '10px 5px', width: 100}}
                          //         // className={!mobileValid ? "invalid" : ""}
                          //       />

                          //       <button
                          //         onClick={() =>
                          //           incrementQuantity(
                          //             item.itemCode,
                          //             item.quantity,
                          //             item.price
                          //           )
                          //         }
                          //         className="btn btn-outline-secondary border-0"
                          //       >
                          //         <i className="fa-solid fa-plus"></i>
                          //       </button>
                          //     </div>
                          //   </td>
                          //   <td>{item.price?.toFixed(2)}</td>
                          //   <td>{(item.quantity * item.price)?.toFixed(2)}</td>
                          //   <td>
                          //     {(item.quantity * item.fright1Amount)?.toFixed(2)}
                          //   </td>
                          //   <td>
                          //     {(
                          //       (item.quantity * item.price * item.taxPerc) /
                          //       100
                          //     )?.toFixed(2)}
                          //   </td>
                          //   <td>
                          //     {(
                          //       item.quantity *
                          //         (item.price + item.fright1Amount) +
                          //       item.quantity *
                          //         item.price *
                          //         (item.taxPerc / 100)
                          //     )?.toFixed(2)}
                          //   </td>
                          //   <td>
                          //     <button
                          //       onClick={() => {
                          //         removeCartItem(item.itemCode);
                          //       }}
                          //       className="btn btn-light border text-danger icon-hover-danger"
                          //     >
                          //       <i className="fa-solid fa-trash"></i>
                          //     </button>
                          //   </td>
                          // </tr>
                          <CartItem key={item.itemCode} decrementQuantity={decrementQuantity} incrementQuantity={incrementQuantity} item={item} />
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="d-flex justify-content-center mt-0">
                    <ul className="pagination">
                      <li
                        className={`page-item ${
                          currentPage === 1 ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={goToPrevPage}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </button>
                      </li>
                      {Array.from({ length: totalPages })?.map((_, index) => (
                        <li
                          key={index}
                          className={`page-item ${
                            currentPage === index + 1 ? "active" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => onPageChange(index + 1)}
                          >
                            {index + 1}
                          </button>
                        </li>
                      ))}
                      <li
                        className={`page-item ${
                          currentPage === totalPages ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={goToNextPage}
                          disabled={currentPage === totalPages}
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* <div className="border-top pt-4 mx-4 mb-4">
                  <p>
                    <i className="fas fa-truck text-muted fa-lg" /> Free Delivery
                    within 1-2 weeks
                  </p>
                  <p className="text-muted">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                    enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip
                  </p>
                </div> */}
              </div>
            </div>
            {/* cart */}
            {/* summary */}
            <div className="col-lg-3">
              {/* <div className="card mb-3 border shadow-0">
                <div className="card-body">
                  <form onSubmit={handeCoupon}>
                    <div className="form-group">
                      <label className="form-label">Have a coupon?</label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control border"
                          name=""
                          placeholder="Coupon code"
                        />
                        <button type='submit' className="btn btn-light border">Apply</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div> */}
              <div className="card shadow-0 border">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">Sub Total:</p>
                    <p className="mb-2 text-danger">
                      {totalSubTotal?.toFixed(2)}{" "}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">Freight:</p>
                    <p className="mb-2 text-danger">
                      {totalFreight?.toFixed(2)}{" "}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">Total tax:</p>
                    <p className="mb-2 text-danger">{totalTax?.toFixed(2)}</p>
                  </div>{" "}
                  <hr />
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">Total price:</p>
                    <p className="mb-2"> {totalPrice?.toFixed(2)}</p>
                  </div>
                  <hr />
                  {/* <div className="d-flex justify-content-between">
                    <p className="mb-2">Sub-Total price:</p>
                    <p className="mb-2 fw-bold"></p>
                  </div> */}
                  <div className="mt-3">
                    {cartItem?.Items?.length !== 0 && (
                      <Link
                        to="/checkout"
                        className="btn btn-success w-100 shadow-0 mb-2"
                      >
                        CheckOut
                      </Link>
                    )}
                    <Link
                      to={
                        cms && cms.length > 1
                          ? `/product-list/${cms[1]?.itmsGrpNam}/${cms[1]?.itmsGrpCod}`
                          : "/"
                      }
                      className="btn btn-light w-100 border mt-2"
                    >
                      Back to shop
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* summary */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
