import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Header from './Header'
import {withRouter} from "react-router-dom";
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import BusinessIcon from '@material-ui/icons/Business';
import Box from '@material-ui/core/Box';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import coverPic from '../images/welcome_picture.jpg';

const useStyles = makeStyles((theme) => ({

    paperTop: {
        marginTop: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    paperCover: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background:'#f1fffb',
        height: "100%",
    },
    list: {
      marginLeft: theme.spacing(10),
    },

}));

function Welcome() {
    const classes = useStyles();

    return (
        <div className={classes.paperTop}>
            <Header/>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paperCover}>
                        <img src={coverPic} alt="logo"/>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                        <List className={classes.list}>
                            <ListItem >
                                <ListItemIcon>
                                    <CardGiftcardIcon align='center' style={{ fontSize: 50 }}/>
                                </ListItemIcon>
                                <Box fontWeight="fontWeightBold"> What do we offer?</Box>
                            </ListItem>
                            <ListItem>
                                <KeyboardArrowRightIcon/>
                                "Crealendar" is your creative leisure time planner.
                            </ListItem>
                            <ListItem>
                                <KeyboardArrowRightIcon/>
                                Fill your calendar adding new activities.
                            </ListItem>
                            <ListItem>
                                <KeyboardArrowRightIcon/>
                                The wide range of free and paid activities are recommended based on your own interests.
                            </ListItem>
                            <ListItem>
                                <KeyboardArrowRightIcon/>
                                Share the moment with other like-minded users.
                            </ListItem>
                            <ListItem>
                                <KeyboardArrowRightIcon/>
                                Organize a new event/workshops.
                            </ListItem>
                        </List>

                    </Paper>
                    <Divider orientation="vertical" flexItem />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                        <List className={classes.list}>
                            <ListItem >
                                <ListItemIcon>
                                    <BusinessIcon style={{ fontSize: 50 }}/>
                                </ListItemIcon>
                                <Box fontWeight="fontWeightBold" align='center'> Are you an public event organizer?</Box>
                            </ListItem>
                            <ListItem>
                                <KeyboardArrowRightIcon/>
                                Advertise your events.
                            </ListItem>
                            <ListItem>
                                <KeyboardArrowRightIcon/>
                                Manage your calendar easily.
                            </ListItem>
                            <ListItem>
                                <KeyboardArrowRightIcon/>
                                Build & Maintain a client-business relationship more easily.
                            </ListItem>
                            <ListItem>
                                <KeyboardArrowRightIcon/>
                                Reach a wider range of potential clients.
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default withRouter(Welcome);