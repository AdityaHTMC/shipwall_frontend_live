import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import { json } from "react-router-dom";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const base_url = "https://shipwall.au/WCF_API_HTTPS_LIVE"; //SAP Base URL
const baseURL2 = "https://shipwall.au/API/shipwall"; // Node Api Base URL

const cardCode = localStorage.getItem("username9");
const access = localStorage.getItem("accessC9");

const ApiContexts = createContext();


export const ApiProvider = ({ children }) => {
  const location = useLocation()
  const isProductListPage = location.pathname === '/product-list/'
  const isProductListPageBrand = location.pathname === '/product-brand/'
  const [Adddata, setAddData] = useState();
  const [filterItem, setfilterItem] = useState();
  const [catlist, setcatList] = useState([]);
  const [allItem, setAllItem] = useState([]);
  const [listItemWith, setListItemWith] = useState([]);
  const [ProductDetails, setProDuctSetail] = useState();
  const [productBySearch, setProductBySearch] = useState([]);
  const [orderList, setOrderList] = useState();
  const [ slugvalue , setSlugValue ] = useState()
  const [ cmsPage , setCmspage ] = useState()
  const [fleshNewsList , setFleshNewsList] = useState([])
  const [orderDetails, setOrderDetails] = useState(null);
  // category matrix state
  const [pr1, setpr1] = useState();
  const [pr2, setpr2] = useState();
  const [pr3, setpr3] = useState();
  const [pr4, setpr4] = useState();
  const [pr5, setpr5] = useState();
  const [groupCod, setGroupCod] = useState("");
  const [arInvoiceList, setArInvoiceList] = useState([]);
  const [productLoading, setProductLoading] = useState(false)
  const [checkedValues, setCheckedValues] = useState([]);
  const [loginShow, setLoginShow] = useState(false);

  const [clearenceData , setClearenceData] = useState()
  const [ ledgerData , setledgerData ] = useState([])


  const [mydata, setMyData] = useState({
    attribute: "",
    value: "",
  });



  const [filterPrice, setfilterPrice] = useState([]);


  // useEffect(() => {
  //   if (isProductListPage && isProductListPageBrand) {
  //     resetState();
  //   }
  // }, [location.pathname]);

  const getBP = async () => {
    try {
      // const cardCode = localStorage.getItem("username");
      // const access = localStorage.getItem("accessC");
      const response = await axios.get(
        `${base_url}/api/Masters/GetBP/${cardCode || "%20"}/C/%20/%20`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
        }
      );

      const { data } = response;

      setAddData(data[0]);
    } catch (error) {
      console.log(error, "context-api");
    }
  };

  const getARInvoice1 = async (docEntry) => {
    try {
      // const cardCode = localStorage.getItem("username");
      // const access = localStorage.getItem("accessC");
      const response = await axios.get(
        `${base_url}/api/Document/Get_ARInvoice/${docEntry || "%20"
        }/DTC/%20/${cardCode}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
        }
      );

      const { data } = response;
      return data;
    } catch (error) {
      console.log(error, "context-api");
    }
  };

  const getARInvoice = async (docEntry) => {
    try {
      // const cardCode = localStorage.getItem("username");
      // const access = localStorage.getItem("accessC");
      const response = await axios.get(
        `${base_url}/api/Document/Get_ARInvoice/${docEntry || "%20"
        }/DTC/%20/${cardCode}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
        }
      );

      const { data } = response;
      setArInvoiceList(data);
      return data;
    } catch (error) {
      console.log(error, "context-api");
    }
  };

  const PlaceReturnRequest = async (mergdata, remrks, selectedDate) => {
    try {
      const cardName = JSON.parse(localStorage.getItem("log"));
      // const access = localStorage.getItem("accessC");
      const bplId = localStorage.getItem('bplId')
      const currentDate = new Date().toISOString().slice(0, 10);
      // const cardCode = localStorage.getItem("username");
      const response = await axios.post(
        `${base_url}/api/Document/PlaceReturnRequest`,
        {
          as_UserId: "manager",
          as_UserPass: "Admin@123",
          header: {
            docEntry: 0,
            docNum: 0,
            series: 0,
            seriesName: "",
            docDate: currentDate,
            docDueDate: selectedDate.toISOString().slice(0, 10),
            taxDate: currentDate,
            numAtCard: "",
            cardCode: cardCode,
            cardName: cardName?.as_Name,
            remarks: remrks,
            docType: "I",
            bplId: parseInt(bplId),
          },
          details: mergdata,
          freight: null,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
        }
      );

      const { data } = response;
      if (data.ai_MessageId === 0) {
        toast.success(data.as_Message)
      } else {
        toast.error(data.as_Message)
      }
    } catch (error) {
      console.log(error)
    }
  };

  const [min, max] = filterPrice || [];

  const getItem = async (mId, g, price) => {
    try {
      setProductLoading(true)
      let requestData = {};
      if (mId) {
        requestData = { manufacturerId: mId };
      } else {
        const { attribute, value } = mydata || {};
        requestData = {
  
          min_price: filterPrice ? min : '',
          max_price: filterPrice ? max : '',
          itmsGrpCod: g || groupCod ? parseInt(groupCod) : "",
          attribute: mydata.attribute || "",
          value: mydata.value || "",
          u_PROPRT1: pr1,
          u_PROPRT2: pr2,
          u_PROPRT3: pr3,
          u_PROPRT4: pr4,
          manufacturerId: "",
          values: checkedValues
        };
      }

      console.log(requestData,'CPRs');

      const response = await axios.post(
        `${baseURL2}/api/v1/item/list`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { data } = response;
      setfilterItem(data?.data);
    } catch (error) {
      console.log(error, " error my-context ");
    } finally {
      setProductLoading(false)
    }
  };


  const getClearenceItem = async (dataToSend) => {
    try {
      
      const response = await axios.post(
        `${baseURL2}/api/v1/item/list`,
       { ...dataToSend},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { data } = response;
      setClearenceData(data?.data);
    } catch (error) {
      console.log(error, " error my-context ");
    } finally {
      setProductLoading(false)
    }
  };



  const getCmsDetails = async (dataTosend) => {
    try {
    
      const response = await axios.post(
        `${baseURL2}/api/v1/cms/details`,
        {...dataTosend},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { data } = response;

      // if (ItemCode) {
      //   setsingleItemdata(data);
      // } else {
        setCmspage(data?.data);
      // }
    } catch (error) {
    }
  };


  const getFleshNewsList = async () => {
    try {
     
      const response = await axios.post(
        `${baseURL2}/api/v1/flashy-news/list`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { data } = response;
        setFleshNewsList(data?.data);
    } catch (error) {
    }
  };

  



  // const searchProduct = async (productName, onChange) => {
  //   try {
  //     if (productName) {
  //       const req = await fetch(`${baseURL2}/api/v1/item/list`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           keyword_search: productName,
  //         }),
  //       });
  //       if (req.ok) {
  //         const res = await req.json();
  //         setProductBySearch(res.data);
  //       }
  //     }
  //     if (onChange) {
  //       const req = await fetch(`${baseURL2}/api/v1/item/list`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           keyword_search: onChange,
  //         }),
  //       });
  //       if (req.ok) {
  //         const res = await req.json();
  //         console.log(res, "abcd");
  //         setProductBySearch(res.data);
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error, "error from mycontext");
  //   }
  // };


  const searchProduct = async (dataToSend) => {
    try {
      const req = await axios.post(`${baseURL2}/api/v1/item/list`, {
        ...dataToSend
      }, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      if (req.status === 200) {
        const res = req.data;
        setProductBySearch(res.data);
      }
    } catch (error) {
      console.log(error, "error from mycontext");
    }
  };
  

  const categorieslist = async () => {
    try {
      const response = await axios.post(
        `${baseURL2}/api/v1/item/attribute/list`,
        {
          itmsGrpCod: groupCod.toString(),
          u_PROPRT1: pr1,
          u_PROPRT2: pr2,
          u_PROPRT3: pr3,
          u_PROPRT4: pr4,
        },
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${access}`,
          },
        }
      );

      const { data } = response;
      if (data && data.status === 200) {
        setcatList(data.data);
      } else {
        throw new Error("Failed to fetch categories");
      }
    } catch (error) {
      console.log("Error fetching categories:", error);
      setcatList([]);
    }
  };

  const list_item = async (groupCode) => {
    try {
      const response = await axios.post(
        `${baseURL2}/api/v1/item_group/list`,
        // Include request body if require
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${access}`,
          },
        }
      );

      const { data } = response;
      setAllItem(data.data);
      // console.log(data , 'qw');
    } catch (error) {
      console.log(error, "error my-context");
    }
  };



  const list_item_With = async (groupCode) => {
    try {
      const response = await axios.get(
        `${baseURL2}/api/v1/item-group/matrices/list`,
        // Include request body if require
      );

      const { data } = response;
      setListItemWith(data.data);
      // console.log(data , 'qw');
    } catch (error) {
      console.log(error, "error my-context");
    }
  };

  const ProductDetailApi = async (id) => {
    try {
      const response = await axios.post(
        `${baseURL2}/api/v1/item/details/:${id}`,
        // Include request body if require
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${access}`,
          },
        }
      );

      const { data } = response;
      setProDuctSetail(data.data);
      // console.log(data , 'qw');
    } catch (error) {
      console.log(error, "error my-context");
    }
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}${month}${day}`;
  };

  const getOrder = async () => {
    try {
      // const cardCode = localStorage.getItem("username");
      // const access = localStorage.getItem("accessC");

      // Get today's date
      const today = new Date();
      const todayFormatted = formatDate(today);

      // Calculate 6 months ago
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(today.getMonth() - 6);
      const sixMonthsAgoFormatted = formatDate(sixMonthsAgo);

      const req = await fetch(
        `${base_url}/api/Document/Get_Sales_Report/${sixMonthsAgoFormatted}/${todayFormatted}/${cardCode}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
        }
      );

      const res = await req.json();
      setOrderList(res);
    } catch (error) {
      // Handle the error
      // toast.error(error);
    }
  };


  const trackOrder = async (orderId) => {
    try {

      // const cardCode = localStorage.getItem("username");
      // const access = localStorage.getItem("accessC");

      // Get today's date
      const today = new Date();
      const todayFormatted = formatDate(today);

      // Calculate 6 months ago
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(today.getMonth() - 6);
      const sixMonthsAgoFormatted = formatDate(sixMonthsAgo);

      const req = await fetch(
        `${base_url}/api/Document/Get_Sales_Report/${sixMonthsAgoFormatted}/${todayFormatted}/${cardCode}/${orderId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
        }
      );


      const data = await req.json();
      setOrderDetails(data);
     
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };




  const dowloadLedger = async () => {
    try {

      // const cardCode = localStorage.getItem("username");
      // const access = localStorage.getItem("accessC");

      // Get today's date
      const today = new Date();
      const todayFormatted = formatDate(today);

      // Calculate 6 months ago
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(today.getMonth() - 6);
      const sixMonthsAgoFormatted = formatDate(sixMonthsAgo);

      const req = await fetch(
        `${base_url}/api/Document/GetCustomerLedger/${cardCode}/${sixMonthsAgoFormatted}/${todayFormatted}/3`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
        }
      );

      const data = await req.json();
      
      const chunkedData = [];
      for (let i = 0; i < data.length; i += 22) {
        chunkedData.push(data.slice(i, i + 22));
      }
  
      const dataObjects = chunkedData.map((chunk, index) => ({
        page: index + 1,
        data: chunk, 
      }))
      setledgerData(dataObjects);
     
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  const fetchsales = async (docEntry, objType) => {
    const DocEntry = `${docEntry}`;
    try {
      // const access = localStorage.getItem("accessC");

      const response = await fetch(`${base_url}/api/Document/GeneratePdf`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify({
          param: [
            {
              name: "Dockey@",
              value: DocEntry,
            },
          ],
          objType: objType,
          docEntry: DocEntry,
        }),
      });
      const data = await response.json();

      const pathfile = data.as_Message;
      const basePath = "C:\\inetpub\\wwwroot\\exportedfiles\\";
      const relativePath = pathfile.replace(basePath, "");

      await handelDownload(relativePath);
    } catch (error) { }
  };

  const handelDownload = async (documentFile) => {
    try {
      const downloadURL = `https://shipwall.au/test/exportedfiles/${documentFile}`;
      const response = await fetch(downloadURL);
      if (response.ok) {
        const blob = await response.blob();
        const downloadLink = document.createElement("a");
        const blobURL = URL.createObjectURL(blob);
        downloadLink.href = blobURL;
        downloadLink.download = documentFile;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      } else {
        console.error("Failed to fetch file:", response.statusText);
      }
    } catch (error) {
      console.error("Error during file download:", error);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      await getItem();
    };

    fetchData();
  }, [groupCod, pr1, pr2, pr3, pr4, checkedValues, min, max]);

  useEffect(() => {
    const fetchData = async () => {
      await categorieslist();
    };

    fetchData();
  }, [groupCod, pr1, pr2, pr3, pr4]);

  useEffect(() => {
    const fetchData = async () => {
      await getBP();
      await getItem();
      await list_item();
      await list_item_With()
      // await searchProduct();
      // await ProductDetailApi();
      await getOrder();
      // await fetchsales();

      // console.log(filterItem?.data, 'my-context');
    };

    fetchData();
  }, []);

  return (
    <ApiContexts.Provider
      value={{
        Adddata,
        getItem,
        filterItem,
        allItem,
        list_item,
        setMyData,
        setfilterPrice,
        setGroupCod,
        groupCod,
        catlist,
        categorieslist,
        searchProduct,
        productBySearch,
        ProductDetailApi,
        ProductDetails,
        setpr1,
        setpr2,
        setpr3,
        setpr4,
        setpr5,
        orderList,
        fetchsales,
        handelDownload,
        getOrder,
        getARInvoice,
        arInvoiceList,
        PlaceReturnRequest,
        getARInvoice1,
        productLoading,
        setCheckedValues,
        checkedValues,
        loginShow,
         setLoginShow,
         listItemWith,
         setClearenceData,
         getClearenceItem,
         clearenceData,
         getCmsDetails,cmsPage , getFleshNewsList , fleshNewsList , trackOrder ,orderDetails , ledgerData ,dowloadLedger , base_url , baseURL2 , cardCode , access 
      }}
    >
      {children}
    </ApiContexts.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContexts);

  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }

  return context;
};
