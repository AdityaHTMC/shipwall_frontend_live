import React from 'react'
import './../../../css/mix.css'

const MapArea = () => {
  return (
    <section className="tp-map-area pb-90">
    <div className="container">
        <div className="row">
            <div className="col-xl-12">
                <div className="tp-map-wrapper">
                    <div className="tp-map-hotspot">
                        <span className="tp-hotspot tp-pulse-border">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <circle cx="6" cy="6" r="6" fill="#821F40" />
                            </svg>
                        </span>
                    </div>
                    <div className="tp-map-iframe">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3389.1671643299924!2d115.89043317490494!3d-31.84766611723165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2a32b1a407abb931%3A0xd102f660b1b565db!2s1%2F21%20Vale%20St%2C%20Malaga%20WA%206090%2C%20Australia!5e0!3m2!1sen!2sin!4v1717668351032!5m2!1sen!2sin" width="100%" height="450"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
  )
}

export default MapArea
