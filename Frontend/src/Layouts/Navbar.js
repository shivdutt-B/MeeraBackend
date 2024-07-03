import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { ContextName } from '../Context/Context'
import MeeraLogo from "../Assets/logo.png"
import { useNavigate } from 'react-router-dom'

function Navbar() {
    const [searchValue, setSearchValue] = useState('')
    const navigate = useNavigate();

    const ContextItems = useContext(ContextName)

    async function handleSubmit(e) {
        e.preventDefault()
        await sessionStorage.setItem('query', searchValue)
        ContextItems.setCurrentQuery(searchValue)
        navigate(`/search/${searchValue}`)
    }

    function showSearchBar() {
        document.querySelector('.search-bar-small').classList.toggle('toggle-display')
    }
    function clearSearch() {
        setSearchValue('')
    }

    return (
        <>
            {
                <div className="nav">
                    <div className="nav-brand">
                        <Link to="/">
                            <span>MEERA</span>
                            <img src={MeeraLogo} ></img>
                        </Link>
                    </div>

                    <div className="search-bar">
                        <form action="" className="search-bar-form" onSubmit={(e) => { handleSubmit(e) }}>
                            <input type="text" value={searchValue} className="main-search-bar-input" onChange={(e) => { setSearchValue(e.target.value) }} placeholder="search your " />
                            <i class="fa-solid fa-xmark clear-search" onClick={clearSearch}></i>
                        </form>
                    </div>

                    <div className="nav-links">

                        <div className="nav-search-small" onClick={showSearchBar}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>

                        <div className="nav-cart">
                            <Link to="/cart" className="nav-cart-link">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                <span className="cart-items-count">{ContextItems.cartCount}</span>
                            </Link>
                        </div>

                        <div className="nav-start">
                            {
                                Object.keys(ContextItems.user).length > 0 ?
                                    <Link to="/profile" className="nav-start-link nav-user-link">
                                        {ContextItems.user.username[0].toUpperCase()}
                                    </Link>
                                    :
                                    <>
                                        <Link to="/signin" className="nav-start-link nav-start-link-small">
                                            <i class="fa-solid fa-arrow-right-to-bracket"></i>
                                        </Link>
                                        <Link to="/signin" className="nav-start-link">Start <i class="fa-solid fa-arrow-right"></i>
                                        </Link>
                                    </>
                            }
                        </div>

                        <div className="search-bar search-bar-small">
                            <form action="" className="search-bar-form" onSubmit={(e) => { handleSubmit(e) }}>
                                <input type="text" value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }} placeholder="search your " />
                                <i class="fa-solid fa-xmark cross-for-search-bar" onClick={showSearchBar}></i>
                            </form>
                        </div>

                    </div>
                </div>
            }
        </>
    )
}

export default Navbar