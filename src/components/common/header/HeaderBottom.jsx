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
import { IoNavigate } from "react-icons/io5";
import { GoArrowUpRight } from "react-icons/go";


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
      const newStates = [...prevStates];
      newStates[index] = !prevStates[index];
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
        const newStates = [...prevStates];
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
        const newStates = [...prevStates];
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
        const newStates = [...prevStates];
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
        const newStates = [...prevStates];
        newStates[index] = !prevStates[index];
        return newStates;
      });
    } catch (error) {
      console.error("Error fetching 4th item matrices:", error);
    }
  };

  useEffect(() => {
    setOpenStates(Array(cms.length).fill(false));
    setOpenSubCategoryStates([]);
    setOpen3rdCategoryStates([]);
    setOpen4thCategoryStates([]);
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

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 200) {
  //       setShow(false);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  return (
    <div className="tp-header-bottom tp-header-bottom-border" style={{ background: '#1c69da' }}>
      <div className="mobileNavBox" ref={ref}>
        <div style={{ background: '#ff7d00' }}>
          <div className="tp-header-category tp-category-menu tp-header-category-toggle dropdown">
            <button
              onClick={handelToggel}
              className="tp-category-menu-btn tp-category-menu-toggle w-100 dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ background: '#ff7d00' }}
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
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 1C0 0.447715 0.447715 0 1 0H15C15.5523 0 16 0.447715 16 1C16 1.55228 15.5523 2 15 2H1C0.447715 2 0 1.55228 0 1ZM0 7C0 6.44772 0.447715 6 1 6H17C17.5523 6 18 6.44772 18 7C18 7.55228 17.5523 8 17 8H1C0.447715 8 0 7.55228 0 7ZM1 12C0.447715 12 0 12.4477 0 13C0 13.5523 0.447715 14 1 14H11C11.5523 14 12 13.5523 12 13C12 12.4477 11.5523 12 11 12H1Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              All Products
            </button>

            <div
              className={`dropdown-menu customDrop w-100 ${show === true ? "show" : "hide"}`}
            >
              {/*-------- new top menu part start --------*/}
              <ul>
                {cms?.map((item, index) => (
                  <li key={index}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCategory(index, item.itmsGrpCod, item);
                      }}
                      aria-controls={`categoryCollapse${index}`}
                      aria-expanded={openStates[index]}
                    >
                      {item?.itmsGrpNam}{" "}
                      {openStates[index] && itemMatrics && itemMatrics.length > 0 ? "-" : item?.count === 0 ? "" : "+"}
                    </button> &nbsp; &nbsp;
                    <Link  onClick={(e) => {
                        toggleCategory(index, item.itmsGrpCod, item);
                      }} to={`/product-list/${item.itmsGrpNam}/${item.itmsGrpCod}`}><GoArrowUpRight /></Link>
                    <Collapse
                      in={openStates[index] && itemMatrics && itemMatrics.length > 0}
                    >
                      <ul>
                        {Array.isArray(itemMatrics) && itemMatrics.map((item1, index1) => (
                          <li key={index1}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSubCategory(index1, item1.u_ITMGRPCD, item1.pcode, item1, item);
                              }}
                            >
                              {item1.pname}{" "}
                              {openSubCategoryStates[index1] && seconditemMatrics && seconditemMatrics.length > 0 ? "-" : item1?.count === 0 ? "" : "+"}
                            </button> &nbsp;
                            <Link onClick={(e) => {
                                
                                toggleSubCategory(index1, item1.u_ITMGRPCD, item1.pcode, item1, item);
                              }} to={`/product-list/${item.itmsGrpNam}/${item1.pname}`}><GoArrowUpRight /></Link>
                            <Collapse
                              in={openSubCategoryStates[index1] && seconditemMatrics && seconditemMatrics.length > 0}
                            >
                              <ul>
                                {Array.isArray(seconditemMatrics) && seconditemMatrics.map((subItem, index2) => (
                                  <li key={index2}>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggle3rdCategory(index2, subItem.u_ITMGRPCD, subItem.pcode, subItem, item1);
                                      }}
                                    >
                                      {subItem.pname}{" "}
                                      {open3rdCategoryStates[index2] && thirditemMatrics && thirditemMatrics.length > 0 ? "-" : subItem?.count === 0 ? "" : "+"}
                                    </button> &nbsp;
                                    <Link  onClick={(e) => {
                                        e.stopPropagation();
                                        toggle3rdCategory(index2, subItem.u_ITMGRPCD, subItem.pcode, subItem, item1);
                                      }} to={`/product-list/${item.itmsGrpNam}/${subItem.pname}`} ><GoArrowUpRight /></Link>
                                    <Collapse
                                      in={open3rdCategoryStates[index2] && thirditemMatrics && thirditemMatrics.length > 0}
                                    >
                                      <ul>
                                        {Array.isArray(thirditemMatrics) && thirditemMatrics.map((subItem1, index3) => (
                                          <li key={index3}>
                                            <button
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                toggle4thCategory(index3, subItem1.u_ITMGRPCD, subItem1.pcode, subItem1, subItem);
                                              }}
                                            >
                                              {subItem1.pname}{" "}
                                              {open4thCategoryStates[index3] && forthitemMatrics && forthitemMatrics.length > 0 ? "-" : subItem1?.count === 0 ? "" : "+"}
                                            </button> &nbsp;
                                            <Link  onClick={(e) => {
                                                e.stopPropagation();
                                                toggle4thCategory(index3, subItem1.u_ITMGRPCD, subItem1.pcode, subItem1, subItem);
                                              }} to={`/product-list/${item.itmsGrpNam}/${subItem1.pname}`} ><GoArrowUpRight /></Link>
                                            <Collapse
                                              in={open4thCategoryStates[index3] && forthitemMatrics && forthitemMatrics.length > 0}
                                            >
                                              <ul>
                                                {Array.isArray(forthitemMatrics) && forthitemMatrics.map((subItem2, index4) => (
                                                  <li key={index4}>
                                                    <button
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggle5thCategory(index4, subItem2.u_ITMGRPCD, subItem2.pcode);
                                                      }}
                                                    >
                                                      {subItem2.pname}
                                                    </button> &nbsp;
                                                    <Link  onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggle5thCategory(index4, subItem2.u_ITMGRPCD, subItem2.pcode);
                                                      }} to={`/product-list/${item.itmsGrpNam}/${subItem2.pname}`} ><GoArrowUpRight /></Link>
                                                  </li>
                                                ))}
                                              </ul>
                                            </Collapse>
                                          </li>
                                        ))}
                                      </ul>
                                    </Collapse>
                                  </li>
                                ))}
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
      </div>
    </div>
  );
};

export default HeaderBottom;