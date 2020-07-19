import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import ls from 'local-storage'

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TelegramIcon from '@material-ui/icons/Telegram';
import CardMedia from "@material-ui/core/CardMedia";

import axios from 'axios';

import Card from "@material-ui/core/Card";
//import CardMedia from "@material-ui/core/CardMedia"; // maybe later
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";

// google maps component
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

import AddFriendsDialog from './AddFriendsDialog'
import {eventURL} from "../../config";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  rootUp: {
	 flexGrow: 1,
	 marginTop: theme.spacing(8),
  },
  rootButtons: {
	 flexGrow: 1,
	 marginTop: theme.spacing(2),
  },
  rootPromotions: {
	 flexGrow: 1,
	 marginTop: theme.spacing(2),
  },
  paper1: {
	fontSize: 14,
	fontWeight: 'bold',
	marginLeft: theme.spacing(43),
    textAlign: 'left',
  },
  paper: {
	height: 200,
	fontSize: 14,
	fontWeight: 'bold',
    textAlign: 'left',
  },
  card: {
	backgroundColor: 'transparent',
	marginLeft: theme.spacing(33),
    boxShadow: "none",
  }, 
  cardright: {
    margin: "auto",
    transition: "0.3s",
    boxShadow: "none",
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  information: {
        padding: 2,
        marginTop: 10,
    },
	cover:{
		height: 151,
	}
}));

type Props = {
	eventData: any,
};

type State = {
};

const EventDetail = (props: Props) => {
	const classes = useStyles();
	const eventData = props.eventData;
	const [open, setOpen] = useState(false);
	const [location, setLocation] = useState(eventData.location);
	const [coords, setCoords] = useState();
	const googleKey = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
	const loggeduser = ls.get('userObject');
	const [promotions, setPromotions] = useState([
		{name: "Free Tennis Lessons", description: "Make your appointment now bit.ly/123"},
		{name: "30% Discount", description: "Get the best Tennis Rackets with fair prices only at Decathlon"},
	])
	
	const openAddFriendsDialog = () => {
        setOpen(true);
    }
	
	const handleClose = () => {
        setOpen(false);
    }
	
	const getLocation = () => {
		axios.get('https://maps.googleapis.com/maps/api/geocode/json', { params: {"address":location, "key": googleKey }}).then(response => {
			setCoords(response.data.results[0].geometry.location)
		}).catch(err => {
			console.error(err);
		})
		return (
			<div className={classes.rootUp} >
				<Map google={props.google} style={{ maxHeight: 250, minHeight: 250, maxWidth: 250, minWidth: 250 }} center={coords}>
					<Marker position={coords}/>
				</Map>
			</div>
		)
	}
	
	
	return (
		<Container component="main" maxWidth="xl" disableGutters={true} spacing={0}>
            <CssBaseline />
		<div className={classes.rootUp}>
			<Grid container spacing={0} justify="center" direction="row" >
				<Grid item xs={12} fixed>
					<Paper className={classes.paper} elevation={0}>
						<Paper className={classes.paper1} elevation={0}>
						<div className={classes.information}></div>
						<Grid item xs style={{ width: '100%', marginBottom: '10px' }}>
							<Typography noWrap variant="body2" color="textSecondary" component="p" style={{ fontStyle: 'italic' }}>
								{new Date(eventData.dateStart).toLocaleString()} - {new Date(eventData.dateEnd).toLocaleString()}
							</Typography>
						</Grid>
						<Typography className={"MuiTypography--heading"} variant={"h4"} gutterBottom style={{ fontStyle: 'bold' }}>
							{eventData.name}
						</Typography>
						</Paper>
					</Paper>
				</Grid>
			</Grid>
		</div>
		<div className={classes.root}>
			<Grid container spacing={1} justify="center" direction="row" >
				<Grid item xs={7}>
					<Card className={classes.card} border='none'>
						<CardMedia
							className={classes.media}
							image={`${eventURL}/images/`+eventData._id}
						  />
						<CardContent className={classes.content}>
							<Typography className={"MuiTypography--heading"} variant={"h6"} gutterBottom>
								{eventData.subtitle}
							</Typography>
							<Typography className={"MuiTypography--subheading"} variant={"caption"}>
								{eventData.description}
							</Typography>
							<Divider className={classes.divider} light />
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={2}>
					<div className={classes.rootButtons}>
						<Button variant="contained" style={{maxWidth: 250, minWidth: 250}} startIcon={<AddIcon />} onClick={() => props.onAddtoCalendar(eventData)} disabled={loggeduser.role === "Organizer"} >
							Add to calendar
						</Button>
					</div>
					<div className={classes.rootButtons}>
						<Button variant="contained" onClick={openAddFriendsDialog} style={{maxWidth: 250, minWidth: 250}} startIcon={<TelegramIcon />} disabled={loggeduser.role === "Organizer"}>
							Invite friends
						</Button>
						<AddFriendsDialog
							open={open}
							onClose={handleClose}
							eventData={eventData}
						/>
					</div>
					{ location.length > 0 ? getLocation() : null }
				</Grid>
				<Grid item xs={2} >
					{ promotions && loggeduser.role === "User" ? promotions.map( promotion => (
						<div className={classes.rootPromotions}>
							<Card className={classes.cardright} border='none' variant="outlined">
								<CardContent className={classes.content}>
									<Typography className={"MuiTypography--heading"} variant={"h6"} gutterBottom>
										{promotion.name}
									</Typography>
									<Typography className={"MuiTypography--subheading"} variant={"caption"}>
										{promotion.description}
									</Typography>
								</CardContent>
							</Card>
						</div>
					)) : null }
				</Grid>
			</Grid>
		</div>
		</Container>
	)
}

export default GoogleApiWrapper({apiKey: ('AIzaSyCjI28k5sedkd5UTIkyOPXzEu13txomT70')}) (EventDetail);