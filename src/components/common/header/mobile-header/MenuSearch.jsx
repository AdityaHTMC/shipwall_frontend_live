import React, { useState } from 'react'
import { useAppContext } from '../../../../contextApi/AppContext';
import { useEffect } from 'react';
import { Link , useNavigate } from 'react-router-dom';

const MenuSearch = ({ onHide }) => {
    const [queary,setQuery] = useState()

    const {searchProduct, productBySearch} = useAppContext();

    const navigate = useNavigate()

    const handelSubmit = (e) => {
        e.preventDefault();
        const name = queary
        searchProduct(name, '')
        navigate(`/product-list/${name}`)
        setQuery("")
        onHide()
    }




    const handelChange = (e) => {
        const name = e.target.value
        setQuery(name)
    }

    useEffect(() => {
        searchProduct("", queary)
    }, [queary])

    return (
        <div className="tp-header-search pl-70">
            <form onSubmit={handelSubmit}>
                <div className="tp-header-search-wrapper d-flex align-items-center">
                    <div className="tp-header-search-box">
                        <input onChange={handelChange} value={queary} type="text" placeholder="Search for Products..." />
                    </div>
                    <div className="tp-header-search-btn">
                        <button type="submit">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="">
                                <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M19 19L14.65 14.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                    </div>
                    </div>
                    <p className='mt-1 ml-10'>search by men women denim shirt</p>
            </form>
            {
                queary?.length > 0 && (
                    <div>
                        <div className="dropdown p-absolute bottom-0">
                            <ul className="dropdown-menu show">
                                {
                                    productBySearch?.map((item) => (
                                        <li className="dropdown-item">
                                            <Link onClick={()=>setQuery("")} to={`/product-details/${item._id}`}>
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default MenuSearch
