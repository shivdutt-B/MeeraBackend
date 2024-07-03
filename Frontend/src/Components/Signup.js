import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ContextName } from '../Context/Context'

function SignIn() {
    const navigate = useNavigate()
    const [user, setUser] = useState(true)
    const [data, setData] = useState({})
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
            ContextItems.setProgress(10)
            e.preventDefault()
            const postData = await axios.post(`${window.location.origin}/signup`, data)
            ContextItems.setProgress(50)
            if (postData.data.success) {
                navigate('/signin')
            }
            else {
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
                <h1>Sign up</h1>
                <p>Get started with <span>MEERA</span></p>
                <div className="user-status">
                    {
                        !user &&
                        <div>User already exits try using another email</div>
                    }
                </div>
                <form action="" className="sign-form" onSubmit={handleSubmit}>

                    <input id="username" type="input" placeholder="User Name" name="username" className="username-input" required onChange={(e) => { handleChange(e) }} />

                    <input id="email" type="email" placeholder="Email" name="email" className="email-input" required onChange={(e) => { handleChange(e) }} />
                    <div className="password-field-container">
                        <input id="password" type={inputType} placeholder="Password" name="password" className="email-input" required onChange={(e) => { handleChange(e) }} />
                        <i className='fas fa-eye show-password' id="open-eye" onClick={showAndHidePass}></i>
                        <i className='fas fa-eye-slash hide-password hide-field' id="close-eye" onClick={showAndHidePass}></i>
                    </div>

                    <input id="mobile" type="tel" maxlength="10" placeholder="Mobile number" name="mobile" className="mobile-input" required onChange={(e) => { handleChange(e) }} />
                    <button type="submit" className="sign-submit-btn">Sign up</button>
                </form>
                <div className="sign-up-link">
                    Already have an Account? <Link to="/signin">Sign in</Link>
                </div>
            </div>
        </div>
    )
}

export default SignIn