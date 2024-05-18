import './../../../css/mix.css'
import React, { useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'

const HistoryArea = () => {

    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible")
        }
    }, [isInView])

    return (
        <section className="tp-history-area pt-140 pb-140" data-bg-color="#F8F8F8">
            <div ref={ref} style={{ position: "relative", overflow: "hidden" }} className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="tp-history-slider mb-50">
                            <div className="tp-history-slider-active swiper-container">
                                <div className="swiper-wrapper">
                                    <div className="tp-thistory-item swiper-slide" data-bg-color="#F8F8F8">
                                        <div className="row">
                                            <motion.div
                                                variants={{
                                                    hidden: { opacity: 0, x: -50 },
                                                    visible: { opacity: 1, x: 0 }
                                                }}
                                                initial="hidden"
                                                animate={mainControls}
                                                transition={{ duration: 0.5, delay: 0.5 }}
                                                className="col-xl-5 col-lg-6 col-md-6">
                                                <div className="tp-history-wrapper pr-45">
                                                    <div className="tp-history-content mb-40">
                                                        <h3 className="tp-history-title">About our <br /> Online Store</h3>
                                                        <p>At our eCommerce site, we are passionate about providing our customers with the best possible shopping experience. From our extensive product selection to our exceptional customer service, we are committed to exceeding your expectations.</p>
                                                        <p>So start browsing today and find the perfect products to suit your needs!</p>

                                                    </div>
                                                    <div className="tp-history-year">
                                                        <p>2016</p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                            <motion.div
                                                variants={{
                                                    hidden: { opacity: 0, x: 50 },
                                                    visible: { opacity: 1, x: 0 }
                                                }}
                                                initial="hidden"
                                                animate={mainControls}
                                                transition={{ duration: 0.5, delay: 0.5 }}
                                                className="col-xl-7 col-lg-6 col-md-6">
                                                <div className="tp-history-thumb-wrapper ml-150 p-relative">
                                                    <div className="tp-history-thumb-text">
                                                        <p>Welcome to our <br /> Shofy eCommerce Theme</p>
                                                    </div>
                                                    <div className="tp-history-thumb m-img">
                                                        <img src="assets/img/history/history-1.jpg" alt="" />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </div>
                                    </div>
                                    <div className="tp-thistory-item swiper-slide" data-bg-color="#F8F8F8">
                                        <div className="row">
                                            <div className="col-xl-5 col-lg-6 col-md-6">
                                                <div className="tp-history-wrapper pr-110">
                                                    <div className="tp-history-content mb-40">
                                                        <h3 className="tp-history-title">About our <br /> Online Store</h3>
                                                        <p>At our eCommerce site, we are passionate about providing our customers with the best possible shopping experience. From our extensive product selection to our exceptional customer service, we are committed to exceeding your expectations.</p>
                                                        <p>So start browsing today and find the perfect products to suit your needs!</p>

                                                    </div>
                                                    <div className="tp-history-year">
                                                        <p>2017</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-7 col-lg-6 col-md-6">
                                                <div className="tp-history-thumb-wrapper ml-150 p-relative">
                                                    <div className="tp-history-thumb-text">
                                                        <p>Welcome to our <br /> Shofy eCommerce Theme</p>
                                                    </div>
                                                    <div className="tp-history-thumb m-img">
                                                        <img src="assets/img/history/history-2.jpg" alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tp-thistory-item swiper-slide" data-bg-color="#F8F8F8">
                                        <div className="row">
                                            <div className="col-xl-5 col-lg-6 col-md-6">
                                                <div className="tp-history-wrapper pr-110">
                                                    <div className="tp-history-content mb-40">
                                                        <h3 className="tp-history-title">About our <br /> Online Store</h3>
                                                        <p>At our eCommerce site, we are passionate about providing our customers with the best possible shopping experience. From our extensive product selection to our exceptional customer service, we are committed to exceeding your expectations.</p>
                                                        <p>So start browsing today and find the perfect products to suit your needs!</p>

                                                    </div>
                                                    <div className="tp-history-year">
                                                        <p>2018</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-7 col-lg-6 col-md-6">
                                                <div className="tp-history-thumb-wrapper ml-150 p-relative">
                                                    <div className="tp-history-thumb-text">
                                                        <p>Welcome to our <br /> Shofy eCommerce Theme</p>
                                                    </div>
                                                    <div className="tp-history-thumb m-img">
                                                        <img src="assets/img/history/history-1.jpg" alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tp-thistory-item swiper-slide" data-bg-color="#F8F8F8">
                                        <div className="row">
                                            <div className="col-xl-5 col-lg-6 col-md-6">
                                                <div className="tp-history-wrapper pr-110">
                                                    <div className="tp-history-content mb-40">
                                                        <h3 className="tp-history-title">About our <br /> Online Store</h3>
                                                        <p>At our eCommerce site, we are passionate about providing our customers with the best possible shopping experience. From our extensive product selection to our exceptional customer service, we are committed to exceeding your expectations.</p>
                                                        <p>So start browsing today and find the perfect products to suit your needs!</p>

                                                    </div>
                                                    <div className="tp-history-year">
                                                        <p>2019</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-7 col-lg-6 col-md-6">
                                                <div className="tp-history-thumb-wrapper ml-150 p-relative">
                                                    <div className="tp-history-thumb-text">
                                                        <p>Welcome to our <br /> Shofy eCommerce Theme</p>
                                                    </div>
                                                    <div className="tp-history-thumb m-img">
                                                        <img src="assets/img/history/history-2.jpg" alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="tp-history-nav">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="tp-history-nav-active swiper-container">
                                <div className="swiper-wrapper">
                                    <div className="tp-history-nav-year swiper-slide text-center">
                                        <p>2016</p>
                                    </div>
                                    <div className="tp-history-nav-year swiper-slide text-center">
                                        <p>2017</p>
                                    </div>
                                    <div className="tp-history-nav-year swiper-slide text-center">
                                        <p>2018</p>
                                    </div>
                                    <div className="tp-history-nav-year swiper-slide text-center">
                                        <p>2019</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HistoryArea
