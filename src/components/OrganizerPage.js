import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import { TableCell, TableContainer, TableHead, Table, TableBody} from '@material-ui/core';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import Button from '@material-ui/core/Button';
import OrganizerHeader from "./OrganizerHeader";
import {EventListView} from "../views/EventListView";
import Typography from "@material-ui/core/Typography";

//TODO: remove this line after building "set the organizer account"

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        marginTop: theme.spacing(5)
    },
    paperTop: {
        position:'relative',
        borderStyle:'groove',
        marginTop: theme.spacing(10),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

function OrganizerPage (props) {

    const classes = useStyles();

    function handleOnClick (event) {
        event.preventDefault();
        props.history.push('/createEvent');
    }

    return (
        <div className={classes.root}>
            <OrganizerHeader/>
            <Grid container spacing={3}>
                <Grid item xs={11} >
                        <div className={classes.paperTop}>
                            <TableContainer>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableCell>
                                            <Typography variant="h5" > My Events</Typography>
                                        </TableCell>
                                        <TableCell align='right'>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                endIcon={<PlaylistAddIcon/>}
                                                onClick={handleOnClick}
                                            >
                                                Create Event
                                            </Button>
                                        </TableCell>
                                    </TableHead>
                                </Table>
                            </TableContainer>

                        <EventListView />
                        </div>
                </Grid>
            </Grid>
        </div>
    )

}

export default withRouter(OrganizerPage)