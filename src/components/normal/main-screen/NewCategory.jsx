import "./../../../css/mix.css";
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useApi } from "../../../contextApi/ApiContexts/ApiContexts";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const NewCategory = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { listItemWith, getItem, setGroupCod, setpr1 } = useApi();

  useEffect(() => {
    if (listItemWith) {
      setLoading(false);
      console.log('first',listItemWith)
    }
  }, [listItemWith]);



  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView]);

  const handlefiltercat = async (groupCode, item) => {
    await setGroupCod(groupCode);
    navigate(`/product-list/${item.itmsGrpNam}/${item.itmsGrpCod}`);
  };

  return (
    <>
      <section className="newCategoriBx pb-15">
        <div ref={ref} className="container">
        <h2 className="newTitleBx">Product by Categories</h2>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 75 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate={mainControls}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="row"
          >
            {listItemWith.map((item) => (
              <div className="col-md-2 col-sm-4 col-6">
                <div className="item">
                  <div className="imgBx">
                    <Link
                      to="#"
                      onClick={() => handlefiltercat(item.itmsGrpCod, item)}
                    >
                      <img className="" src={item.image} alt="product-category" />
                    </Link>
                  </div>
                  <div className="textCont">
                    <h5 className="">
                      <Link
                        to={`/product-list/${item.itmsGrpNam}/${item.itmsGrpCod}`}
                      >
                        {item.itmsGrpNam}{" "}
                      </Link>
                    </h5>

                    <ul>
                      {item.first_level_item_matrix.map((firstLevelItem) => (
                        
                          <li key={firstLevelItem._id}>
                            <Link
                          to={`/product-list/${item.itmsGrpNam}/${firstLevelItem.pname}-${firstLevelItem.plevel}-${firstLevelItem.pcode}?grpCode=${firstLevelItem?.u_ITMGRPCD}`}
                          onClick={() =>
                            setpr1(
                              firstLevelItem?.pcode
                            )
                          }
                        >
                          {" "}
                            {firstLevelItem.pname}
                            {" "}
                        </Link>
                          </li>
                      ))}
                    </ul>
                    {/* <p>20 Product</p> */}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};
export default NewCategory;