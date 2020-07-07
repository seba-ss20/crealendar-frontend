import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header'
import {UserLoginView} from './views/UserLoginView'
import {UserSignupView} from './views/UserSignupView'
import history from './router/history';
import { goToLoginPage } from './router/functions'
import UserPage from './components/UserPage'
import OrganizerPage from "./components/OrganizerPage";
import Welcome from "./components/Welcome";
import AccountSetup from "./components/AccountSetup";


class App extends Component {
	render() {
		let routes = [
			<Route path="/login" key="/login" component={UserLoginView} />,
			<Route path="/signup" key="/signup" component={UserSignupView} />,
			<Route path="/user" key="/user" component={UserPage} />,
			<Route path="/setup" key="/setup" component={AccountSetup} />,
			<Route path="/organizer" key="/organizer" component={OrganizerPage} />,
			<Route path="/" key="/welcome" component={Welcome} />,
		];
		
		return (
			<div>
				<Router history={history}>
					<Switch>{routes}</Switch>
				</Router>
			</div>
		)
	}
}

export default App
