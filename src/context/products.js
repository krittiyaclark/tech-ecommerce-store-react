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
		setPage(index)
	}

	const updateFilters = (event) => {
		const type = event.target.type
		const filter = event.target.name
		const value = event.target.value

		let filterValue
		if (type === 'checkbox') {
			filterValue = event.target.checked
		} else if (type === 'radio') {
			value === 'all' ? (filterValue = value) : (filterValue = parseInt(value))
		} else {
			filterValue = value
		}
		console.log(type, filter, value)
		setFilters({
			...filters,
			[filter]: filterValue,
		})
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

	// filter
	useEffect(() => {
		let newProducts = [...products].sort((a, b) => a.price - b.price)
		const { search, category, shipping, price } = filters
		// logic
		if (category !== 'all') {
			newProducts = newProducts.filter((item) => item.category === category)
		}
		if (shipping !== false) {
			newProducts = newProducts.filter(
				(item) => item.free_shipping === shipping
			)
		}
		if (price !== 'all') {
			newProducts = newProducts.filter((item) => {
				if (price === 0) {
					return item.price < 300
				} else if (price === 300) {
					return item.price > 300 && item.price < 650
				} else {
					return item.price > 650
				}
			})
		}
		if (search !== '') {
			newProducts = newProducts.filter((item) => {
				let title = item.title.toLowerCase().trim()
				return title.startsWith(search) ? item : null
			})
		}
		setPage(0)
		setSorted(paginate(newProducts))
	}, [filters, products])

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
