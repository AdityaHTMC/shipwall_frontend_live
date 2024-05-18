import React from 'react'
import ProductCard from './ProductCard'
import './../../../css/mix.css'

const ProductCards = () => {
  return (
    <>
            <div className="row">
                <div className="col-xl-12">
                    <div className="tp-product-tab-content">
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="new-tab-pane" role="tabpanel" aria-labelledby="new-tab" tabindex="0">
                                <div className="row">
                                    <ProductCard/>
                                    <ProductCard/>
                                    <ProductCard/>
                                    <ProductCard/>
                                    <ProductCard/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
  )
}

export default ProductCards
