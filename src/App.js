import "./App.css";
import "./css/mix.css";
import "./css/dropdown.css";
import "./css/newStyle.css";
import Footer from "./components/common/footer/Footer";
import { Routes, Route } from "react-router-dom";
import Header from "./components/common/header/Header";
import MainScreen from "./screen/MainScreen";
import ContactUs from "./screen/ContactUs";
import PrivacyPolicy from "./screen/PrivacyPolicy";
import TermsAndConditions from "./screen/TermsAndConditions";
import OurStory from "./screen/OurStory";
import ProductCards from "./components/normal/Product-card/ProductCards";
import ProductList from "./sub-screen/ProductList";
import ProductDetail from "./sub-screen/ProductDetail";
import { useState, useEffect } from "react";
import PreLoading from "./components/common/PreLoading";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./screen/Cart";
import WishList from "./screen/WishList";
import Profile from "./screen/Profile";
import { ToastContainer } from "react-toastify";
import CheckoutPage from "./screen/CheckOut";
import Test from "./screen/Test";
import SearchProductList from "./sub-screen/SearchProductList";
import { useAppContext } from "./contextApi/AppContext";
import ProtectedRoute from "./screen/ProtactRoute";
import FilterByCatProduct from "./sub-screen/FilterByCatProduct";
import SingleProductCheckOut from "./screen/SingleProductCheckOut";
import LoginPage from "./screen/LoginPage";
import Order from "./screen/Order";
import ManageAddress from "./components/normal/account/ManageAddress";
import ScrollToTop from "./ScrollToTop";
import Error from "./screen/Error";
import CardPayment from "./screen/payment/CardPayment";
import OrderDetails from "./screen/OrderDetails";
import ClearenceProductList from "./sub-screen/ClearenceProductList";
import BestSeller from "./sub-screen/BestSeller";
import NewLaunch from "./sub-screen/NewLaunch";
import ViewLogos from "./sub-screen/ViewLogos";
import AboutUs from "./components/CMSPages/AboutUs";
import NewCustomer from "./components/CMSPages/NewCustomer";
import HowUseAccount from "./components/CMSPages/HowUseAccount";
import PlacingOrder from "./components/CMSPages/PlacingOrder";
import PaymentMethod from "./components/CMSPages/PaymentMethod";
import DelivaryDispatch from "./components/CMSPages/DelivaryDispatch";
import ProblemInOrder from "./components/CMSPages/ProblemInOrder";
import HelpCenter from "./components/CMSPages/HelpCenter";
import Contact from "./components/CMSPages/Contact";
import ReportAbuse from "./components/CMSPages/ReportAbuse";
import PrivacyPolicyPage from "./components/CMSPages/PrivacyPolicyPage";
import RefundPolicy from "./components/CMSPages/RefundPolicy";
import FAQpages from "./components/CMSPages/FAQpages";
import Cateloguepage from "./sub-screen/Cateloguepage";
import OrderTracking from "./sub-screen/OrderTracking";
import OurStories from "./components/CMSPages/OurStories";
import UserProfile from "./components/normal/account/UserProfile";
import AccountSummary from "./components/normal/account/AccountSummary";
import Return from "./screen/Return";

function App() {
  const { isLoading } = useAppContext();

  return (
    <>
      {isLoading === false ? (
        <>
          <Header />
          <ScrollToTop/>
          <ToastContainer position="top-center" />
          <Routes>
            <Route exact path="/" element={<MainScreen />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsAndConditions />} />
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/product" element={<ProductCards />} />
            <Route path="/product-list" element={<ProductList />} />
            <Route path="/clearence-product-list" element={<ClearenceProductList />} />
            <Route path="/bestseller-product-list" element={<BestSeller />} />
            <Route path="/newLaunch-product-list" element={<NewLaunch />} />
            <Route path="/brandCatalogue" element={<Cateloguepage/>} />
            <Route path="/viewlogo" element={<ViewLogos/>} />
            <Route path="/product-list/:name/:grpid" element={<ProductList />} />
            <Route path="/product-list/:id" element={<SearchProductList />} />
            <Route path="/product-brand/:name" element={<ProductList />} />
            <Route path="/cms/about-us" element={<AboutUs/>} />
            <Route path="/cms/new-customers" element={<NewCustomer/>} />
            <Route path="/cms/how-to-use-my-account" element={<HowUseAccount/>} />
            <Route path="/cms/placing-an-order" element={<PlacingOrder/>} />
            <Route path="/cms/payment-methods" element={<PaymentMethod/>} />
            <Route path="/cms/delivery-dispatch" element={<DelivaryDispatch/>} />
            <Route path="/cms/problems-with-your-order" element={<ProblemInOrder/>} />  
            <Route path="/cms/help-center" element={<HelpCenter/>} />
            <Route path="/cms/contact-us" element={<Contact/>} />
            <Route path="/cms/report-abuse" element={<ReportAbuse/>} />
            <Route path="/cms/privacy-policy" element={<PrivacyPolicyPage/>} />
            <Route path="/cms/cancellation-refund-policy" element={<RefundPolicy/>} />
            <Route path="/cms/our-stories" element={<OurStories/>} />
            <Route path="/cms/faq" element={<FAQpages/>} />
            {/* <Route path="/order-tracking" element={<OrderTracking/>} /> */}
            <Route
              path="/product-list-cat/:name"
              element={<FilterByCatProduct />}
            />
            <Route path="/product-details/:id" element={<ProductDetail />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Routes */}
            <Route path="/order-details/:id" element={<ProtectedRoute />}>
              <Route index element={<OrderDetails />} />
            </Route>
            <Route path="/cart" element={<ProtectedRoute />}>
              <Route index element={<Cart />} />
            </Route>
            
            <Route path="/order-tracking" element={<ProtectedRoute />}>
              <Route index element={<OrderTracking/>} />
            </Route>

            <Route path="/wishlist" element={<ProtectedRoute />}>
              <Route index element={<WishList />} />
            </Route>
            <Route path="/account" element={<ProtectedRoute />}>
              <Route index element={<Profile />} />
            </Route>

            <Route path="/checkout" element={<ProtectedRoute />}>
              <Route index element={<CheckoutPage />} />
            </Route>

            <Route path="/order" element={<ProtectedRoute />}>
              <Route index element={<Order />} />
            </Route>

            <Route path="/address" element={<ProtectedRoute />}>
              <Route index element={<ManageAddress />} />
            </Route>

            <Route path="/checkout/:id" element={<ProtectedRoute />}>
              <Route index element={<SingleProductCheckOut />} />
            </Route>

            <Route path="/account/profile" element={<ProtectedRoute />}>
              <Route index element={<UserProfile />} />
            </Route>

            <Route path="/account/orders" element={<ProtectedRoute />}>
              <Route index element={<Order />} />
            </Route>

            <Route path="/account/details" element={<ProtectedRoute />}>
              <Route index element={<AccountSummary />} />
            </Route>

            <Route path="/account/address" element={<ProtectedRoute />}>
              <Route index element={<ManageAddress />} />
            </Route>

            <Route path="/account/return" element={<ProtectedRoute />}>
              <Route index element={<Return/>} />
            </Route>
            {/* <Route path="/test1" element={<Test />} /> */}
            <Route
              path="*"
              element={
                <Error/>
              }
            />
          </Routes>
          <Footer />
        </>
      ) : (
        <PreLoading />
      )}
    </>
  );
}

export default App;
