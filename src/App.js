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
import {DiscoverNewEventsView} from "./views/DiscoverNewEventsView";
import ls from 'local-storage'
import Settings from "./components/Settings";
import AccountSetupView from "./views/AccountSetupView";
import SettingsView from "./views/SettingsView";
import {UpcomingEventsView} from "./views/UpcomingEventsView";


class App extends Component {
	constructor() {
		super();
	}

	render() {
		let routes = [
			<Route path="/login" key="/login" component={UserLoginView} />,
			<Route path="/signup" key="/signup" component={UserSignupView} />,
			<Route path="/user" key="/user" component={UserPage} />,
			<Route path="/setup" key="/setup" component={AccountSetupView} />,
			<Route path="/settings" key="/settings" render={(props) => <SettingsView {...props} /> }  />,
			<Route path="/createEvent" key="/createEvent" component={EventFormPageView} />,
			<Route path="/edit/:id" key="/editEvent" render={(props) => <EventFormPageView {...props} /> }/>,
			<Route path="/organizer" key="/organizer" component={OrganizerPage} />,
			<Route path="/events/:id" key="/events" render={(props) => <EventPage {...props} /> } />,
			<Route path="/createPromotion" key="/createPromotion" component={PromotionFormPageView} />,
			<Route path="/editPromotion/:id" key="/editPromotion" render={(props) => <PromotionFormPageView {...props} /> }/>,
			<Route path="/discoverEvents" key="/discoverEvents" component={DiscoverNewEventsView} />,
			<Route path="/upcomingEvents" key="/upcomingEvents" component={UpcomingEventsView} />,
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
