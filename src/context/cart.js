import React, { useState, useEffect, useReducer } from 'react'
// import localCart from '../utils/localCart'
import reducer from './reducer'
import { REMOVE, INCREASE, DECREASE, ADD_TO_CART, CLEAR_CART } from './actions'

const getCartFormLocalStorage = () => {
	return localStorage.getItem('cart')
		? JSON.parse(localStorage.getItem('cart'))
		: []
}

const CartContext = React.createContext()

const CartProvider = ({ children }) => {
	const [cart, dispatch] = useReducer(reducer, getCartFormLocalStorage())
	const [total, setTotal] = useState(0)
	const [cartItems, setCartItems] = useState(0)

	useEffect(() => {
		// local storage
		localStorage.setItem('cart', JSON.stringify(cart))
		// cart item
		let newcartItems = cart.reduce((total, cartItem) => {
			return (total += cartItem.amount)
		}, 0)
		setCartItems(newcartItems)
		// cart total
		let newTotal = cart.reduce((total, cartItem) => {
			return (total += cartItem.amount * cartItem.price)
		}, 0)
		newTotal = parseFloat(newTotal.toFixed(2))
		setTotal(newTotal)
	}, [cart])

	//  Remove Item
	const removeItem = (id) => {
		dispatch({ type: REMOVE, payload: id })
	}
	//  Increase Amount
	const increaseAmount = (id) => {
		dispatch({ type: INCREASE, payload: id })
	}
	//  decrease Amount
	const decreaseAmount = (id, amount) => {
		if (amount === 1) {
			dispatch({ type: REMOVE, payload: id })
			return
		} else {
			dispatch({ type: DECREASE, payload: id })
		}
	}

	//  addToCart
	const addToCart = (product) => {
		let item = [...cart].find((item) => item.id === product.id)
		// if it already in the cart, increaseAmount
		if (item) {
			dispatch({ type: INCREASE, payload: product.id })
		} else {
			dispatch({ type: ADD_TO_CART, payload: product })
		}
	}
	//  clearCart
	const clearCart = () => {
		dispatch({ type: CLEAR_CART })
	}

	return (
		<CartContext.Provider
			value={{
				cart,
				total,
				cartItems,
				removeItem,
				increaseAmount,
				decreaseAmount,
				addToCart,
				clearCart,
			}}>
			{children}
		</CartContext.Provider>
	)
}

export { CartContext, CartProvider }
