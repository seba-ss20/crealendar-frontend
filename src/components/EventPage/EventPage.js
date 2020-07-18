import React, { Component } from 'react';
import EventDetail from './EventDetail'
//import Typography from '@material-ui/core/Typography';
//import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {eventPageURL} from '../../config';
import UserHeader from "../UserHeader";



class EventPage extends Component<Props, State> {
	constructor(props) {
		super(props);
		this.state = { event: null, loading: true, error: false };
	}
	
	//async getEventData() {
		//const match = this.props;
	//	const id = "5ef8a9626d39d91c4c6d8034"//match.params.id;
	//	try {
	//		const data = await axios.get('http://localhost:3001/events', {"_id":id})
	//		console.log(data);
	//		this.setState({data, loading:false});
	//	} catch(error) {
	//		console.log(error);
	//	}
	//}
	
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
				<EventDetail eventData={this.state.event} />
			</div>
		)
	}
}

export default withRouter(EventPage);