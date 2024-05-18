import React, { useState } from "react";
import "./../../../css/mix.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";
import { useAppContext } from "../../../contextApi/AppContext";


const ContactArea = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const { ContactUs } = useAppContext();
  const [mobileValid, setMobileValid] = useState(true);


  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  const handleMobileChange = (e) => {
    const inputMobile = e.target.value;
    if (/^\d{0,10}$/.test(inputMobile)) {
      setMobile(inputMobile);
      setMobileValid(inputMobile.length === 10 || inputMobile.length === 0);
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !mobile.trim() || !message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!/^\d{10}$/.test(mobile)) {
      toast.error("Mobile number must be a 10-digit number.");
      return;
    }

    if (!captchaToken) {
      toast.error("Please complete the CAPTCHA verification.");
      return;
    }

    const res = await ContactUs(name, email, mobile, message, captchaToken);
    if (res && res.status == 200) {
      setName("");
      setEmail("");
      setMobile("");
      setMessage("");
    } else {
    }
  };

  return (
    <section className="tp-contact-area pt-70 pb-70">
      <div className="container">
        <div className="tp-contact-inner">
          <div className="row">
            <div className="col-xl-9 col-lg-8">
              <div className="tp-contact-wrapper">
                <h3 className="tp-contact-title">Sent A Message</h3>

                <div className="tp-contact-form">
                  <form>
                    <div className="tp-contact-input-wrapper">
                      <div className="tp-contact-input-box">
                        <div className="tp-contact-input">
                          <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            name="name"
                            type="text"
                            placeholder="Shivam Shaw"
                          />
                        </div>
                        <div className="tp-contact-input-title">
                          <label for="name">Your Name</label>
                        </div>
                      </div>
                      <div className="tp-contact-input-box">
                        <div className="tp-contact-input">
                          <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                            type="email"
                            placeholder="shivam@gmail.com"
                          />
                        </div>
                        <div className="tp-contact-input-title">
                          <label for="email">Your Email</label>
                        </div>
                      </div>
                      <div className="tp-contact-input-box">
                        <div className="tp-contact-input">
                          <input
                            value={mobile}
                            onChange={handleMobileChange}
                            name="subject"
                            type="tel"
                            placeholder="3526378291"
                            className={!mobileValid ? "invalid" : ""}
                          />
                        </div>
                        <div className="tp-contact-input-title">
                          <label htmlFor="subject">Mobile</label>
                        </div>
                      </div>
                      {/* Error message for invalid mobile number */}
                      {!mobileValid && (
                        <div className="tp-contact-input-box">
                          <div className="tp-contact-input-error">
                            Mobile number must be a 10-digit number.
                          </div>
                        </div>
                      )}
                      <div className="tp-contact-input-box">
                        <div className="tp-contact-input">
                          <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            name="message"
                            type="message"
                            placeholder="Write your message here..."
                          ></textarea>
                        </div>
                        <div className="tp-contact-input-title">
                          <label for="message">Your Message</label>
                        </div>
                      </div>
                      <div className="tp-contact-input-box">
                        <ReCAPTCHA
                          // sitekey="6LdQ550pAAAAACy21vBwm0UoIrmvJ6sJxUpQSbhd"
                          sitekey="6LeL-p0pAAAAAPe7QA9clzcUhMk0qA8uJJceG4ig"
                          onChange={handleCaptchaChange}
                          
                        />
                      </div>
                    </div>
                    <div className="tp-contact-btn">
                      <button onClick={handelSubmit} type="submit">
                        Send Message
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4">
              <div className="tp-contact-info-wrapper">
                <div className="tp-contact-info-item">
                  <div className="tp-contact-info-icon">
                    <span>
                      <img src="assets/img/contact/contact-icon-1.png" alt="" />
                    </span>
                  </div>
                  <div className="tp-contact-info-content">
                    <p data-info="mail">
                      <Link to="mailto:shipwall@support.com">info@vdsb.au</Link>
                    </p>
                    <p data-info="phone">
                      <Link to="tel:0481505909">0481505909</Link>
                    </p>
                  </div>
                </div>
                <div className="tp-contact-info-item">
                  <div className="tp-contact-info-icon">
                    <span>
                      <img src="assets/img/contact/contact-icon-2.png" alt="" />
                    </span>
                  </div>
                  <div className="tp-contact-info-content">
                    <p>
                      <Link to="#." target="_blank">
                        1/21 Vale Street, Malaga, WA-6090
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="tp-contact-info-item">
                  <div className="tp-contact-info-icon">
                    <span>
                      <img src="assets/img/contact/contact-icon-3.png" alt="" />
                    </span>
                  </div>
                  <div className="tp-contact-info-content">
                    <div className="tp-contact-social-wrapper mt-5">
                      <h4 className="tp-contact-social-title">
                        Find on social media
                      </h4>

                      <div className="tp-contact-social-icon">
                        <Link to="#">
                          <i className="fa-brands fa-facebook-f"></i>
                        </Link>
                        <Link to="#">
                          <i className="fa-brands fa-twitter"></i>
                        </Link>
                        <Link to="#">
                          <i className="fa-brands fa-linkedin-in"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactArea;
