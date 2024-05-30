import React, { useContext, useEffect, useRef, useState } from "react";
import Collapse from "react-bootstrap/Collapse";
import { motion, useAnimation, useInView } from "framer-motion";
import { useAppContext } from "../../../contextApi/AppContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useApi } from "../../../contextApi/ApiContexts/ApiContexts";

// const base_url = "https://shipwall.au/WCF_API_HTTPS";
// const baseURL2 = "https://shipwall.au/test/API/shipwall";

const ProductCategories = ({ list }) => {
  const { baseURL2, base_url } = useApi();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  const [subcate, setSubcate] = useState([]);
  const [openStates, setOpenStates] = useState([]);
  const [currentlyOpenIndex, setCurrentlyOpenIndex] = useState(null);

  const { catlist, groupCod, validCatCollepse, getItem, mydata, setCheckedValues, checkedValues } = useApi();

  useEffect(() => {
    setOpenStates(Array(catlist.length).fill(false));
    return () => {
      setCheckedValues([]);
    };
  }, [catlist]);

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView]);

  const toggleCategory = async (index, id) => {
    try {
      const response = await axios.post(
        `${baseURL2}/api/v1/item/attribute-value/list`,
        { attributeId: id },
        { headers: { "Content-Type": "application/json" } }
      );

      const { data } = response;

      // Extract unique values
      const uniqueValues = Array.from(new Set(data.data.map(item => item.value)));

      setSubcate(uniqueValues);

      setOpenStates((prevStates) => {
        const newStates = prevStates.map((state, i) => i === index && !state);
        return newStates;
      });
    } catch (error) {
      console.log(error, "pro-cat error");
    }
  };

  const handleCheckboxChange = (event, value) => {
    if (event.target.checked) {
      setCheckedValues([...checkedValues, value]);
    } else {
      setCheckedValues(checkedValues.filter((item) => item !== value));
    }
  };

  return (
    <div ref={ref} style={{ position: "relative", overflow: "hidden" }} className="tp-shop-widget">
      <div>
        <h2 className="newTitleBx mb-2">Filter By Attributes</h2>
        <ul className="listUnderLine">
          {catlist?.map((item, index) => (
            <li key={index}>
              <Link
                onClick={() => toggleCategory(index, item._id)}
                aria-controls={`categoryCollapse${index}`}
                aria-expanded={openStates[index]}
              >
                {item?.attribute}
              </Link>
              <Collapse in={openStates[index] && subcate.length > 0}>
                <div>
                  {subcate?.map((value, subIndex) => (
                    <div className="checkItem" key={subIndex}>
                      <input
                        type="checkbox"
                        onChange={(event) => handleCheckboxChange(event, value)}
                      />
                      &nbsp;
                      <Link>
                        {value}
                      </Link>
                    </div>
                  ))}
                </div>
              </Collapse>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductCategories;
