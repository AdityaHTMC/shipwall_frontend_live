import React from 'react'
import './../../../css/mix.css'
import { Link } from 'react-router-dom'

const Banner = () => {
    
    return (
        <section className="tp-banner-area pb-70">
            <div className="container">
                <div className="row">
                    <div className="col-xl-8 col-lg-7">
                        <div className="tp-banner-item tp-banner-height p-relative mb-30 z-index-1 fix">
                            <div className="tp-banner-thumb include-bg transition-3" data-background="assets/img/product/banner/product-banner-1.jpg">
                            <img src="assets/img/product/banner/product-banner-1.jpg" alt="" />
                            </div>
                            <div className="tp-banner-content">
                                <span>Sale 20% off all store</span>
                                <h3 className="tp-banner-title">
                                    <Link to="#.">Smartphone <br /> BLU G91 Pro 2022</Link>
                                </h3>
                                <div className="tp-banner-btn">
                                    <Link to="/product-list" className="tp-link-btn">Shop Now
                                        <svg width="15" height="13" viewBox="0 0 15 13" fill="none">
                                            <path d="M13.9998 6.19656L1 6.19656" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M8.75674 0.975394L14 6.19613L8.75674 11.4177" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-5">
                        <div className="tp-banner-item tp-banner-item-sm tp-banner-height p-relative mb-30 z-index-1 fix">
                            <div className="tp-banner-thumb include-bg transition-3" data-background="assets/img/product/banner/product-banner-2.jpg">
                            <img src="assets/img/product/banner/product-banner-2.jpg" alt="" />
                            </div>
                            <div className="tp-banner-content">
                                <h3 className="tp-banner-title">
                                    <a href="#.">HyperX Cloud II <br /> Wireless</a>
                                </h3>
                                <p>Sale 35% off</p>
                                <div className="tp-banner-btn">
                                    <Link to="/product-list" className="tp-link-btn">Shop Now
                                        <svg width="15" height="13" viewBox="0 0 15 13" fill="none">
                                            <path d="M13.9998 6.19656L1 6.19656" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M8.75674 0.975394L14 6.19613L8.75674 11.4177" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Banner
