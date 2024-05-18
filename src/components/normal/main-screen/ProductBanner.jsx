
import './../../../css/mix.css'
import React, { useEffect, useRef } from 'react'
import { motion , useAnimation, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'


const ProductBanner = () => {

    const ref = useRef(null)
    const isInView = useInView(ref,{once:true})
    const mainControls = useAnimation();

    useEffect(()=>{
        if(isInView){
            mainControls.start("visible")
        }
    },[isInView])

    return (
        <>
            <div className="tp-product-banner-area pb-30">
                <div className="container"  ref={ref} style={{position:"relative",overflow:"hidden"}}>
                    <motion.div
                    variants={{
                        hidden:{opacity:0 , y:75},
                        visible:{opacity : 1 , y:0}
                    }}
                    initial="hidden"
                    animate={mainControls}
                    transition={{duration:0.5 , delay:0.5}}
                     className="tp-product-banner-slider fix">
                        <div className="tp-product-banner-slider-active swiper-container">
                            <div className="swiper-wrapper">
                                <div className="tp-product-banner-inner theme-bg p-relative z-index-1 fix swiper-slide">
                                    <h4 className="tp-product-banner-bg-text">tablet</h4>
                                    <div className="row align-items-center">
                                        <div className="col-xl-6 col-lg-6">
                                            <div className="tp-product-banner-content p-relative z-index-1">
                                                <span className="tp-product-banner-subtitle">Tablet Collection 2023</span>
                                                <h3 className="tp-product-banner-title">Samsung Galaxy Tab S6, Wifi Tablet</h3>
                                                <div className="tp-product-banner-price mb-40">
                                                    <span className="old-price">$1240.00</span>
                                                    <p className="new-price">$975.00</p>
                                                </div>
                                                <div className="tp-product-banner-btn">
                                                    <Link to="/product-list" className="btn btn-outline-light">Shop now</Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6">
                                            <div className="tp-product-banner-thumb-wrapper p-relative">
                                                <div className="tp-product-banner-thumb-shape">
                                                    <span className="tp-product-banner-thumb-gradient"></span>
                                                    <img className="tp-offer-shape" src="assets/img/banner/banner-slider-offer.png" alt="" />
                                                </div>

                                                <div className="tp-product-banner-thumb text-end p-relative z-index-1">
                                                    <img src="assets/img/banner/banner-slider-1.png" alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tp-product-banner-inner theme-bg p-relative z-index-1 fix swiper-slide">
                                    <h4 className="tp-product-banner-bg-text">tablet</h4>
                                    <div className="row align-items-center">
                                        <div className="col-xl-6 col-lg-6">
                                            <div className="tp-product-banner-content p-relative z-index-1">
                                                <span className="tp-product-banner-subtitle">Latest Technology Added</span>
                                                <h3 className="tp-product-banner-title">Apple iPad 10.2 9th Gen - 2021</h3>
                                                <div className="tp-product-banner-price mb-40">
                                                    <span className="old-price">$1450.00</span>
                                                    <p className="new-price">$1199.00</p>
                                                </div>
                                                <div className="tp-product-banner-btn">
                                                    <Link to="/product-list" className="tp-btn tp-btn-2">Shop now</Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6">
                                            <div className="tp-product-banner-thumb-wrapper p-relative">
                                                <div className="tp-product-banner-thumb-shape">
                                                    <span className="tp-product-banner-thumb-gradient"></span>
                                                    <img className="tp-offer-shape" src="assets/img/banner/banner-slider-offer.png" alt="" />
                                                </div>

                                                <div className="tp-product-banner-thumb text-end p-relative z-index-1">
                                                    <img src="assets/img/banner/banner-slider-2.png" alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tp-product-banner-inner theme-bg p-relative z-index-1 fix swiper-slide">
                                    <h4 className="tp-product-banner-bg-text">tablet</h4>
                                    <div className="row align-items-center">
                                        <div className="col-xl-6 col-lg-6">
                                            <div className="tp-product-banner-content p-relative z-index-1">
                                                <span className="tp-product-banner-subtitle">Tablet Collection 2023</span>
                                                <h3 className="tp-product-banner-title">Microsoft Surface Pro 8, Wifi Included</h3>
                                                <div className="tp-product-banner-price mb-40">
                                                    <span className="old-price">$1249.00</span>
                                                    <p className="new-price">$1300.00</p>
                                                </div>
                                                <div className="tp-product-banner-btn">
                                                    <Link to="/product-list" className="tp-btn tp-btn-2">Shop now</Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6">
                                            <div className="tp-product-banner-thumb-wrapper p-relative">
                                                <div className="tp-product-banner-thumb-shape">
                                                    <span className="tp-product-banner-thumb-gradient"></span>
                                                    <img className="tp-offer-shape" src="assets/img/banner/banner-slider-offer.png" alt="" />
                                                </div>

                                                <div className="tp-product-banner-thumb text-end p-relative z-index-1">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tp-product-banner-slider-dot tp-swiper-dot"></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    )
}

export default ProductBanner
