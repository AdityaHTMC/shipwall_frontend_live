import React from 'react'
import './../../../css/mix.css'
import { Link } from 'react-router-dom'

const BreadcrumbArea = () => {
  return (
    <section className="pageBreadcrumbs">
    <article className="container">
      <ul>
        <li><Link className="text" to="/">Home</Link></li>
        <li className="active">Contact Us</li>
      </ul>
    </article>
  </section> 
  )
}

export default BreadcrumbArea
