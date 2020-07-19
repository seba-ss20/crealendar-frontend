import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TelegramIcon from '@material-ui/icons/Telegram';
import CardMedia from "@material-ui/core/CardMedia";

//import axios from 'axios';
//import { withRouter } from 'react-router-dom';

//import Avatar from "@material-ui/core/Avatar";// maybe incorporate later
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
  paper1: {
	fontSize: 14,
	fontWeight: 'bold',
	//marginTop: theme.spacing(10),
	marginLeft: theme.spacing(43),
    //padding: theme.spacing(2),
    textAlign: 'left',
	//backgroundColor: 'transparent',
  },
  paper: {
	height: 200,
	fontSize: 14,
	fontWeight: 'bold',
	//marginTop: theme.spacing(10),
	//marginLeft: theme.spacing(10),
    //padding: theme.spacing(2),
    textAlign: 'left',
	//backgroundColor: 'transparent',
  },
  card: {
	backgroundColor: 'transparent',
    //maxWidth: 300,
	marginLeft: theme.spacing(33),
    //margin: "auto",
    //transition: "0.3s",
    boxShadow: "none",
  }, 
  cardright: {
	  //backgroundColor: 'transparent',
    //maxWidth: 300,
	//marginRight: theme.spacing(33),
    margin: "auto",
    transition: "0.3s",
    boxShadow: "none",
  },
  information: {
        padding: 2,
        marginTop: 10,
    },
	cover:{
		height: 151,
	}
}));
//AIzaSyCjI28k5sedkd5UTIkyOPXzEu13txomT70
//  initialCenter={{lat: -1.2884, lng: 36.8233}} map position in nairobi
//<Typography noWrap variant="body2" color="textSecondary" component="p" style={{ fontStyle: 'italic' }}>
//								{new Date(eventData.timestamp).toLocaleString()}
//							</Typography>

type Props = {
	eventData: any,
};

type State = {
};

const EventDetail = (props: Props) => {
	
	const [open, setOpen] = useState(false);
	const eventData = props.eventData;
	console.log(eventData.name)
	const classes = useStyles();
	
	const openAddFriendsDialog = () => {
        setOpen(true);
    }
	
	const handleClose = () => {
        setOpen(false);
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
								{eventData.date}
							</Typography>
						</Grid>
						<Typography className={"MuiTypography--heading"} variant={"h4"} gutterBottom style={{ fontStyle: 'bold' }}>
							{eventData.name}
						</Typography>
							<img
								height="20%"
								width="50%"
								// className={classes.media}
								src={`${eventURL}/images/`+eventData._id}
							/>
							{/*<Card>*/}
							{/*	<CardMedia*/}
							{/*		className={classes.cover}*/}
							{/*		// image="/static/images/cards/live-from-space.jpg"*/}
							{/*		src={`${eventURL}/images/`+eventData._id}*/}
							{/*		title="Live from space album cover"*/}
							{/*	/>*/}
							{/*</Card>*/}
						</Paper>
					</Paper>
				</Grid>
			</Grid>
		</div>
		<div className={classes.root}>
			<Grid container spacing={1} justify="center" direction="row" >
				<Grid item xs={7}>
					<Card className={classes.card} border='none'>
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
						<Button variant="contained" style={{maxWidth: 250, minWidth: 250}} startIcon={<AddIcon />} onClick={() => props.onAddtoCalendar(eventData)} >Add to calendar</Button>
					</div>
					<div className={classes.rootButtons}>
						<Button variant="contained" onClick={openAddFriendsDialog} style={{maxWidth: 250, minWidth: 250}} startIcon={<TelegramIcon />}>Invite friends</Button>
						<AddFriendsDialog
							open={open}
							onCancel={handleClose}
							eventData={eventData}
						/>
					</div>
					<div className={classes.rootUp} >
						<Map google={props.google} style={{ maxHeight: 250, minHeight: 250, maxWidth: 250, minWidth: 250 }} >
							<Marker />
						</Map>
					</div>
				</Grid>
				<Grid item xs={2}>
					<Card className={classes.cardright} border='none'>
						<CardContent className={classes.content}>
							<Typography className={"MuiTypography--heading"} variant={"h6"} gutterBottom>
								{eventData.subtitle}
							</Typography>
							<Divider className={classes.divider} light />
							<Typography className={"MuiTypography--subheading"} variant={"caption"}>
								{eventData.description}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</div>
		</Container>
	)
}

export default GoogleApiWrapper({apiKey: ('AIzaSyCjI28k5sedkd5UTIkyOPXzEu13txomT70')}) (EventDetail);