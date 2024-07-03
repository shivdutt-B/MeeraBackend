import React from 'react'
import PaymentFail from "../Assets/payment-failed.webp"
import { Link } from 'react-router-dom'

function PaymentFailed() {
    return (
        <>
            <div className="payment-poster-text-container">
                <div className='payment-success-poster-container'>
                    <img className="payment-success-poster" src={PaymentFail} />
                </div>
                <div className="payment-success-text">
                    <h2>
                        Payment Failed
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

export default PaymentFailed