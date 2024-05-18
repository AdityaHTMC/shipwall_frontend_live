import React from 'react'
import Category from '../components/normal/main-screen/Category'
import Banner from '../components/normal/main-screen/Banner'
import ProductBanner from '../components/normal/main-screen/ProductBanner'
import Brand from '../components/normal/main-screen/Brand'
import Feature from '../components/normal/main-screen/Feature'
import Subscriber from '../components/normal/main-screen/Subscriber'
import Slider from '../components/normal/main-screen/Slider'
import Product from '../components/normal/main-screen/Product'
import Test from './Test'
import NewCategory from '../components/normal/main-screen/NewCategory'
import ServiceInfo from '../components/normal/main-screen/ServiceInfo'
import OfferBanner from '../components/normal/main-screen/OfferBanner'
import HomeVideoBx from '../components/normal/main-screen/HomeVideoBx'




const MainScreen = () => {
  return (
    <>
    <Slider/>
    {/* <Category/> */}
    <ServiceInfo/>
    <Product/>
    {/* <Banner/>
    <ProductBanner/> */}
    <OfferBanner/>
    <Brand/>
    <NewCategory/>
    <HomeVideoBx/>
    {/* <Feature/>
    <Subscriber/> */}
    </>
  )
}

export default MainScreen
