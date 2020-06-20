import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header'
import {UserLoginView} from './views/UserLoginView'
import {UserSignupView} from './views/UserSignupView'
import history from './router/history';
import { goToLoginPage } from './router/functions'
import UserPage from './components/UserPage'


class App extends Component {
	render() {
		let routes = [
			<Route path="/login" key="/login" component={UserLoginView} />,
			<Route path="/signup" key="/signup" component={UserSignupView} />,
			<Route path="/user" key="/user" component={UserPage} />,
		];
		
		return (
			<div>
				<Router history={history}>
					<Header/>
					<Switch>{routes}</Switch>
				</Router>
			</div>
		)
	}
}

export default App
