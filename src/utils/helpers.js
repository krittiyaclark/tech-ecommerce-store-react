import url from './URL'

// flatten
export const flatternProducts = (data) => {
	return data.map((item) => {
		// cloudinary
		let image = (item.image && item.image.url) || null
		// local setup no deployment

		// let image = `${url}${item.image.url}`
		return { ...item, image }
	})
}

// helper functions
export const featuredProducts = (data) => {
	return data.filter((item) => {
		return item.featured === true
	})
}

// paginate
export const paginate = (products) => {
	// Array products passed by setSorted(paginate(products)) from Context/products.js
	const itemsPerPage = 4
	const numberOfPages = Math.ceil(products.length / itemsPerPage)
	const newProducts = Array.from({ length: numberOfPages }, () => {
		return products.splice(0, itemsPerPage)
	})
	console.log(newProducts)
	return newProducts
}
