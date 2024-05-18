import React, { useRef, useEffect, useState } from "react";
import "./../../../css/mix.css";
import { motion, useAnimation, useInView } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAppContext } from "../../../contextApi/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { useApi } from "../../../contextApi/ApiContexts/ApiContexts";
import { Button } from "bootstrap";

const Brand = () => {
  const { brandItem, getBrand } = useAppContext();
  const { getItem } = useApi();
  const navigate = useNavigate()

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView]);

  const sliderRef = useRef(null);

  const next = () => {
    sliderRef.current.slickNext();
  };

  const previous = () => {
    sliderRef.current.slickPrev();
  };

  const [numSlidesToShow, setNumSlidesToShow] = useState(1);

  useEffect(() => {
    getBrand();
    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () =>{ window.removeEventListener("resize", updateSlidesToShow)};
  }, []);

  const handelItemByBrand= (mId , mname)=>{
    getItem(mId)
    // navigate(`/product-list/${mname}`)
  }

  const updateSlidesToShow = () => {
    const windowWidth = window.innerWidth;
    let slidesToShow = 1;
    if (windowWidth >= 900) {
      slidesToShow = Math.min(brandItem.length, 5);
    }
    setNumSlidesToShow(slidesToShow);
  };

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "290px",
    slidesToShow: brandItem && brandItem.length === 1? numSlidesToShow :numSlidesToShow-1 ,
    speed: 500,
  };

  return (
    <section className="tp-brand-area pb-50">
    <div className="container">
      <h2 className="newTitleBx">Popular Brands</h2>
      <motion.div className="brandBx">
        {Array.isArray(brandItem) &&
          brandItem.map((item, index) => (
            <div className="item" key={index}>
              <Link to={`/product-brand/${item?.manufacturerName}`} onClick={()=>handelItemByBrand(item?.manufacturerId, item?.manufacturerName)}>
                <img src={item?.image} height={50} alt="" />
              </Link>
            </div>
          ))}
      </motion.div>
      {/* "More" Button */}
      <div  style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link type="button" class="btn btn-primary" to="/viewlogo" className="btn-more">
          View More Brands
        </Link>
      </div>
    </div>
  </section>
  );
};

export default Brand;
