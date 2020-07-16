import React from 'react';
import { EventList } from '../components/EventList';
import EventService from '../services/EventService';

export class EventListView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
        };
    }

    componentWillMount(){
        this.setState({
            loading: true
        });
        //TODO: pass user object
        let userId = "5f0f7bd81957a912e83a5cbf";
        EventService.getEventsByOwnerId(userId).then((data) => {
            this.setState({
                data: [...data],
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });
    }

    async removeEvent(id) {
        this.setState({
            data: [...this.state.data],
            loading: true
        });

        try {
            let ret = await EventService.deleteEvent(id);
            let eventIndex = this.state.data.map(event => event['_id']).indexOf(id);
            let events = this.state.data;
            events.splice(eventIndex, 1);
            this.setState({
                data: [...events],
                loading: false
            });
        } catch(err) {
            console.error(err);
        }
    }


    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        if (Array.isArray(this.state.data) && !this.state.data.length) {
            return (<h4>It seems that you do not organize an event yet. To create new one, click "Create Event" button.</h4>);
        }

        return (
            <EventList data={this.state.data} onDelete={(id) => this.removeEvent(id)} />
        );
    }
}