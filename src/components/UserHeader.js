import React, {Component} from 'react';
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
// import 'react-calendar/dist/Calendar.css'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";

import Collapse from '@material-ui/core/Collapse';

import Box from '@material-ui/core/Box';
import logo from "../images/logo_withbackground.jpg";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
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
}));

// const propTypes = {
//     match: PropTypes.object.isRequired,
//     location: PropTypes.object.isRequired,
//     history: PropTypes.object.isRequired
// }
function UserHeader(props) {
    const classes = useStyles();
    const theme = useTheme();

    const [appBarOpen, setAppBarOpen] = React.useState(false);
    const [upcomingEventsOpen, setUpcomingEventsOpen] = React.useState(false);
    const [discoverEventsOpen, setDiscoverEventsOpen] = React.useState(false);
    const [calendarUploaded, setCalendarUploaded] = React.useState(true);

    const [events, setEvents] = React.useState([
        {
            start: moment().toDate(),
            end: moment()
                .add(1, "days")
                .toDate(),
            title: "Some title"
        }
    ]);
    // const { match, location, history } = this.props
    const handleClick = () => { setUpcomingEventsOpen(!upcomingEventsOpen ); };
    const handleDiscoverClick = () => { setDiscoverEventsOpen(!discoverEventsOpen ); };
    const handleDrawerOpen = () => { setAppBarOpen(true); };
    const handleDrawerClose = () => { setAppBarOpen(false); };
    let preventDefault;
    const menuId = 'primary-search-account-menu';
    let user=ls.get('userObject');
    const defaultProps = {
        bgcolor: 'background.paper',
        m: 1,
        style: { width: '5rem', height: '5rem' },
        borderColor: 'text.primary',
    };
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
                        <IconButton aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton aria-label="show 17 new notifications" color="inherit">
                            <Badge badgeContent={17} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton aria-label="show 2 new events" color="inherit">
                            <Badge badgeContent={2} color="secondary">
                                <EventIcon />
                            </Badge>
                        </IconButton>
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
                            <SettingsIcon />
                        </IconButton>
                        <IconButton color="inherit">
                            <ExitToAppIcon/>
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
                    <Avatar alt={user['username']} src="/public/calendar_icon.png" className={classes.large}/>
                </ListItem>
                <ListItem>
                    <Link href="#" onClick={preventDefault} className={classes.centralize}>
                        {user['username']}
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
                                    {['Ayfer A', 'Beyfer B', 'Ceyfer C'].map((text, index) => (

                                        <ListItem button alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar alt={text} src="/static/images/avatar/3.jpg" />
                                            </ListItemAvatar>

                                            <ListItemText
                                                primary={text}
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            className={classes.inline}
                                                            color="textPrimary"
                                                        >
                                                            Wut {index}
                                                        </Typography>
                                                        {' — Weird text'}
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>

                                    ))}
                                    <Link href="#" onClick={preventDefault} className={classes.centralize}>
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
                                    {['Ayfer A', 'Beyfer B', 'Ceyfer C'].map((text, index) => (

                                        <ListItem button alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar alt={text} src="/static/images/avatar/3.jpg" />
                                            </ListItemAvatar>

                                            <ListItemText
                                                primary={
                                                    index === 0 ?
                                                        <React.Fragment>
                                                            <Typography
                                                                component="span"
                                                                variant="body2"
                                                                className={classes.inline}
                                                                color="textPrimary"
                                                            >
                                                                {text}
                                                            </Typography>
                                                            { '  <<Sponsored>>'}
                                                        </React.Fragment>
                                                        : text}
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            className={classes.inline}
                                                            color="textPrimary"
                                                        >
                                                            Wut {index}
                                                        </Typography>
                                                        {' — Weird text'}
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>

                                    ))}
                                    <Link href="#" onClick={preventDefault} className={classes.centralize}>
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