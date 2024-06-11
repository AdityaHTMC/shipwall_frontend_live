import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../contextApi/AppContext";
import { useApi } from "../contextApi/ApiContexts/ApiContexts";

const ViewBanner = () => {
  const { brandItem, getBrand } = useAppContext();
  const { getItem } = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    if (!brandItem || brandItem.length === 0) {
      getBrand();
    }
  }, [brandItem, getBrand]);

  const handelItemByBrand = (mId, mname) => {
    getItem(mId);
    // navigate(`/product-list/${mname}`)
  };

  return (
    <div>
      <section className="tp-brand-area pb-50 pt-10">
        <div className="container">
          <h2 className="newTitleBx">Brands</h2>
          <div className="brandBx">
            {Array.isArray(brandItem) &&
              brandItem
                .filter((item) => item.image) // Filter out items with empty image
                .map((item, index) => (
                  <div className="item" key={index}>
                    <Link
                      to={`/product-brand/${item?.manufacturerName}`}
                      onClick={() =>
                        handelItemByBrand(
                          item?.manufacturerId,
                          item?.manufacturerName
                        )
                      }
                    >
                      <img src={item?.image} height={50} alt="" />
                    </Link>
                  </div>
                ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViewBanner;
