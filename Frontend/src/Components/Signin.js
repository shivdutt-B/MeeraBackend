import React from 'react'
import { Link } from "react-router-dom"
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { ContextName } from '../Context/Context';
import { useContext } from 'react';


function SignIn() {
    const [data, setData] = useState({})
    const navigate = useNavigate()
    const ContextItems = useContext(ContextName)
    const [inputType, setInputType] = useState("password")

    function showAndHidePass() {
        const openEye = document.getElementById('open-eye')
        const closeEye = document.getElementById('close-eye')
        if (inputType === "password") {
            setInputType("input")
        }
        else {
            setInputType("password")
        }
        openEye.classList.toggle('hide-field')
        closeEye.classList.toggle('hide-field')
    }

    async function handleSubmit(e) {
        try {
            e.preventDefault()
            ContextItems.setProgress(10)
            const postData = await axios.post(`${window.location.origin}/signin`, data)
            ContextItems.setProgress(50)
            if (postData.data.success){
                ContextItems.setUser(postData.data.user)
                ContextItems.setCart(postData.data.user.cart)
                ContextItems.setOrder(postData.data.user.order)
                ContextItems.setCartCount(postData.data.user.cart.length)
                navigate('/')
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
    function handleChange(e) {
        let name = e.target.name
        let value = e.target.value
        data[name] = value
    }
    return (
        <div className="sign-container">
            <div className="sign">
                <h1>Sign in</h1>
                <p>Continue with <span>MEERA</span></p>
                <form action="" className="sign-form" onSubmit={handleSubmit}>

                    <input id="email" type="email" placeholder="Email" name="email" className="email-input" required onChange={(e) => { handleChange(e) }} />
                    <div className="password-field-container">
                        <input id="password" type={inputType} placeholder="Password" name="password" className="email-input" required onChange={(e) => { handleChange(e) }} />
                        <i className='fas fa-eye show-password' id="open-eye" onClick={showAndHidePass}></i>
                        <i className='fas fa-eye-slash hide-password hide-field' id="close-eye" onClick={showAndHidePass}></i>
                    </div>

                    <button type="submit" className="sign-submit-btn">Sign in</button>
                </form>
                <div className="sign-up-link">
                    Don't Have an Account? <Link to="/signup">Sign up</Link>
                </div>
            </div>
        </div>
    )
}

export default SignIn