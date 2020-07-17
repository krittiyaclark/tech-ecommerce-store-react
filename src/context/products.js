import React, { useState, useEffect } from 'react'
import axios from 'axios'

import url from '../utils/URL'
import { featuredProducts, flatternProducts } from '../utils/helpers'

export const ProductsContext = React.createContext()

// Provider, Consumer, useContext()
const ProductsProvider = ({ children }) => {
	// const greeting = 'hello'
	// const products = { id: 1, title: 'Products' }
	const [loading, setLoading] = useState(false)
	const [products, setProducts] = useState([])
	const [featured, setFeatured] = useState([])

	useEffect(() => {
		setLoading(true)
		axios.get(`${url}/products`).then((response) => {
			const featured = featuredProducts(flatternProducts(response.data))
			const products = flatternProducts(response.data)
			setProducts(products)
			setFeatured(featured)
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
