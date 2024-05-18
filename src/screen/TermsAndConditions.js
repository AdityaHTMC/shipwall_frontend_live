import React from "react";
import "./../css/mix.css";
import { Link } from "react-router-dom";

const TermsAndConditions = () => {
  return (
    <>
      <section class="breadcrumb__area include-bg pt-40 pb-40 bg-secondary text-white">
        <div class="container mt-4 mt-md-0 mt-lg-0">
          <div class="row">
            <div class="col-xxl-12">
              <div class="breadcrumb__content p-relative z-index-1">
                <h3 class="breadcrumb__title text-white text-center mt-3">
                  Terms & Conditions
                </h3>
                <div class="breadcrumb__list text-center">
                  <span>
                    <Link className="text text-light" to="/">
                      Home
                    </Link>
                  </span>
                  <span>Terms & Conditions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="tp-contact-area">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="aboutus-heading">
                <h2> Accounts </h2>
                <p className="about-txt">
                  Shipwall reserves the authority to promptly deactivate a
                  member's login or account if it is determined that the member
                  is engaging in any form of site misuse
                </p>

                <h2> Injury and Death </h2>

                <p className="about-txt">
                  For a significant portion of the products available on
                  Shipwall, professional installation by a qualified electrician
                  is essential. Shipwall cannot be held liable for any injuries
                  or fatalities that may occur during the installation of
                  products purchased through Shipwall. <br /> <br />
                </p>

                <h2> Pricing </h2>

                <p className="about-txt">
                  Shipwall offers dynamic pricing that can change at any moment.
                  If a product is mistakenly displayed at an unusually low price
                  due to a system error, Shipwall may choose not to fulfill
                  orders at that price. Additionally, if a supplier raises a
                  product's price, leading to an adjustment in Shipwall's
                  selling price, the platform has the right to disregard
                  previous lower prices.
                </p>

                <h2>Dispatch & Freight Delays </h2>
                <p className="about-txt">
                  Shipwall strives to dispatch and deliver customer orders
                  within the fastest times achievable in the industry.
                  Nevertheless, Shipwall retains the right to decline
                  compensation to customers for delays in dispatch or
                  transportation, which may be caused by factors such as delays
                  from our freight carrier partners.{" "}
                </p>

                <h2>Data Integrity</h2>

                <p className="about-txt">
                  If there are inaccuracies in the product information displayed
                  on the Shipwall website, which may include but is not limited
                  to names, specifications, attributes, and images, Shipwall
                  will provide a replacement of the affected product at no
                  expense to the customer. Nevertheless, Shipwall cannot be held
                  responsible for any property damage or financial losses
                  incurred by a business because of such incorrect data. We urge
                  our customers to exercise diligence in verifying that all
                  products they install are suitable for their intended
                  application.
                </p>

                <h2> Loyalty Store</h2>

                <p className="about-txt">
                  Certain suppliers offer loyalty points for the purchase of
                  their products through either their weekly promotions or
                  annual program. The website will provide explicit information
                  regarding the eligible brands, with the weekly brands
                  prominently featured in the catalogue and promotional banners.
                  If loyalty points are not automatically credited to an
                  eligible order, Shipwall can add the required points upon
                  customer request <br />
                  Loyalty points earned through purchases will be credited to
                  the specific account through which the purchase was made. In
                  the case of child/parent accounts, loyalty points obtained
                  from purchases on one account will not be shared with the
                  other, as they are account specific. Nevertheless, Shipwall
                  can combine these points manually upon request <br />
                  When making purchases on brands participating in the loyalty
                  program, customers will earn 1 loyalty point for every dollar
                  spent, unless there is a specific different arrangement
                  stated. It's important to note that loyalty points are rounded
                  down to the nearest dollar. This means that any purchase
                  amount falling below the next dollar value will still only
                  receive points equivalent to the previous dollar value.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TermsAndConditions;
