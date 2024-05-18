import React from "react";
import { Link } from "react-router-dom";
import "./../css/mix.css";
import HistoryArea from "../components/normal/our-story/HistoryArea";
import WorkArea from "../components/normal/our-story/WorkArea";

const OurStory = () => {
  return (
    <>
        <section className="pageBreadcrumbs">
      <article className="container">
        <ul>
          <li><Link className="text" to="/">Home</Link></li>
          <li className="active">Our Story</li>
        </ul>
      </article>
    </section> 

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="aboutus-heading">
              <h2> About Us</h2>
              <p className="about-txt">
                VD Shine Brothers Pty Ltd is a group of companies founded in
                Ahmedabad, Gujarat, India in 2003 . In India we have a led light
                manufacturing facilities, which has a capacity of 2100000pc of
                light per month. We have a factory area of 80000sq feet and a
                corporate offices of 6000sq feet, we have a quality control Lab
                facilities that alone have a surge protection test facility,
                EMI- EMC test, Lux test , High - Low voltage test, ageing test,
                Break test, IP test equipments, we have dedicated R&D team for
                upcoming market requirements and as per customer demand
                customised products innovation. We have 500+ employee including
                higher management and workforce. Our Indian company name is
                Dudhat Industries Pvt Ltd, have its owned lighting brand QLUX
                for entire light product, we also have other brands in various
                industries like RADA for automation, ANGLE DECOR for Architects
                light & home decor products, KIKO for PCB industries chemical
                and tools supply and also we do have one manufacturing
                facilities in china for light components and light manufacturing
                which helps our global needs and manage our group procurement
                and quality management. After 2 Decade of manufacturing and
                market experience we are opening our Trading company in Perth,
                Western Australia, by the name of VD shine Brother Pty Ltd. It
                owns Shipwal Australia and New Zealand right, the name VD shine
                brother comes from Vadadoriya family and Dudhat family who have
                a combined experience of more than 2 Decades in Trading and
                Manufacturing of Lights for local and international markets.
                Moreover, The shining commitments to Australian People is given
                by the Gevaria family. So, all the families joined and formed a
                company called VD Shine Brothers Pty Ltd. VD now stepped into
                the lights, Electrical and Plumbing goods supplying direct from
                Manufacturer to consumer supply chain. VD shine brother Pty Ltd
                are committing to give good quality goods on time delivery as
                per customer needs. We will tack our social securities and
                wellness responsibilities with our business.
              </p>

              <h2> Mission </h2>

              <p className="about-txt">
                Our mission is to serve as a nation builders for all Australian
                and New Zealand, including Tradies, Contractors, Project
                consultants, Corporates and Government R&B Department. We
                deliver the best quality at a fair price in a timely manner.
                Thus, our country quickly rises to the top of the world
                rankings. Our Shipwall team is more than just a supplier of
                goods; we also understand the needs of our members and source
                goods accordingly, ensuring that it arrives on schedule. In
                order to help our members to save time, we deliver goods on
                several fronts. In short, VD’s Mission is to support nation
                builders at every stage. <br /> <br />
              </p>

              <h2> Vision </h2>

              <p className="about-txt">
                Shipwall’s vision is to establish high-tech warehouses under the
                Shipwall brand in Perth, Sydney, Melbourne, Brisbane, Adelaide,
                Tasmania, Darwin, and New Zealand. Our directors Ketan
                Vadadoriya, Ankur Gevaria, Keval Vadadoriya, as well as our team
                mentors, Rahul Dudhat and Rahul Gevaria, are the driving forces
                behind this endeavour. We aim for VD to rank among Australia's
                top 10 tax payers. We want businesses that solve people's
                problems and uplift the development of Australia. <br /> <br />
                We plan to commence our initial public offering (IPO) on the
                Australian stock exchange in 2028, providing the general public
                with the chance to invest in this progressivist company and make
                profit collectively.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurStory;
