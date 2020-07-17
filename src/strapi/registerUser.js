import axios from 'axios'

import url from '../utils/URL'

const registerUser = async function ({ email, password, username }) {
	const response = await axios
		.post(`${url}/auth/local/register`, {
			username,
			email,
			password,
		})
		.catch((error) => console.log(error))
	return response
}

export default registerUser
