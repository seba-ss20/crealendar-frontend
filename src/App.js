import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header'
import {UserLoginView} from './views/UserLoginView'
import {UserSignupView} from './views/UserSignupView'
import history from './router/history';
import UserPage from './components/UserPage'
import OrganizerPage from "./components/OrganizerPage";
import Welcome from "./components/Welcome";
import AccountSetup from "./components/AccountSetup";
import EventPage from "./components/EventPage/EventPage";
import {EventFormPageView} from "./views/EventFormPageView";
import {PromotionFormPageView} from "./views/PromotionFormPageView";
import ls from 'local-storage'


class App extends Component {
	constructor() {
		super();
	}

	render() {
		let routes = [
			<Route path="/login" key="/login" component={UserLoginView} />,
			<Route path="/signup" key="/signup" component={UserSignupView} />,
			<Route path="/user" key="/user" component={UserPage} />,
			<Route path="/setup" key="/setup" component={AccountSetup} />,
			<Route path="/createEvent" key="/createEvent" component={EventFormPageView} />,
			<Route path="/edit/:id" key="/editEvent" render={(props) => <EventFormPageView {...props} /> }/>,
			<Route path="/organizer" key="/organizer" component={OrganizerPage} />,
			<Route path="/events/:id" key="/events" component={EventPage} />,
			<Route path="/createPromotion" key="/createPromotion" component={PromotionFormPageView} />,
			<Route path="/edit/:id" key="/editPromotion" render={(props) => <PromotionFormPageView {...props} /> }/>,
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
