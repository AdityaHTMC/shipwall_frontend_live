import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../contextApi/AppContext";

const WishList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { wishListItem, removeWishList, addToNewCart } = useAppContext();

  const itemsPerPage = 12;
  const totalItems = wishListItem.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const itemsToShow = Array.isArray(wishListItem)
    ? wishListItem.slice(startIndex, endIndex)
    : [];

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

  return (
    <section className="bg-light py-2">
      <h4 className="card-title mb-4 mt-4 text-bg-primary text-center p-3">
                  WishList
                </h4>
      <div className="container mt-4 mt-md-0 mt-lg-0">
        <div className="row">
          {itemsToShow.map((item) => (
            <div key={item.ItemCode} className="col-xl-2 col-md-2 col-sm-4 col-6 infinite-item">
              <div className="tp-product-item-2 mb-20">
                <div className="tp-product-thumb-2 p-relative z-index-1 fix w-img bg-white">
                  <Link to={`/product-details/${item.ItemId}`}>
                    <img
                      src={item.Image1 ? item.Image1 : ""}
                      width={120}
                      height={150}
                      alt={item.ItemName ? item.ItemName.slice(0, 20) : ""}
                    />
                  </Link>
                </div>
                <div className="tp-product-content-2 pt-15">
                  <h6>
                    <Link to={`/product-details/${item.ItemId}`}>
                      {item.ItemName ? item.ItemName.slice(0, 25) : ""}
                    </Link>
                  </h6>
                  <div className="tp-product-price-wrapper-2">
                    <span className="tp-product-price-2 new-price">
                      Price: AUD {item.Price}
                    </span>
                  </div>
                  <button
                    className="cartBtn mb-2"
                    onClick={() =>
                      addToNewCart({
                        itemCode: item.ItemCode,
                        quantity: 1,
                        price: item.Price,
                        itemName: item.ItemName,
                        image1: item.Image1,
                        fright1Amount: item.fright1Amount,
                        taxPerc: item.taxPerc,
                      })
                    }
                    type="button"
                  >
                   <i className="fas fa-cart-plus px-1 "></i>
                  </button>
                  <button
                    onClick={() => removeWishList(item.ItemCode)}
                    className="cartBtn"
                    type="button"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mx-auto">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={goToPrevPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }).map((_, index) => (
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
    </section>
  );
};

export default WishList;
