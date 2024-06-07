import React, { useEffect, useState } from "react";
import "./header.css";
import menuicon from "./../../../img/new/menu-icon.svg";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import { useAppContext } from "../../../contextApi/AppContext";
import { useApi } from "../../../contextApi/ApiContexts/ApiContexts";

const NewHeader = () => {
  const [showDropdown, setShowDropdown] = useState([]);

  const { setGroupCod, setpr1, setpr2, setpr3, setpr4 } = useApi();

  const {
    cms,
    itemMatrics,
    getItemMatrices,
    getsecondItemMatrices,
    seconditemMatrics,
    get3rdItemMatrices,
    get4thItemMatrices,
    thirditemMatrics,
    forthitemMatrics,
    logOutsap,
  } = useAppContext();

  useEffect(() => {
    function handleClickOutside(event) {
      if (showDropdown.some((drop) => drop === true)) {
        if (!event.target?.closest(".dropdown")) {
          setShowDropdown(Array(showDropdown.length).fill(false));
          const els = document.querySelectorAll(".dropdown-toggle");
          els.forEach((el) => {
            if (el.nextElementSibling) {
              el.nextElementSibling.style.display = "none";
              el.classList.remove("active");
            }
          });
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const toggleDropdown = async (index, item) => {
    setGroupCod(item?.itmsGrpCod);
    if (item?.count === 0) {
      return;
    }

    setShowDropdown((prevState) => {
      const newState = Array(prevState.length).fill(false);
      newState[index] = !prevState[index];
      return newState;
    });

    if (showDropdown[index] === true) {
      const el = document.querySelectorAll(".dropdown-toggle");
      el.forEach((el) => {
        if (el.nextElementSibling) {
          el.nextElementSibling.style.display = "none";
          el.classList.remove("active");
        }
      });
    } else {
      await getItemMatrices(item?.itmsGrpCod);
      setpr1("");
      setpr2("");
      setpr3("");
      setpr4("");
    }
  };

  const toggleMultilevelDropdown = async (event, level, sub) => {
    const nextElement = event.currentTarget?.nextElementSibling;
    const cls = document.querySelectorAll(`.dropdown-menu${level}`);
    const actCls = document.querySelectorAll(`.dropdown-item${level}`);

    cls.forEach((el, i) => {
      if (el !== nextElement) {
        el.style.display = "none";
      }
      actCls[i].classList.remove("active");
    });

    if (nextElement && sub?.count > 0) {
      event.target.classList.toggle("active");
      if (nextElement.style.display === "block") {
        nextElement.style.display = "none";
      } else {
        nextElement.style.display = "block";
      }
    }

    if (level === 2) {
      await getsecondItemMatrices(sub?.u_ITMGRPCD, sub?.pcode);
    }
    if (level === 3) {
      await get3rdItemMatrices(sub?.u_ITMGRPCD, sub?.pcode);
    }
    if (level === 4) {
      await get4thItemMatrices(sub?.u_ITMGRPCD, sub?.pcode);
    }
  };

  return (
    <div>
      <section className="menuWrap">
        <article className="container">
          <aside className="row">
            <div className="col-md-2 col-12 d-flex">
              <div className="dropAll">
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic">
                    All <img src={menuicon} alt="Nav" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.ItemText>
                      <b>Trending</b>
                    </Dropdown.ItemText>
                    <Dropdown.Item as={Link} to="/bestseller-product-list">
                      Bestsellers
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/clearence-product-list">
                      {" "}
                      Clearance Sale
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/newLaunch-product-list">
                      New Launch
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/viewlogo">
                      Brands
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/brandCatalogue">
                      Catalogue
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.ItemText>
                      <b>Help & Settings</b>
                    </Dropdown.ItemText>
                    <Dropdown.Item as={Link} to="/account/profile">
                      Your Account
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/contact-us">
                      Customer Service
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={logOutsap}>Sign out</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              {/* <a className="btn btn-dark text-white btn-sm mobileCanvaBtn d-block d-sm-none d-md-none" data-bs-toggle="offcanvas" href="#mobileOffcanvas" role="button" aria-controls="mobileOffcanvas"><img src={menuicon} alt="Nav" width={20} /> Menu</a> */}
            </div>
            <div className="col-md-8 d-none d-sm-block">
              <div className="desktopNav">
                <ul className="menueLinkList d-inline-block">
                  {/*********** mega menu work start here ***********/}
                  {cms?.map((item, index) => {
                    return (
                      <li key={index}>
                        <div className="customMegaDrop">
                          <div className="dropdown">
                            <Link
                              to={`/product-list/${item?.itmsGrpNam}/${item?.itmsGrpCod}`}
                              onClick={() => toggleDropdown(index, item)}
                              className={`${
                                item.count > 0
                                  ? "dropdown-toggle dropdown-item2"
                                  : ""
                              }`}
                            >
                              {/* <img src={item?.image} alt="" /> */}
                              {item?.itmsGrpNam}
                            </Link>

                            {item?.count > 0 && (
                              <ul
                                className="dropdown-menu dropdown-menu1"
                                style={{
                                  display: showDropdown[index]
                                    ? "block"
                                    : "none",
                                }}
                              >
                                {itemMatrics.map((sub, i) => (
                                  <li
                                    className={
                                      sub?.count > 0 && "dropdown dropend"
                                    }
                                    key={i}
                                  >
                                    <Link
                                      className={`dropdown-item ${
                                        sub?.count > 0 &&
                                        "dropdown-toggle dropdown-item2"
                                      }`}
                                      to={`/product-list/${item?.itmsGrpNam}/${sub?.pname}-1-${sub?.pcode}?grpCode=${item?.itmsGrpCod}`}
                                      onClick={(e) => {
                                        toggleMultilevelDropdown(e, 2, sub);
                                      }}
                                    >
                                      {sub?.pname}
                                    </Link>

                                    {sub?.count > 0 && (
                                      <ul className="dropdown-menu dropdown-menu2">
                                        {seconditemMatrics?.map((sub2, j) => (
                                          <li
                                            className={
                                              sub2?.count > 0 &&
                                              "dropdown dropend"
                                            }
                                            key={j}
                                          >
                                            <Link
                                              className={`dropdown-item ${
                                                sub2?.count > 0 &&
                                                "dropdown-toggle dropdown-item3"
                                              }`}
                                              to={`/product-list/${item?.itmsGrpNam}/${sub2?.pname}-2-${sub2?.pcode}?grpCode=${item?.itmsGrpCod}&level1=${sub?.pname}-1-${sub?.pcode}`}
                                              onClick={(e) =>
                                                toggleMultilevelDropdown(
                                                  e,
                                                  3,
                                                  sub2
                                                )
                                              }
                                            >
                                              {sub2?.pname}
                                            </Link>

                                            {sub2?.count > 0 && (
                                              <ul className="dropdown-menu dropdown-menu3">
                                                {thirditemMatrics?.map(
                                                  (sub3, k) => (
                                                    <li
                                                      className={
                                                        sub3?.count > 0 &&
                                                        "dropdown dropend"
                                                      }
                                                      key={k}
                                                    >
                                                      <Link
                                                        className={`dropdown-item ${
                                                          sub3?.count > 0 &&
                                                          "dropdown-toggle dropdown-item4"
                                                        }`}
                                                        to={`/product-list/${item?.itmsGrpNam}/${sub3?.pname}-3-${sub3?.pcode}?grpCode=${item?.itmsGrpCod}&level1=${sub?.pname}-1-${sub?.pcode}&level2=${sub2?.pname}-2-${sub2?.pcode}`}
                                                        onClick={(e) =>
                                                          toggleMultilevelDropdown(
                                                            e,
                                                            4,
                                                            sub3
                                                          )
                                                        }
                                                      >
                                                        {sub3?.pname}
                                                      </Link>

                                                      {sub3?.count > 0 && (
                                                        <ul className="dropdown-menu dropdown-menu4">
                                                          {forthitemMatrics.map(
                                                            (sub4, l) => (
                                                              <li
                                                                className={
                                                                  sub4?.count >
                                                                    0 &&
                                                                  "dropdown dropend"
                                                                }
                                                                key={l}
                                                              >
                                                                <Link
                                                                  className="dropdown-item dropdown-item5"
                                                                  to={`/product-list/${item?.itmsGrpNam}/${sub4?.pname}-4-${sub4?.pcode}?grpCode=${item?.itmsGrpCod}&level1=${sub?.pname}-1-${sub?.pcode}&level2=${sub2?.pname}-2-${sub2?.pcode}&level3=${sub3?.pname}-3-${sub3?.pcode}`}
                                                                  onClick={(
                                                                    e
                                                                  ) =>
                                                                    toggleMultilevelDropdown(
                                                                      e,
                                                                      5,
                                                                      sub4
                                                                    )
                                                                  }
                                                                >
                                                                  {sub4?.pname}
                                                                </Link>
                                                              </li>
                                                            )
                                                          )}
                                                        </ul>
                                                      )}
                                                    </li>
                                                  )
                                                )}
                                              </ul>
                                            )}
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                  {/*********** mega menu work end here ***********/}
                  <li>
                    <Link to="/bestseller-product-list">Bestsellers</Link>
                  </li>
                  <li>
                    <Link to="/clearence-product-list"> Clearance Sale</Link>
                  </li>
                  <li>
                    <Link to="/newLaunch-product-list"> New Launch</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2 lastItem d-none d-sm-block">
              Hotline: <a href="tel:+61432812126">+61 432 812 126</a>
            </div>
          </aside>
        </article>
      </section>
    </div>
  );
};

export default NewHeader;
