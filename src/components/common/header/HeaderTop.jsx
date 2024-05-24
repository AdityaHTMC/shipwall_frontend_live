import React from "react";
import { Link } from "react-router-dom";


import "./header.css";

const HeaderTop = () => {
  return (
    <section className="topHead">
      <article className="container-fluid">
        <aside className="row">
          <div className="col-md-5 col-sm-5 col-12">
            Express delivery and free returns within 30 days
          </div>
          <div className="col-md-7 col-sm-7 col-12">
            <ul className="list-inline d-inline">
              <li>
                <Link to='/cms/our-stories'> About </Link>
              </li>
              <li>
                <Link to='/account/orders'>Order Tracking</Link>
              </li>
              <li>
                <Link to='/contact-us'>Contact Us</Link>
              </li>
              <li>
                <Link to='/cms/faq'>FAQs</Link>
              </li>
              <li>
                <Link>English</Link>
              </li>
              <li>
                <Link> Australian Dollar (AUD)</Link>
              </li>
            </ul>
          </div>
        </aside>
      </article>
    </section>
  );
};

export default HeaderTop;
