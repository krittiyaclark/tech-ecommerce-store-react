import React, { useState, useEffect } from 'react'

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
	// ScrollButton
	const [height, setHeight] = useState(0)

	useEffect(() => {
		window.addEventListener('scroll', () => {
			setHeight(window.pageYOffset)
		})
		// Clean up
		return () => window.removeEventListener('scroll', () => {})
	})

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

	const [alert, setAlert] = useState({
		show: false,
		msg: '',
		type: 'success',
	})

	const showAlert = ({ msg, type = 'success' }) => {
		setAlert({ show: true, msg, type })
	}

	const hideAlert = () => {
		setAlert({ ...alert, show: false })
	}

	return (
		<UserContext.Provider
			value={{
				user,
				userLogin,
				userLogout,
				alert,
				showAlert,
				hideAlert,
				height,
			}}>
			{children}
		</UserContext.Provider>
	)
}

export { UserContext, UserProvider }
