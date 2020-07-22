import React, { useState, useEffect } from 'react'
import axios from 'axios'

import url from '../utils/URL'
import { featuredProducts, flatternProducts, paginate } from '../utils/helpers'

export const ProductsContext = React.createContext()

// Provider, Consumer, useContext()
const ProductsProvider = ({ children }) => {
	// const greeting = 'hello'
	// const products = { id: 1, title: 'Products' }
	const [loading, setLoading] = useState(false)
	const [products, setProducts] = useState([])
	const [featured, setFeatured] = useState([])
	// extra state values
	const [sorted, setSorted] = useState([])
	const [page, setPage] = useState(0)
	const [filters, setFilters] = useState({
		search: '',
		category: 'all',
		shipping: false,
		price: 'all',
	})

	const changePage = (index) => {
		console.log(index)
	}

	const updateFilters = (event) => {
		console.log(event)
	}

	useEffect(() => {
		setLoading(true)
		axios.get(`${url}/products`).then((response) => {
			const featured = featuredProducts(flatternProducts(response.data))
			const products = flatternProducts(response.data)
			setSorted(paginate(products))
			setProducts(products)
			setFeatured(featured)
			setLoading(false)
		})
		return () => {}
	}, [])

	return (
		<ProductsContext.Provider
			value={{
				loading,
				products,
				featured,
				sorted,
				page,
				filters,
				changePage,
				updateFilters,
			}}>
			{children}
		</ProductsContext.Provider>
	)
	// <div></div>
}

export default ProductsProvider
