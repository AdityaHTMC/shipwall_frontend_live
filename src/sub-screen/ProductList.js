import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import ProductFilter from "../components/subscreen-componenets/ProductList-com/ProductFilter";
import ProductCategories from "../components/subscreen-componenets/ProductList-com/ProductCategories";
import ProductBrand from "../components/subscreen-componenets/ProductList-com/ProductBrand";
import ProductQuickView from "../components/normal/main-screen/ProductQuickView";
import { useAppContext } from "../contextApi/AppContext";
import Modal from "react-bootstrap/Modal";
import ProductCard from "../components/normal/Product-card/ProductCard";
import { useApi } from "../contextApi/ApiContexts/ApiContexts";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSpinner } from "react-icons/fa";
import ProductColor from "../components/subscreen-componenets/ProductList-com/ProductColor";
import ProductDepthCategory from "../components/subscreen-componenets/ProductList-com/ProductDepthCategory";
import NewProductCard from "../components/normal/Product-card/NewProductCard";

const ProductList = () => {
  const { products, addToCart, addWishlist, addToNewCart } = useAppContext();
  const { filterItem, getItem, groupCod, categorieslist, productLoading,newfilter, setpr1, setpr2, setpr3, setpr4, setGroupCod } =
    useApi();
  const { name, grpid } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [displayedItems, setDisplayedItems] = useState(8);
  const itemsPerPage = 4;

  const location = useLocation()
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(location.search)
  const level1 = searchParams.get('level1') || ''
  const level2 = searchParams.get('level2') || ''
  const level3 = searchParams.get('level3') || ''
  const grpCode = searchParams.get('grpCode') || ''
  
  const filteredItemsWithImage1 = Array.isArray(filterItem) && filterItem?.filter((item) => item.image1)

  useEffect(() => {
    if(grpid){
        const slug = grpid.split('-')
        if(slug[1] === '1'){
          setpr1(slug[2]);
          setpr2(''); 
          setpr3(''); 
          setpr4('');
        }
        if(slug[1] === '2'){
          setpr1(''); 
          setpr2(slug[2]); 
          setpr3(''); 
          setpr4('');
        }
        if(slug[1] === '3'){
          setpr1(''); 
          setpr2(''); 
          setpr3(slug[2]); 
          setpr4('');
        }
        if(slug[1] === '4'){
          setpr1(''); 
          setpr2(''); 
          setpr3(''); 
          setpr4(slug[2]);
        }
        if(Number(grpCode) || Number(grpid)){
          setGroupCod(Number(grpCode) || Number(grpid))
        }
    }
  }, [grpid])

  const generateUrl = (path, level) => {
    if(level === 1){
      setpr1("")
      setpr2("")
      setpr3("")
      setpr4("")
      navigate(`/product-list/${name}/${grpCode || grpid}`)
    }
    if(level === 2){
      navigate(`/product-list/${name}/${path}?grpCode=${grpCode}`)
    }
    if(level === 3){
      navigate(`/product-list/${name}/${path}?grpCode=${grpCode}&level1=${level1}`)
    }
    if(level === 4){
      navigate(`/product-list/${name}/${path}?grpCode=${grpCode}&level1=${level1}&level2=${level2}`)
    }
  }

  const handleLoadMore = () => {
    setDisplayedItems(displayedItems + itemsPerPage);
  };

  const isNumber = (value) => {
    return !isNaN(value);
  };

  return (
    <>
      {/* page breadcrumbs start */}
      <section className="pageBreadcrumbs">
        <article className="container">
          <ul>
            <li>
              <Link className="text" to="/">
                Home
              </Link>
            </li>
            {name &&   <li style={{cursor: 'pointer'}} onClick={() => generateUrl(name, 1)}><span>{name?.split('-')[0]}</span></li>}
            {level1 && <li style={{cursor: 'pointer'}} onClick={() => generateUrl(level1,2)}><span>{level1?.split('-')[0]}</span></li>}
            {level2 && <li style={{cursor: 'pointer'}} onClick={() => generateUrl(level2, 3)}><span>{level2?.split('-')[0]}</span></li>}
            {level3 && <li style={{cursor: 'pointer'}} onClick={() => generateUrl(level3, 4)}><span>{level3?.split('-')[0]}</span></li>}
            {!isNumber(grpid) && grpid && (
              <li className="active">
                <span>{grpid?.split('-')[0]}</span>
              </li>
            )}
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
                <ProductFilter list={filterItem} newfilter={newfilter} />
                <ProductCategories list={filterItem} />
              </div>
            </div>
            <div className="col-xl-9 col-lg-8">
              <div className="productCounter">
                {filteredItemsWithImage1?.length > 0
                  ? `${filterItem?.length} Products`
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
                    {Array.isArray(filteredItemsWithImage1) &&
                    filteredItemsWithImage1?.length > 0 ? (
                      filteredItemsWithImage1
                        .slice(0, displayedItems)
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
                  {/* Add More button */}
                  {filterItem?.length > displayedItems && (
                    <div className="text-center mt-4">
                      <button
                        className="btn btn-primary"
                        onClick={handleLoadMore}
                      >
                        Add More
                      </button>
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
