import React, { useEffect } from 'react'
import poBannerA from "./../../../img/new/product-offer-banner-1.jpg";
import poBannerB from "./../../../img/new/product-offer-banner-2.jpg";
import poBannerC from "./../../../img/new/product-offer-banner-3.jpg";
import poBannerD from "./../../../img/new/product-offer-banner-4.jpg";
import { useAppContext } from '../../../contextApi/AppContext';
import { useApi } from '../../../contextApi/ApiContexts/ApiContexts';


const OfferBanner = () => {

    const { getBannerList, bannerList } = useAppContext();

    const {   fleshNewsList ,  getFleshNewsList } = useApi();
    useEffect(()=>{
      getBannerList()
      getFleshNewsList()
    },[])

    // console.log(fleshNewsList,'FNL');
  
    const Middle1Banners = bannerList?.filter(item => item.position === "Middle1");
    const Middle2Banners = bannerList?.filter(item => item.position === "Middle2");
    const Middle3Banners = bannerList?.filter(item => item.position === "Middle3");
    const Middle4Banners = bannerList?.filter(item => item.position === "Middle4");

    const lastM1 = Middle1Banners.length > 0 ? Middle1Banners[Middle1Banners.length - 1]?.banner : "";
    const lastM2 = Middle2Banners.length > 0 ? Middle2Banners[Middle2Banners.length - 1]?.banner : "";
    const lastM3 = Middle3Banners.length > 0 ? Middle3Banners[Middle3Banners.length - 1]?.banner : "";
    const lastM4 = Middle4Banners.length > 0 ? Middle4Banners[Middle4Banners.length - 1]?.banner : "";

  return (
    <>
        <section>
            <article className='container mb-4'>
                <h2 class="newTitleBx">New Products & Offers</h2>
                <aside className='row'>
                    <div className='col-md-6 col-12 mb-4'>
                        <a href="/"><img src={lastM1} alt="" /></a>
                    </div>
                    <div className='col-md-6 col-12 mb-4'>
                        <a href="/"><img src={lastM2} alt="" /></a>
                    </div>
                    <div className='col-md-6 col-12 mb-4'>
                        <a href="/"><img src={lastM3} alt="" /></a>
                    </div>
                    <div className='col-md-6 col-12 mb-4'>
                        <a href="/"><img src={lastM4} alt="" /></a>
                    </div>
                </aside>
            </article>
        </section>

        <section className='container mb-5'>
            <article className='marqueeBx'>
                <marquee>
                    <ul>
                        {
                           Array.isArray(fleshNewsList) && fleshNewsList?.map((item)=>(

                                <li><a >{item.title}</a></li>
                            ))
                        }
                       
                    </ul>
                </marquee>
            </article>
        </section>

    </>
  )
}

export default OfferBanner
