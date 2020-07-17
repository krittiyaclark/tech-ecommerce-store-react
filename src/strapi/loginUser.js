import axios from 'axios'

import url from '../utils/URL'

const loginUser = async function ({ email, password, username }) {
	const response = await axios
		.post(`${url}/auth/local`, {
			identifier: email,
			password,
		})
		.catch((error) => console.log(error))
	return response
}

export default loginUser
