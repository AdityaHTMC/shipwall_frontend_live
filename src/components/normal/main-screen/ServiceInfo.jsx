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

       
    </>
  )
}

export default ServiceInfo