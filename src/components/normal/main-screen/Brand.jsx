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
  const navigate = useNavigate();

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView]);

  console.log(brandItem, "brand item");

  useEffect(() => {
    getBrand();
  }, []);

  const handelItemByBrand = (mId, mname) => {
    getItem(mId);
    // navigate(`/product-list/${mname}`)
  };

  return (
    <section className="tp-brand-area pb-50">
      <div className="container">
        <h2 className="newTitleBx">Popular Brands</h2>
        <motion.div className="brandBx">
          {Array.isArray(brandItem) &&
            brandItem
              .filter((item) => item?.image)
              .map((item, index) => (
                <div className="item" key={index}>
                  <Link
                    to={`/product-brand/${item?.manufacturerName}`}
                    onClick={() =>
                      handelItemByBrand(
                        item?.manufacturerId,
                        item?.manufacturerName
                      )
                    }
                  >
                    <img src={item?.image} height={50} alt="" />
                  </Link>
                </div>
              ))}
        </motion.div>
        {/* "More" Button */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Link
            to="/viewlogo"
            className="btn btn-sm"
            style={{ backgroundColor: "#ff7d00", color: "#fff" }}
          >
            View More Brands
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Brand;
