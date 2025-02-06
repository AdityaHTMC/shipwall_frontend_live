import { Link } from 'react-router-dom'
import React, { useEffect, useRef } from 'react'
import { motion , useAnimation, useInView } from 'framer-motion'
import { useAppContext } from '../../../contextApi/AppContext'

const ProductBrand = () => {
    const {brandItem} = useAppContext()
    const ref = useRef(null)
    const isInView = useInView(ref,{once:true})
    const mainControls = useAnimation();

    useEffect(()=>{
        if(isInView){
            mainControls.start("visible")
        }
    },[isInView])

    console.log(brandItem)
  return (
    <div ref={ref} style={{position:"relative",overflow:"hidden"}} className="tp-shop-widget mb-50">
                        <h3 className="tp-shop-widget-title">Brand We Serve</h3>

                        <motion.div className="tp-shop-widget-content"
                        variants={{
                            hidden:{opacity:0 , y:-50},
                            visible:{opacity : 1 , y:0}
                        }}
                        initial="hidden"
                        animate={mainControls}
                        transition={{duration:0.5 , delay:0.5}}
                        >
                            <div className="tp-shop-widget-brand-list d-flex align-items-center justify-content-between flex-wrap">
                            {brandItem.map((item , index)=>(

                                <div key={index} className="tp-shop-widget-brand-item">
                                    <Link to="#">
                                        <img src={item.brandimage} height={50} width={50} alt=""/>
                                        <p>{item.brandname}</p>
                                    </Link>
                                </div>
                            ))}
                            </div>
                        </motion.div>
                    </div>
  )
}

export default ProductBrand
