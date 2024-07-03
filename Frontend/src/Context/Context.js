import React, { useState, createContext, useEffect } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'


export const ContextName = createContext()

const ContextData = (props) => {
    const navigate = useNavigate()
    const [cart, setCart] = useState([])
    const [products, setProducts] = useState([])
    const [user, setUser] = useState({})
    const [toBeOrder, setToBeOrder] = useState({})
    const [tempCart, setTempCart] = useState([])
    const [cartOfOrders, setCartOfOrders] = useState({})
    const [bookedProducts, setBookedProducts] = useState([])
    const [cartCount, setCartCount] = useState(0)
    const [order, setOrder] = useState([])
    const [cartCost, setCartCost] = useState(0)
    const [orderCost, setOrderCost] = useState(0)
    const [checkLoading, setCheckLoading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [categoryData, setCategoryData] = useState({})
    const [relatedProducts, setRelatedProducts] = useState([])
    const [currentQuery, setCurrentQuery] = useState('')

    async function fetchProducts() {
        try {
            if (products.length > 0) {

            }
            else {
                // const fetch = await axios("http://localhost:8080/products")
                const fetch = await axios('https://meera-mocha.vercel.app/products')
                if (fetch.data.success) {
                    let products = fetch.data.products
                    setProducts(products)
                }
                else {
                }
            }
        } catch (error) {
            navigate('/error')
        }
    }

    async function handleCartClick(e, element, user, navigate, setCartCount, setProgress, cart, setCart) {
        try {
            if (Object.keys(user).length > 0) {

                setProgress(30)

                const isItemInCart = cart.some((item) => {
                    return item._id == element._id
                })

                if (isItemInCart) {
                    const removeFromCart = await axios.post('http://localhost:8080/removefromcart', { "_id": element._id })
                    if (removeFromCart.data.success) {
                        setCartCount(removeFromCart.data.length)
                        let products = cart.filter((item) => { return item._id != element._id })
                        setCart(products)
                        priceSetter(products, setCartCost)
                    }
                }
                else {
                    const addCart = await axios.post('http://localhost:8080/addtocart', element)
                    if (addCart.data.success) {
                        setCartCount(addCart.data.length)
                        cart.push(element)
                    }
                }
            }

            else {
                navigate('/signin')
            }
        } catch (error) {
            navigate('/error')
        }
        finally {
            setProgress(100)
        }
    }

    async function deleteItem(element, setCartCount, setProgress, priceSetter, navigate) {
        try {
            setProgress(10)
            const removeFromCart = await axios.post('http://localhost:8080/removefromcart', { "_id": element._id })
            setProgress(50)
            if (removeFromCart.data.success) {
                setCartCount(removeFromCart.data.length)
                let products = cart.filter((item) => { return item._id != element._id })
                priceSetter(products, setCartCost)
                setCart(products)
            } else {
                navigate('/error')
            }
        } catch (error) {
            navigate('/error')
        }
        finally {
            setProgress(100)
        }

    }

    async function TransferData(element, navigate) {
        try {
            const elementData = JSON.stringify(element)
            await sessionStorage.setItem('productInfo', elementData)
            await sessionStorage.setItem('productCategory', element.category)
        } catch (error) {
            navigate('/error')
        }
    }

    function priceSetter(data, parameter) {
        let cost = 0
        data.map((element) => {
            cost += element.count * (element.price * (1 - element.discountPercentage / 100)).toFixed(2)
        })
        parameter(cost)
    }

    async function fetchUser() {
        setProgress(10)
        try {
            if (Object.keys(user).length > 0) {
                // User is already present so no need to fetch again.
            }
            else {
                setCheckLoading(true)
                // const fetch = await axios("http://localhost:8080/auth")
                const fetch = await axios('https://meera-mocha.vercel.app/auth')
                setProgress(50)
                if (fetch.data.user) {
                    //Setting all the information from user
                    setUser(fetch.data.user)
                    setCart(fetch.data.user.cart)
                    setOrder(fetch.data.user.order)
                    setBookedProducts(fetch.data.user.book)
                    setCartCount(fetch.data.user.cart.length)

                    // Setting all the prices (cart, order)
                    priceSetter(fetch.data.user.cart, setCartCost) // calculating total price of all the items in cart.
                    priceSetter(fetch.data.user.order, setOrderCost) // calculating total price of all the items in order.
                    setCheckLoading(false)
                }
                else{
                    // Not signed so no user is present.
                }
            }
        } catch (error) {
            navigate('/error')
        }
        finally {
            setProgress(100)
        }
    }


    useEffect(() => {
        fetchProducts()
        fetchUser()
    }, [])


    return (
        <ContextName.Provider value={{
            cart, setCart, products, setProducts, user, setUser, fetchProducts, handleCartClick, deleteItem, toBeOrder, setToBeOrder, tempCart, setTempCart, cartOfOrders, setCartOfOrders, bookedProducts, setBookedProducts, TransferData, cartCount, setCartCount, order, setOrder, cartCost, setCartCost, orderCost, setOrderCost, checkLoading, setCheckLoading, progress, setProgress, categoryData, setCategoryData, relatedProducts, setRelatedProducts, priceSetter, currentQuery, setCurrentQuery
        }}>
            {props.children}
        </ContextName.Provider>
    )
}

export default ContextData