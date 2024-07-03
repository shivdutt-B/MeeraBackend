import axios from 'axios'
import React, {  useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ContextName } from '../Context/Context'
import { useContext } from 'react'
import EmptyCart from "../Assets/empth-cart.png"

function MyOrders() {
  const ContextItems = useContext(ContextName)
  const navigate = useNavigate()

  async function deleteItem(element) {
    try {
      ContextItems.setProgress(10)
      const productId = element._id
      const deletedItem = await axios.post(`${window.location.origin}/removefromorder`, { productId: productId }) // deleted from db
      if (deletedItem.data.success) {
        const products = ContextItems.order.filter((item) => {
          return item._id != element._id
        })
        ContextItems.setOrder(products)
        ContextItems.priceSetter(products, ContextItems.setOrderCost)
      }
      else{
        navigate('/error')
      }
    } catch (error) {
      navigate('/error')
    }
    finally {
      ContextItems.setProgress(100)
    }
  }



  return (
    <div className="main">
      <div className="gutter">
        {
          ContextItems.order.length > 0 ?
            <div className="cart-summary-container">
              <div className="cart">
                {
                  ContextItems.order.map((element) => {
                    return (
                      <>
                        <div key={element._id} className="cart-item">
                          <div className="cart-item-poster">
                            <img src={element.thumbnail} alt="" />
                          </div>
                          <div className="cart-item-name order-item-name">
                            <h3 className="cart-item-name-name">{element.title.length > 30 ? element.title.slice(0, 30) + '...' : element.title}</h3>
                          </div>
                          <div className="cart-item-name-small order-item-name-small">
                            <h3 className="cart-item-name-name">{element.title.length > 30 ? element.title.slice(0, 20) + '...' : element.title}</h3>
                            <div className="cart-item-order-count-small">x{element.orderQnt}</div>
                          </div>
                          <div className="cart-item-order-count">
                            x{element.orderQnt}
                          </div>
                          <div className="cancel-order">
                            <div className="cancel-order-button">
                              <i class="fa-regular fa-trash-can" onClick={() => { deleteItem(element) }}></i>
                            </div>
                            <div className="cancel-order-button-small" onClick={() => { deleteItem(element) }}>
                              Cancel
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
                    <i class="fa-solid fa-indian-rupee-sign"></i>
                    {ContextItems.orderCost.toFixed(2)}
                  </div>
                </div>
                <div className="checkout-btn-container">
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

export default MyOrders