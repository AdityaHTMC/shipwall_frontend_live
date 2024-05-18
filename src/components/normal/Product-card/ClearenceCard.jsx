import React from "react";
import "./../../../css/mix.css";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../../../contextApi/AppContext";
import { useApi } from "../../../contextApi/ApiContexts/ApiContexts";
import newImage from '../../../img/new/no-image.jpg'
const ClearenceCard = ({ item, HandelQuickView, addWishlist, addToCart }) => {
  const location = useLocation();
  const { isLogIn } = useAppContext();
  const { setLoginShow } = useApi();

  if (!item) {
    return <div>No product found</div>;
  }
  const isHompage = location.pathname === "/";

  console.log(item, 'CIS');
  return (
    <>
      <div
        key={item._id}
        className="col-xl-3 col-md-3 col-sm-4 col-6 infinite-item"
      >
        <div className="tp-product-item-2 mb-20">
          <div className="tp-product-thumb-2 p-relative z-index-1 fix w-img bg-white">
            <Link to={`/product-details/${item._id}`}>
              <img
                src={item.image1 ? item.image1 : newImage}
                width={120}
                height={150}
                alt={item.itemName ? item.itemName.slice(0, 20) : ""}
              />
            </Link>
            {/* product action */}
            <div className="tp-product-action-2 tp-product-action-blackStyle bg-white"></div>
          </div>
          <div className="tp-product-content-2 pt-15 bg-white">
            {/* <div className="tp-product-tag-2">
              <Link to="#">{item.ItmsGrpNam || ""}</Link>
            </div> */}
            <h6>
              <Link to={`/product-details/${item._id}`}>
                {item.itemName ? item.itemName.slice(0, 20) : ""}
              </Link>
            </h6>
            <div className="tp-product-price-wrapper-2">

             {/* Render both price spans if itemPrice and salePrice are not equal */}
             {item.itemPrice !== item.salePrice ? (
                  <>
                    <span
                      className="tp-product-price-2 old-price"
                      style={{ marginLeft: "15px" }}
                    >
                      AUD{item.itemPrice}
                    </span>
                    <span
                      className="tp-product-price-2 old-price"
                      style={{ marginLeft: "15px" }}
                    >
                      AUD{item.salePrice}
                    </span>
                  </>
                ) : (
                  // Render only salePrice span if itemPrice and salePrice are equal
                  <span
                    className="tp-product-price-2 old-price"
                    style={{ marginLeft: "15px" }}
                  >
                    AUD{item.salePrice}
                  </span>
                )}

              <span className="tp-product-price-2 new-price" style={{marginLeft:'15px'}}>
              {item.clearanceSalePrice}
              </span>
              
                
             
            </div>
            <button
              className="cartBtn"
              onClick={() =>
                addToCart(
                  item.itemCode,
                  1,
                  item.clearanceSalePrice,
                  item.itemName,
                  item.discount,
                  item.image1,
                  item.itemAddCharges,
                  item.taxPerc
                )
              }
              type="button"
            >
              Add To Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClearenceCard;
