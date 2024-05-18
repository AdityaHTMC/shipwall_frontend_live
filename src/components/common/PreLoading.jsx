import React from 'react'
import './../../css/mix.css'



const PreLoading = () => {
    return (
        <>
            <div className='bg-red'>
                <div id="loading">
                    <div id="loading-center">
                        <div id="loading-center-absolute">
                            <div className="tp-preloader-content">
                                <div className="tp-preloader-logo">
                                    <div className="tp-preloader-circle">
                                        <svg width="190" height="190" viewBox="0 0 380 380" fill="none" xmlns="">
                                            <circle stroke="#D9D9D9" cx="190" cy="190" r="180" stroke-width="6" stroke-linecap="round"></circle>
                                            <circle stroke="red" cx="190" cy="190" r="180" stroke-width="6" stroke-linecap="round"></circle>
                                        </svg>
                                    </div>
                                    <img src="assets/img/logo/preloader/preloader-icon.svg" alt="" />
                                </div>
                                <h3 className="tp-preloader-title">Shipwall</h3>
                                <p className="tp-preloader-subtitle">Loading</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default PreLoading
