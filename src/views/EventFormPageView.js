import EventFormPage from '../components/EventFormPage'
import EventService from '../services/EventService';
import React from 'react';
import ls from 'local-storage'


export class EventFormPageView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount(){
        if(this.props.history.location.pathname === '/createEvent') {
            this.setState({
                loading: false,
                event: undefined,
                error: undefined
            });
        }
        else if(this.props.location.state !== undefined && this.props.location.state.event !== undefined) {
            this.setState({
                loading: false,
                event: this.props.location.state.event,
                error: undefined
            });
        }
        else {
            this.setState({
                loading: true,
                error: undefined
            });

            let id = this.props.match.params.id;
            EventService.getEvent(id).then((data) => {
                this.setState({
                    event: data,
                    loading: false,
                    error: undefined
                });
            }).catch((e) => {
                console.error(e);
            });
        }
    }

    async updateEvent(event) {
        if(this.state.event === undefined) {
            try {
                let user = ls.get('userObject');
                let userId = user['_id'];
                event.owner = userId;
                let ret = await EventService.createEvent(userId,event);
                this.props.history.push('/organizer');
            } catch(err) {
                console.error(err);
                this.setState(Object.assign({}, this.state, {error: 'Error while creating event'}));
            }
        } else {
            try {
                let ret = await EventService.updateEvent(event);
                this.props.history.goBack();
            } catch(err) {
                console.error(err);
                this.setState(Object.assign({}, this.state, {error: 'Error while updating event'}));
            }
        }
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (<EventFormPage event={this.state.event} onSubmit={(event) => this.updateEvent(event)} error={this.state.error} />);
    }
}