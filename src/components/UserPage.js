import React, {Component, useEffect} from 'react';
import { makeStyles , useTheme} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { withRouter } from 'react-router-dom';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import {Calendar,momentLocalizer} from 'react-big-calendar';
// import 'react-calendar/dist/Calendar.css'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";

import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import logo from "../images/logo_withbackground.jpg";
import Button from "@material-ui/core/Button";
import UserHeader from "./UserHeader";
import UserService from "../services/UserService";
import EventService from "../services/EventService";
import ls from 'local-storage';

const localizer = momentLocalizer(moment)



const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    logo: {
        maxWidth: 160,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        background: '#69d0c3',
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        marginTop: theme.spacing(7),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    large: {
        margin:'auto',
        width: theme.spacing(11),
        height: theme.spacing(11),
    },
    centralize: {
        margin:'auto',
    },
    centralize_calendar: {
        marginTop: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin:'auto',
    },
    nested: {
        paddingLeft: theme.spacing(2),
    },
}));

function UserPage (props) {

    let user = ls.get('userObject');
    let user_username = user['username'];
    const classes = useStyles();
    const theme = useTheme();

    const [appBarOpen, setAppBarOpen] = React.useState(false);
    const [upcomingEventsOpen, setUpcomingEventsOpen] = React.useState(false);
    const [discoverEventsOpen, setDiscoverEventsOpen] = React.useState(false);
    const [calendarUploaded, setCalendarUploaded] = React.useState({uploaded:false,uploadDate:''});

    const [events, setEvents] = React.useState([
    {
        start: moment().toDate(),
        end: moment()
            .add(1, "days")
            .toDate(),
        title: "Some title"
    }
    ]);
    useEffect(()=>{
        UserService.getUser(user_username)
            .then(response => {
                console.log(response);
                // setShowNearMe(response.showNearMe);
                setCalendarUploaded(response.calendar);

            });

        EventService.getEvents(user['_id'])
            .then(response => {
                let event_arr = [];
                response.map(event => {

                    let start = moment(new Date(event.dateStart));
                    let end = moment(new Date(event.dateEnd));
                    let title = event.name;
                    console.log('start');
                    console.log(start);
                    console.log('end');
                    console.log(end);
                    event_arr.push({
                        start: start,
                        end: end,
                        title: title,
                    })

                });
                setEvents(event_arr);
                console.log(response);
            });
    },[]);
    const handleClick = () => { setUpcomingEventsOpen(!upcomingEventsOpen ); };
    const handleDiscoverClick = () => { setDiscoverEventsOpen(!discoverEventsOpen ); };
    const handleDrawerOpen = () => { setAppBarOpen(true); };
    const handleDrawerClose = () => { setAppBarOpen(false); };
    let preventDefault;
    const defaultProps = {
        bgcolor: 'background.paper',
        m: 1,
        style: { width: '5rem', height: '5rem' },
        borderColor: 'text.primary',
    };
    let calendar;
    if(!calendarUploaded.uploaded) {
        calendar = <main
            className={clsx(classes.content, {
                [classes.contentShift]: appBarOpen,
            })}
        >
            <div className={classes.drawerHeader}>
                <Container component="main" maxWidth="xs">
                    You have not added your leisure times or interests yet.
                    <Divider/>
                {/*<Link href="/setup" onClick={preventDefault} >*/}
                <Link href="/setup" onClick={preventDefault} >
                    {'Click here to setup your account'}
                    </Link>
                </Container>
            </div>
        </main>
    }
    else {
        calendar = <main
            className={clsx(classes.content, {
                [classes.contentShift]: appBarOpen,
            })}
        >
            <div className={classes.drawerHeader} />
            <Container component="main" maxWidth="xs">
                <div >
                    {/*<Grid item xs={12}>*/}

                    <Calendar
                        localizer={localizer}
                        defaultDate={new Date()}
                        defaultView="month"
                        events={events}
                        style={{position: "relative", height: "100vh",width: "70vh"}}
                    />
                    {/*</Grid>*/}
                </div>

            </Container>
        </main>
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <UserHeader history={props.history}/>
            {calendar}
        </div>
    );

    // const classes = useStyles();
    //
	// 	return (
	// 		<Container component="main" maxWidth="xs">
    //                     <CssBaseline />
    //                     <div className={classes.paper}>
    //                         succesfull login
    //         			</div>
    //         		</Container>
	// 	)

}

export default withRouter(UserPage)