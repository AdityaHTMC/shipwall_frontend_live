import ProductTab from "../product/ProductTab";
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import ProductQuickView from "./ProductQuickView";
import { useAppContext } from "../../../contextApi/AppContext";
import ProductCard from "../Product-card/ProductCard";
import { useApi } from "../../../contextApi/ApiContexts/ApiContexts";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination } from "swiper/modules";
const Product = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  const [lgShow, setLgShow] = useState(false);
  const [productId, setProductId] = useState("");
  const { products, addToCart, addWishlist } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  const {
    filterItem,
    getClearenceItem,

    clearenceData,
  } = useApi();

  useEffect(() => {
    // setClearenceData({isClearance: 'Yes'})
    const dataToSend = {
      isHotProduct: "Yes",
    };
    getClearenceItem(dataToSend);
  }, []);

  const HandelQuickView = (id) => {
    setLgShow(true);
    setProductId(id);
  };

  const onHide = () => {
    setLgShow(false);
  };

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView]);


  console.log(clearenceData,'CDDddd');

  return (
    <>
      <section className="tp-product-area pb-20  mt-3">
        <div
          className="container"
          ref={ref}
          style={{ position: "relative", overflow: "hidden" }}
        >
          <div className="newTitleBx TitleBxTab">
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 },
              }}
              initial="hidden"
              animate={mainControls}
              transition={{ duration: 0.5, delay: 0.75 }}
              className="row align-items-end"
            >
              <div className="col-xl-5 col-lg-6 col-md-5">
                <div className="tp-section-title-wrapper">
                  <h2 className="tp-section-title">Trending Products</h2>
                </div>
              </div>
              <div className="col-xl-7 col-lg-6 col-md-7">
                <ProductTab />
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            animate={mainControls}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="row"
          >
            <div className="col-xl-12">
              <div className="tp-product-tab-content mt-3">
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="new-tab-pane"
                    role="tabpanel"
                    aria-labelledby="new-tab"
                    tabIndex={0}
                  >
                    {/* swiper slider start here */}
                    <Swiper
                      navigation={true}
                      mousewheel={true}
                      keyboard={true}
                      loop={true}
                      autoplay={true}                      
                      spaceBetween={15}
                      // pagination={{
                      //   clickable: true,
                      // }}
                      slidesPerView={6}
                      breakpoints={{
                        240: {
                          slidesPerView: 2,
                        },
                        320: {
                          slidesPerView: 2,
                        },
                        360: {
                          slidesPerView: 2,
                        },
                        480: {
                          slidesPerView: 3,
                        },                        
                        640: {
                          slidesPerView: 4,
                        },
                        768: {
                          slidesPerView: 4,
                        },
                        980: {
                          slidesPerView: 6,
                        },
                      }}
                      modules={[Navigation, Pagination]}
                      className="mySwiper"
                      style={{ height: "350px" }}
                    >
                      {/* item start */}
                      {clearenceData &&
                        clearenceData
                          .filter((item) => item.image1) // Filter products with image1
                          .map((item) => (
                            <SwiperSlide>
                              <ProductCard
                                key={item.id}
                                item={item}
                                HandelQuickView={HandelQuickView}
                                addWishlist={addWishlist}
                                addToCart={addToCart}
                              />
                              <br />
                            </SwiperSlide>
                          ))}

                      {/* item end */}
                    </Swiper>
                    {/* swiper slider end here */}
                  </div>
                  {/* <div
                    className="tab-pane fade"
                    id="featured-tab-pane"
                    role="tabpanel"
                    aria-labelledby="featured-tab"
                    tabIndex={0}
                  >
                    <div className="row">
                      {products.slice(0, 8).map((item) => (
                        <ProductCard item={item} HandelQuickView={HandelQuickView} addWishlist={addWishlist} addToCart={addToCart} />
                      ))}
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="topsell-tab-pane"
                    role="tabpanel"
                    aria-labelledby="topsell-tab"
                    tabIndex={0}
                  >
                    <div className="row">
                      {products.slice(0, 8).map((item) => (
                        <ProductCard item={item} HandelQuickView={HandelQuickView} addWishlist={addWishlist} addToCart={addToCart} />
                      ))}
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Product;
