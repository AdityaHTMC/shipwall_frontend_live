import React from "react";
import ProductDetailTop from "../components/subscreen-componenets/ProductDetailTop";
import { Link, useParams } from "react-router-dom";
import { useAppContext } from "../contextApi/AppContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import ReactQuill from "react-quill";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa6";
import { useApi } from "../contextApi/ApiContexts/ApiContexts";

// const base_url = "https://shipwall.au/WCF_API_HTTPS"; //SAP Base URL
const baseURL2 = "https://shipwall.au/test/API/shipwall"; // Node Api Base URL

const ProductDetail = () => {
  const { cardCode, access, baseURL2, base_url, bplId } = useApi();

  const {
    products,
    addWishlist,
    addToCart,
    getSapItem,
    sapItem,
    isLogIn,
    addToNewCart,
  } = useAppContext();
  const groupCodes = localStorage.getItem("groupCode9");
  const { id } = useParams();
  const { setLoginShow } = useApi();
  // const [ProductDetails, setProductDetails] = useState(null);
  const [productQuantity, setProductQuantity] = useState(1);
  const [ProductDetails, setproductDetails] = useState({});
  const [warehouseData, setWarehouseData] = useState({});
  const [activeTab, setActiveTab] = useState("description");
  const [cleanedDescription, setCleanedDescription] = useState("");
  const [ProductDesc, setProductDesc] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const ProductDetailApi = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${baseURL2}/api/v1/item/detail`,
        {
          item_id: id,
          cardCode: cardCode,
          bplId: bplId,
          groupCode: Number(groupCodes),
        },
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${access}`,
          },
        }
      );

      const { data } = response;
      setproductDetails(data.data);
      await getSapItem(data.data.itemCode);
    } catch (error) {
      console.log(error, "error my-context");
    } finally {
      setLoading(false); // Set loading to false when data is fetched
    }
  };

  const ProductDescription = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${baseURL2}/api/v1/item/description/details/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${access}`,
          },
        }
      );

      const { data } = response;
      setProductDesc(data.data);
    } catch (error) {
      console.log(error, "error product description");
    } finally {
      setLoading(false); // Set loading to false when data is fetched
    }
  };

  console.log(ProductDetails, "ProductDetails");
  console.log(ProductDesc, "product description");

  const priceToPass =
    ProductDetails.clearanceSalePrice > 0
      ? ProductDetails.clearanceSalePrice
      : ProductDetails.salePrice > 0
      ? ProductDetails.salePrice
      : ProductDetails.itemPrice;

  const tabButtonStyle = {
    border: "none",
    background: "none",
    cursor: "pointer",
    marginRight: "20px",
    fontSize: "16px",
    fontWeight: "600",
    color: "#333",
    padding: "5px 10px",
    borderBottom: "2px solid transparent",
    transition: "border-bottom 0.3s ease",
    outline: "none",
  };

  const activeTabButtonStyle = {
    ...tabButtonStyle,
    borderBottom: "2px solid #007bff",
    color: "#007bff",
  };

  const getFormattedDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };

  const [isWishlistClicked, setIsWishlistClicked] = useState(false);
  const handleWishlistClick = () => {
    addWishlist(
      ProductDetails.itemCode,
      ProductDetails.itemPrice,
      ProductDetails.itemName,
      ProductDetails.image1,
      id,
      ProductDetails.itemAddCharges,
      ProductDetails.taxPerc
    );
    setIsWishlistClicked(!isWishlistClicked);
  };

  const {
    itemName,
    ItmsGrpCod,
    itmsGrpNam,
    image1,
    image2,
    image3,
    image4,
    itemCode,
    description,
    technical_information,
    shipping_information,
    attribute_value,
    brochure,
    itemQty,
  } = ProductDetails;

  // const { itemPrice, itemQty } = sapItem;

  useEffect(() => {
    if (description) {
      // Create a temporary element to hold the description HTML
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = description;

      // Remove <br> tags and trim unnecessary whitespace
      const cleanedHTML = tempDiv.innerHTML
        .replace(/<br\s*\/?>/gi, "") // Remove <br> tags
        .trim(); // Trim whitespace

      // Set the cleaned HTML to state
      setCleanedDescription(cleanedHTML);
    }
  }, [description]);

  useEffect(() => {
    const fetchData = async () => {
      await ProductDetailApi();
      await ProductDescription();
      setTimeout(async () => {
        await warehouse();
      }, 1000);
    };

    fetchData();
  }, [id]);

  const warehouse = async () => {
    try {
      // const cardCode = localStorage.getItem("username");
      // const access = localStorage.getItem("accessC");
      const ic = ProductDetails.itemCode;
      console.log(ic, "ic");
      const response = await axios.get(
        `${base_url}/api/Document/GET_ITEM_BR_DETAILS/${cardCode}/${getFormattedDate()}/${ic}`,
        // Include request body if require
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
        }
      );

      const { data } = response;
      setWarehouseData(data.data);
      console.log(data, "whd");
    } catch (error) {
      console.log(error, "error my-context");
    }
  };

  useEffect(() => {
    // Trigger warehouse function only when itemCode is available
    if (ProductDetails.itemCode) {
      const fetchData = async () => {
        await warehouse(); // Fetch Warehouse Data using itemCode from ProductDetailApi
      };

      fetchData();
    }
  }, [ProductDetails.itemCode]);

  const decrementQuantity = async () => {
    if (productQuantity > 1) {
      const newQuantity = productQuantity - 1;
      setProductQuantity(newQuantity);
    }
  };

  const incrementQuantity = async () => {
    const newQuantity = productQuantity + 1;
    setProductQuantity(newQuantity);
  };

  const handledhownloadbrochure = async () => {
    const documentFile = brochure;
    try {
      const downloadURL = `${baseURL2}/uploads/product_brochure/${documentFile}`;
      const response = await fetch(downloadURL);
      if (response.ok) {
        const blob = await response.blob();
        const downloadLink = document.createElement("a");
        const blobURL = URL.createObjectURL(blob);
        downloadLink.href = blobURL;
        downloadLink.download = documentFile;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      } else {
        console.error("Failed to fetch file:", response.statusText);
      }
    } catch (error) {
      console.error("Error during file download:", error);
    }
  };

  return (
    <>
      {/* page breadcrumbs start */}
      <section className="pageBreadcrumbs mb-5">
        <article className="container">
          <ul>
            <li>
              <Link className="text" to="/">
                Home
              </Link>
            </li>
            <li className="active">{ProductDetails?.itmsGrpNam}</li>
          </ul>
        </article>
      </section>
      {/* page breadcrumbs end */}

      {/* product uppar part start */}
      <section className="tp-product-details-area">
        <div className="tp-product-details-top pb-40">
          <div className="container">
            <div className="row">
              <div className="col-xl-5 col-lg-5 col-md-5 col-sm-6 col-12">
                <div className="tp-product-details-thumb-wrapper tp-tab d-sm-flex productZoomBx">
                  <nav>
                    <div
                      className="nav nav-tabs flex-sm-column "
                      id="productDetailsNavThumb"
                      role="tablist"
                    >
                      <button
                        className="nav-link active"
                        id="nav-1-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-1"
                        type="button"
                        role="tab"
                        aria-controls="nav-1"
                        aria-selected="true"
                      >
                        <img src={image1} alt="" />
                      </button>
                      <button
                        className="nav-link"
                        id="nav-2-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-2"
                        type="button"
                        role="tab"
                        aria-controls="nav-2"
                        aria-selected="false"
                      >
                        <img src={image2} alt="" />
                      </button>
                      <button
                        className="nav-link"
                        id="nav-3-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-3"
                        type="button"
                        role="tab"
                        aria-controls="nav-3"
                        aria-selected="false"
                      >
                        <img src={image3} alt="" />
                      </button>
                      <button
                        className="nav-link"
                        id="nav-4-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-4"
                        type="button"
                        role="tab"
                        aria-controls="nav-4"
                        aria-selected="false"
                      >
                        <img src={image4} alt="" />
                      </button>
                    </div>
                  </nav>
                  <div
                    className="tab-content m-img"
                    id="productDetailsNavContent"
                  >
                    <div
                      className="tab-pane fade show active"
                      id="nav-1"
                      role="tabpanel"
                      aria-labelledby="nav-1-tab"
                      tabindex="0"
                    >
                      <div className="productZoomImg">
                        <img src={image1} alt="" />
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="nav-2"
                      role="tabpanel"
                      aria-labelledby="nav-2-tab"
                      tabindex="0"
                    >
                      <div className="productZoomImg">
                        <img src={image2} alt="" />
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="nav-3"
                      role="tabpanel"
                      aria-labelledby="nav-3-tab"
                      tabindex="0"
                    >
                      <div className="productZoomImg">
                        <img src={image3} alt="" />
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="nav-4"
                      role="tabpanel"
                      aria-labelledby="nav-4-tab"
                      tabindex="0"
                    >
                      <div className="productZoomImg">
                        <img src={image4} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>{" "}
              {/* col end */}
              <div className="col-xl-7 col-lg-7 col-md-7 col-sm-6 col-12">
                <div className="tp-product-details-wrapper productDtlsBx">
                  <h4>{itemName}</h4>
                  <h6>Item Code : {itemCode}</h6>
                  <h5 className="fw-bold text-primary">
                    {/* {isLogIn ? (
                      `AUD ${
                        ProductDetails?.clearanceSalePrice > 0
                          ? ProductDetails?.clearanceSalePrice
                          : ProductDetails?.salePrice > 0
                          ? ProductDetails?.salePrice
                          : ProductDetails?.itemPrice
                      }`
                    ) : (
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => setLoginShow(true)}
                      >
                        Login to show Price
                      </span>
                    )} */}

                    {isLogIn ? (
                      `AUD ${
                        ProductDetails.isClearance === "Yes"
                          ? ProductDetails.clearanceSalePrice
                          : ProductDetails.salePrice > 0
                          ? ProductDetails.salePrice
                          : ProductDetails.itemPrice
                      }`
                    ) : (
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => setLoginShow(true)}
                      >
                        Login to show Price
                      </span>
                    )}
                  </h5>
                  <ul className="infoList">
                    {attribute_value?.map((item, index) => (
                      <>
                        {item.attribute && (
                          <li key={index}>
                            {item.attribute} : {item.value}
                          </li>
                        )}
                      </>
                    ))}
                  </ul>

                  <div className="d-flex">
                    <h5 className="me-3 text-success">
                      {itemQty > 0 ? (
                        <>
                          <span>In Stock</span> <span>{itemQty}</span>
                        </>
                      ) : (
                        <span className="text text-danger">
                          Contact branch for Stock
                        </span>
                      )}
                    </h5>

                    <button className="btn btn-secondary rounded-pill btn-sm">
                      &nbsp;&nbsp;CHECK LOCATION WISE STOCK&nbsp;&nbsp;
                    </button>
                  </div>
                  <hr className="mt-2 mb-0" />
                  {/* <p className="mb-1">12 people are viewing this right now</p> */}

                  <ul className="btnBx mb-1 mt-2">
                    <li>
                      <div className="tp-product-quantity mb-15">
                        <span
                          onClick={decrementQuantity}
                          className="tp-cart-minus"
                        >
                          <FaMinus />
                        </span>
                        <input
                          className="tp-cart-input"
                          type="text"
                          Value={productQuantity}
                          min={1}
                          onChange={(e) =>
                            setProductQuantity(Number(e.target.value))
                          }
                        />
                        <span
                          onClick={incrementQuantity}
                          className="tp-cart-plus"
                        >
                          <FaPlus />
                        </span>
                      </div>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          if (itemQty > 0) {
                            addToNewCart({
                              itemCode: ProductDetails.itemCode,
                              quantity: productQuantity,
                              price: priceToPass,
                              itemName: ProductDetails.itemName,
                              image1: ProductDetails.image1,
                              fright1Amount: ProductDetails.itemAddCharges,
                              taxPerc: ProductDetails.taxPerc,
                            });
                          } else {
                            alert("Contact branch for Stock");
                          }
                        }}
                        className="btn btn-primary rounded-pill"
                      >
                        <b>&nbsp;&nbsp;&nbsp;Add To Order&nbsp;&nbsp;&nbsp;</b>
                      </button>
                    </li>
                    {/* <li>
                          <button className="btn btn-warning rounded-pill" type="button">&nbsp;&nbsp;&nbsp;<b>BUY IT NOW</b>&nbsp;&nbsp;&nbsp;</button>
                        </li> */}
                    <li>
                      <button
                        onClick={handleWishlistClick}
                        type="button"
                        className={`btn btn-outline-danger rounded-pill ${
                          isWishlistClicked ? "wishlist-clicked" : ""
                        }`}
                      >
                        &nbsp;&nbsp;
                        {isWishlistClicked ? (
                          <AiFillHeart className="heart-icon" />
                        ) : (
                          <AiOutlineHeart className="heart-icon" />
                        )}
                        &nbsp; Add to Wishlist &nbsp;&nbsp;
                      </button>
                    </li>
                  </ul>

                  <ul className="btnBx">
                    <li>
                      {brochure && (
                        <button
                          onClick={handledhownloadbrochure}
                          type="button"
                          className="btn btn-primary rounded-pill"
                        >
                          &nbsp;&nbsp;&nbsp;
                          <FaDownload />
                          &nbsp;<b>TECHNICAL DATASHEET DOWNLOAD</b>
                          &nbsp;&nbsp;&nbsp;
                        </button>
                      )}
                    </li>
                    <li>
                      <button
                        class="btn btn-primary rounded-pill"
                        type="button"
                      >
                        &nbsp;&nbsp;&nbsp;<b>INQUIRY FOR BULK</b>
                        &nbsp;&nbsp;&nbsp;
                      </button>
                    </li>
                  </ul>
                  {/* <div className="tp-product-details-category">
                <span>{itmsGrpNam ? itmsGrpNam : ""}</span>
                </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* product uppar part end */}

      <section className="container mb-5">
        <div className="row">
          {/* Tab buttons */}
          <div className="mt-8" align="center">
            <button
              style={
                activeTab === "description"
                  ? activeTabButtonStyle
                  : tabButtonStyle
              }
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
            <button
              style={
                activeTab === "technical"
                  ? activeTabButtonStyle
                  : tabButtonStyle
              }
              onClick={() => setActiveTab("technical")}
            >
              Technical Information
            </button>
            <button
              style={
                activeTab === "shipping" ? activeTabButtonStyle : tabButtonStyle
              }
              onClick={() => setActiveTab("shipping")}
            >
              Shipping Information
            </button>
          </div>

          {/* Tab content */}

          {activeTab === "description" && (
            <div className="tp-product-details-description">
              {ProductDesc?.description ? (
                <ReactQuill
                  value={ProductDesc?.description}
                  readOnly={true}
                  modules={{ toolbar: false }}
                  theme="snow"
                />
              ) : (
                <p
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    fontSize: "16px",
                    color: "#555",
                    backgroundColor: "#f9f9f9",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    marginTop: "15px",
                  }}
                >
                  No additional description is available.
                </p>
              )}
            </div>
          )}

          {activeTab === "technical" && (
            <div className="tp-product-details-description">
              {ProductDesc?.technical_information ? (
                <ReactQuill
                  value={ProductDesc?.technical_information}
                  readOnly={true}
                  modules={{ toolbar: false }}
                  theme="snow"
                />
              ) : (
                <p
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    fontSize: "16px",
                    color: "#555",
                    backgroundColor: "#f9f9f9",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    marginTop: "15px",
                  }}
                >
                  No additional technical information is available.
                </p>
              )}
            </div>
          )}
          {activeTab === "shipping" && (
            <div className="tp-product-details-description">
              {ProductDesc?.shipping_information ? (
                <ReactQuill
                  value={ProductDesc.shipping_information}
                  readOnly={true}
                  modules={{ toolbar: false }}
                  theme="snow"
                />
              ) : (
                <p
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    fontSize: "16px",
                    color: "#555",
                    backgroundColor: "#f9f9f9",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    marginTop: "15px",
                  }}
                >
                  No additional shipping information is available.
                </p>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ProductDetail;
