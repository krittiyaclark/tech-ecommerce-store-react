import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

// Strapi function
import loginUser from '../strapi/loginUser'
import registerUser from '../strapi/registerUser'
// handle user
import { UserContext } from '../context/user'

const Login = () => {
	const history = useHistory()

	// setup user context

	// state values
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [username, setUsername] = useState('default')
	const [isMember, setIsMember] = useState(true)

	let isEmpty = !email || !password || !username

	const toggleMember = () => {
		setIsMember((prevMember) => {
			let isMember = !prevMember
			isMember ? setUsername('default') : setUsername('')
			return isMember
		})
	}

	const handleSubmit = async (event) => {
		// alert
		event.preventDefault()
		let response
		if (isMember) {
			response = await loginUser({ email, password })
		} else {
			response = await registerUser({ email, password, username })
		}
		if (response) {
			//
			console.log('success')
			console.log(response)
		} else {
			// show alert
		}
	}

	return (
		<section className='form section'>
			<h2 className='section-title'>{isMember ? 'sign in' : 'register'}</h2>
			<form className='login-form'>
				{/* single input */}
				<div className='form-control'>
					<label htmlFor='email'>email</label>
					<input
						type='email'
						id='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				{/* end of single input */}
				{/* single input */}
				<div className='form-control'>
					<label htmlFor='password'>password</label>
					<input
						type='password'
						id='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				{/* end of single input */}
				{/* single input */}
				{!isMember && (
					<div className='form-control'>
						<label htmlFor='username'>username</label>
						<input
							type='text'
							id='username'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
				)}
				{/* end of single input */}
				{/* empty form text */}
				{isEmpty && (
					<p className='form-empty'>please fill out all form fields</p>
				)}
				{/* submit btn */}
				{!isEmpty && (
					<button
						type='submit'
						className='btn btn-block btn-primary'
						onClick={handleSubmit}>
						submit
					</button>
				)}
				{/* register link */}
				<p className='register-link'>
					{isMember ? 'need to register' : 'already a member'}
					<button type='button' onClick={toggleMember}>
						click here
					</button>
				</p>
			</form>
		</section>
	)
}

export default Login
