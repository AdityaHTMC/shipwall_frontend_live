import React, { useState, useEffect } from "react";
import { AppContext } from "./AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AppContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);
  const [limitProducts, setLimitProducts] = useState([]);
  const [user, setUser] = useState([]);
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [wishListItem, setWishlistItem] = useState([]);
  const [cartItem, setCartItem] = useState([]);
  const [brandItem, setBrandItem] = useState([]);
  const [brandCatelogueItem, setBrandCatelogueItem] = useState([])
  const [productBySearch, setProductBySearch] = useState([]);
  const [userLoading, setUserLoading] = useState(false);
  const [shippingPrice, setShippingPrice] = useState("");
  const [orderList, setOrderList] = useState({});
  const [bannerList, setBannerList] = useState([]);
  const [dethlevel,setdepthLevel] = useState({
    first : false,
    second : false,
    third : false ,
    fourth : false
  })

  const base_url = "https://shipwall.au/API/shipwall";
  const base_url2 = "https://shipwall.au/WCF_API_HTTPS_LIVE";

  

  // sap integration

  const [cms, setCms] = useState([]);
  const [isLogIn, setIsLogIn] = useState(true);
  const [loginData, setLoginData] = useState({});
  const [BPdata, setBPdata] = useState([]);
  const [singleBPdata, setsingleBPdata] = useState({});
  const [singleProduct, setsingleProduct] = useState({});
  const [itemMatrics, setItemMatrics] = useState([]);
  const [seconditemMatrics, setSecondItemMatrics] = useState([]);
  const [thirditemMatrics, setThirdSecondItemMatrics] = useState([]);
  const [forthitemMatrics, setForthSecondItemMatrics] = useState([]);
  const [sapItem, setSapItem] = useState([]);

  const navigate = useNavigate();
  const cardCode = localStorage.getItem("username9");
  const access = localStorage.getItem("accessC9");
  const bplId = localStorage.getItem('bplId9')

  // useEffect(() => {
  //   const loadUserData = async () => {
  //     setIsLoading(true);
  //     try {
  //       const storedToken = localStorage.getItem("token");

  //       if (storedToken) {
  //         setToken(storedToken);
  //         setIsLoggedIn(true);
  //       } else {
  //         setIsLoggedIn(false);
  //       }
  //       await getUser();
  //       await getAllProduct();
  //       await getlimitProduct();
  //       await getWishList();
  //       await getCartList();
  //       await getBrand();
  //       await getCategory();
  //       await getOrder();
  //       await ItemGroup();
  //     } catch (error) {
  //       console.error("Error loading data:", error);
  //       logOut();
  //       localStorage.removeItem("token");
  //       setUser({});
  //       setIsLoggedIn(false);
  //       setUserLoading(false);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   loadUserData();
  // }, []);

  //  sap useEffect

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await getCartList(cardCode);
        await getWishList(cardCode);
        await ItemGroup();
        await getItem();
        await getBP(cardCode);
      } catch (error) {
        // Handle error if needed
      } finally {
        setIsLoading(false);
      }
    };

    const generateAndSaveToken = async () => {
      try {
        const response = await axios.post(
          `${base_url2}/api/Token`,
          {
            client_id: "htSm-ShIpwall",
            client_secret: "XZCnoaS3b!TAV$HERlloe)HjK4QR4%TzC",
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const { data } = response;

        const token = data.token;
        localStorage.setItem("accessC9", token);
      } catch (error) {
        console.error(error);
      }
    };

    const startTokenGeneration = () => {
      generateAndSaveToken();
      setInterval(generateAndSaveToken, 9 * 60 * 1000);
    };
    startTokenGeneration();

    const checkLocalStorage = async () => {
      try {
        const log = localStorage.getItem("log9");

        if (log) {
          const data = JSON.parse(log);
          const { ai_MessageId } = data;

          if (ai_MessageId === 0) {
            setIsLogIn(true);
          } else {
            setIsLogIn(false);
          }
        } else {
          setIsLogIn(false);
        }
      } catch (error) {
        // Handle error if needed
      }
    };

    const initialLoad = async () => {
      setIsLoading(true);
      await checkLocalStorage();
      await getCartList();
      await getWishList();
      setIsLoading(false);
    };

    initialLoad();
    fetchData();
  }, [cardCode]);

  //  sap functions

  const ItemGroup = async () => {
    // const token = localStorage.getItem("token");
    try {
      const req = await fetch(`${base_url}/api/v1/item_group/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
      });
      const res = await req.json();
      console.log(res.data);
      getItemMatrices()
      setCms(res.data);
    } catch (error) {
      // toast.error(error);
    }
  };

  const getItem = async () => {
    try {
      const response = await axios.post(`${base_url}/api/v1/customer/branch/item/list`,{
        bplId: bplId,
        cardCode:cardCode
      }, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${access}`,
        },
      });

      const { data } = response;

      // if (ItemCode) {
      // setsingleProduct(data);
      // } else {
      setProducts(data.data);
      // }
    } catch (error) {
      // Handle errors here
    }
  };

  const getItemMatrices = async (groupCode, pRcode, plevel) => {
    setdepthLevel({first:false})
    try {
      const response = await axios.post(
        `${base_url}/api/v1/item_matrices/list`,
        { itmsGrpCod: groupCode, pR_PCODE: pRcode || "", plevel: plevel },
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${access}`,
          },
        }
      );

      const { data } = response;

      // if (ItemCode) {
      // setsingleProduct(data);
      // } else {
      setItemMatrics(data.data);
      setdepthLevel({first:true})
      // }
    } catch (error) {
      // Handle errors here
    }
  };

  const getsecondItemMatrices = async (groupCode, pRcode) => {
    try {
    setdepthLevel({second:false})
      const response = await axios.post(
        `${base_url}/api/v1/second_level_item_matrices/list`,
        { itmsGrpCod: groupCode, pR_PCODE: pRcode || "" },
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${access}`,
          },
        }
      );

      const { data } = response;
      setSecondItemMatrics(data.data);
    setdepthLevel({second:true})
    } catch (error) {
      // Handle errors here
    }
  };

  const get3rdItemMatrices = async (groupCode, pRcode) => {
    setdepthLevel({third:false})
    try {
      const response = await axios.post(
        `${base_url}/api/v1/third_level_item_matrices/list`,
        { itmsGrpCod: groupCode, pR_PCODE: pRcode || "" },
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${access}`,
          },
        }
      );

      const { data } = response;
      setThirdSecondItemMatrics(data.data);
    setdepthLevel({third:true})
    } catch (error) {
      // Handle errors here
    }
  };

  const get4thItemMatrices = async (groupCode, pRcode) => {
    setdepthLevel({fourth:false})
    try {
      const response = await axios.post(
        `${base_url}/api/v1/fourth_level_item_matrices/list`,
        { itmsGrpCod: groupCode, pR_PCODE: pRcode || "" },
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${access}`,
          },
        }
      );

      const { data } = response;
      setForthSecondItemMatrics(data.data);
      setdepthLevel({fourth:true})
    } catch (error) {
      // Handle errors here
    }
  };

  const LoginUser = async (user, pass) => {
    try {
      const response = await axios.post(
        `${base_url2}/api/Admin/LoginCustomer`,
        {
          as_UserCode: user,
          as_Pass: pass,
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
        setLoginData(data);
        localStorage.setItem("log9", JSON.stringify(data));
        navigate("/");
        await getCartList();
        await getWishList();
        setIsLogIn(true);

        toast.success('Welcome Back');
      } else {
        console.log(data);
        toast.error(data.as_Message);
      }
    } catch (error) {
      // toast.error("Server Down");
      console.log(error);
    }
  };

  const EmptyCart = async (cardCode) => {
    try {
      const response = await axios.post(
        `${base_url}/api/v1/cart/empty`,
        {
          cardCode: cardCode,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { data } = response;

      if (data.ai_MessageId === 0) {
        setLoginData(data);
        localStorage.setItem("log9", JSON.stringify(data));
        navigate("/");
        await getCartList();
        await getWishList();
        setIsLogIn(true);
        toast.success(data.as_Message);
      } else {
        console.log(data);
        toast.error(data.as_Message);
      }
    } catch (error) {
      toast.error("Server Down");
    }
  };

  const ChangePassword = async (user, pass) => {
    try {
      const response = await axios.post(
        `${base_url2}/api/Admin/ChangePassword`,
        {
          as_UserId: "manager",
          as_UserPass: "Admin@123",
          as_LogInUserType: "C",
          as_LogInUserId: user,
          as_LogInNewPass: pass,
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
        toast.success(data.as_Message);
        navigate("/");
      } else {
        toast.error(data.as_Message);
      }
    } catch (error) {
      toast.error("Server Down");
    }
  };

  const SalseOrderPlace = async (
    selectedItems,
    codam,
    creditam,
    onlineam,
    manualAddress,
    note
  ) => {
    // const cardCode = localStorage.getItem("username");
    try {
      const currentDate = new Date();
      const formattedDate = currentDate
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "");
      const response = await axios.post(
        `${base_url2}/api/Document/PlaceSalesOrder`,
        {
          as_UserId: "manager",
          as_UserPass: "Admin@123",
          l_ClsGET_SO_HDR: {
            cardCode: cardCode,
            docType: "I",
            docDate: formattedDate, // date now
            numAtCard: "", //m
            remarks: note,
            bplId: 3, //m   choise
            taxDate: formattedDate, // date now
            codamt: parseFloat(codam) || 0,
            onlineamt: parseFloat(onlineam) || 0,
            usedcrdamt: parseFloat(creditam) || 0,
            u_SITEADDR : manualAddress,
          },
          lst_ClsGET_SO_DTL: selectedItems,
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
        await EmptyCart(cardCode);
        await getCartList();
        toast.success(data.as_Message);
        navigate("/");
      } else {
        toast.error(data.as_Message);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setTimeout(() => {
        window.location.reload();
      }, 10000);
    }
  };



  const newSalseOrderPlace = async (
    selectedItems,
    codam,
    creditam,
    onlineam,
    manualAddress,
    secureres
  ) => {
    // const cardCode = localStorage.getItem("username");
    try {
      const currentDate = new Date();
      const formattedDate = currentDate
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "");
      const response = await axios.post(
        `${base_url2}/api/Document/PlaceSalesOrder`,
        {
          as_UserId: "manager",
          as_UserPass: "Admin@123",
          l_ClsGET_SO_HDR: {
            cardCode: cardCode,
            docType: "I",
            docDate: formattedDate, // date now
            numAtCard: "", //m
            remarks:
              secureres?.status + secureres?.gatewayResponseMessage || "", //m
            bplId: 3, //m   choise
            taxDate: formattedDate, // date now
            codamt: parseFloat(codam) || 0,
            onlineamt: parseFloat(onlineam) || 0,
            usedcrdamt: parseFloat(creditam) || 0,
            u_SITEADDR : manualAddress
          },
          lst_ClsGET_SO_DTL: selectedItems,
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
        await EmptyCart(cardCode);
        await getCartList();
        toast.success(data.as_Message);
        // navigate("/");
      } else {
        toast.error(data.as_Message);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setTimeout(() => {
        window.location.reload();
      }, 10000);
    }
  };

  const getBP = async (cardCode) => {
    try {
      const queryParams = `CardCode=${
        cardCode || ""
      }&CardType=C&BPLId=&SlpCode=`;

      const response = await axios.get(
        `${base_url2}/api/Masters/GetBP/${cardCode || "%20"}/C/%20/%20`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
        }
      );

      if (response.status === 200) {
        const { data } = response;
        setsingleBPdata(data[0]);
        localStorage.setItem("bplId9", data[0].dftbplid);
      } else {
        console.log(response.data);
      }
    } catch (error) {
      // toast.error('Server Down');
    }
  };

  const logOutsap = () => {
    localStorage.removeItem("log9");
    localStorage.removeItem("username9");
    setIsLogIn(false);
    setCartItem("");
    setWishlistItem("");
    navigate("/");
  };
  // sap function end
  const getOrder = async () => {
    const token = localStorage.getItem("token");
    try {
      const req = await fetch(`${base_url}/api/v1/order-list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      const res = await req.json();
      setOrderList(res.orders);
    } catch (error) {
      // toast.error(error);
    }
  };

  const getBannerList = async () => {
    try {
      const req = await fetch(`${base_url}/api/v1/web/banner/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await req.json();
      setBannerList(res?.data);
    } catch (error) {
      // toast.error(error);
    }
  };

  const ContactUs = async (name, email,mobile , message, token) => {
    try {
      const req = await fetch(`${base_url}/api/v1/contact-us`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          mobile,
          message,
          token
        }),
      });
      const res = await req.json();
      if(req.ok){
        toast.success(res?.message)
      }else{
        toast.error(res?.message)
      }
      return res;
    } catch (error) {
      toast.error(error);
    }
  };

  const ShipingMethodPrice = async (shipping_method) => {
    const token = localStorage.getItem("token");
    try {
      const req = await fetch(`${base_url}/api/ship-price`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({ shipping_method }),
      });
      if (req.ok) {
        const res = await req.json();
        toast.info(res.message);
        setShippingPrice(res.shipping_charge);
      }
    } catch (error) {
      // toast.error(error);
    }
  };

  const order = async (
    shipping_method,
    payment_method,
    shipping_address,
    amount
  ) => {
    const token = localStorage.getItem("token");
    try {
      const req = await fetch(`${base_url}/api/v1/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({
          shipping_method,
          payment_method,
          shipping_address,
          total_price: amount,
        }),
      });
      if (req.ok) {
        const res = await req.json();
        console.log(res);
        toast.info(res.message || "payment successful");
      } else {
        toast.error("payment failed");
      }
    } catch (error) {
      toast.error(error || "payment failed due to server");
    }
  };

  const getCategory = async () => {
    try {
      const req = await fetch(`${base_url}/api/v1/all-catagories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await req.json();
      console.log(res);
    } catch (error) {
      // toast.error(error);
    }
  };

  const addShippingAddress = async (newAddress) => {
    const token = localStorage.getItem("token");
    try {
      const req = await fetch(`${base_url}/api/v1/multi-ship-adress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({ newAddress }),
      });
      if (req.ok) {
        const res = await req.json();
        getUser();
        toast.info(res.message);
      }
    } catch (error) {
      toast.error("server no responding");
    }
  };

  const updateShippingAddress = async (id, newAddress) => {
    const token = localStorage.getItem("token");
    try {
      const req = await fetch(`${base_url}/api/v1/edit-ship-address`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({ newAddress, addressId: id }),
      });
      if (req.ok) {
        const res = await req.json();
        getUser();
        toast.info(res.message);
      }
    } catch (error) {
      toast.error("server not responding");
    }
  };

  const removeShippingAddress = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const req = await fetch(`${base_url}/api/v1/delete-ship-address`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({ addressId: id }),
      });
      if (req.ok) {
        const res = await req.json();
        getUser();
        toast.info(res.message);
      }
    } catch (error) {
      toast.error("server not responding");
    }
  };

  const searchProduct = async (productName, onChange) => {
    try {
      if (productName) {
        const req = await fetch(
          `${base_url}/api/search-products?search=${productName}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (req.ok) {
          const res = await req.json();
          setProductBySearch(res.data);
        }
      }
      if (onChange) {
        const req = await fetch(
          `${base_url}/api/search-products?search=${onChange}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (req.ok) {
          const res = await req.json();
          setProductBySearch(res.data);
        }
      }
    } catch (error) {
      toast.error("server not responding");
      setProductBySearch("");
    }
  };

  const updateQuantity = async (id, quantity, price) => {
    console.log(price);
    try {
      const req = await fetch(`${base_url}/api/v1/cart/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cardCode: cardCode,
          itemCode: id,
          quantity: quantity,
          price: price,
        }),
      });
      if (req.ok) {
        const res = await req.json();
        toast.update(res.message);
        getCartList();
      }
    } catch (error) {
      toast.error("server not responding");
    }
  };

  const getSapItem = async (itemCode) => {
    try {
      const response = await axios.get(
        `${base_url2}/api/Masters/GetItem/${itemCode || "%20"}/I/${
          cardCode || "%20"
        }/%20/%20/%20/%20/%20`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
        }
      );
      const { data } = response;
      setSapItem(data[0]);
      return data;
    } catch (error) {
      console.log(error, " error my-context ");
      throw error;
    }
  };

  const addToCart = async (
    id,
    q,
    price,
    name,
    dis,
    pic,
    fright1Amount,
    taxPerc1
  ) => {
    try {
      console.log(id,q,name,pic,'ADTCART');
      const sapItem1 = await getSapItem(id);
      if (isLogIn) {
        const { itemPrice, itemAddCharges, taxPerc, itemQty, itemName } =
          sapItem1[0];

        if (itemQty > 0) {
          const req = await fetch(`${base_url}/api/v1/add-to-cart`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              cardCode: cardCode,
              itemCode: id,
              quantity: q,
              price: itemPrice,
              itemName: name,
              // Discount: dis,
              whsCode: "PT-FGTG",
              image1: pic,
              fright1Amount: itemAddCharges,
              taxPerc: taxPerc,
            }),
          });

          const res = await req.json();
          toast.success(res?.message);
          getCartList();
        } else {
          toast.info(`Item Out Of Stock ${itemName}`);
        }
      } else {
        toast.info("Login First");
        // navigate("/");
      }
    } catch (error) {
      toast.error("Server not responding");
    }
  };


  const addToNewCart = async ({ itemCode, quantity, price, itemName, image1, fright1Amount, taxPerc }) => {
    try {
      const response = await axios.post(`${base_url}/api/v1/add-to-cart`, {
        itemCode,
        quantity,
        price,
        itemName,
        image1,
        fright1Amount,
        taxPerc,
        cardCode
      }, {
        headers: {
          "Content-Type": "application/json",
        }
      });
  
      const res = response.data;
      toast.success(res?.message);
      getCartList();
    } catch (error) {
      toast.error("Item is already present in your Order");
    }
  };






  const removeCartItem = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const req = await fetch(`${base_url}/api/v1/remove/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cardCode: cardCode, itemCode: id }),
      });
      if (req.ok) {
        const res = await req.json();
        getCartList();
        toast.info(res.message);
      }
    } catch (error) {
      toast.error("server not responding");
    }
  };

  const getCartList = async () => {
    const token = localStorage.getItem("token");
    try {
      const req = await fetch(`${base_url}/api/v1/user/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cardCode: cardCode }),
      });
      const res = await req.json();
      setCartItem(res.data);
    } catch (error) {
      // toast.error(error);
    }
  };

  const removeWishList = async (id) => {
    try {
      const req = await fetch(`${base_url}/api/v1/wishlist/remove`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({ CardCode: cardCode, ItemCode: id }),
      });
      if (req.ok) {
        const res = await req.json();
        getWishList();
        toast.info(res.message);
      }
    } catch (error) {
      toast.error("server not responding");
    }
  };

  const getWishList = async () => {
    const token = localStorage.getItem("token");
    try {
      const req = await fetch(`${base_url}/api/v1/user/wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ CardCode: cardCode }),
      });
      if (req.ok) {
        const res = await req.json();
        console.log(res);
        setWishlistItem(res.data.Wishlist);
      }
    } catch (error) {
      // toast.error(error.message);
    }
  };

  const addWishlist = async (code, price, name, pic,id,itemAddCharges,taxPerc) => {
    try {
      if (cardCode) {
        const req = await fetch(`${base_url}/api/v1/wishlist/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            CardCode: cardCode,
            ItemCode: code,
            Price: price,
            ItemName: name,
            Image1: pic,
            ItemId:id,
            fright1Amount:itemAddCharges,
            taxPerc:taxPerc
          }),
        });

        const res = await req.json();
        toast.success(res?.message);
        getWishList();
      } else {
        toast.info("Login first");
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const getAllProduct = async () => {
    try {
      const response = await axios.get(`${base_url}/api/v1/all/products`);
      setProducts(response.data.Products);
    } catch (error) {
      // console.error("Error fetching products:", error);
    }
  };

  const getlimitProduct = async () => {
    try {
      const req = await fetch(`${base_url}/api/all-products?limit=8`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await req.json();
      setLimitProducts(res.products);
    } catch (error) {
      // console.log(error);
    }
  };

  // const loginUser = async ({ email, password }) => {
  //   setUserLoading(true);
  //   try {
  //     const req = await fetch(`${base_url}/user/login`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         email,
  //         password,
  //       }),
  //     });
  //     const res = await req.json();
  //     if (req.ok) {
  //       await localStorage.setItem("token9", res?.result.token);
  //       await setToken(res.res?.result.token);
  //       await getUser();
  //       await getWishList();
  //       await getCartList();
  //       await toast.success(res?.message);
  //       await setIsLoggedIn(true);
  //     } else {
  //       toast.info("make sure you input valid email and password");
  //     }
  //   } catch (error) {
  //     toast.error("Login failed due to server down");
  //   }
  //   setUserLoading(false);
  // };

  const getUser = async () => {
    setUserLoading(true);
    const storedToken = localStorage.getItem("token");
    try {
      const req = await fetch(`${base_url}/user/valid`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: storedToken,
        },
      });
      const res = await req.json();
      if (req.ok) {
        await setUser(res.user);
        await setIsLoggedIn(true);
        await setUserLoading(false);
        getWishList();
        getCartList();
      } else {
        logOut();
        localStorage.removeItem("token");
        setUser({});
        setIsLoggedIn(false);
        setUserLoading(false);
      }
    } catch (error) {
      logOut();
      localStorage.removeItem("token");
      setUser({});
      setIsLoggedIn(false);
      setUserLoading(false);
    }
  };

  const logOut = async () => {
    try {
      const req = await fetch(`${base_url}/api/logout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      const res = await req.json();
      setToken("");
      setUser([]);
      setCartItem([]);
      setOrderList([]);
      setWishlistItem([]);
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      setUserLoading(false);
      toast.success(res?.message);
    } catch (error) {
      // toast.error(error);
    }
  };

  const getBrand = async () => {
    try {
      const req = await fetch(`${base_url}/api/v1/brand/list`, {
        method: "POSt",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await req.json();
      setBrandItem(res.data);
    } catch (error) {
      // console.log(error);
    }
  };


  const getBrandCatelogue = async () => {
    try {
      const req = await fetch(`${base_url}/api/v1/brand/catalogue/list`, {
        method: "POSt",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await req.json();
      setBrandCatelogueItem(res.data);
    } catch (error) {
      // console.log(error);
    }
  };

  const Createpayment = async (
    ctoken,
    selectedItems,
    codam,
    creditam,
    onlineam,
    manualAddress,
    note,
    code
  ) => {
    try {
      console.log("payment Data", {ctoken, selectedItems, codam,onlineam, creditam, manualAddress, note})
      const req = await fetch(`${base_url}/api/createPayment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: onlineam.toFixed(2),
          token: ctoken,
          // orderId: 12345,
        }),
      });
      const res = await req.json();
      if (req.ok) {
        if (res.status === "paid") {
          toast.success(res.gatewayResponseMessage);
          if(!code) {
            SalseOrderPlace(
              selectedItems,
              codam?.toFixed(2) || 0,
              creditam?.toFixed(2) || 0,
              onlineam?.toFixed(2) || 0,
              manualAddress,
              note
            );
          }else{
            window?.ReactNativeWebView?.postMessage(JSON.stringify({...res, success: true}))
          }
        } else {
          if(code){
            window?.ReactNativeWebView?.postMessage(JSON.stringify({...res, success: false}))
          }
          toast.error(res.gatewayResponseMessage);
        }
      }else{
        window?.ReactNativeWebView?.postMessage(JSON.stringify({...res, success: false}))
        toast.error(res?.errors[0]?.detail);
      }
      // setBrandItem(res.data);
    } catch (error) {
      console.log(error);
      window?.ReactNativeWebView?.postMessage(JSON.stringify({success: false, message: error?.message}))
      toast.error(error.message);
    }
  };

  const abc = {
    logOut,
    isLoggedIn,
    products,
    limitProducts,
    user,
    token,
    addToCart,
    addWishlist,
    wishListItem,
    removeWishList,
    cartItem,
    removeCartItem,
    brandItem,
    updateQuantity,
    searchProduct,
    productBySearch,
    isLoading,
    removeShippingAddress,
    updateShippingAddress,
    addShippingAddress,
    userLoading,
    order,
    ShipingMethodPrice,
    shippingPrice,
    orderList,  addToNewCart, getBrandCatelogue,brandCatelogueItem,
    
    // sap
    cms,
    LoginUser,
    loginData,
    isLogIn,
    logOutsap,
    SalseOrderPlace,
    newSalseOrderPlace,
    getBP,
    singleBPdata,
    ChangePassword,
    EmptyCart,
    getCartList,
    singleProduct,
    getItem,
    Createpayment,
    itemMatrics,
    getItemMatrices,
    getsecondItemMatrices,
    seconditemMatrics,
    get3rdItemMatrices,
    get4thItemMatrices,
    thirditemMatrics,
    forthitemMatrics,
    getSapItem,
    sapItem,
    base_url,
    getBannerList,
    bannerList,
    ContactUs,
    getBrand,
    isLogIn,
    dethlevel
  };

  return <AppContext.Provider value={abc}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
