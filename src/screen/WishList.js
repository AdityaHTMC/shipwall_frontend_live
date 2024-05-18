import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../contextApi/AppContext';

const WishList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {wishListItem , removeWishList , addToCart} = useAppContext()

console.log('wishinggggg' ,wishListItem)
  const itemsPerPage = 5;
  const totalItems = wishListItem.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const itemsToShow = Array.isArray(wishListItem) ? wishListItem.slice(startIndex, endIndex) : [];

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
      <div className="container mt-4 mt-md-0 mt-lg-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="card border shadow-0">
              <div className="m-4">
                <h4 className="card-title mb-4 mt-4 text text-bg-primary text-center p-3">WishList</h4>
                {itemsToShow.map((item) => (
                  <div key={item.ItemCode} className="row gy-3 mb-4">
                    <div className="col-lg-5">
                      <div className="me-lg-5">
                        <div className="d-flex">
                        <Link
                         to={`/product-details/${item.ItemId}`}
                          className="nav-link">
                        <img
                          src={item.Image1}
                          className="border rounded me-3"
                          style={{ width: '96px', height: '96px' }}
                          alt="Wishlisted Item"
                        />
                        </Link>
                          <div className="">
                            <Link
                             to={`/product-details/${item.ItemId}`}
                              className="nav-link">
                              {item?.ItemName?.slice(0,15)}
                            </Link>
                            {/* <p className="text-muted">{item.category.name}</p> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                      <div className="float-md-end">
                        {/* <button onClick={()=>{addToCart(item.ItemCode, 1)}} className="btn btn-light border px-2 mx-1 icon-hover-primary">
                          <i className="fas fa-cart-plus px-1 text-secondary"></i>
                        </button> */}
                        <button onClick={() => {removeWishList(item.ItemCode)}} className="btn btn-light border text-danger icon-hover-danger">
                        <i class="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </div>
                    <hr/>
                  </div>
                ))}
              </div>
              <div className="text-center mx-auto">
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
              {/* <div className="border-top pt-4 mx-4 mb-4">
                <p>
                  <i className="fas fa-truck text-muted fa-lg" /> Free Delivery
                  within 1-2 weeks
                </p>
                <p className="text-muted">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WishList;
