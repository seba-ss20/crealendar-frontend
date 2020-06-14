import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header'
import SidebarLogo from './components/SidebarLogo'
import Login from './components/Login'
import Signup from './components/Signup'

import history from './router/history';
import { goToLoginPage } from './router/functions'

class App extends Component {
	render() {
		let routes = [
			<Route path="/login" key="/login" component={Login} />,
			<Route path="/signup" key="/signup" component={Signup} />
		];
		
		return (
			<div>
				<Router history={history}>
					<Header />
					<Switch>{routes}</Switch>
				</Router>
			</div>
		)
	}
}

export default App
