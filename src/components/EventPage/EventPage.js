import React, { Component } from 'react';
import EventDetail from './EventDetail'
//import Typography from '@material-ui/core/Typography';
//import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {eventPageURL} from '../../config';
import UserHeader from "../UserHeader";
import ls from "local-storage";
import EventService from "../../services/EventService";
import {sha256} from "js-sha256";



class EventPage extends Component<Props, State> {
	constructor(props) {
		super(props);
		this.state = { event: null, loading: true, error: false };
	}
	
	componentDidMount() {
		const id = this.props.match.params.id;
		axios.get(eventPageURL + '/events', { params: {"_id":id} }).then(response => {
			this.setState({event:response.data, loading:false})
		})
		.catch(err => {
			this.setState({loading: false, error: true});
			console.error(err);
		})
    }

	async addToCalendar(event) {
		try {
				console.log('Adding event to user');
				console.log(event);
				let user = ls.get('userObject');
				let userId = user['_id'];
				event.owner = userId;
				delete event._id;
				let ret = await EventService.participateEvent(userId,event);
				this.props.history.push('/user');
			} catch(err) {
				console.error(err);
				this.setState(Object.assign({}, this.state, {error: 'Error while creating event'}));
			}

	}
	
	
	render() {
		if (this.state.loading) {
			return(
				<div>
					<p> Loading... </p>
				</div>
			)
		}
		if (this.state.error || !this.state.event) {
			return(
				<div>
					<p>{this.state.event}</p>
				</div>
			)
		}
		return (
			<div>
			    <UserHeader history={this.props.history}/>
				<EventDetail eventData={this.state.event} onAddtoCalendar={(event) => this.addToCalendar(event)} />
			</div>
		)
	}
}

export default withRouter(EventPage);