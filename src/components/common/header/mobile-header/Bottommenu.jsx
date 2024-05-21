import React from "react";
import "./../../../../css/mix.css";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import OffCanvas from "./OffCanvas";
import MenuSearch from "./MenuSearch";
import { useAppContext } from "../../../../contextApi/AppContext";

const Bottommenu = ({ setLoginShow }) => {
  const [fullscreen, setFullscreen] = useState(false);
  const [show, setShow] = useState(false);

  const [searchshow, setSearchShow] = useState(false);

  const handleClose = () => setSearchShow(false);
  const handleSearchShow = () => setSearchShow(true);
  const { isLoggedIn, user, userLoading,
    isLogIn, } = useAppContext();

  function handleShow() {
    setFullscreen(true);
    setShow(true);
  }
  const log = localStorage.getItem("log");
    const loginData = JSON.parse(log)

  return (
    <>
      <div id="tp-bottom-menu-sticky" className="tp-mobile-menu d-lg-none pb-0">
        <div className="container">
          <div className="row row-cols-4">
            {/* <div className="col">
              <div className="tp-mobile-item text-center">
                <Link to="/product-list" className="tp-mobile-item-btn btn">
                  <i className="fa-solid fa-store "></i>
                  <span>Store</span>
                </Link>
              </div>
            </div> */}
            <div className="col">
              <div className="tp-mobile-item text-center">
                <button
                  onClick={handleSearchShow}
                  className="tp-mobile-item-btn tp-search-open-btn btn"
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <span>Search</span>
                </button>
              </div>
              <Modal show={searchshow} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title className="pt-3">
                    <MenuSearch onHide={handleClose} />
                  </Modal.Title>
                </Modal.Header>
              </Modal>
            </div>
            <div className="col">
              <div className="tp-mobile-item text-center">
                <Link to="/wishlist" className="tp-mobile-item-btn btn">
                  <i class="fa-solid fa-heart"></i>
                  <span>wishlist</span>
                </Link>
              </div>
            </div>
            <div className="col">
              {!isLogIn ? (
                <>
                  {/* {userLoading ? (
                    <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                  ) : ( */}
                    <div
                      onClick={() => setLoginShow(true)}
                      className="tp-mobile-item text-center"
                    >
                      <Link to="#" className="tp-mobile-item-btn btn">
                        <i className="fa-regular fa-user"></i>
                        <span>Account</span>
                      </Link>
                    </div>
                  {/* )} */}
                </>
              ) : (
                <div className="tp-mobile-item text-center">
                  <Link to="/account/profile" className="tp-mobile-item-btn btn">
                    {/* <img
                      src={loginData ? loginData.profile : "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"}
                      alt="avatar"
                      className="rounded-circle img-fluid"
                      style={{ width: 23, height: 23 }}
                    /> */}
                        <i className="fa-regular fa-user"></i>

                    <span>{loginData ? loginData.as_Name?.slice(0,6): ""}</span>
                  </Link>
                </div>
              )}
            </div>
            <div className="col">
              <div className="tp-mobile-item text-center">
                <button
                  onClick={() => handleShow()}
                  className="tp-mobile-item-btn tp-offcanvas-open-btn btn"
                >
                  <i className="fa-solid fa-bars"></i>
                  <span>Menu</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="logo">
              <Link to="/">
                <img src="assets/img/logo/logo.png" alt="logo" />
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

export default Bottommenu;
