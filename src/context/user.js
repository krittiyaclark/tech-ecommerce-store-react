import React, { useState } from 'react'

const UserContext = React.createContext()

function getUserFromLocalStorage() {
	return localStorage.getItem('user')
		? JSON.parse(localStorage.getItem('user'))
		: { username: null, token: null }
}

const UserProvider = ({ children }) => {
	// const [user, setUser] = useState({
	// 	userName: null,
	// 	token: null,
	// })
	const [user, setUser] = useState(getUserFromLocalStorage())

	// get user object
	const userLogin = (user) => {
		setUser(user)
		localStorage.setItem('user', JSON.stringify(user))
	}

	const userLogout = () => {
		setUser({
			username: null,
			token: null,
		})
		localStorage.removeItem('user')
	}

	return (
		<UserContext.Provider value={{ user, userLogin, userLogout }}>
			{children}
		</UserContext.Provider>
	)
}

export { UserContext, UserProvider }
