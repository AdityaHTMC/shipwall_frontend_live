import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <>
    <div className="container">
        <div className="row ">
          <div className="col-md-6 offset-md-3 text-center mt-5">
            {/* <h1 className="display-4">404</h1> */}
            <p className="lead">Please <strong>logIn</strong> to view this page</p>
            {/* <p>
              The page you are looking for might have been removed or its name
              changed or is temporarily unavailable.
            </p> */}
            <Link to="/" className="btn btn-primary mb-3">
              Go Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Error