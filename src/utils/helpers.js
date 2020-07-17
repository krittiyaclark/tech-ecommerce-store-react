import url from './URL'

// flatten
export const flatternProducts = (data) => {
	return data.map((item) => {
		// cloudinary
		let image = item.image.url
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
