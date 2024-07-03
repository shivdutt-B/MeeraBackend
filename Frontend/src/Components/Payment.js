import React from 'react'
import { useContext } from 'react'
import { ContextName } from '../Context/Context'
import { useNavigate } from 'react-router-dom'

function Payment() {
    const navigate = useNavigate()
    const ContextItems = useContext(ContextName)


    async function payment() {
        try {
            ContextItems.setProgress(10)
            let itemsToOrder = JSON.parse(sessionStorage.getItem('toBeOrder'))
            let userId = ContextItems.user._id
            const payLoad = {
                itemsToOrder,
                userId
            }
            const payment = await fetch(`${window.location.origin}/create-checkout-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payLoad)
            })
            const parsedPayment = await payment.json()
            window.location = parsedPayment.url
        } catch (error) {
            navigate('/error')
        } finally {
            ContextItems.setProgress(100)
        }
    }



    return (
        <div className="main">
            <div className="gutter">
                <div className="progress-event">
                    <div className="event-dot-container">
                        <div className="event-dot active-dot"></div>
                        <div className="event-text">Order<br />Summary</div>
                        <div className="event-line active-line"></div>
                    </div>
                    <div className="event-dot-container active-dot-container">
                        <div className="event-dot active-dot"></div>
                        <div className="event-text">Payment<br />Method</div>
                        <div className="event-line"></div>
                    </div>
                    <div className="event-dot-container">
                        <div className="event-dot"></div>
                        <div className="event-text">Place<br />Order</div>
                    </div>
                </div>
                <h2 className="payment-heading">Choose Payment Method</h2>
                <div className="payment-method-container">
                    <div className="online-payment">
                        <div onClick={payment} className="online-payment-head">
                            <h4>Credit cart/Debit cart <i class="fa-solid fa-arrow-right"></i></h4>
                            <p>
                                pay online through various payment methods
                            </p>
                        </div>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default Payment