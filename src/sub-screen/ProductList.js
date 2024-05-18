import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ProductFilter from "../components/subscreen-componenets/ProductList-com/ProductFilter";
import ProductCategories from "../components/subscreen-componenets/ProductList-com/ProductCategories";
import ProductBrand from "../components/subscreen-componenets/ProductList-com/ProductBrand";
import ProductQuickView from "../components/normal/main-screen/ProductQuickView";
import { useAppContext } from "../contextApi/AppContext";
import Modal from "react-bootstrap/Modal";
import ProductCard from "../components/normal/Product-card/ProductCard";
import { useApi } from "../contextApi/ApiContexts/ApiContexts";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSpinner } from 'react-icons/fa';
import ProductColor from "../components/subscreen-componenets/ProductList-com/ProductColor";
import ProductDepthCategory from "../components/subscreen-componenets/ProductList-com/ProductDepthCategory";
import NewProductCard from "../components/normal/Product-card/NewProductCard";

const ProductList = () => {
  const { products, addToCart, addWishlist } = useAppContext();
  const { filterItem, getItem, groupCod, categorieslist, productLoading } = useApi();
  const { name, grpid } = useParams();

  const [currentPage, setCurrentPage] = useState(1);  
  const [displayedItems, setDisplayedItems] = useState(8);
  const itemsPerPage = 4;

  const filteredItemsWithImage1 = filterItem?.filter(item => item.image1);
  const location = useLocation();

  const handleLoadMore = () => {
    setDisplayedItems(displayedItems + itemsPerPage); 
  };

  return (
    <>

    {/* page breadcrumbs start */}
    <section className="pageBreadcrumbs">
        <article className="container">
          <ul>
            <li><Link className="text" to="/">Home</Link></li>
            <li>{name && <span>{name}</span>}</li>
            <li className="active">{grpid && <span>{grpid}</span>}</li>
          </ul>
        </article>
    </section>
    {/* page breadcrumbs end */}
      
      {/* page body part work start */}
      <section className="tp-shop-area pt-40 pb-40 pageBg">
        <div className="container">
          <div className="row">            
            <div className="col-xl-3 col-lg-4">
              <div className="sidebarFilterBx">
              <ProductDepthCategory />
              <ProductFilter list={filterItem} />
              <ProductCategories list={filterItem} />
              </div>
            </div>
            <div className="col-xl-9 col-lg-8">
              <div className="productCounter">{filterItem?.length} Products</div>
              {productLoading ? (
                <div className="text-center">
                  <FaSpinner className="fa-spin" size={50} />
                  <p>Loading...</p>
                </div>
              ) : (
                <div className="tp-shop-main-wrapper">
                  <div className="row h-100">
                    {Array.isArray(filteredItemsWithImage1) && filteredItemsWithImage1?.length > 0 ? (
                      filteredItemsWithImage1.slice(0, displayedItems).map((item) => (
                        <NewProductCard
                          key={item.cardcode}
                          item={item}
                          addWishlist={addWishlist}
                          addToCart={addToCart}
                        />
                      ))
                    ) : (
                      <p>No products available</p>
                    )}
                  </div>
                  {/* Add More button */}
                  {filterItem?.length > displayedItems && (
                    <div className="text-center mt-4">
                      <button className="btn btn-primary" onClick={handleLoadMore}>Add More</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* page body part work end */}
    </>
  );
};

export default ProductList;
