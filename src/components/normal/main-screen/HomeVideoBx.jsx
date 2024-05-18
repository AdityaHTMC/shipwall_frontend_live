import React, { useEffect } from "react";
import { useAppContext } from "../../../contextApi/AppContext";

const HomeVideoBx = () => {
  const { getBannerList, bannerList } = useAppContext();
  

  useEffect(() => {
    getBannerList();
  }, []);

  const center4Banners = bannerList.filter((item) => item.position === "video");

  const lastVideoLink = center4Banners.length > 0 ? center4Banners[center4Banners.length - 1]?.link : "";

 


  return (
    <>
      <section className="tp-brand-area pb-50">
        <div className="container">
          <h2 className="newTitleBx">Popular Categories</h2>
          <div className="container mt-4 mb-4">
            <iframe
              width="100%"
              height="450"
              src={lastVideoLink}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeVideoBx;
