import React, { useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'

const ProductRating = () => {
  const ref = useRef(null)
    const isInView = useInView(ref,{once:true})
    const mainControls = useAnimation();

    useEffect(()=>{
        if(isInView){
            mainControls.start("visible")
        }
    },[isInView])
  return (
    <div ref={ref} style={{position:"relative",overflow:"hidden"}} className="tp-shop-widget mb-50">
      <h3 className="tp-shop-widget-title">Top Rated Products</h3>
      <motion.div
      variants={{
        hidden:{opacity:0 , y:75},
        visible:{opacity : 1 , y:0}
    }}
    initial="hidden"
    animate={mainControls}
    transition={{duration:0.5 , delay:0.5}}
       className="tp-shop-widget-content">
        <div className="tp-shop-widget-product">
          <div className="tp-shop-widget-product-item d-flex align-items-center">
            <div className="tp-shop-widget-product-thumb">
              <a href="">
                <img src="assets/img/product/product-3.jpg" alt="" />
              </a>
            </div>
            <div className="tp-shop-widget-product-content">
              <div className="tp-shop-widget-product-rating-wrapper d-flex align-items-center">
                <div className="tp-shop-widget-product-rating">
                  <span>
                    <svg
                      width={12}
                      height={12}
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M6 0L7.854 3.756L12 4.362L9 7.284L9.708 11.412L6 9.462L2.292 11.412L3 7.284L0 4.362L4.146 3.756L6 0Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <span>
                    <svg
                      width={12}
                      height={12}
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M6 0L7.854 3.756L12 4.362L9 7.284L9.708 11.412L6 9.462L2.292 11.412L3 7.284L0 4.362L4.146 3.756L6 0Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <span>
                    <svg
                      width={12}
                      height={12}
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M6 0L7.854 3.756L12 4.362L9 7.284L9.708 11.412L6 9.462L2.292 11.412L3 7.284L0 4.362L4.146 3.756L6 0Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <span>
                    <svg
                      width={12}
                      height={12}
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M6 0L7.854 3.756L12 4.362L9 7.284L9.708 11.412L6 9.462L2.292 11.412L3 7.284L0 4.362L4.146 3.756L6 0Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <span>
                    <svg
                      width={12}
                      height={12}
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M6 0L7.854 3.756L12 4.362L9 7.284L9.708 11.412L6 9.462L2.292 11.412L3 7.284L0 4.362L4.146 3.756L6 0Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </div>
                <div className="tp-shop-widget-product-rating-number">
                  <span>(4.2)</span>
                </div>
              </div>
              <h4 className="tp-shop-widget-product-title">
                <a href="">Smart watches wood...</a>
              </h4>
              <div className="tp-shop-widget-product-price-wrapper">
                <span className="tp-shop-widget-product-price">
                  $150.00
                </span>
              </div>
            </div>
          </div>
          <div className="tp-shop-widget-product-item d-flex align-items-center">
            <div className="tp-shop-widget-product-thumb">
              <a href="">
                <img src="assets/img/product/product-4.jpg" alt="" />
              </a>
            </div>
            <div className="tp-shop-widget-product-content">
              <div className="tp-shop-widget-product-rating-wrapper d-flex align-items-center">
                <div className="tp-shop-widget-product-rating">
                  <span>
                    <svg
                      width={12}
                      height={12}
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M6 0L7.854 3.756L12 4.362L9 7.284L9.708 11.412L6 9.462L2.292 11.412L3 7.284L0 4.362L4.146 3.756L6 0Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <span>
                    <svg
                      width={12}
                      height={12}
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M6 0L7.854 3.756L12 4.362L9 7.284L9.708 11.412L6 9.462L2.292 11.412L3 7.284L0 4.362L4.146 3.756L6 0Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <span>
                    <svg
                      width={12}
                      height={12}
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M6 0L7.854 3.756L12 4.362L9 7.284L9.708 11.412L6 9.462L2.292 11.412L3 7.284L0 4.362L4.146 3.756L6 0Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <span>
                    <svg
                      width={12}
                      height={12}
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M6 0L7.854 3.756L12 4.362L9 7.284L9.708 11.412L6 9.462L2.292 11.412L3 7.284L0 4.362L4.146 3.756L6 0Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <span>
                    <svg
                      width={12}
                      height={12}
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M6 0L7.854 3.756L12 4.362L9 7.284L9.708 11.412L6 9.462L2.292 11.412L3 7.284L0 4.362L4.146 3.756L6 0Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </div>
                <div className="tp-shop-widget-product-rating-number">
                  <span>(4.5)</span>
                </div>
              </div>
              <h4 className="tp-shop-widget-product-title">
                <a href="">Decoration for panda.</a>
              </h4>
              <div className="tp-shop-widget-product-price-wrapper">
                <span className="tp-shop-widget-product-price">
                  $120.00
                </span>
              </div>
            </div>
          </div>
          <div className="tp-shop-widget-product-item d-flex align-items-center">
            <div className="tp-shop-widget-product-thumb">
              <a href="">
                <img src="assets/img/product/product-5.jpg" alt="" />
              </a>
            </div>
            <div className="tp-shop-widget-product-content">
              <div className="tp-shop-widget-product-rating-wrapper d-flex align-items-center">
                <div className="tp-shop-widget-product-rating">
                  <span>
                    <svg
                      width={12}
                      height={12}
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M6 0L7.854 3.756L12 4.362L9 7.284L9.708 11.412L6 9.462L2.292 11.412L3 7.284L0 4.362L4.146 3.756L6 0Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <span>
                    <svg
                      width={12}
                      height={12}
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M6 0L7.854 3.756L12 4.362L9 7.284L9.708 11.412L6 9.462L2.292 11.412L3 7.284L0 4.362L4.146 3.756L6 0Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <span>
                    <svg
                      width={12}
                      height={12}
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M6 0L7.854 3.756L12 4.362L9 7.284L9.708 11.412L6 9.462L2.292 11.412L3 7.284L0 4.362L4.146 3.756L6 0Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <span>
                    <svg
                      width={12}
                      height={12}
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M6 0L7.854 3.756L12 4.362L9 7.284L9.708 11.412L6 9.462L2.292 11.412L3 7.284L0 4.362L4.146 3.756L6 0Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <span>
                    <svg
                      width={12}
                      height={12}
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M6 0L7.854 3.756L12 4.362L9 7.284L9.708 11.412L6 9.462L2.292 11.412L3 7.284L0 4.362L4.146 3.756L6 0Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </div>
                <div className="tp-shop-widget-product-rating-number">
                  <span>(3.5)</span>
                </div>
              </div>
              <h4 className="tp-shop-widget-product-title">
                <a href="">Trending Watch for Man</a>
              </h4>
              <div className="tp-shop-widget-product-price-wrapper">
                <span className="tp-shop-widget-product-price">
                  $99.00
                </span>
              </div>
            </div>
          </div>
          <div className="tp-shop-widget-product-item d-flex align-items-center">
            <div className="tp-shop-widget-product-thumb">
              <a href="">
                <img src="assets/img/product/product-7.jpg" alt="" />
              </a>
            </div>
            <div className="tp-shop-widget-product-content">
              <div className="tp-shop-widget-product-rating-wrapper d-flex align-items-center">
                <div className="tp-shop-widget-product-rating">
                  <span>
                    <svg
                      width={12}
                      height={12}
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M6 0L7.854 3.756L12 4.362L9 7.284L9.708 11.412L6 9.462L2.292 11.412L3 7.284L0 4.362L4.146 3.756L6 0Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <span>
                    <svg
                      width={12}
                      height={12}
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M6 0L7.854 3.756L12 4.362L9 7.284L9.708 11.412L6 9.462L2.292 11.412L3 7.284L0 4.362L4.146 3.756L6 0Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <span>
                    <svg
                      width={12}
                      height={12}
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M6 0L7.854 3.756L12 4.362L9 7.284L9.708 11.412L6 9.462L2.292 11.412L3 7.284L0 4.362L4.146 3.756L6 0Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <span>
                    <svg
                      width={12}
                      height={12}
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M6 0L7.854 3.756L12 4.362L9 7.284L9.708 11.412L6 9.462L2.292 11.412L3 7.284L0 4.362L4.146 3.756L6 0Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <span>
                    <svg
                      width={12}
                      height={12}
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M6 0L7.854 3.756L12 4.362L9 7.284L9.708 11.412L6 9.462L2.292 11.412L3 7.284L0 4.362L4.146 3.756L6 0Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </div>
                <div className="tp-shop-widget-product-rating-number">
                  <span>(4.8)</span>
                </div>
              </div>
              <h4 className="tp-shop-widget-product-title">
                <a href="">Minimal Backpack.</a>
              </h4>
              <div className="tp-shop-widget-product-price-wrapper">
                <span className="tp-shop-widget-product-price">
                  $165.00
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ProductRating
