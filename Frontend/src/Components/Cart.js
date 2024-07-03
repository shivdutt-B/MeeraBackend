import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { ContextName } from '../Context/Context'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import EmptyCart from "../Assets/empth-cart.png"

function Cart() {
  const ContextItems = useContext(ContextName)
  const navigate = useNavigate()

  async function increaseItem(e, element) {
    try {
      ContextItems.setProgress(0)
      const response = await axios.post(`${window.location.origin}/increaseitem`, { productId: element._id })
      if (response.data.success) {
        ContextItems.setProgress(50)

        let price = e.target.closest('.cart-item').querySelector('.cart-item-price-span')
        let count = e.target.parentElement.children[1]

        count.innerHTML = Number(count.innerHTML) + 1
        price.innerHTML = ((element.price * (1 - element.discountPercentage / 100)) * Number(count.innerHTML)).toFixed(2)

        const updatedData = ContextItems.cart.map((item) => {
          if (item._id == element._id) {
            item.count += 1
          }
          return item
        })
        ContextItems.setCart(updatedData)
        ContextItems.priceSetter(updatedData, ContextItems.setCartCost)
      }
      else {
        navigate('/error')
      }
    } catch (error) {
      navigate('/error')
    }
    finally{
      ContextItems.setProgress(100)
    }
  }

  async function decreaseItem(e, element) {
    try {
      ContextItems.setProgress(0)
      ContextItems.setProgress(50)

      let price = e.target.closest('.cart-item').querySelector('.cart-item-price-span')
      let count = e.target.parentElement.children[1]

      if (count.innerHTML == 1) {
        ContextItems.handleCartClick(e, element, ContextItems.user, navigate, ContextItems.setCartCount, ContextItems.setProgress, ContextItems.cart, ContextItems.setCart)
      }
      else {
        const response = await axios.post(`${window.location.origin}/decreaseitem`, { productId: element._id })
        if (response.data.success) {

          count.innerHTML = Number(count.innerHTML) - 1
          price.innerHTML = ((element.price * (1 - element.discountPercentage / 100)) * Number(count.innerHTML)).toFixed(2)

          const updatedCart = (ContextItems.cart).map((item) => {
            if (item._id == element._id) {
              item.count -= 1
            }
            return item
          })
          ContextItems.setCart(updatedCart)
          ContextItems.priceSetter(updatedCart, ContextItems.setCartCost)

        }
        else {
          navigate('/error')
        }
        // NEED TO UPDATE THE CONTEXT DATA OF THE CART.
      }
    } catch (error) {
      navigate('/error')
    }
    finally{
      ContextItems.setProgress(100)
    }
  }



  function setToBeOrder() {
    try {
      if (ContextItems.cart.length > 0) {
        ContextItems.cart.map((item) => {
          item.orderQnt = item.count
        })
        sessionStorage.setItem('toBeOrder', JSON.stringify(ContextItems.cart))
      }
      else {
        sessionStorage.setItem('toBeOrder', JSON.stringify([ContextItems.cart]))
      }
      navigate('/summary')
    } catch (error) {
      navigate('/error')
    }
    finally{
      ContextItems.setProgress(100)
    }
  }

  useEffect(() => {
    ContextItems.priceSetter(ContextItems.cart, ContextItems.setCartCost)
  }, [])


  return (
    <div className="main">
      <div className="gutter">
        {
          ContextItems.cart.length > 0 ?
            <div className="cart-summary-container">
              <div className="cart">
                {
                  ContextItems.cart.map((element) => {
                    return (
                      <>
                        <div key={element._id} className="cart-item">
                          <div className="cart-item-poster">
                            <img src={element.thumbnail} alt="" />
                          </div>
                          <div className="cart-item-name">
                            <h3 className="cart-item-title">{element.title.length > 30 ? element.title.slice(0, 30) + '...' : element.title}</h3>
                            <h3 className="cart-item-title-small">{element.title.length > 30 ? element.title.slice(0, 15) + '...' : element.title}</h3>
                          </div>
                          <div className="cart-item-count">
                            <div className="count-plus">
                              <i className="fas fa-plus count-i" onClick={(e) => { increaseItem(e, element) }}></i>
                              <span className="cart-item-count-span">{element.count}</span>
                              <i className="fas fa-minus count-i" onClick={(e) => { decreaseItem(e, element) }}></i>
                            </div>
                            <div className="cart-item-price-small">
                              <i class="fa-solid fa-indian-rupee-sign"></i><span className="cart-item-price-span">{(element.price * element.count * (1 - element.discountPercentage * element.count / 100)).toFixed(2)}</span>
                            </div>
                          </div>

                          <div className="cart-item-price">
                            <div>
                              <i class="fa-solid fa-indian-rupee-sign"></i>
                              <span className="cart-item-price-span">{(element.count * (element.price * (1 - element.discountPercentage / 100)).toFixed(2)).toFixed(2)}</span>
                            </div>
                          </div>
                          <div className="cart-item-remove-container">
                            <div className="cart-item-remove">
                              <i class="fa-regular fa-trash-can" onClick={(e) => { ContextItems.deleteItem(element, ContextItems.setCartCount, ContextItems.setProgress, ContextItems.priceSetter, navigate) }}></i>
                            </div>
                            <div className="cart-item-remove-small" onClick={(e) => { ContextItems.deleteItem(element, ContextItems.setCartCount, ContextItems.setProgress, ContextItems.priceSetter, navigate) }}>
                              Delete
                            </div>
                          </div>
                        </div>
                        <div className="cart-item-border-bottom"></div>
                      </>
                    )
                  })
                }
              </div>
              <div className="summary-container">
                <h3>SUMMARY</h3>
                <div className="sub-total-container">
                  <div className="sub-total-head">
                    <h4>Subtotal</h4>
                  </div>
                  <div className="sub-total-head">
                  <i class="fa-solid fa-indian-rupee-sign"></i> {ContextItems.cartCost.toFixed(2)}
                  </div>
                </div>
                <div className="cart-item-border-bottom summary-border"></div>
                <div className="grand-total-container">
                </div>
                <div className="checkout-btn-container">
                  {
                    ContextItems.user.address ?
                      <div className="enter-address"> {ContextItems.user.address} </div> :
                      <Link to="/address" className="enter-address">
                        Enter Address to proceed
                      </Link>
                  }
                  {
                    ContextItems.user.address ?
                      <div className="checkout-btn" onClick={setToBeOrder}>
                        Place Order <i class="fa-solid fa-arrow-right"></i>
                      </div>
                      :
                      <Link to="/address" className="checkout-btn">
                        Place Order <i class="fa-solid fa-arrow-right"></i>
                      </Link>
                  }
                  <Link to="/" className="checkout-btn shopping-btn">
                    Keep Shopping <i class="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
            :
            <div className="no-item-in-cart-poster-container">
              <img className="no-item-in-cart-poster" src={EmptyCart} />
              <Link className="no-item-in-cart-keep-shopping-btn" to="/" >Keep Shopping <i class="fa-solid fa-arrow-right"></i></Link>
            </div>
        }
      </div>
    </div>
  )
}

export default Cart