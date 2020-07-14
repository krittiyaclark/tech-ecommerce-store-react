import React, { useContext } from 'react'

import { ProductsContext } from '../context/products'

import Loading from '../components/Loading'
import ProductList from '../components/Products/ProductList'

const Products = () => {
	const { loading, products } = useContext(ProductsContext)
	console.log(products)

	if (loading) {
		return <Loading />
	}

	return <ProductList title='our products' products={products} />
}

export default Products
