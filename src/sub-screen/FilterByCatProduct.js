import React, { useState , useEffect } from "react";
import { Link , useParams } from "react-router-dom";
import ProductFilter from "../components/subscreen-componenets/ProductList-com/ProductFilter";
import ProductCategories from "../components/subscreen-componenets/ProductList-com/ProductCategories";
import ProductBrand from "../components/subscreen-componenets/ProductList-com/ProductBrand";
import ProductQuickView from "../components/normal/main-screen/ProductQuickView";
import { useAppContext } from "../contextApi/AppContext";
import Modal from 'react-bootstrap/Modal';
import ProductCard from "../components/normal/Product-card/ProductCard";


const FilterByCatProduct = () => {
  const { products, addToCart, addWishlist } = useAppContext();
  const [categories, setCategories] = useState([]);
  const { name } = useParams();

  const [lgShow, setLgShow] = useState(false);
  const [productId, setProductId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const HandelQuickView = (id) => {
    setLgShow(true);
    setProductId(id);
  };

  const onHide = () => {
    setLgShow(false);
  };


  const itemsPerPage = 9;
  const totalItems = categories.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const itemsToShow = categories.slice(startIndex, endIndex);

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

  useEffect(() => {
    const categoryMap = new Map();

    products.forEach((product) => {
      const categoryName = product.ItmsGrpNam;
      if (categoryName) {
        if (!categoryMap.has(categoryName)) {
          categoryMap.set(categoryName, []);
        }
        categoryMap.get(categoryName).push(product);
      }
    });

    const categoryList = Array.from(categoryMap, ([name, products]) => ({
      name,
      products,
    }));

    setCategories(categoryList);
  }, [products]);

  // Filter products by the selected category
  const selectedCategory = categories.find((category) => category.name === name);
  const filteredProducts = selectedCategory ? selectedCategory.products : [];
    
  return (
    <>
    {
      lgShow === true ? (
        <Modal
        size="xl"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Body className='h-75'>
        <ProductQuickView onHide={onHide} productId={productId}/>
        </Modal.Body>
      </Modal>
      ):null
    }
    <section className="breadcrumb__area include-bg pt-40 pb-40 bg-secondary text-white">
    <div className="container mt-4 mt-md-0 mt-lg-0">
        <div className="row">
            <div className="col-xxl-12">
                <div className="breadcrumb__content p-relative z-index-1">
                    <h3 className="breadcrumb__title text-white text-center mt-3">Products</h3>
                    <div className="breadcrumb__list text-center">
                        <span ><Link className='text text-light' to="/">Home</Link></span>
                        <span>Products</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

      <section className="tp-shop-area pt-90 pb-90">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-4">
              {/* Sidebar section */}
              <ProductFilter />
              <ProductCategories />
              <ProductBrand />
            </div>
            <div className="col-xl-9 col-lg-8">
              {/* Product list section */}
              <div className="tp-shop-main-wrapper">
                <div className="row h-100">
                  {filteredProducts
                  .map((item) =>(
                    <ProductCard item = {item} HandelQuickView={HandelQuickView} addWishlist={addWishlist} addToCart={addToCart} />
                  ))}
                </div>
                </div>
                </div>
                </div>
                <div className="d-flex justify-content-center mt-0">
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
        </div>
      </section>

      {/* Quick view modal */}
      {lgShow && (
        <ProductQuickView onHide={() => setLgShow(false)} productId={productId} />
      )}
    </>
  )
}

export default FilterByCatProduct
