import React, { useContext, useEffect, useState } from 'react'
import { ContextName } from '../Context/Context'
import { Link, useNavigate } from 'react-router-dom'
import noSearchResults from "../Assets/no-search-results.png"

function SearchResult() {
    const ContextItems = useContext(ContextName)
    const [searchResults, setSearchResults] = useState([])
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    async function fetchSearchResult() {
        try {
            setSearchResults([])
            ContextItems.setProgress(10)
            setLoading(true)
            const query = await sessionStorage.getItem('query')
            const searchResults = await fetch(`${window.location.origin}/product/search`, {
                method: 'POST', // Specify the request method
                headers: {
                    'Content-Type': 'application/json' // Specify the content type if you're sending JSON
                },
                body: JSON.stringify({
                    query: query
                }) // Convert the data to a JSON string
            })
            ContextItems.setProgress(50)
            const toJson = await searchResults.json()
            setLoading(false)
            setSearchResults(toJson.searchResults)
        } catch (error) {
            navigate('/error')
        }
        finally {
            ContextItems.setProgress(100)
        }
    }

    function exoElement() {
        let elements = []
        const height = window.innerHeight
        const width = window.innerWidth

        const EXO_ELEMENT_WIDTH = 220
        const EXO_ELEMENT_HEIGHT = 300

        const area = height * width
        const EXO_ELEMENT_AREA = EXO_ELEMENT_HEIGHT * EXO_ELEMENT_WIDTH

        const noOfElements = 2 * Math.ceil(area / EXO_ELEMENT_AREA)

        for (let i = 0; i < noOfElements; i++) {
            elements.push(
                <div style={{ width: 220 }} className="product-card-container exo-product-card-container">
                    <Link>
                        <div className="product-thumbnail exo-product-thumbnail"></div>
                        <div className="product-info exo-product-info">
                            <div className="product-title-container exo-product-title-container"></div>
                            <div className="product-price-detail exo-product-price-detail">
                                <div className="original-discount-price-container exo-original-discount-price-container">
                                    <div className="discount-price exo-discount-price"></div>
                                    <div className="exo-original-price"></div>
                                </div>
                                <div className="discount exo-discount"></div>
                            </div>
                        </div>
                    </Link>
                </div>
            )
        }

        return elements
    }

    useEffect(() => {
        fetchSearchResult()
    }, [ContextItems.currentQuery])
    return (
        <div className="main">
            <div className="gutter">
                {
                    !loading  ?
                        <>
                            {
                                !searchResults.length == 0 ?
                                    <div className="product-container">
                                        {searchResults.map((element) => {
                                            return (
                                                <div className="product-card-container">
                                                    <div className="add-to-cart" onClick={(e) => { ContextItems.handleCartClick(e, element, ContextItems.user, navigate, ContextItems.setCartCount, ContextItems.setProgress, ContextItems.cart, ContextItems.setCart) }}>

                                                        {
                                                            (ContextItems.cart.some((item) => { return item._id == element._id })) ?
                                                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#FF5F00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                                                :
                                                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#747264" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                                        }

                                                    </div>
                                                    <Link className="product-item" onClick={() => { ContextItems.TransferData(element, navigate) }} to={`/product/${element._id}`} key={element._id}>
                                                        <div className="product-container-item-poster">
                                                            <img src={element.thumbnail} alt="" />
                                                        </div>
                                                        <div className="product-container-item-desc-price">
                                                            <div className="product-container-item-description">
                                                                <div className="item-desc-title">{element.title.length > 20 ? element.title.slice(0, 20) + '...' : element.title}</div>
                                                                <div className="item-desc-desc item-desc-desc-product-page">{element.description}</div>
                                                            </div>
                                                            <div className="product-rating-container"><i class="fa-solid fa-star"></i>{element.rating}</div>
                                                            <div className="product-container-item-price product-price-detail">
                                                                <div className="original-discount-price-container">
                                                                    <div className="discount-price">
                                                                        <i class="fa-solid fa-indian-rupee-sign"></i>{
                                                                            element.discountPercentage ?
                                                                                Number(element.discountPercentage) == 0 ?
                                                                                    element.price
                                                                                    :
                                                                                    (Number(element.price) - ((Number(element.price) * Number(element.discountPercentage)) / 100)).toFixed(2)
                                                                                :
                                                                                element.price
                                                                        }
                                                                    </div>
                                                                    {
                                                                        element.discountPercentage ?
                                                                            Number(element.discountPercentage) == 0 ?
                                                                                <div className="original-price"></div>
                                                                                :
                                                                                <div className="original-price"><i class="fa-solid fa-indian-rupee-sign"></i>{element.price}</div>
                                                                            :
                                                                            <div className="original-price"></div>
                                                                    }
                                                                </div>
                                                                {
                                                                    element.discountPercentage ?
                                                                        Number(element.discountPercentage) == 0 ?
                                                                            <div className="discount"></div>
                                                                            :
                                                                            <div className="discount">{element.discountPercentage}%off</div>
                                                                        :
                                                                        <div className="discount"></div>
                                                                }
                                                            </div>
                                                        </div>
                                                        {/* </div> */}
                                                    </Link>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    :
                                    <div className="no-search-results">
                                        <img src={noSearchResults} />
                                        <strong>0 RESULTS</strong>
                                    </div>
                            }
                        </> 
                         :
                        <>
                            <div className="exo-elements-aligner">
                                {
                                    exoElement()
                                }
                            </div>
                        </>
                }
            </div>
        </div >
    )
}

export default SearchResult