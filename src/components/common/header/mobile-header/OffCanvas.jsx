import React from 'react'
import './../../../../css/mix.css'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion"
import Button from 'react-bootstrap/Button';
import Fade from 'react-bootstrap/Fade';
import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import { useAppContext } from '../../../../contextApi/AppContext';




const OffCanvas = ({ onHide }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { logOut, isLoggedIn, logOutsap , isLogIn,cms } = useAppContext()

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };



  return (
    <>
      <div className='container d-lg-none'>
        <Button
          onClick={toggleDropdown}
          aria-controls="categories-dropdown"
          aria-expanded={showDropdown}
          className='btn btn-primary border-0 w-100 '
        >
          All Categories
        </Button>
        <Collapse in={showDropdown}>
          <div id="categories-dropdown">
            <ul onClick={onHide} className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/product-list">New Arrivels</Link>
              </li>
              {cms.map((item, index)=>(
                  <li key={index} className="nav-item active">
                  <Link className="nav-link" to="/product-list">{item.itmsGrpNam}</Link>
                </li>
                  ))}
            </ul>
          </div>
        </Collapse>
        <ul onClick={onHide} className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/our-story">Our Story</Link>
          </li>
          <li className="nav-item dropdown">
            <Link className="nav-link" to="/privacy-policy" >
              Privacy Policy
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link " to="/terms-conditions">Term And Condition</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link " to="/contact-us">Contact Us</Link>
          </li>
          {isLogIn &&
            <li onClick={logOutsap} className="nav-item mt-3">
              <i  className="fa-solid fa-right-from-bracket btn"></i>Logout
            </li>
          }
        </ul>

      </div>
    </>
  )
}

export default OffCanvas
