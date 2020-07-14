import React, { useState, useEffect } from 'react'
import axios from 'axios'

import url from '../utils/URL'

export const ProductsContext = React.createContext()

// Provider, Consumer, useContext()
const ProductsProvider = ({ children }) => {
	// const greeting = 'hello'
	// const products = { id: 1, title: 'Products' }
	const [loading, setLoading] = React.useState(false)
	const [products, setProducts] = React.useState([])
	const [featured, setFeatured] = React.useState([])

	useEffect(() => {
		setLoading(true)
		axios.get(`${url}/products`).then((response) => {
			setProducts(response.data)
			setLoading(false)
		})
		return () => {}
	}, [])

	return (
		<ProductsContext.Provider value={{ loading, products, featured }}>
			{children}
		</ProductsContext.Provider>
	)
	// <div></div>
}

export default ProductsProvider
