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
import SettingsIcon from '@material-ui/icons/Settings';
import Avatar from '@material-ui/core/Avatar';
import EventIcon from '@material-ui/icons/Event';
import Link from '@material-ui/core/Link';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Badge from '@material-ui/core/Badge';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {Calendar,momentLocalizer} from 'react-big-calendar';
import UserService from "../services/UserService";
// import 'react-calendar/dist/Calendar.css'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";

import Collapse from '@material-ui/core/Collapse';

import Box from '@material-ui/core/Box';
import logo from "../images/logo_withbackground.jpg";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ls from 'local-storage';
import Tooltip from "@material-ui/core/Tooltip";
import {baseURL,eventURL} from "../config";
import EventService from "../services/EventService";
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
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    imageInput:{
        margin:'auto',
        display: 'none',
    },
}));

// TODO:: Find an OOP variant for Organizer/User headers-inheritance.

function UserHeader(props) {
    const classes = useStyles();
    const theme = useTheme();
    let user=ls.get('userObject');
    let initAvatar;
    if(user['avatar'] !== undefined){
        console.log('avatar');
        console.log(user['avatar']);
        initAvatar = user.avatar;
    }
    else{
        console.log('AVATAR IS NULL');
    }

    const [appBarOpen, setAppBarOpen] = React.useState(false);
    const [upcomingEventsOpen, setUpcomingEventsOpen] = React.useState(false);
    const [discoverEventsOpen, setDiscoverEventsOpen] = React.useState(false);
    const [selectedAvatar, setSelectedAvatar]  = React.useState(initAvatar);
    const [selectedAvatarBinary, setSelectedAvatarBinary]  = React.useState(null);
    const [events, setEvents] = React.useState([
        {
            start: moment().toDate(),
            end: moment()
                .add(1, "days")
                .toDate(),
            title: "Some title"
        }
    ]);
    const [discoverableEvents, setDiscoverableEvents] = React.useState([
        {
            start: moment().toDate(),
            end: moment()
                .add(1, "days")
                .toDate(),
            title: "Some title"
        }
    ]);
    const [calendarUploaded, setCalendarUploaded] = React.useState(true);
    useEffect(()=>{
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

                    event_arr.sort(function(a,b){
                        return new Date(b.start) - new Date(a.start);
                    });
                });
                setEvents(event_arr);
                console.log(response);
            });
        EventService.getAllEvents(user['_id'])
            .then((data) => {
                let d_events = [];
                for(let i = 0 ; i < data.length; i++){
                    let isOwner = data[i].owner === user['_id']
                    let isParticipant = data[i].participants !== undefined && data[i].participants.includes(user['_id']);
                    let start = moment(new Date(data[i].dateStart));
                    let end = moment(new Date(data[i].dateEnd));
                    let title = data[i].name;
                    if(!(isOwner || isParticipant)){
                        d_events.push({
                            start: start,
                            end: end,
                            title: title,
                        });
                    }
                }
                d_events.sort(function(a,b){
                    return new Date(b.start) - new Date(a.start);
                });
                setDiscoverableEvents(d_events);
            });
    },[]);

    // const { match, location, history } = this.props
    const handleClick = () => { setUpcomingEventsOpen(!upcomingEventsOpen ); };
    const handleDiscoverClick = () => { setDiscoverEventsOpen(!discoverEventsOpen ); };
    const handleDrawerOpen = () => { setAppBarOpen(true); };
    const handleDrawerClose = () => { setAppBarOpen(false); };
    let preventDefault;
    const menuId = 'primary-search-account-menu';


    const defaultProps = {
        bgcolor: 'background.paper',
        m: 1,
        style: { width: '5rem', height: '5rem' },
        borderColor: 'text.primary',
    };
    function logout() {
        UserService.logout();
        props.history.push('/');
    }

    function handleAvatarUpload(event) {
        let file = event.target.files[0];
        setSelectedAvatarBinary(file);
        const reader = new FileReader();
        let url = reader.readAsDataURL(file);
        reader.onloadend = function(e) {
            setSelectedAvatar(reader.result);
        };
        UserService.addAvatar(user['username'],file)
            .then(data => {
                console.log('Success');
                console.log(data);
            })
            .catch(reason => {
                console.log('Fail');
                console.log(reason);
            });
    }

    function settings() {
        props.history.push('/settings');
    }

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={clsx(classes.appBar, {
                [classes.appBarShift]: appBarOpen,
            })}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, appBarOpen && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <img src={logo} alt="logo" className={classes.logo}/>
                    <Typography variant="title" color="inherit" style={{ flex: 1 }}>

                    </Typography>
                    {/*<Button component= {Link} to='/login' color="inherit" className={classes.rightButton}>Login</Button>*/}
                    {/*<Button component= {Link} to='/signup' color="inherit" className={classes.rightButton}>Sign Up</Button>*/}
                    <div className={classes.sectionDesktop}>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            // onClick={}//handleProfileMenuOpen
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <IconButton aria-label="show 4 new mails" color="inherit">
                            <SettingsIcon
                                onClick={settings}
                            />
                        </IconButton>
                        <IconButton color="inherit">
                            <ExitToAppIcon
                                color="inherit"
                                onClick={logout}
                            />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>

            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={appBarOpen}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />

                <ListItem button alignItems>
                    <input
                        accept="image/*"
                        className={classes.imageInput}
                        id="avatar-button-file"
                        type="file"
                        onChange={(event) => {
                            handleAvatarUpload(event);
                        }}
                    />
                    <label htmlFor="avatar-button-file"
                    className={classes.centralize}>
                        <Tooltip title="Click to upload avatar!" placement="top">
                            <Avatar
                                alt={user['username']}
                                src={selectedAvatar !== null ? `${baseURL}/avatars/`+user['username'] : ''}
                                className={classes.large}
                            />
                        </Tooltip>
                    </label>
                </ListItem>
                <ListItem>
                    <Link href="#" onClick={preventDefault} className={classes.centralize}>
                        {user['firstname'] + ' ' + user['lastname'] }
                    </Link>
                </ListItem>
                <Divider />
                <List>
                    <ListItem button onClick={handleClick}>
                        <ListItemIcon>
                            <EventAvailableIcon />
                        </ListItemIcon>
                        <ListItemText primary="Upcoming Events" />
                        {upcomingEventsOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={upcomingEventsOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem className={classes.nested}>
                                <List>
                                    {events.map((event, index) => (
                                        index <5 ?
                                                <ListItem button alignItems="flex-start">
                                                    <ListItemAvatar>
                                                        <Avatar alt={event.title} src="/static/images/avatar/3.jpg" />
                                                    </ListItemAvatar>

                                                    <ListItemText
                                                        primary={event.title}
                                                        secondary={
                                                                <Typography
                                                                    component="span"
                                                                    variant="body2"
                                                                    className={classes.inline}
                                                                    color="textPrimary"
                                                                >
                                                                    {event.start.toString()}
                                                                </Typography>
                                                        }
                                                    />
                                                </ListItem>
                                        : <div className={classes.hide}/>


                                        ))}
                                    <Link href="#" onClick={() => props.history.push('/upcomingEvents')} className={classes.centralize}>
                                        {'Click to see all upcoming events.'}
                                    </Link>
                                </List>

                            </ListItem>

                        </List>
                    </Collapse>

                </List>
                <Divider />
                <List>
                    <p className={classes.centralize}> Discover New Events!</p>
                    <ListItem button onClick={handleDiscoverClick}>
                        <ListItemIcon>
                            <EventAvailableIcon />
                        </ListItemIcon>
                        <ListItemText primary="Discover Events" />
                        {discoverEventsOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={discoverEventsOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem className={classes.nested}>
                                <List>
                                    {discoverableEvents.map((event, index) => (
                                        index < 5 ?
                                            <ListItem button alignItems="flex-start">
                                            <ListItemAvatar>
                                            <Avatar alt={event.title} src="/static/images/avatar/3.jpg" />
                                            </ListItemAvatar>

                                            <ListItemText
                                            primary={event.title}
                                            secondary={
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    className={classes.inline}
                                                    color="textPrimary"
                                                >
                                                    {event.start.toString()}
                                                </Typography>
                                            }
                                            />
                                            </ListItem>
                                        : <div className={classes.hide}/>
                                    ))}
                                    <Link href="#" onClick={() => props.history.push('/discoverEvents')} className={classes.centralize}>
                                        {'Click to discover all relevant events.'}
                                    </Link>
                                </List>

                            </ListItem>

                        </List>
                    </Collapse>
                </List>
            </Drawer>
        </div>
    )
}

export default UserHeader;