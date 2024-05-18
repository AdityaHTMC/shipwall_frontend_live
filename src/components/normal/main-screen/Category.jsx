
import './../../../css/mix.css'
import React, { useEffect, useRef, useState } from 'react'
import { motion , useAnimation, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useApi } from '../../../contextApi/ApiContexts/ApiContexts'
import { useNavigate } from 'react-router-dom'

const Category = () => {
    const ref = useRef(null)
    const isInView = useInView(ref,{once:true})
    const mainControls = useAnimation();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    const { allItem, getItem ,setGroupCod } = useApi();

    useEffect(() => {
        if (allItem) {
          setLoading(false);
        }
      }, [allItem]);

    useEffect(()=>{
        if(isInView){
            mainControls.start("visible")
        }
    },[isInView])

    const handlefiltercat = async (groupCode, item) => {
        await setGroupCod(groupCode);
        navigate(`/product-list/${item.itmsGrpNam}/${item.itmsGrpCod}`);
    };
    
    return (

        <>
            <section className="tp-product-category pt-60 pb-15">
                <div  ref={ref} style={{position:"relative",overflow:"hidden"}}
                    className="container">
                    <motion.div
                    variants={{
                        hidden:{opacity:0 , y:75},
                        visible:{opacity : 1 , y:0}
                    }}
                    initial="hidden"
                    animate={mainControls}
                    transition={{duration:0.5 , delay:0.5}}
                     className="row row-cols-xl-6 row-cols-lg-5 row-cols-md-4">

                        {
                            allItem.map((item)=>(
                                <div className="col">
                                <div className="tp-product-category-item text-center mb-40">
                                    <div className="tp-product-category-thumb fix">
                                        <Link to="#" onClick={()=>handlefiltercat(item.itmsGrpCod,item)}>
                                            <img 
                                             style={{ borderRadius: '10px', width: '100px', height: '100px' }}
                                            className='' src={ item.image} alt="product-category" />
                                        </Link>
                                    </div>
                                    <div className="tp-product-category-content">
                                        <h3 className="tp-product-category-title">
                                            <Link to={`/product-list/${item.itmsGrpNam}/${item.itmsGrpCod}`}>{item.itmsGrpNam} </Link>
                                        </h3>
                                        {/* <p>20 Product</p> */}
                                    </div>
                                </div>
                            </div>
                            ))
                        }
                        
                    </motion.div>
                </div>
            </section>
        </>
    )
}

export default Category
