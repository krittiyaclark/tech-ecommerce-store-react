import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import ProductsProvider from './context/products'
import { CartProvider } from './context/cart'
import { UserProvider } from './context/user'

ReactDOM.render(
	<UserProvider>
		<ProductsProvider>
			<CartProvider>
				<App />
			</CartProvider>
		</ProductsProvider>
	</UserProvider>,
	document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
