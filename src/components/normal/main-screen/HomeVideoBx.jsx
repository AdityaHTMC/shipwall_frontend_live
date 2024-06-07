import React, { useEffect } from "react";
import { useAppContext } from "../../../contextApi/AppContext";

const HomeVideoBx = () => {
  const { getBannerList, bannerList } = useAppContext();
  

  useEffect(() => {
    getBannerList();
  }, []);

  const center4Banners = bannerList.filter((item) => item.position === "video");

  const lastVideoLink = center4Banners.length > 0 ? center4Banners[center4Banners.length - 1]?.link : "";

  const isYouTubeLink = lastVideoLink.includes("youtube.com") || lastVideoLink.includes("youtu.be");

  // Modify the URL to prevent autoplay for YouTube videos
  if (isYouTubeLink) {
    const url = new URL(lastVideoLink);
    url.searchParams.set("autoplay", "0");
    lastVideoLink = url.toString();
  }




  return (
    <>
    <section className="tp-brand-area pb-50">
      <div className="container">
        <h2 className="newTitleBx">Popular Categories</h2>
        <div className="container mt-4 mb-4">
          {isYouTubeLink ? (
            <iframe
              width="100%"
              height="450"
              src={lastVideoLink}
              title="video player"
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          ) : (
            <video
              width="100%"
              height="450"
              controls
              referrerPolicy="strict-origin-when-cross-origin"
            >
              <source src={lastVideoLink} type="video/mp4" />
             
            </video>
          )}
        </div>
      </div>
    </section>
  </>
  );
};

export default HomeVideoBx;
