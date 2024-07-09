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
import ClearenceCard from "../components/normal/Product-card/ClearenceCard";

import '../css/newStyle.css';

const ClearenceProductList = () => {
  const { products, addToCart, addWishlist,addToNewCart } = useAppContext();
  const { filterItem, getClearenceItem, groupCod, categorieslist, productLoading , setClearenceData,clearenceData , clearenceDataFilter} = useApi();
  const { name, grpid } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [displayedItems, setDisplayedItems] = useState(6);
  const itemsPerPage = 6;
  const filteredItemsWithImage1 = clearenceData?.filter(item => item.image1);
  const location = useLocation();

  useEffect(()=>{
    // setClearenceData({isClearance: 'Yes'})
    const dataToSend = {
        isClearance: 'Yes'
    }
    getClearenceItem(dataToSend)
  },[])

  const handleLoadMore = () => {
    setDisplayedItems(displayedItems + itemsPerPage); 
  };

  return (
    <>
       <section className="pageBreadcrumbs">
        <article className="container">
          <ul>
            <li><Link className="text" to="/">Home</Link></li>
            <li className="active">Special Sales</li>
            {/* <li>{name && <span>{name}</span>}</li> */}
          </ul>
        </article>
    </section>

      <section className="tp-shop-area pt-90 pb-90">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-4">
              <ProductFilter clearence={1} newfilter={clearenceDataFilter}/>
              {/* <ProductCategories list={filterItem} /> */}
              {/* <ProductDepthCategory 
               /> */}
            </div>
            <div className="col-xl-9 col-lg-8">
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
                        <ClearenceCard
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
    </>
  );
};

export default ClearenceProductList;
