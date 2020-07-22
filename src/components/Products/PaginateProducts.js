import React, { useContext } from 'react'

import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'

import { ProductContext, ProductsContext } from '../../context/products'
import ProductList from './ProductList'

const PaginateProducts = () => {
	const { sorted, page, changePage } = useContext(ProductsContext)

	return <ProductList products={sorted} />
}

export default PaginateProducts
