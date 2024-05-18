import "./../../../css/mix.css";
import { Link } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useAppContext } from "../../../contextApi/AppContext";
import Collapse from "react-bootstrap/Collapse";
import { useApi } from "../../../contextApi/ApiContexts/ApiContexts";
import { set } from "date-fns";
import { Dropdown } from "react-bootstrap";
import menuicon from "./../../../img/new/menu-icon.svg";
import "./header.css";
const HeaderBottom = () => {
  const {
    cms,
    itemMatrics,
    getItemMatrices,
    ItemGroup,
    getsecondItemMatrices,
    seconditemMatrics,
    get3rdItemMatrices,
    get4thItemMatrices,
    thirditemMatrics,
    forthitemMatrics,
  } = useAppContext();

  const { setGroupCod, setpr1, setpr2, setpr3, setpr4, setpr5 } = useApi();

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  const [show, setShow] = useState(false);
  const [openStates, setOpenStates] = useState([]);
  const [openSubCategoryStates, setOpenSubCategoryStates] = useState([]);
  const [open3rdCategoryStates, setOpen3rdCategoryStates] = useState([]);
  const [open4thCategoryStates, setOpen4thCategoryStates] = useState([]);

  const handelToggel = () => {
    setShow(!show);
  };

  const toggleCategory = async (index, groupcode, item) => {
    await getItemMatrices(groupcode);
    setGroupCod(groupcode);
    if (item?.count === 0) {
      handelToggel();
      return;
    }
    setpr1("");
    setpr2("");
    setpr3("");
    setpr4("");
    setOpenStates((prevStates) => {
      setOpenSubCategoryStates(Array(itemMatrics.length).fill(false));
      setOpen3rdCategoryStates(Array(thirditemMatrics.length).fill(false));
      setOpen4thCategoryStates(Array(forthitemMatrics.length).fill(false));

      const newStates = prevStates.map((state, i) => i === index && !state);
      return newStates;
    });
  };

  const toggleSubCategory = async (index, groupcode, pcode, item, prevItem) => {
    try {
      await getsecondItemMatrices(groupcode, pcode);
      setpr1(pcode);
      if (item?.count === 0 && prevItem.count === 1) {
        handelToggel();
        return;
      }
      setpr2("");
      setpr3("");
      setpr4("");
      setOpenSubCategoryStates((prevStates) => {
        // Close all other subcategories and their children
        setOpen3rdCategoryStates(Array(thirditemMatrics.length).fill(false));
        setOpen4thCategoryStates(Array(forthitemMatrics.length).fill(false));

        const newStates = Array(seconditemMatrics.length).fill(false);
        newStates[index] = !prevStates[index];
        return newStates;
      });
    } catch (error) {
      console.error("Error fetching second item matrices:", error);
    }
  };

  const toggle3rdCategory = async (index, groupcode, pcode, item, prevItem) => {
    try {
      await get3rdItemMatrices(groupcode, pcode);
      setpr2(pcode);
      if (item?.count === 0 && prevItem.count === 1) {
        handelToggel();
        return;
      }
      setpr3("");
      setpr4("");
      setOpen3rdCategoryStates((prevStates) => {
        // Close all other 3rd level categories and their children
        setOpen4thCategoryStates(Array(forthitemMatrics.length).fill(false));

        const newStates = Array(thirditemMatrics.length).fill(false);
        newStates[index] = !prevStates[index];
        return newStates;
      });
    } catch (error) {
      console.error("Error fetching 3rd item matrices:", error);
    }
  };

  const toggle4thCategory = async (index, groupcode, pcode, item, prevItem) => {
    try {
      await get4thItemMatrices(groupcode, pcode);
      setpr3(pcode);
      if (item?.count === 0 && prevItem.count === 1) {
        handelToggel();
        return;
      }
      setpr4("");
      setOpen4thCategoryStates((prevStates) => {
        const newStates = Array(forthitemMatrics.length).fill(false);
        newStates[index] = !prevStates[index];
        return newStates;
      });
    } catch (error) {
      console.error("Error fetching 4th item matrices:", error);
    }
  };

  const toggle5thCategory = async (index, groupcode, pcode) => {
    try {
      await get4thItemMatrices(groupcode, pcode);
      setpr4(pcode);
      setOpen4thCategoryStates((prevStates) => {
        const newStates = Array(forthitemMatrics.length).fill(false);
        newStates[index] = !prevStates[index];
        return newStates;
      });
    } catch (error) {
      console.error("Error fetching 4th item matrices:", error);
    }
  };

  useEffect(() => {
    setOpenStates(Array(cms.length).fill(false));
  }, [cms]);

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
    return () => {
      setGroupCod("");
      setpr1("");
      setpr2("");
      setpr3("");
      setpr4("");
    };
  }, [isInView]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="tp-header-bottom tp-header-bottom-border d-none d-lg-block " style={{background:'#1c69da'}}>
      <div className="container">
        <div className="tp-mega-menu-wrapper p-relative" ref={ref}>
          <div className="row align-items-center">
            <div className="dropAll col-xl-2 col-lg-2 " style={{marginRight: '70px'}}>
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                  All <img src={menuicon} alt="Nav" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.ItemText>
                    <b>Trending</b>
                  </Dropdown.ItemText>
                  <Dropdown.Item as={Link} to='/bestseller-product-list'>Bestsellers</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/clearence-product-list"> Clearance Sale</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/newLaunch-product-list">New Launch</Dropdown.Item>
                  <Dropdown.Item as={Link} to='/viewlogo' >Brands</Dropdown.Item>
                  <Dropdown.Item as={Link} to='/brandCatalogue' >Catalogue</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.ItemText>
                    <b>Help & Settings</b>
                  </Dropdown.ItemText>
                  <Dropdown.Item href="#.">Your Account</Dropdown.Item>
                  <Dropdown.Item href="#.">Customer Service</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="#.">Sign out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <div className="col-xl-3 col-lg-3" style={{background:'#ff7d00' }}>
              {/* <div className="categoryMenuBx">
                <link to="">Open</link>
                <div className="categoryMenu">
                  Body text
                  
                </div>
              </div> */}

              <div className="tp-header-category tp-category-menu tp-header-category-toggle dropdown">
                <button
                  onClick={handelToggel}
                  className="tp-category-menu-btn tp-category-menu-toggle w-100 dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{background:'#ff7d00'}}
                >
                  <span>
                    <svg
                      width="18"
                      height="16"
                      viewBox="0 0 18 14"
                      fill="none"
                      xmlns=""
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M0 1C0 0.447715 0.447715 0 1 0H15C15.5523 0 16 0.447715 16 1C16 1.55228 15.5523 2 15 2H1C0.447715 2 0 1.55228 0 1ZM0 7C0 6.44772 0.447715 6 1 6H17C17.5523 6 18 6.44772 18 7C18 7.55228 17.5523 8 17 8H1C0.447715 8 0 7.55228 0 7ZM1 12C0.447715 12 0 12.4477 0 13C0 13.5523 0.447715 14 1 14H11C11.5523 14 12 13.5523 12 13C12 12.4477 11.5523 12 11 12H1Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  All Products
                </button>

                <div
                  className={`dropdown-menu customDrop w-100 ${
                    show === true ? "show" : "hide"
                  }`}
                >
                  {/*-------- new top menu part start --------*/}
                  <ul>
                    {cms?.map((item, index) => (
                      <li key={index}>
                        <Link
                          to={`/product-list/${item.itmsGrpNam}/${item.itmsGrpCod}`}
                          onClick={() =>
                            toggleCategory(index, item.itmsGrpCod, item)
                          }
                          aria-controls={`categoryCollapse${index}`}
                          aria-expanded={openStates[index]}
                        >
                          {item?.itmsGrpNam}{" "}
                          {openStates[index] &&
                          itemMatrics &&
                          itemMatrics.length > 0
                            ? "-"
                            : item?.count === 0
                            ? ""
                            : "+"}
                        </Link>
                        <Collapse
                          in={
                            openStates[index] &&
                            itemMatrics &&
                            itemMatrics.length > 0
                          }
                        >
                          <ul>
                            {Array.isArray(itemMatrics) &&
                              itemMatrics.map((item1, index) => (
                                <li key={index}>
                                  <Link
                                    to={`/product-list/${item.itmsGrpNam}/${item1.pname}`}
                                    onClick={() =>
                                      toggleSubCategory(
                                        index,
                                        item1.u_ITMGRPCD,
                                        item1.pcode,
                                        item1,
                                        item
                                      )
                                    }
                                  >
                                    {item1.pname}{" "}
                                    {openSubCategoryStates[index] &&
                                    seconditemMatrics &&
                                    seconditemMatrics.length > 0
                                      ? "-"
                                      : item1?.count === 0
                                      ? ""
                                      : "+"}
                                  </Link>
                                  <Collapse
                                    in={
                                      openSubCategoryStates[index] &&
                                      seconditemMatrics &&
                                      seconditemMatrics.length > 0
                                    }
                                  >
                                    <ul>
                                      {Array.isArray(seconditemMatrics) &&
                                        seconditemMatrics.map(
                                          (subItem, index) => (
                                            <li key={index}>
                                              <Link
                                                to={`/product-list/${item.itmsGrpNam}/${subItem.pname}`}
                                                onClick={() =>
                                                  toggle3rdCategory(
                                                    index,
                                                    subItem.u_ITMGRPCD,
                                                    subItem.pcode,
                                                    subItem,
                                                    item1
                                                  )
                                                }
                                              >
                                                {subItem.pname}{" "}
                                                {open3rdCategoryStates[index] &&
                                                thirditemMatrics &&
                                                thirditemMatrics.length > 0
                                                  ? "-"
                                                  : subItem?.count === 0
                                                  ? ""
                                                  : "+"}
                                              </Link>
                                              <Collapse
                                                in={
                                                  open3rdCategoryStates[
                                                    index
                                                  ] &&
                                                  thirditemMatrics &&
                                                  thirditemMatrics.length > 0
                                                }
                                              >
                                                <ul>
                                                  {Array.isArray(
                                                    thirditemMatrics
                                                  ) &&
                                                    thirditemMatrics.map(
                                                      (subItem1, index) => (
                                                        <li key={index}>
                                                          <Link
                                                            to={`/product-list/${item.itmsGrpNam}/${subItem1.pname}`}
                                                            onClick={() =>
                                                              toggle4thCategory(
                                                                index,
                                                                subItem1.u_ITMGRPCD,
                                                                subItem1.pcode,
                                                                subItem1,
                                                                subItem
                                                              )
                                                            }
                                                          >
                                                            {subItem1.pname}{" "}
                                                            {open4thCategoryStates[
                                                              index
                                                            ] &&
                                                            forthitemMatrics &&
                                                            forthitemMatrics.length >
                                                              0
                                                              ? "-"
                                                              : subItem1?.count ===
                                                                0
                                                              ? ""
                                                              : "+"}
                                                          </Link>

                                                          <Collapse
                                                            in={
                                                              open4thCategoryStates[
                                                                index
                                                              ] &&
                                                              forthitemMatrics &&
                                                              forthitemMatrics.length >
                                                                0
                                                            }
                                                          >
                                                            <ul>
                                                              {Array.isArray(
                                                                forthitemMatrics
                                                              ) &&
                                                                forthitemMatrics.map(
                                                                  (
                                                                    subItem2,
                                                                    index
                                                                  ) => (
                                                                    <li
                                                                      key={
                                                                        index
                                                                      }
                                                                    >
                                                                      <Link
                                                                        to={`/product-list/${item.itmsGrpNam}/${subItem2.pname}`}
                                                                        onClick={() =>
                                                                          toggle5thCategory(
                                                                            index,
                                                                            subItem2.u_ITMGRPCD,
                                                                            subItem2.pcode
                                                                          )
                                                                        }
                                                                      >
                                                                        {
                                                                          subItem2.pname
                                                                        }
                                                                      </Link>
                                                                    </li>
                                                                  )
                                                                )}
                                                            </ul>
                                                          </Collapse>
                                                        </li>
                                                      )
                                                    )}
                                                </ul>
                                              </Collapse>
                                            </li>
                                          )
                                        )}
                                    </ul>
                                  </Collapse>
                                </li>
                              ))}
                          </ul>
                        </Collapse>
                      </li>
                    ))}
                  </ul>

                  {/*-------- new top menu part end --------*/}
                </div>
              </div>
            </div>

            <div className="col-xl-5 col-lg-5">
              <div className="main-menu menu-style-1">
                <nav className="tp-main-menu-content ">
                  <ul className="d-flex align-items-center justify-content-around">
                    <li>
                      <Link style={{color:'#fff'}} to="/">Home</Link>
                    </li>
                    {/* <li>
                      <Link to="/product-list">Store</Link>
                    </li> */}
                    <li>
                      <Link style={{color:'#fff'}} to="/our-story">Our Story</Link>
                    </li>
                    <li>
                      <Link style={{color:'#fff'}} to={"/contact-us"}>Contact Us</Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

            <div className="col-xl-1 col-lg-1">
              <div className="tp-header-contact d-flex align-items-center justify-content-end">
                <div className="tp-header-contact-icon">
                  <span>
                    <svg
                      width="21"
                      height="20"
                      viewBox="0 0 21 20"
                      fill="none"
                      xmlns=""
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M1.96977 3.24859C2.26945 2.75144 3.92158 0.946726 5.09889 1.00121C5.45111 1.03137 5.76246 1.24346 6.01544 1.49057H6.01641C6.59631 2.05874 8.26011 4.203 8.35352 4.65442C8.58411 5.76158 7.26378 6.39979 7.66756 7.5157C8.69698 10.0345 10.4707 11.8081 12.9908 12.8365C14.1058 13.2412 14.7441 11.9219 15.8513 12.1515C16.3028 12.2459 18.4482 13.9086 19.0155 14.4894V14.4894C19.2616 14.7414 19.4757 15.0537 19.5049 15.4059C19.5487 16.6463 17.6319 18.3207 17.2583 18.5347C16.3767 19.1661 15.2267 19.1544 13.8246 18.5026C9.91224 16.8749 3.65985 10.7408 2.00188 6.68096C1.3675 5.2868 1.32469 4.12906 1.96977 3.24859Z"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12.936 1.23685C16.4432 1.62622 19.2124 4.39253 19.6065 7.89874"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12.936 4.59337C14.6129 4.92021 15.9231 6.23042 16.2499 7.90726"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </div>
                <div className="tp-header-contact-content">
                  <h5 style={{color:'#fff'}}>Hotline:</h5>
                  <p>
                    <Link style={{color:'#fff'}} to="tel:0481505909">0481505909</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderBottom;
