import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../contextApi/AppContext";
import { useApi } from "../contextApi/ApiContexts/ApiContexts";

const Cateloguepage = () => {
  const { getBrandCatelogue, brandCatelogueItem } = useAppContext();
  const { getItem , baseURL2 } = useApi();
  const navigate = useNavigate();


  useEffect(()=>{
    getBrandCatelogue()
  },[])

   console.log(brandCatelogueItem,'BI');
   

   const filteredBrandItems = brandCatelogueItem.filter((item) => item.brand_catalogue !== "null");

  // Function to handle downloading the PDF file
  const handleDownload = (fileName) => {
    // Base URL where the PDF files are hosted
    const basePath = `${baseURL2}/uploads/brand`;
  
    // Construct the full URL for the PDF file
    const pdfUrl = `${basePath}/${fileName}`;
  
    // Create an anchor element
    const anchor = document.createElement("a");
    anchor.href = pdfUrl;
    anchor.target = "_blank"; // Open in new tab
    anchor.rel = "noopener noreferrer"; // Security best practice
    anchor.download = fileName; // Set the file name for download
  
    // Append the anchor to the document body
    document.body.appendChild(anchor);
  
    // Trigger a click event on the anchor
    anchor.click();
  
    // Remove the anchor from the document body after download
    document.body.removeChild(anchor);
  };

  return (
    <div>
      <section className="tp-brand-area pb-50 pt-10">
        <div className="container">
          <h2 className="newTitleBx">Catalogue</h2>
          <div className="brandBx">
            {Array.isArray(filteredBrandItems) &&
              filteredBrandItems.map((item, index) => (
                <div className="item" key={index}>
                  {/* Use onClick to trigger the download */}
                  <img
                    src={item?.image}
                    height={50}
                    alt=""
                    onClick={() => handleDownload(item?.brand_catalogue)}
                    style={{ cursor: "pointer" }} // Show pointer cursor on hover
                  />
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cateloguepage;
