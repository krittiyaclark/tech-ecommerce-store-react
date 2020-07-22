import React, { useContext } from 'react'

import { ProductsContext } from '../context/products'

import Loading from '../components/Loading'
import Filters from '../components/Products/Filters'
import PaginateProducts from '../components/Products/PaginateProducts'

const Products = () => {
	const { loading, sorted } = useContext(ProductsContext)
	// console.log(products)

	if (loading) {
		return <Loading />
	}

	return (
		<>
			<Filters />
			<PaginateProducts />
		</>
	)
}

export default Products
