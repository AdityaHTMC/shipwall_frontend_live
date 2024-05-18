import React, { useEffect, useRef } from 'react'
import { motion , useAnimation, useInView } from 'framer-motion'


const ProductColor = () => {
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
            <h3 className="tp-shop-widget-title">Filter by Color</h3>
            <div className="tp-shop-widget-content">
              <motion.div
              variants={{
                hidden:{opacity:0 , x:-50},
                visible:{opacity : 1 , x:0}
            }}
            initial="hidden"
            animate={mainControls}
            transition={{duration:0.5 , delay:0.5}}
               className="tp-shop-widget-checkbox-circle-list">
                <ul>
                  <li>
                    <div className="tp-shop-widget-checkbox-circle">
                      <input type="checkbox" id="red" />
                      <label htmlFor="red">Red</label>
                      <span
                        data-bg-color="#FF401F"
                        className="tp-shop-widget-checkbox-circle-self bg-danger"
                      />
                    </div>
                    <span className="tp-shop-widget-checkbox-circle-number">
                      8
                    </span>
                  </li>
                  <li>
                    <div className="tp-shop-widget-checkbox-circle">
                      <input type="checkbox" id="dark_blue" />
                      <label htmlFor="dark_blue">Dark Blue</label>
                      <span
                        data-bg-color="#4666FF"
                        className="tp-shop-widget-checkbox-circle-self bg-primary"
                      />
                    </div>
                    <span className="tp-shop-widget-checkbox-circle-number">
                      14
                    </span>
                  </li>
                  <li>
                    <div className="tp-shop-widget-checkbox-circle">
                      <input type="checkbox" id="oragnge" />
                      <label htmlFor="oragnge">Orange</label>
                      <span
                        data-bg-color="#FF9E2C"
                        className="tp-shop-widget-checkbox-circle-self orange"
                      />
                    </div>
                    <span className="tp-shop-widget-checkbox-circle-number">
                      18
                    </span>
                  </li>
                  <li>
                    <div className="tp-shop-widget-checkbox-circle">
                      <input type="checkbox" id="purple" />
                      <label htmlFor="purple">Purple</label>
                      <span
                        data-bg-color="#B615FD"
                        className="tp-shop-widget-checkbox-circle-self purple"
                      />
                    </div>
                    <span className="tp-shop-widget-checkbox-circle-number">
                      23
                    </span>
                  </li>
                  <li>
                    <div className="tp-shop-widget-checkbox-circle">
                      <input type="checkbox" id="yellow" />
                      <label htmlFor="yellow">Yellow</label>
                      <span
                        data-bg-color="#FFD747"
                        className="tp-shop-widget-checkbox-circle-self bg-warning"
                      />
                    </div>
                    <span className="tp-shop-widget-checkbox-circle-number">
                      17
                    </span>
                  </li>
                  <li>
                    <div className="tp-shop-widget-checkbox-circle">
                      <input type="checkbox" id="green" />
                      <label htmlFor="green">Green</label>
                      <span
                        data-bg-color="#41CF0F"
                        className="tp-shop-widget-checkbox-circle-self bg-success"
                      />
                    </div>
                    <span className="tp-shop-widget-checkbox-circle-number">
                      15
                    </span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
  )
}

export default ProductColor
