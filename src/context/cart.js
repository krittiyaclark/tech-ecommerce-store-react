import React, { useState, useEffect } from 'react'
// import localCart from '../utils/localCart'

const getCartFormLocalStorage = () => {
	return localStorage.getItem('cart')
		? JSON.parse(localStorage.getItem('cart'))
		: []
}
const CartContext = React.createContext()

const CartProvider = ({ children }) => {
	const [cart, setCart] = useState(getCartFormLocalStorage)
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
		let newCart = [...cart].filter((item) => item.id !== id)
		setCart(newCart)
		// setCart([...cart].filter((item) => item.id !== id))
	}
	//  Increase Amount
	const increaseAmount = (id) => {
		const newCart = [...cart].map((item) => {
			return item.id === id ? { ...item, amount: item.amount + 1 } : { ...item }
		})
		setCart(newCart)
	}
	//  decrease Amount
	const decreaseAmount = (id, amount) => {
		if (amount === 1) {
			removeItem(id)
			return
		} else {
			const newCart = [...cart].map((item) => {
				return item.id === id
					? { ...item, amount: item.amount - 1 }
					: { ...item }
			})
			setCart(newCart)
		}
	}

	//  addToCart
	const addToCart = (product) => {
		const { id, image, title, price } = product
		// find if it already in the cart
		const item = [...cart].find((item) => item.id === id)
		// if it already in the cart, increaseAmount
		if (item) {
			increaseAmount(id)
			return
		} else {
			const newItem = { id, image, title, price, amount: 1 }
			const newCart = [...cart, newItem]
			setCart(newCart)
		}
	}
	//  clearCart
	const clearCart = () => {
		setCart([])
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
