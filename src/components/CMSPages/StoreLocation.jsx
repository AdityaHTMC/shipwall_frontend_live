import React from 'react'
import { Link } from 'react-router-dom'

const StoreLocation = () => {
  return (
  <>

      {/* page breadcrumbs start */}
      <section className="pageBreadcrumbs">
          <article className="container">
            <ul>
              <li><Link className="text" to="/">Home</Link></li>
              <li className="active">Store Location</li>
            </ul>
          </article>
      </section>
      {/* page breadcrumbs end */}

      <div className="container pt-5 pb-5">
    <div className="row shadow-lg p-4 rounded bg-white">
      {/* Left Side - Store Details */}
      <div className="col-md-5 d-flex flex-column justify-content-center">
          <h4 className="fw-bold text-primary">Shipwall - Electrical Wholesaler</h4>
          <p className="text-muted mb-1">
            <i className="fas fa-map-marker-alt text-danger me-2"></i> 
            <Link to="https://maps.app.goo.gl/ApKfR2qKfysmPArC8" target="_blank">
                        1/21 Vale Street, Malaga, WA-6090
                      </Link>
          </p>
          <p className="text-muted mb-1">
            <i className="fas fa-envelope text-warning me-2"></i> 
            <Link to="mailto:Info@shipwall.au">Info@shipwall.au</Link>
          </p>
          <p className="text-muted mb-1">
          <i class="fa-solid fa-phone me-2"></i>
            <Link to="tel:+611800 812 314">1800 812 314</Link>
          </p>
          <p className="text-muted mb-1">
            <i className="fas fa-clock text-info me-2"></i> 
            Mon-Fri: 8 AM - 5 PM
          </p>
        </div>

      
      <div className="col-md-7">
        <div className="embed-responsive embed-responsive-16by9 rounded shadow">
        <iframe
              title="Store Location"
              className="embed-responsive-item rounded w-100"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3389.1677344955815!2d115.8929776!3d-31.847650599999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2a32b12b9029fdc1%3A0x828b4cb21cab55b4!2sShipwall%20-%20Electrical%20Wholesaler!5e0!3m2!1sen!2sin!4v1740118914732!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0, height: "200px" }}
            ></iframe>
        </div>
      </div>
    </div>
  </div>
  
  
  </>


 
  )
}

export default StoreLocation