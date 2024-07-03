import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { ContextName } from '../Context/Context';
import { useContext } from 'react';


function SignIn() {
    const [data, setData] = useState({})
    const navigate = useNavigate()
    const ContextItems = useContext(ContextName)

    async function handleSubmit(e) {
        try {
            e.preventDefault()
            ContextItems.setProgress(10)
            const postData = await axios.post(`${window.location.origin}/address`, data)
            if (postData.data.success) {
                ContextItems.setUser(postData.data.response)
                navigate('/')
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
                <h1>Address</h1>
                <form action="" className="sign-form" onSubmit={handleSubmit}>

                    <input id="email" type="text" placeholder="Address" name="address" className="email-input" required onChange={(e) => { handleChange(e) }} />
                    <button type="submit" className="sign-submit-btn">Proceed</button>
                </form>
            </div>
        </div>
    )
}

export default SignIn