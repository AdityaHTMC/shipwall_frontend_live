import React, { useState, useEffect, useRef } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useAppContext } from '../../../contextApi/AppContext';
import { useApi } from '../../../contextApi/ApiContexts/ApiContexts';
import _debounce from 'lodash/debounce';

const ProductFilter = (props) => {
  const { clearence } = props
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  const { products } = useAppContext();
  const [priceRange, setPriceRange] = useState([0, 10000]);

  const { getItem, setfilterPrice,getClearenceItem } = useApi();
  // const listitem = list[0]?.itmsGrpCod;
  // console.log(listitem, "grpcod");

  useEffect(() => {
    if (isInView) {
      mainControls.start('visible');
    }
    return () => {
      setfilterPrice([])
    };
  }, [isInView]);

  
  // useEffect(() => {
  //   getItem(); // Directly trigger getItem when priceRange changes
  // }, [priceRange, getItem]);

   console.log(priceRange,'PRRr');

  const handelfilter = () => {
    if (clearence == 1) {
      const dataToSend = {
        isClearance: 'Yes',
        min_price: priceRange[0],
        max_price: priceRange[1]
      };
      getClearenceItem(dataToSend);
    } else {
      setfilterPrice(priceRange);
    }
  }


  const handlePriceRangeChange = (newRange) => {
    setPriceRange(newRange);
  }

  // console.log(priceRange)

  return (
    <div ref={ref} style={{ position: 'relative', overflow: 'hidden' }} className="tp-shop-widget mb-35">
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
          <div className="mb-10">
            <Slider
              min={0}
              max={10000}
              step={1}
              range
              value={priceRange}
              onChange={handlePriceRangeChange}
            />
          </div>

          <div className="tp-shop-widget-filter-info d-flex align-items-center justify-content-between">
            <span className="input-range">
              <b>Price :</b> {priceRange[0]} - {priceRange[1]}
              </span>
              <button onClick={handelfilter} className="tp-shop-widget-filter-btn" type="button">
                Apply
              </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductFilter;

          