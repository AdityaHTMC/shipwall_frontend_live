import React from "react";
import "./../../../css/mix.css";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../../../contextApi/AppContext";
import { useApi } from "../../../contextApi/ApiContexts/ApiContexts";
import noImage from "../../../img/new/no-image.jpg";

const ProductCard = ({ item, HandelQuickView, addWishlist, addToCart }) => {
  const location = useLocation();
  const { isLogIn } = useAppContext();
  const { setLoginShow } = useApi();

  if (!item) {
    return <div>No product found</div>;
  }
  const isHompage = location.pathname === "/";

  // console.log(item,'trending IP');

  const priceToPass =
    item.clearanceSalePrice > 0
      ? item.clearanceSalePrice
      : item.salePrice > 0
      ? item.salePrice
      : item.itemPrice;

  return (
    <>
      <div key={item._id} className="infinite-item">
        <div className="tp-product-item-2 mb-40">
          <div className="tp-product-thumb-2 p-relative z-index-1 fix w-img">
            <Link to={`/product-details/${item._id}`}>
              <img
                src={item.image1 ? item.image1 : ""}
                width={120}
                height={150}
                alt={item.itemName ? item.itemName.slice(0, 20) : ""}
              />
            </Link>
            {/* product action */}
            <div className="tp-product-action-2 tp-product-action-blackStyle"></div>
          </div>
          <div className="tp-product-content-2 pt-15">
            {/* <div className="tp-product-tag-2">
              <Link to="#">{item.ItmsGrpNam || ""}</Link>
            </div> */}
            <h6>
              <Link to={`/product-details/${item._id}`}>
                {item?.itemName
                  ? item?.itemName?.length > 30
                    ? `${item?.itemName.slice(0, 34)}...`
                    : item.itemName
                  : ""}
              </Link>
            </h6>
            <Link to={`/product-details/${item._id}`}><p className="mt-2" align="center"> {item?.itemCode} </p> </Link>
            
            <div className="tp-product-price-wrapper-2 mt-0">
              <span className="tp-product-price-2 new-price">
                {isLogIn ? (
                  `AUD ${
                    item.isClearance === "Yes"
                      ? item.clearanceSalePrice
                      : item.salePrice > 0
                      ? item.salePrice
                      : item.itemPrice
                  }`
                ) : (
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => setLoginShow(true)}
                  >
                    Login to show Price
                  </span>
                )}
              </span>

              {isLogIn &&
              ((item.isClearance === "Yes" &&
                item.clearanceSalePrice !== item.itemPrice) ||
                (item.isClearance === "No" &&
                  item.salePrice > 0 &&
                  item.salePrice !== item.itemPrice)) ? (
                <span
                  className="tp-product-price-2 old-price"
                  style={{ marginLeft: "15px" }}
                >
                  AUD {item.itemPrice}
                </span>
              ) : null}
            </div>
            <button
              className="cartBtn"
              onClick={() =>
                addToCart({
                  itemCode: item.itemCode,
                  quantity: 1,
                  price: priceToPass,
                  itemName: item.itemName,
                  image1: item.image1,
                  fright1Amount: item.itemAddCharges,
                  taxPerc: item.taxPerc,
                })
              }
              type="button"
            >
              Add to Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
