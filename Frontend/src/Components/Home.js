import React, { useContext, useState } from 'react'

// Category Poster
import grocery from "../Assets/grocery.jpg"
import mobile from "../Assets/mobile.png"
import fashion from "../Assets/fashion.webp"
import toy from "../Assets/toy.png"
import electronics from "../Assets/electronics.png"
import furniture from "../Assets/furniture.avif"
import appliences from "../Assets/appliences.webp"
import cosmatics from "../Assets/cosmatics.png"

// Third party packeges
import { Link } from 'react-router-dom'
import Slider from "react-slick";

import axios from "axios"
import { useNavigate } from 'react-router-dom'

//Banners
import FurnitureBanner from "../Assets/furniture-banner.jpg"
import ShoesBanner from "../Assets/show-poster.jpg"
import GroceryBanner from "../Assets/groceries-banner.jpg"
import FashionBanner from "../Assets/fashion-banner.jpg"
import ToysBanner from "../Assets/toys-banner.jpg"

//Products Poster
import ProductJewelry from "../Assets/product-jewelry.jpg"
import ProductSkinCare from "../Assets/product-skin-care.webp"
import ProductFragrance from "../Assets/product-perfume.jpg"
import ProductMenCloths from "../Assets/product-men-cloths.jpg"
import ProductWomenCloths from "../Assets/product-women-cloths.jpg"

//Context
import { ContextName } from '../Context/Context'


function Home() {
  const ContextItems = useContext(ContextName)
  const navigate = useNavigate()

  function exoElement() {
    let elements = []

    for (let i = 0; i < 3; i++) {
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
  const settings2 = {
    className: "slider variable-width",
    dots: false,
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true
  }

  async function transferProductCategory(e) {
    let category = await e.target.closest('[data-category]').dataset.category
    await sessionStorage.setItem('category', category)
  }

  // async function transferSingleProductCategory(e) {
  //   let category = await e.target.closest('[date-category]').dataset.category
  //   await sessionStorage.setItems('singleCategory', category)
  // }


  return (

    <div className="main">
      <div className="gutter">
        <div className="banner-container">
          <Slider {...settings}>
            <div className="banner">
              <Link to="products" className="banner-link" data-category="furniture&home-decoration&vehicle&motorcycle" onClick={(e) => { transferProductCategory(e) }}>
                <img src={FurnitureBanner} alt="" />
              </Link>
            </div>
            <div className="banner">
              <Link to="products" className="banner-link" data-category="sports-accessories" onClick={(e) => { transferProductCategory(e) }}>
                <img src={ToysBanner} alt="" />
              </Link>
            </div>
            <div className="banner">
              <Link to="products" className="banner-link" data-category="mens-shoes&womens-shoes" onClick={(e) => { transferProductCategory(e) }}>
                <img src={ShoesBanner} alt="" />
              </Link>
            </div>
            <div className="banner">
              <Link to="products" className="banner-link" data-category="groceries" onClick={(e) => { transferProductCategory(e) }}>
                <img src={GroceryBanner} alt="" />
              </Link>
            </div>
            <div className="banner">
              <Link to="products" className="banner-link" data-category="mens-watches & mens-shirts & mens-shoes & womens-watches & womens-shoes & womens-jewellery & womens-dresses & womens-bags & tops" onClick={(e) => { transferProductCategory(e) }}>
                <img src={FashionBanner} alt="" />
              </Link>
            </div>
          </Slider>
        </div>

        <div className="jewelry-skin-men-women-fragrance">
          <div className="j-s-m-w-f-first">
            <Link to="products" className="jewelry-container" data-category="womens-jewellery" onClick={(e) => { transferProductCategory(e) }}>
              <div className="jewelry">
                <div className="jewelry-poster">
                  <img src={ProductJewelry} alt="" />
                </div>
                <div className="jewelry-heading">
                  <h1>Jewelry</h1>
                </div>
              </div>
            </Link>
            <Link to="products" className="skin-container" data-category="beauty&fragrances&skin-care" onClick={(e) => { transferProductCategory(e) }}>
              <div className="skin">
                <div className="skin-poster">
                  <img src={ProductSkinCare} alt="" />
                </div>
                <div className="skin-heading">
                  <h1>Skin Products</h1>
                </div>
              </div>
            </Link>
            <Link to="/products" className="men-cloths-container" data-category="mens-watches & mens-shirts & mens-shoes & sunglasses" onClick={(e) => { transferProductCategory(e) }}>
              <div className="men-cloths">
                <div className="men-cloths-poster">
                  <img src={ProductMenCloths} alt="" />
                </div>
                <div className="men-cloths-heading">
                  <h1>Men's Cloths</h1>
                </div>
              </div>
            </Link>
            <Link to="products" className="women-cloths-container" data-category="womens-watches & womens-shoes & womens-jewellery & womens-dresses & womens-bags & tops" onClick={(e) => { transferProductCategory(e) }}>
              <div className="women-cloths">
                <img src={ProductWomenCloths} alt="" />
              </div>
              <div className="women-cloths-heading">
                <h1>Women's Cloths</h1>
              </div>
            </Link>
          </div>
          <div className="j-s-m-w-f-second">
            <Link to="products" className="fragrance-poster" data-category="fragrances" onClick={(e) => { transferProductCategory(e) }}>
              <img src={ProductFragrance} alt="" />
            </Link>
          </div>
        </div>

        <div className="categories-container">
          <div className="categories">
            <ul className="category-list">
              <li className="category-list-item">
                <Link onClick={(e) => { transferProductCategory(e) }} to="/grocery" className="category-item-link" data-category="groceries">
                  <div className="category-item-pic">
                    <img src={grocery} className="category-poster" alt="" />
                  </div>
                  <div className="category-item-name">
                    Grocery
                  </div>
                </Link>
              </li>
              <li className="category-list-item">
                <Link onClick={(e) => { transferProductCategory(e) }} to="/smartphones" className="category-item-link" data-category="smartphones&mobile-accessories">
                  <div className="category-item-pic">
                    <img src={mobile} className="category-poster" alt="" />
                  </div>
                  <div className="category-item-name">
                    Mobile
                  </div>
                </Link>
              </li>
              <li className="category-list-item">
                <Link onClick={(e) => { transferProductCategory(e) }} to="/clothing" className="category-item-link" data-category="mens-watches & mens-shirts & mens-shoes&womens-watches & womens-shoes & womens-jewellery & womens-dresses & womens-bags & tops">
                  <div className="category-item-pic">
                    <img src={fashion} className="category-poster" alt="" />
                  </div>
                  <div className="category-item-name">
                    Fashion <i class="fa-solid fa-chevron-down"></i>
                  </div>
                  <div className="hidden-options">
                    <ul className="hidden-options-list">
                      <li className="hidden-list-item">
                        <Link onClick={(e) => { transferProductCategory(e) }} to="/clothing" className="category-item-link hidden-list-link" data-category="mens-watches & mens-shirts & mens-shoes & sunglasses">Men</Link>
                      </li>
                      <li className="hidden-list-item">
                        <Link onClick={(e) => { transferProductCategory(e) }} to="/clothing" className="category-item-link hidden-list-link" data-category="womens-watches & womens-shoes & womens-jewellery & womens-dresses & womens-bags & tops">Women</Link>
                      </li>
                    </ul>
                  </div>
                </Link>
              </li>
              <li className="category-list-item">
                <Link onClick={(e) => { transferProductCategory(e) }} to="/toys" className="category-item-link" data-category="sports-accessories">
                  <div className="category-item-pic">
                    <img src={toy} className="category-poster" alt="" />
                  </div>
                  <div className="category-item-name">
                    Toys
                  </div>
                </Link>
              </li>
              <li className="category-list-item">
                <Link onClick={(e) => { transferProductCategory(e) }} to="/electronics" className="category-item-link" data-category="mens-watches&womens-watches&mobile-accessoreis&tablets&laptops&smartphones">
                  <div className="category-item-pic">
                    <img src={electronics} className="category-poster" alt="" />
                  </div>
                  <div className="category-item-name">
                    Electronics
                  </div>
                </Link>
              </li>
              <li className="category-list-item">
                <Link onClick={(e) => { transferProductCategory(e) }} to="/furniture" className="category-item-link" data-category="furniture&home-decoration">
                  <div className="category-item-pic">
                    <img src={furniture} className="category-poster" alt="" />
                  </div>
                  <div className="category-item-name">
                    Furniture
                  </div>
                </Link>
              </li>
              <li className="category-list-item">
                <Link onClick={(e) => { transferProductCategory(e) }} to="/kitchen" className="category-item-link" data-category="kitchen-accessories">
                  <div className="category-item-pic">
                    <img src={appliences} className="category-poster" alt="" />
                  </div>
                  <div className="category-item-name">
                    Kitchen
                  </div>
                </Link>
              </li>
              <li className="category-list-item">
                <Link onClick={(e) => { transferProductCategory(e) }} to="/beauty" className="category-item-link" data-category="beauty&fragrances&skin-care">
                  <div className="category-item-pic">
                    <img src={cosmatics} className="category-poster" alt="" />
                  </div>
                  <div className="category-item-name">
                    Beauty
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {
          ContextItems.products.length > 0 ?
            <>
              <div className="carousel-heading-container">
                <div className="carousel-heading">
                  <h1>Grocery</h1>
                </div>
                <div className="show-more">
                  <Link to="products" data-category="groceries" onClick={(e) => { transferProductCategory(e) }}>
                    <i class="fa-solid fa-circle-chevron-right"></i>
                  </Link>
                </div>
              </div>
              <div className="product-carousel product-carousel-1">
                <Slider {...settings2}>
                  {
                    ContextItems.products.filter((element) => { return element.category == 'groceries' }).map((element) => {
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
                          <Link onClick={() => { ContextItems.TransferData(element, navigate) }} className="product-card" to={`/product/${element._id}`} key={element._id}>
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
            </>
            :
            <>
              <Slider {...settings2}>
                {exoElement()}
              </Slider>
            </>
        }
        {
          ContextItems.products.length > 0 ?
            <>
              <div className="carousel-heading-container">
                <div className="carousel-heading">
                  <h1>Smartphones & Laptops</h1>
                </div>
                <div className="show-more">
                  <Link to="products" data-category="smartphones & laptops" onClick={(e) => { transferProductCategory(e) }}>
                    <i class="fa-solid fa-circle-chevron-right"></i>
                  </Link>
                </div>
              </div>
              <div className="product-carousel product-carousel-1">
                <Slider {...settings2}>
                  {
                    ContextItems.products.filter((element) => { return element.category == 'smartphones' || element.category == 'laptops' }).map((element) => {
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
                          <Link onClick={() => { ContextItems.TransferData(element, navigate) }} to={`/product/${element._id}`} className="product-card" key={element._id}>
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
            </>
            :
            <>
              <Slider {...settings2}>
                {exoElement()}
              </Slider>
            </>
        }
        {
          ContextItems.products.length > 0 ?
            <>
              <div className="carousel-heading-container">
                <div className="carousel-heading">
                  <h1>Fragrances & Skincare</h1>
                </div>
                <div className="show-more">
                  <Link to="products" data-category="beauty&fragrances&skin-care" onClick={(e) => { transferProductCategory(e) }}>
                    <i class="fa-solid fa-circle-chevron-right"></i>
                  </Link>
                </div>
              </div>
              <div className="product-carousel product-carousel-1">
                <Slider {...settings2}>
                  {
                    ContextItems.products.filter((element) => { return element.category == 'fragrances' || element.category == "skin-care" || element.category == "beauty" }).map((element) => {
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
                          <Link onClick={() => { ContextItems.TransferData(element, navigate) }} to={`/product/${element._id}`} className="product-card" key={element._id}>
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
            </>
            :
            <>
              <Slider {...settings2}>
                {exoElement()}
              </Slider>
            </>
        }
      </div>
    </div>
  )
}

export default Home