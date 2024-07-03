import React from 'react'
import PaymentCheck from "../Assets/payment-success.gif"
import { Link } from 'react-router-dom'

function PaymentSuccessfull() {

    return (
        <>
            <div className="payment-poster-text-container">
                <div className='payment-success-poster-container'>
                    <img className="payment-success-poster" src={PaymentCheck} />
                </div>
                <div className="payment-success-text">
                    <h2>
                        Your order has been placed successfully!
                    </h2>
                </div>
                <div className="back-to-home-after-payment">
                    <Link to='/' className="btn-back-to-home-after-payment">
                        <i class="fa-solid fa-arrow-left"></i> Home
                    </Link>
                </div>
            </div>
        </>
    )
}

export default PaymentSuccessfull
