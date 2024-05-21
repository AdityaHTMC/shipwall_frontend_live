import React from 'react'
import './../../../css/mix.css'
import { Link } from 'react-router-dom'
import logo from './../../../img/logo.png'
import './Footer.css'
import freedelivery from './../../../img/new/free-delivery.svg'
import safepayment from './../../../img/new/safe-payment.svg'
import helpcenter from './../../../img/new/help-center.svg'
import friendelyservices from './../../../img/new/friendely-services.svg'
import facebook from './../../../img/new/facebook.jpg'
import instagram from './../../../img/new/instagram.jpg'
import twitter from './../../../img/new/twitter.jpg'
import youtube from './../../../img/new/youtube.jpg'
import teligram from './../../../img/new/teligram.jpg'
import whatsapp from './../../../img/new/whatsapp.jpg'
import linkedin from './../../../img/new/linkedin.jpg'
import payment from './../../../img/new/payment.jpg'

const Footer = () => {
  return (
   <>
   
   <footer className='newFootWrap'>
 {/* footer top start */}
  <section className='topBlue'>
   <article className='container'>
      <aside className='row'>
         {/* <div className='col-md-3 col-sm-6 col-12'>
            <div className='item'>
               <img src={freedelivery} alt="" />
               <p>Free Delivery<br />For all orders over $120</p>
            </div>
         </div> */}
         <div className='col-md-4 col-sm-6 col-12'>
            <div className='item'>
               <img src={safepayment} alt="" />
               <p>Safe Payment<br />100% secure payment</p>
            </div>
         </div>
         <div className='col-md-4 col-sm-6 col-12'>
            <div className='item'>
               <img src={helpcenter} alt="" />
               <p>24/7 Help Center<br />Dedicated 24/7 support</p>
            </div>
         </div>
         <div className='col-md-4 col-sm-6 col-12'>
            <div className='item'>
               <img src={friendelyservices} alt="" />
               <p>Friendly Services<br />30 day satisfaction guarantee</p>
            </div>
         </div>
      </aside>
   </article>
  </section>
  {/* footer top end */}

  {/* mid footer start */}
  <section className='midFoot'>
      <article className='container'>
         <aside className='row'>
            <div className='col-md-9'>
               <div className='row'>
               <div className='col-md-3 col-sm-6 col-12'>
               <h4>Help & Customer Care</h4>
               <ul>
                  <li><Link to='/cms/new-customers' >New Customers</Link></li>
                  <li><Link to='/cms/how-to-use-my-account' >How to use My Account</Link></li>
                  <li><Link to='/cms/placing-an-order'>Placing an Order</Link></li>
                  <li><Link to='cms/payment-methods'>Payment Methods</Link></li>
                  <li><Link to='/cms/delivery-dispatch'>Delivery & Dispatch</Link></li>
                  <li><Link to='/cms/problems-with-your-order'>Problems with your Order</Link></li>
               </ul>
            </div>
            <div className='col-md-3 col-sm-6 col-12'>
               <h4>My Account</h4>
               <ul>
                  <li><Link>Product Support</Link></li>
                  <li><Link >Checkout Shopping</Link></li>
                  <li><Link>Order Wishlist</Link></li>
               </ul>
            </div>
            <div className='col-md-3 col-sm-6 col-12'>
               <h4>Quick Links</h4>
               <ul>
                  <li><a href="/">Store Location</a></li>
                  <li> <Link to='/account/profile'> My Account </Link> </li>
                  <li><a href="/">Orders Tracking</a></li>
                  <li><Link to='/cms/faq'>FAQS</Link></li>
                  <li><Link to='/cms/about-us'>About Us</Link></li>
                  <li><Link to='/cms/our-stories'>Our Story</Link></li>
               </ul>
            </div>
            <div className='col-md-3 col-sm-6 col-12'>
               <h4>Customer Service</h4>
               <ul>
                  <li><Link to='/cms/help-center' >Help Center</Link></li>
                  <li><Link to='/contact-us'>Contact Us</Link></li>
                  <li><Link to='/cms/report-abuse'>Report Abuse</Link></li>
                  <li><Link to='/cms/privacy-policy'>Privacy Policy</Link></li>
                  <li><Link to='/cms/cancellation-refund-policy'>Cancellation & Refund Policy</Link></li>
               </ul>
            </div>
               </div>
            </div>
            <div className='col-md-3'>
               <h4>Bulk Order</h4>
               <p className='fs-6'>Fill-up the detail for bulk order.</p>
               <a className='btnBx' href="/">Inquiry Form</a>
               <div className='socialMedia'>
                  <a href="/" target='_blank'><img src={facebook} alt="" /></a>
                  <a href="/" target='_blank'><img src={instagram} alt="" /></a>
                  <a href="/" target='_blank'><img src={twitter} alt="" /></a>
                  <a href="/" target='_blank'><img src={youtube} alt="" /></a>
                  <a href="/" target='_blank'><img src={teligram} alt="" /></a>
                  <a href="/" target='_blank'><img src={whatsapp} alt="" /></a>
                  <a href="/" target='_blank'><img src={linkedin} alt="" /></a>
               </div>
            </div>
         </aside>
      </article>
  </section>
  {/* mid footer end */}

  {/* bottom footer part start */}
  <section className='bottomBlue'>
   <article className='container'>
      <aside className='row justify-content-center'>
         <div className='col-md-6 col-sm-6 col-12'>
            <p>Copyright &copy; Shipwall All Rights Reserved..</p>
         </div>
         <div className='col-md-6 col-sm-6 col-12'>
            <img src={payment} alt="" />
         </div>
      </aside>
   </article>
  </section>
  {/* bottom footer part end */}
</footer>

   </>
  )
}

export default Footer
