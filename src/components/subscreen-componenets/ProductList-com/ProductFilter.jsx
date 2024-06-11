import React, { useState, useEffect, useRef } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { motion, useAnimation, useInView } from "framer-motion";
import { useAppContext } from "../../../contextApi/AppContext";
import { useApi } from "../../../contextApi/ApiContexts/ApiContexts";
import _debounce from "lodash/debounce";

const ProductFilter = ({ list, newfilter, clearence, searchQuery,searchPrcice }) => {
  console.log(list, "fdsf");
  console.log(newfilter, "newfilter...");

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  const { products } = useAppContext();
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [priceLimits, setPriceLimits] = useState({ min: 0, max: 100 });

  const { getItem, setfilterPrice, getClearenceItem,setKeySearch,getSearchfilter } = useApi();
  // const listitem = list[0]?.itmsGrpCod;
  // console.log(listitem, "grpcod");

  useEffect(() => {
    if(searchQuery){
      setKeySearch(searchQuery)
    }
  }, [searchQuery])

  useEffect(() => {
    if (newfilter) {
      const { min_price, max_price } = newfilter;
      setPriceRange([min_price, max_price]);
      setPriceLimits({ min: min_price, max: max_price });
    }
  }, [newfilter]);

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
    return () => {
      setfilterPrice([]);
    };
  }, [isInView]);

  // useEffect(() => {
  //   getItem(); // Directly trigger getItem when priceRange changes
  // }, [priceRange, getItem]);

  // console.log(priceRange, "PRR");

  const handelfilter = () => {
    if (clearence == 1) {
      const dataToSend = {
        isClearance: "Yes",
        min_price: priceRange[0],
        max_price: priceRange[1],
      };
      getClearenceItem(dataToSend);
    } if(searchPrcice==2) {
      const dataToSend = {
        min_price: priceRange[0],
        max_price: priceRange[1],
        keyword_search: searchQuery
      }
      getSearchfilter(dataToSend)
    }else{
      setfilterPrice(priceRange);
    }
  };


  const handlePriceRangeChange = (newRange) => {
    setPriceRange(newRange);
  };

  // console.log(priceRange)

  return (
    <div
      ref={ref}
      style={{ position: "relative", overflow: "hidden" }}
      className="tp-shop-widget mb-35"
    >
      <h2 className="newTitleBx">Price Filter</h2>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="tp-shop-widget-content"
      >
        <div className="tp-shop-widget-filter">
          <div className="mb-10" style={{paddingLeft:'9px',paddingRight:'9px'}}>
            <Slider
              min={priceLimits.min}
              max={priceLimits.max}
              step={1}
              range
              value={priceRange}
              onChange={handlePriceRangeChange}
            />
          </div>

          <div
            className="tp-shop-widget-filter-info"
          >
            <span className="input-range" style={{ display:'block', marginBottom: "8px" }}>
              <b>Price  :</b> <small style={{fontSize:'11px',}}>AUD</small> {priceLimits.min} to <small style={{fontSize:'11px',}}>AUD</small> {priceLimits.max}
            </span>
            <div
              className="input-range-controls"
              style={{ display: "flex", gap: "8px", marginBottom: "8px", alignItems: "center" }}
            >
              <small style={{fontSize:'11px',}}>AUD</small>
              <input
                type="number"
                name="min"
                min={priceLimits.min}
                max={priceRange[1]}
                value={priceRange[0]}
                style={{paddingLeft:'0',paddingRight:'0',height:'30px',textAlign:'center'}}
                onChange={(e) =>
                  handlePriceRangeChange([
                    Number(e.target.value),
                    priceRange[1],
                  ])
                }
              />
              <b>to</b>
              <small style={{fontSize:'11px',}}>AUD</small>
              <input
                type="number"
                name="max"
                min={priceRange[0]}
                max={priceLimits.max}
                value={priceRange[1]}
                style={{paddingLeft:'0',paddingRight:'0',height:'30px',textAlign:'center'}}
                onChange={(e) =>
                  handlePriceRangeChange([
                    priceRange[0],
                    Number(e.target.value),
                  ])
                }
              />
            </div>
            <button
              onClick={handelfilter}
              className="tp-shop-widget-filter-btn"
              type="button"
              style={{ alignSelf: "flex-start", background:'#ff7d00', color:'#fff', float:'right' }}
            >
              Apply
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductFilter;
