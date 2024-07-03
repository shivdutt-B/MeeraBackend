import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ContextName } from '../Context/Context'
import { Link } from 'react-router-dom'
import Slider from "react-slick";
import axios from 'axios';


function DisplayProduct() {
  const navigate = useNavigate()
  const [productInfo, setProductInfo] = useState({})
  const [posterToDisplay, setPosterToDisplay] = useState()
  const ContextItems = useContext(ContextName)
  const [orderQnt, setOrderQnt] = useState(1)

  async function fetchByCategory() {
    try {
      const category = await sessionStorage.getItem("productCategory");
      const fetch = await axios.post(`${window.location.origin}/category`, { category: category })
      if (fetch.data.success){
        await ContextItems.setRelatedProducts(fetch.data.products)
      }
      else{
        navigate('/error')
      }
    } catch (error) {
      navigate('/error')
    }
  }

  function sessionStorageParser() {
    try {
      const parsedData = JSON.parse(sessionStorage.getItem('productInfo'))
      setProductInfo(parsedData)
      setPosterToDisplay(parsedData.thumbnail)
    } catch (error) {
      navigate('/error')
    }
  }

  async function fetchOnSame(element, navigate) {
    try {
      ContextItems.TransferData(element, navigate)
      sessionStorageParser()
      fetchByCategory()
    } catch (error) {
      navigate('/error')
    }

  }
  useEffect(() => {
    sessionStorageParser()
    fetchByCategory()
  }, [])

  const settings2 = {
    className: "slider variable-width",
    dots: false,
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true
  }

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 4000,
    cssEase: "linear",
    pauseOnHover: true
  };

  function setImageAndBorder(event, image) {
    try {
      let currentElement = event.target.closest('.display-product-small-image')
  
      // Setting image to display (big).
      setPosterToDisplay(image)
  
      // Remove border from all other images by remove the class which will also take out the styles.
      let allImages = Object.values(document.querySelector(".display-product-images").children)
      allImages.map((element) => element.classList.remove('active-small-image'))
  
      // Adding the class to the image which is clicked. The class will apply the styles.
      currentElement.classList.add('active-small-image')
    } catch (error) {
      navigate('/error')
    }

  }

  function setToBeOrder(element) {
    try {
      if (Object.keys(ContextItems.user).length > 0) {
        element.orderQnt = orderQnt
        sessionStorage.setItem('toBeOrder', JSON.stringify([element]))
        navigate('/summary')
      } else {
        navigate('/signin')
      }
    } catch (error) {
      navigate('/error')
    }
  }

  const handleOrderQnt = (event) => {
    try {
      const value = event.target.value;
      if (value >= 0) {
        setOrderQnt(value);
      }
    } catch (error) {
      navigate('/error')
    }
  };

  function incDecItem(e) {
    try {
      const element = e.target.closest(".order-qnt-controller")
      if (element.getAttribute('data-qntController') == "plus") {
        setOrderQnt(orderQnt + 1)
      }
      else {
        if (!(orderQnt == 1)) {
          setOrderQnt(orderQnt - 1)
        }
      }
    } catch (error) {
      navigate('/error')
    }
  }

  return (
    Object.keys(productInfo).length > 0 &&
    <div className="main">
      <div className="gutter">
        <div className="display-product-container">
          <div className="display-product-images">
            {
              productInfo.images.length > 0 ?
                productInfo.images.map((element) => {
                  return (
                    <>
                      <div className="display-product-small-image">
                        <img src={element} onClick={(event) => { setImageAndBorder(event, element) }} />
                      </div>
                    </>
                  )
                })
                :
                <>
                </>
            }
          </div>
          <div className="display-product-poster">
            <img src={posterToDisplay} />
            <div className="display-product-order-cart-book">
              <div className="display-product-order-qnt-container">
                <div className="order-qnt-controller" data-qntController="plus" onClick={(e) => { incDecItem(e) }}><i className="fas fa-plus" ></i></div>
                <div>
                  <input className="display-product-order-qnt-input" type="number" min="1" value={orderQnt} onChange={(e) => { handleOrderQnt(e) }}></input>
                </div>
                <div className="order-qnt-controller" data-qntController="minus" onClick={(e) => { incDecItem(e) }}><i className="fas fa-minus"></i></div>
              </div>
              <div className="display-product-order" onClick={() => setToBeOrder(productInfo)}><i class="fa-solid fa-bolt"></i> Order</div>
              {
                ContextItems.cart.some((element) => {
                  return element._id === productInfo._id
                }) ?
                  <div onClick={(e) => { ContextItems.handleCartClick(e, productInfo, ContextItems.user, navigate, ContextItems.setCartCount, ContextItems.setProgress, ContextItems.cart, ContextItems.setCart) }} className="display-product-cart"><i class="fa-solid fa-cart-shopping"></i> Uncart</div>
                  :
                  <div onClick={(e) => { ContextItems.handleCartClick(e, productInfo, ContextItems.user, navigate, ContextItems.setCartCount, ContextItems.setProgress, ContextItems.cart, ContextItems.setCart) }} className="display-product-cart"><i class="fa-solid fa-cart-shopping"></i> Add to Cart</div>
              }
            </div>
          </div>
          <div className="display-product-info">
            <div className="display-product-title-descriptions">
              <div className="display-product-title">
                <h1>{productInfo.title.length > 0 ? productInfo.title : '--'}</h1>
              </div>
              <div className="display-product-description">
                <h3>{productInfo.description.length > 0 ? productInfo.description : '--'}</h3>
              </div>
            </div>
            <div className="display-product-rating-review">
              <div className="display-product-star">
                {productInfo.rating}  <i class="fa-solid fa-star"></i>
              </div>
              <div className="display-product-and">&</div>
              <div className="display-product-review">
                {productInfo.reviews.length} Reviews
              </div>
            </div>
            <div className='display-product-pricing'>
              <div className="display-product-price-after-discount">
                <i class="fa-solid fa-indian-rupee-sign"></i>
                {Math.floor(productInfo.price - (productInfo.discountPercentage * productInfo.price) / 100)}</div>
              <div className="display-product-price-before-discount"><i class="fa-solid fa-indian-rupee-sign"></i>{productInfo.price}</div>
              <div className="display-product-price-discount">{productInfo.discountPercentage}% off</div>
            </div>
            <div className="display-product-stock">
              <span className="display-product-stock-span display-product-heading-key">Stock: </span> {productInfo.stock}
            </div>
            <div className="display-product-brand">
              <span className="display-product-brand-span display-product-heading-key">Brand: </span> {productInfo.brand}
            </div>
            <div className="display-product-category">
              <span className="display-product-category-span display-product-heading-key">Category: </span> {productInfo.category}
            </div>
            <div className="display-product-delivery-address">
              <span className="display-product-delivery-address-span display-product-heading-key">Address: </span> {ContextItems.user.address ? ContextItems.user.address :
                <>
                  <Link to="/address">Enter address</Link>
                </>}
            </div>
            <div className="display-product-shipping">
              <span className="display-product-shipping-span display-product-heading-key">Shipping: </span> {productInfo.shippingInformation}
            </div>
            <div className="display-product-warranty">
              <span className="display-product-warranty-span display-product-heading-key">Warranty: </span> {productInfo.warrantyInformation}
            </div>
            <div className="display-product-shipping">
              <span className="display-product-return-policy-span display-product-heading-key">Return Policy: </span> {productInfo.returnPolicy}
            </div>
            <div className="display-product-structure">
              <span className="display-product-structure-span display-product-heading-key">Structure: </span>
              <table className="display-product-structure-table">
                <tbody>
                  <tr>
                    <td className="td-key">Weight</td>
                    <td className="td-value">{productInfo.weight} lbs</td>
                  </tr>
                  <tr>
                    <td className="td-key">Width</td>
                    <td className="td-value">{productInfo.dimensions.width} inchs</td>
                  </tr>
                  <tr>
                    <td className="td-key">Height</td>
                    <td className="td-value">{productInfo.dimensions.height} inchs</td>
                  </tr>
                  <tr>
                    <td className="td-key">Depth</td>
                    <td className="td-value">{productInfo.dimensions.depth} inchs</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="display-product-reviews">
              <span className="display-product-reviews-span display-product-heading-key">Reviews: </span>
              <div className="review-container-wrapper">
                {
                  Object.values(productInfo.reviews).map(review => {
                    return (
                      <div className="review-container">
                        <div className="rating-name-container">
                          {
                            review.rating < 2.5 ?
                              <div className="rating-container" style={{ backgroundColor: "red" }}>
                                {review.rating} <i class="fa-solid fa-star"></i>
                              </div>
                              :

                              <div className="rating-container">
                                {review.rating} <i class="fa-solid fa-star"></i>
                              </div>
                          }
                          <div className="reviewer-name-container">{review.reviewerName}</div>
                        </div>
                        <div className="review-comment-container">{review.comment}</div>
                        <div className="review-date-container">{review.date}</div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
        {
          Object.keys(productInfo).length > 0 &&
          <div className="display-product-container-small">
            {
              <Slider {...settings}>
                {
                  productInfo.images.map((image) => {
                    return (
                      <div className="display-product-image-container-small">
                        <img src={image} alt="som product" />
                      </div>
                    )
                  })
                }
              </Slider>
            }


            <div className="display-product-order-cart-book display-product-order-cart-book-small">
              <div className="display-product-order-qnt-container">
                <div className="order-qnt-controller" data-qntController="plus" onClick={(e) => { incDecItem(e) }}><i className="fas fa-plus" ></i></div>
                <div>
                  <input className="display-product-order-qnt-input" type="number" min="1" value={orderQnt} onChange={(e) => { handleOrderQnt(e) }}></input>
                </div>
                <div className="order-qnt-controller" data-qntController="minus" onClick={(e) => { incDecItem(e) }}><i className="fas fa-minus"></i></div>
              </div>
              <div className="display-product-order" onClick={() => setToBeOrder(productInfo)}><i class="fa-solid fa-bolt"></i> Order</div>
              {
                ContextItems.cart.some((element) => {
                  return element._id === productInfo._id
                }) ?
                  <div onClick={(e) => { ContextItems.handleCartClick(e, productInfo, ContextItems.user, navigate, ContextItems.setCartCount, ContextItems.setProgress, ContextItems.cart, ContextItems.setCart) }} className="display-product-cart"><i class="fa-solid fa-cart-shopping"></i> Uncart</div>
                  :
                  <div onClick={(e) => { ContextItems.handleCartClick(e, productInfo, ContextItems.user, navigate, ContextItems.setCartCount, ContextItems.setProgress, ContextItems.cart, ContextItems.setCart) }} className="display-product-cart"><i class="fa-solid fa-cart-shopping"></i> Add to Cart</div>
              }
            </div>

            <div className="display-product-info display-product-info-small">
              <div className="display-product-title-descriptions display-product-title-description-small">
                <div className="display-product-title display-product-title-small">
                  <h1>{productInfo.title.length > 0 ? productInfo.title : '--'}</h1>
                </div>
                <div className="display-product-description display-product-description-small">
                  <h3>{productInfo.description.length > 0 ? productInfo.description : '--'}</h3>
                </div>
              </div>
              <div className="display-product-rating-review">
                <div className="display-product-star">
                  {productInfo.rating}  <i class="fa-solid fa-star"></i>
                </div>
                <div className="display-product-and">&</div>
                <div className="display-product-review">
                  {productInfo.reviews.length} Reviews
                </div>
              </div>
              <div className='display-product-pricing display-product-pricing-small'>
                <div className="display-product-price-after-discount">
                  <i class="fa-solid fa-indian-rupee-sign"></i>
                  {Math.floor(productInfo.price - (productInfo.discountPercentage * productInfo.price) / 100)}</div>
                <div className="display-product-price-before-discount"><i class="fa-solid fa-indian-rupee-sign"></i>{productInfo.price}</div>
                <div className="display-product-price-discount">{productInfo.discountPercentage}% off</div>
              </div>
              <div className="display-product-stock">
                <span className="display-product-stock-span display-product-heading-key">Stock: </span> {productInfo.stock}
              </div>
              <div className="display-product-brand">
                <span className="display-product-brand-span display-product-heading-key">Brand: </span> {productInfo.brand}
              </div>
              <div className="display-product-category">
                <span className="display-product-category-span display-product-heading-key">Category: </span> {productInfo.category}
              </div>
              <div className="display-product-delivery-address">
                <span className="display-product-delivery-address-span display-product-heading-key">Address: </span> {ContextItems.user.address ? ContextItems.user.address :
                  <>
                    <Link to="/address">Enter address</Link>
                  </>}
              </div>
              <div className="display-product-shipping">
                <span className="display-product-shipping-span display-product-heading-key">Shipping: </span> {productInfo.shippingInformation}
              </div>
              <div className="display-product-warranty">
                <span className="display-product-warranty-span display-product-heading-key">Warranty: </span> {productInfo.warrantyInformation}
              </div>
              <div className="display-product-shipping">
                <span className="display-product-return-policy-span display-product-heading-key">Return Policy: </span> {productInfo.returnPolicy}
              </div>
              <div className="display-product-structure">
                <span className="display-product-structure-span display-product-heading-key">Structure: </span>
                <table className="display-product-structure-table">
                  <tbody>
                    <tr>
                      <td className="td-key">Weight</td>
                      <td className="td-value">{productInfo.weight} lbs</td>
                    </tr>
                    <tr>
                      <td className="td-key">Width</td>
                      <td className="td-value">{productInfo.dimensions.width} inchs</td>
                    </tr>
                    <tr>
                      <td className="td-key">Height</td>
                      <td className="td-value">{productInfo.dimensions.height} inchs</td>
                    </tr>
                    <tr>
                      <td className="td-key">Depth</td>
                      <td className="td-value">{productInfo.dimensions.depth} inchs</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="display-product-reviews">
                <span className="display-product-reviews-span display-product-heading-key">Reviews: </span>
                <div className="review-container-wrapper">
                  {
                    Object.values(productInfo.reviews).map(review => {
                      return (
                        <div className="review-container">
                          <div className="rating-name-container">
                            {
                              review.rating < 2.5 ?
                                <div className="rating-container" style={{ backgroundColor: "red" }}>
                                  {review.rating} <i class="fa-solid fa-star"></i>
                                </div>
                                :

                                <div className="rating-container">
                                  {review.rating} <i class="fa-solid fa-star"></i>
                                </div>
                            }
                            <div className="reviewer-name-container">{review.reviewerName}</div>
                          </div>
                          <div className="review-comment-container">{review.comment}</div>
                          <div className="review-date-container">{review.date}</div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>

          </div>
        }

        <div className="display-product-related-products">
          <Slider {...settings2}>
            {
              ContextItems.relatedProducts.filter((element) => { return element.category == productInfo.category }).map((element) => {
                return (
                  <div style={{ width: 220 }} className="product-card-container">
                    <div className="add-to-cart" onClick={(e) => { ContextItems.handleCartClick(e, element, ContextItems.user, navigate, ContextItems.setCartCount, ContextItems.setProgress, ContextItems.cart, ContextItems.setCart) }}>
                      {
                        (ContextItems.cart.some((item) => { return item._id == element._id })) ?
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#FF5F00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                          :
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#747264" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                      }
                    </div>

                    <Link onClick={() => { fetchOnSame(element, navigate) }} to={`/product/${element._id}`} className="product-card" key={element._id}>
                      <div className="product-thumbnail">
                        <img src={element.thumbnail} style={{ width: '100%', height: '220px' }} alt="" />
                      </div>
                      <div className="product-info">
                        <div className="product-title-container">
                          <p className="product-title">{element.title.length > 20 ? element.title.slice(0, 20) + '...' : element.title}</p>
                        </div>
                        <div className="product-rating-container"><i class="fa-solid fa-star"></i>{element.rating}</div>
                        <div className="product-price-detail">
                          <div className="original-discount-price-container">
                            <div className="discount-price"><i class="fa-solid fa-indian-rupee-sign"></i>{(Number(element.price) - ((Number(element.price) * Number(element.discountPercentage ? element.discountPercentage : 0)) / 100)).toFixed(2)}</div>
                            <div className="original-price"><i class="fa-solid fa-indian-rupee-sign"></i>{element.price}</div>
                          </div>
                          <div className="discount">{element.discountPercentage ? element.discountPercentage : 0}%off</div>
                        </div>
                      </div>
                    </Link>
                  </div>
                )
              })
            }
          </Slider>


        </div>
      </div>
    </div >
  )
}

export default DisplayProduct