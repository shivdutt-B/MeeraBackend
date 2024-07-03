import React, { useEffect, useState, useContext } from 'react'
import { Link } from "react-router-dom"
import { ContextName } from '../Context/Context'
import { useNavigate } from 'react-router-dom'

function Products() {
  const ContextItems = useContext(ContextName)
  const navigate = useNavigate()
  const [currentCategory, setCurrentCategory] = useState()

  const filterProductsByCategory = (products, category) => {
    return products.filter(product => {
      if (Array.isArray(category)) {
        return category.includes(product.category);
      }
      return product.category === category;
    });
  };

  async function fetchByCategory() {
    try {
      const category = await sessionStorage.getItem("category")
      setCurrentCategory(category)

      if (ContextItems.categoryData[category]) {
        // we already have the products no need to fetch them
      }
      else {
        ContextItems.setProgress(10)
        const categoryName = category.includes("&") ? category.split('&').map((element) => { return element.trim() }) : category;
        const filterProducts = filterProductsByCategory(ContextItems.products, categoryName)
        ContextItems.categoryData[category] = filterProducts
        ContextItems.setProgress(100)
      }
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
    fetchByCategory()
  }, [])

  return (
    <div className="main">
      <div className="gutter">
        {
          ContextItems.categoryData[currentCategory] ?
            <div className="product-container">
              {ContextItems.categoryData[currentCategory].map((element) => {
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
                    </Link>
                  </div>
                )
              })}
            </div>
            :
            <div className="exo-elements-aligner">
              {
                exoElement()
              }
            </div>
        }
      </div>
    </div>
  )
}

export default Products