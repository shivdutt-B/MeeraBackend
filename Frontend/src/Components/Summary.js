import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { ContextName } from '../Context/Context'
import { Link, useNavigate } from 'react-router-dom'

function Summary() {

  const ContextItems = useContext(ContextName)
  const [cost, setCost] = useState(0)
  const navigate = useNavigate()

  function priceSetter(cart) {
    let cost = 0
    cart.map((element) => {
      cost += element.count * (element.price * (1 - element.discountPercentage / 100))
    })
    setCost(cost)
  }
  async function storageParser() {
    const data = await JSON.parse(sessionStorage.getItem('toBeOrder'))
    return data
  }

  useEffect(() => {
    storageParser().then((data) => {
      priceSetter(data)
    }).catch((error) => {
      navigate('/error')
    })
  }, [])


  return (
    <div className="main">
      <div className="gutter">
        <div className="progress-event">
          <div className="event-dot-container">
            <div className="event-dot active-dot"></div>
            <div className="event-text">Order<br />Summary</div>
            <div className="event-line"></div>
          </div>
          <div className="event-dot-container">
            <div className="event-dot"></div>
            <div className="event-text">Payment<br />Method</div>
            <div className="event-line"></div>
          </div>
          <div className="event-dot-container">
            <div className="event-dot"></div>
            <div className="event-text">Place<br />Order</div>
          </div>
        </div>

        {
          <div className="cart-summary-container">
            <div className="cart">
              {
                JSON.parse(sessionStorage.getItem('toBeOrder')).map((element) => {
                  return (
                    <>
                      <div key={element._id} className="cart-item">
                        <div className="cart-item-poster">
                          <img src={element.thumbnail} alt="" />
                        </div>
                        <div className="cart-item-name summary-item-name">
                          <h3 style={{ fontSize: "17px" }}>{element.title.length > 30 ? element.title.slice(0, 30) + '...' : element.title}</h3>
                        </div>
                        <div className="cart-item-count summary-price-count-container">
                          <div className="summary-item-price-container">
                            <i class="fa-solid fa-indian-rupee-sign"></i> {(Number(element.price) - ((Number(element.price) * Number(element.discountPercentage ? element.discountPercentage : 0)) / 100)).toFixed(2)}
                          </div>
                          <div className="count-plus">
                            <span className="cart-item-count-span">{JSON.parse(sessionStorage.getItem('toBeOrder')).map((item) => { if (item._id == element._id) { return `x${item.orderQnt}` } })}</span>
                          </div>
                        </div>

                        <div className="cart-item-price">
                          <div>
                            <i class="fa-solid fa-indian-rupee-sign"></i><span className="cart-item-price-span">{(element.count * (element.price * (1 - element.discountPercentage / 100))).toFixed(2)}</span>
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
                  <i class="fa-solid fa-indian-rupee-sign"></i>{cost.toFixed(2)}
                </div>
              </div>
              <div className="cart-item-border-bottom summary-border"></div>
              <div className="checkout-btn-container">
                {
                  ContextItems.user.address ?
                    <div className="enter-address"> {ContextItems.user.address} </div> :
                    <Link to="/address" className="enter-address">
                      Enter Address
                    </Link>
                }
                {
                  ContextItems.user.address ?
                    <Link to="/payment" className="checkout-btn">
                      Place Order <i class="fa-solid fa-arrow-right"></i>
                    </Link> :
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
        }


      </div>
    </div>
  )
}

export default Summary