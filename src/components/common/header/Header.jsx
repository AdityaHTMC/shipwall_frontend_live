import React, { useState, useEffect } from 'react';
import HeaderTop from './HeaderTop';
import HeaderMain from './HeaderMain';
import HeaderBottom from './HeaderBottom';
import Bottommenu from './mobile-header/Bottommenu';
import OffCanvas from './mobile-header/OffCanvas';
import SignIn from '../../../screen/SignIn';
import HeaderSticky from './HeaderSticky';
import { useApi } from '../../../contextApi/ApiContexts/ApiContexts';
import NewHeader from './NewHeader';

const Header = () => {
    const [showModal, setShowModal] = useState(false);
    const [isWideScreen, setIsWideScreen] = useState(true);
    // const [loginShow, setLoginShow] = useState(false);
    const {loginShow, setLoginShow} =useApi()

    const HandelLoginHide = () => {
        setLoginShow(false);
    }

    useEffect(() => {
        const handleResize = () => {
            setIsWideScreen(window.innerWidth > 1013);
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <header>
                <div className="tp-header-area p-relative sticky-lg-top z-index-11">
                    <HeaderTop />
                    <HeaderMain loginShow={loginShow} setLoginShow={setLoginShow} />
                    <HeaderBottom />
                    <Bottommenu setLoginShow={setLoginShow} loginShow={loginShow} />
                    <NewHeader/>
                </div>
            </header>
            {isWideScreen ? <HeaderSticky /> : null}
            {showModal === true ? <OffCanvas /> : null}
            {loginShow === true ? (
                <SignIn show={loginShow} onHide={HandelLoginHide} />
            ) : null}
        </>
    );
};

export default Header;
