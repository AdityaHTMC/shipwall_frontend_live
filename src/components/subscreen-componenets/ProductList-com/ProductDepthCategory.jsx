import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useAppContext } from "../../../contextApi/AppContext";
import { useParams } from "react-router-dom";
import { useApi } from "../../../contextApi/ApiContexts/ApiContexts";

const ProductDepthCategory = () => {
  const {
    itemMatrics,

    seconditemMatrics,

    thirditemMatrics,
    forthitemMatrics,
    dethlevel,
  } = useAppContext();

  const { setpr1, setpr2, setpr3, setpr4 } = useApi();

  let dycat = [];

  switch (true) {
    case dethlevel.first:
      dycat = itemMatrics || [];
      break;
    case dethlevel.second:
      dycat = seconditemMatrics || [];
      break;
    case dethlevel.third:
      dycat = thirditemMatrics || [];
      break;
    case dethlevel.fourth:
      dycat = forthitemMatrics || [];
      break;
    default:
      break;
  }

  const handleClick = (item) => {
    switch (true) {
      case dethlevel.first:
        setpr1(item.pcode);
        break;
      case dethlevel.second:
        setpr2(item.pcode);
        break;
      case dethlevel.third:
        setpr3(item.pcode);
        break;
      case dethlevel.fourth:
        setpr4(item.pcode);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h2 className="newTitleBx mb-2">Filter By Category</h2>
      <ul className="listUnderLine mb-4">
        {dycat.map((item) => (
          <li key={item.id}>
            <button onClick={() => handleClick(item)}>{item.pname}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductDepthCategory;
