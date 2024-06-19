import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ProductFilter from "../components/subscreen-componenets/ProductList-com/ProductFilter";
import ProductCategories from "../components/subscreen-componenets/ProductList-com/ProductCategories";
import ProductBrand from "../components/subscreen-componenets/ProductList-com/ProductBrand";
import ProductQuickView from "../components/normal/main-screen/ProductQuickView";
import { useAppContext } from "../contextApi/AppContext";
import Modal from "react-bootstrap/Modal";
import ProductCard from "../components/normal/Product-card/ProductCard";
import ProductDepthCategory from "../components/subscreen-componenets/ProductList-com/ProductDepthCategory";
import { FaSpinner } from "react-icons/fa";
import NewProductCard from "../components/normal/Product-card/NewProductCard";
import { useApi } from "../contextApi/ApiContexts/ApiContexts";

const SearchProductList = () => {
  const { addToCart, addWishlist, addToNewCart } = useAppContext();
  const { productLoading, searchProduct, productBySearch, newfilter, filterItem } = useApi();

  const params = useParams();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const grpcode = searchParams.get("grp_code");
  const [displayedItems, setDisplayedItems] = useState(8);
  // const { products, addToCart, addWishlist, addToNewCart } = useAppContext();
  const [lgShow, setLgShow] = useState(false);
  const [productId, setProductId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (params.id) {
      const dataToSend = {
        keyword_search: params.id,
        itmsGrpCod: parseInt(grpcode) || '',
      };
      searchProduct(dataToSend);
    }
  }, [params?.id, grpcode]);

  const HandelQuickView = (id) => {
    setLgShow(true);
    setProductId(id);
  };

  const onHide = () => {
    setLgShow(false);
  };

  const itemsPerPage = 8;
  const totalItems = Array.isArray(productBySearch) && productBySearch?.length;
  const totalPages = Math.ceil(totalItems / displayedItems);
  const startIndex = (currentPage - 1) * displayedItems;
  const endIndex = Math.min(startIndex + displayedItems, totalItems);
  const itemsToShow = Array.isArray(productBySearch) && productBySearch?.slice(startIndex, endIndex);

  // console.log(productBySearch,'pbs')

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

  const handleLoadMore = () => {
    setDisplayedItems(displayedItems + itemsPerPage);
  };

  console.log(filterItem,newfilter,productBySearch,'pdff')

  return (
    <>
      {lgShow === true ? (
        <Modal
          size="xl"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Body className="h-75">
            <ProductQuickView onHide={onHide} productId={productId} />
          </Modal.Body>
        </Modal>
      ) : null}
      <section className="tp-shop-area pt-40 pb-40 pageBg">
        <div className="container">

          
          <div className="row">
            <div className="col-xl-3 col-lg-4">
              <div className="sidebarFilterBx">
                {/* <ProductDepthCategory /> */}
                <ProductFilter list={filterItem} newfilter={newfilter} searchQuery={params.id} searchPrcice={2} />
                {/* <ProductCategories /> */}
              </div>
            </div>
            <div className="col-xl-9 col-lg-8">
              <div className="productCounter">
                search results for {params?.id.slice(0, 30)} {params?.id?.length > 30 && '...'} {" "}
                {productBySearch?.length > 0
                  ? `${totalItems} Products`
                  : "Products"}
              </div>
              {productLoading ? (
                <div className="text-center">
                  <FaSpinner className="fa-spin" size={50} />
                  <p>Loading...</p>
                </div>
              ) : (
                <div className="tp-shop-main-wrapper">
                  <div className="row h-100">
                    {Array.isArray(itemsToShow) && itemsToShow?.length > 0 ? (
                      itemsToShow
                        .slice(0, itemsPerPage)
                        .map((item) => (
                          <NewProductCard
                            key={item.cardcode}
                            item={item}
                            addWishlist={addWishlist}
                            addToCart={addToNewCart}
                          />
                        ))
                    ) : (
                      <p>No products available</p>
                    )}
                  </div>

                  {/* {currentPage < totalPages && (
                    <div className="text-center mt-4">
                      <button
                        className="btn btn-primary"
                        onClick={handleLoadMore}
                      >
                        Add More
                      </button>
                    </div>
                  )} */}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="tp-shop-area pt-90 pb-90">
        <div className="container">
          {/* <div className="row">
            <div className="col-xl-3 col-lg-4"> */}
          {/* Sidebar section
              <ProductFilter />
              <ProductCategories />
              <ProductBrand />
            </div>
            <div className="col-xl-9 col-lg-8">
              <div className="tp-shop-main-wrapper">
                <div className="row h-100">
                  {itemsToShow.map((item) => (
                    <ProductCard
                      item={item}
                      HandelQuickView={HandelQuickView}
                      addWishlist={addWishlist}
                      addToCart={addToCart}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div> */}
          <div className="d-flex justify-content-center mt-0">
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
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
        </div>
      </section>

      {/* Quick view modal */}
      {lgShow && (
        <ProductQuickView
          onHide={() => setLgShow(false)}
          productId={productId}
        />
      )}
    </>
  );
};

export default SearchProductList;
