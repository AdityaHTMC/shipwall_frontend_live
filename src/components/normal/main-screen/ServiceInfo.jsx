import React, { useEffect } from 'react'
import ledPanel from "./../../../img/new/led-panel-light.jpg";
import freeShipping from "./../../../img/new/free-shipping.svg";
import moneyGuarantee from "./../../../img/new/money-guarantee.svg";
import onlineSupport from "./../../../img/new/online-support.svg";
import memberDiscount from "./../../../img/new/member-discount.svg";
import { useAppContext } from '../../../contextApi/AppContext';


const ServiceInfo = () => {

  const { getBannerList, bannerList } = useAppContext();

  useEffect(()=>{
    getBannerList()
  },[])

  const center4Banners = bannerList.filter(item => item.position === "center4");

  const lastVideoLink = center4Banners.length > 0 ? center4Banners[center4Banners.length - 1]?.banner : "";

  return (
    <>  
        <section className='container mt-3 mb-5'>
            <artiical className='bannerBx'><img src={lastVideoLink} alt="ledPanel" /></artiical>
        </section>

        <section className='container'>
          <article className='servicesInfo'>
            <aside className='row'>
              <div className='col-md-3 col-sm-6 col-12'>
                <div className='itemBx'>
                  <img src={freeShipping} alt="Free Shipping" />
                  <p>Free Shipping<br />Free Shipping On All Order</p>
                </div>
              </div>
              <div className='col-md-3 col-sm-6 col-12'>
                <div className='itemBx'>
                  <img src={moneyGuarantee} alt="moneyGuarantee" />
                  <p>Money Guarantee<br />30 Day Money Back Guarantee</p>
                </div>
              </div>
              <div className='col-md-3 col-sm-6 col-12'>
                <div className='itemBx'>
                  <img src={onlineSupport} alt="onlineSupport" />
                  <p>Online Support 24/7<br />Technical Support 24/7</p>
                </div>
              </div>
              <div className='col-md-3 col-sm-6 col-12'>
                <div className='itemBx'>
                  <img src={memberDiscount} alt="memberDiscount" />
                  <p>Member Discount<br />Upto 40% Discount All Products</p>
                </div>
              </div>
            </aside>
          </article>
        </section>
    </>
  )
}

export default ServiceInfo