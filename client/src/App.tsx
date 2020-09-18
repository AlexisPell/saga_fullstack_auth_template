import React, { useEffect } from 'react'
import './App.scss'
import { Switch } from 'react-router-dom'
import store from './redux/store'
import { keepLogged } from './redux/actions/auth'
import PrivateRoute from './routing/PrivateRoute'

const App = () => {
	useEffect(() => {
		store.dispatch(keepLogged())
	}, [])

	return (
		<div className='app'>
			<h1>Hello!</h1>
			<h2>my app</h2>
			<Switch></Switch>
		</div>
	)
}

export default App
