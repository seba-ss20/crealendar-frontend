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

const localizer = momentLocalizer(moment)



const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
    nested: {
        paddingLeft: theme.spacing(2),
    },
}));

function UserPage () {


    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [upcomingEventsOpen, setUpcomingEventsOpen] = React.useState(false);

    const [events, setEvents] = React.useState([
        {
            start: moment().toDate(),
            end: moment()
                .add(1, "days")
                .toDate(),
            title: "Some title"
        }
    ]);
    const [discoverEventsOpen, setDiscoverEventsOpen] = React.useState(false);

    const handleClick = () => {
        setUpcomingEventsOpen(!upcomingEventsOpen);
    };
    const handleDiscoverClick = () => {
        setDiscoverEventsOpen(!discoverEventsOpen);
    };
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const eben="Eben Anan"
    let preventDefault;
    const defaultProps = {
        bgcolor: 'background.paper',
        m: 1,
        style: { width: '5rem', height: '5rem' },
        borderColor: 'text.primary',
    };
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Persistent drawer
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
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

                <ListItem button key="avatar" alignItems>
                    <Avatar alt={eben} src="/public/calendar_icon.png" className={classes.large}/>
                </ListItem>
                <ListItem>
                    <Link href="#" onClick={preventDefault} className={classes.centralize}>
                        {eben}
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
                        <ListItemText primary="Upcoming Events" />
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
                                </List>

                            </ListItem>

                        </List>
                    </Collapse>
                </List>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
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