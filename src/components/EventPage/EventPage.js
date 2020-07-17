import React, { Component } from 'react';
import EventDetail from './EventDetail'
//import Typography from '@material-ui/core/Typography';
//import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {eventPageURL} from '../../config';



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
        //this.getEventData();
		//const match = this.props;
		const id = "5f10a7349657c73248d9d01a"//match.params.id;
		axios.get(eventPageURL + '/events', { params: {"_id":id} }).then(response => {
			//console.log(response.data)
			//console.log(res.data)
			//let data = res.data
			//console.log(res)
			//console.log(data)
			this.setState({event:response.data, loading:false})
			//console.log(this.state.event.name)
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
				<EventDetail eventData={this.state.event} />
			
		)
	}
}

export default withRouter(EventPage);