import React, { useEffect } from "react";
import "./../../../css/mix.css";
import { Link, useNavigate } from "react-router-dom";
import OffCanvas from "./mobile-header/OffCanvas";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import SignIn from "../../../screen/SignIn";
import { useAppContext } from "../../../contextApi/AppContext";
import logo from "./../../../img/logo.png";
import { useApi } from "../../../contextApi/ApiContexts/ApiContexts";
import wish from "./../../../img/new/wish.svg";
import cart from "./../../../img/new/cart.svg";
import users from "./../../../img/new/user.svg";
import "./header.css";
const HeaderMain = ({ loginShow, setLoginShow }) => {
  const {
    logOut,
    user,
    isLoggedIn,
    wishListItem,
    cartItem,
    userLoading,
    isLogIn,
  } = useAppContext();

  const log = localStorage.getItem("log9");
  const loginData = JSON.parse(log);

  const { searchProduct, productBySearch, allItem } = useApi();

  const [fullscreen, setFullscreen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [show, setShow] = useState(false);
  const [queary, setQuery] = useState("");
  const navigate = useNavigate();

  function handleShow() {
    setFullscreen(true);
    setShow(true);
  }

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handelSubmit = (event) => {
    event.preventDefault();
    const name = event.target.search1.value;
    const dataToSend = {
      keyword_search: name,
    };
    searchProduct(dataToSend);
    navigate(`/product-list/${name}`);
    setQuery("");
  };

  const handelChange = (e) => {
    const name = e.target.value;
    const dataToSend = {
      keyword_search: name,
      itmsGrpCod:parseInt(selectedCategory)
    };
    setQuery(name);
    searchProduct(dataToSend);
  };



  useEffect(() => {
    searchProduct("", queary);
  }, [selectedCategory]);

  return (
    <>
      <section className="logoRow">
        <article className="container-fluid">
          <aside className="row">
            <div className="col-md-3">
              <Link className="logoImg" to="/">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <div className="col-md-5">
              <form className="searchBx" onSubmit={handelSubmit}>
                <select
                  name="category"
                  onChange={handleCategoryChange}
                  value={selectedCategory}
                >
                  <option value="">All Categories</option>
                  {allItem.map((item) => (
                    <option key={item._id} value={item.itmsGrpCod}>
                      {item.itmsGrpNam}
                    </option>
                  ))}
                </select>
                <input
                  onChange={handelChange}
                  value={queary}
                  type="text"
                  name="search1"
                  placeholder="Search for Products ..."
                />
                <button>Search</button>
              </form>
              {queary.length > 0 && (
                <div className="dropdown p-absolute bottom-0 w-100">
                  <ul
                    className="dropdown-menu show"
                    style={{
                      maxHeight: "200px",
                      overflowY: "auto",
                      width: "100%",
                    }}
                  >
                    {productBySearch.map((item, index) => (
                      <li key={index} className="dropdown-item">
                        <Link
                          onClick={() => setQuery("")}
                          to={`/product-details/${item._id}`}
                        >
                          {item?.itemName.slice(0, 25)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="col-md-4">
              <ul className="list-inline userInfow">
                <li>
                  <a>
                    {!isLogIn ? (
                      <div className="d-flex">
                        <img src={users} alt="crt" />
                        <p onClick={() => setLoginShow(true)} style={{ cursor: 'pointer' }}>
                          <span>Login</span>Account
                        </p>
                      </div>
                    ) : (
                      <>
                        <Link
                          to="/account/profile"
                          className="d-flex align-items-center"
                        >
                          <div className="d-flex">
                            <img src={users} alt="crt" />
                            <p>
                            Welcome
                              <span>{loginData ? loginData.as_Name : ""}</span>
                             
                            </p>
                          </div>
                        </Link>
                      </>
                    )}
                  </a>
                </li>
                <li>
                  <a>
                    <Link className="d-flex" to="/wishlist" >
                      <img src={wish} alt="crt" />
                      <b>
                        {isLogIn ? (wishListItem ? wishListItem.length : 0) : 0}
                      </b>
                      <div >
                        <p className="d-none d-sm-block">
                          <span>Favourite</span>My Wishlist
                        </p>
                      </div>
                    </Link>
                  </a>
                </li>
                <li>
                  <a>
                    <Link className="d-flex" to="/cart">
                      <img src={cart} alt="crt" />
                      <b>{isLogIn ? (cartItem?.Items ? cartItem?.Items.length : 0) : 0}</b>
                      <div >
                        <p>
                          <span>Order</span> My Order
                        </p>
                      </div>
                    </Link>
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </article>
      </section>
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="logo">
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <OffCanvas onHide={() => setShow(false)} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default HeaderMain;
