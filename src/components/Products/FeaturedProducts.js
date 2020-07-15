import React, { useContext } from 'react'

import { ProductsContext } from '../../context/products'
import Loading from '../Loading'
import ProductList from './ProductList'

const FeaturedProducts = () => {
	console.log(useContext(ProductsContext))
	const { loading, featured } = useContext(ProductsContext)

	if (loading) {
		return <Loading />
	}
	return <ProductList title='featured products' products={featured} />
}

export default FeaturedProducts
