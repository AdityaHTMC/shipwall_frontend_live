import React, { useEffect } from "react";
import "./../../../css/mix.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Carousel from "react-bootstrap/Carousel";
import { useAppContext } from "../../../contextApi/AppContext";
import smallBannerA from "./../../../img/new/small-banner-1.png";
import smallBannerB from "./../../../img/new/small-banner-2.png";

const Slider = () => {
  const { getBannerList, bannerList } = useAppContext();

  useEffect(()=>{
    getBannerList()
  },[])

  
  const center2Banners = bannerList.filter(item => item.position === "center2");

  const center3Banners = bannerList.filter(item => item.position === "center3");
  
  // console.log(center2Banners,'c2');
  return (
    <>
      <div className="topGapMb">
        <section className="container">
          <article className="row">
            <aside className="col-md-9 col-sm-9 col-12 mt-3">
              <Carousel fade>
              {Array.isArray(bannerList) &&
                  bannerList.map((item) =>
                    item.position === "center1" ? (
                      <Carousel.Item key={item.id}>
                        <Link to={item.link}>
                          <motion.img
                            initial={{ x: "10vw" }}
                            animate={{ x: 0 }}
                            transition={{ duration: 1, origin: 1 }}
                            style={{ width: '100%' }}
                            src={item.banner}
                            alt="slider-img"
                          />
                        </Link>
                      </Carousel.Item>
                    ) : null
                  )}
              </Carousel>
            </aside>
            <aside className="col-md-3 col-sm-3 col-12 mt-3">
              <div className="mb-3"><img src={center3Banners[0]?.banner} alt="" /></div>
              <div className="mb-3"><img src={center2Banners[0]?.banner} alt="" /></div>
            </aside>
          </article>
        </section>
      </div>
    </>
  );
};

export default Slider;
