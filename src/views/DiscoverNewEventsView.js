import React from 'react';
import { EventList } from '../components/EventList';
import EventService from '../services/EventService';
import ls from 'local-storage'
import UserHeader from "../components/UserHeader";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";


const root = {
        display: 'flex',
        marginTop: '100px'
};
const paperTop = {
        position:'relative',
        borderStyle:'groove',
        marginTop: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
};

export class DiscoverNewEventsView extends React.Component {

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
        let user = ls.get('userObject');
        EventService.getAllEvents(user['_id']).then((data) => {
            this.setState({
                data: [...data],
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });
    }

    async removeEvent(id) {

    }


    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (
            <div style={root}>
                <UserHeader history={this.props.history}/>
                <Grid container spacing={3}>
                    <Grid item xs={11} >
                        <div style={paperTop}>

                            <Typography variant="h5" > Available Events</Typography>
                            <EventList data={this.state.data} onDelete={(id) => this.removeEvent(id)} />

                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}