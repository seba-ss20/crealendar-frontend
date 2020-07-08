import React, {Component} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Link from "@material-ui/core/Link";
import UserHeader from "./UserHeader";
import Paper from "@material-ui/core/Paper";
import coverPic from "../images/welcome_picture.jpg";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import Box from "@material-ui/core/Box";
import SaveIcon from "@material-ui/icons/Save";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import Divider from "@material-ui/core/Divider";
import BusinessIcon from "@material-ui/icons/Business";
import PublishIcon from '@material-ui/icons/Publish';
import IconButton from '@material-ui/core/IconButton';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {DropzoneArea} from "material-ui-dropzone";

const useStyles = makeStyles(theme => ({
    // paper: {
    //     marginTop: theme.spacing(20),
    //     display: 'flex',
    //     flexDirection: 'column',
    //     alignItems: 'center',
    // },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    paperChip: {
        width: '50%',
        height: '20%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root: {
        display: 'flex',
    },
    button: {
        margin: theme.spacing(1),
    },
    paperTop: {
        position:'relative',
        borderStyle:'groove',
        marginTop: theme.spacing(16),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    paperCover: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',

    },
    paperCoverHeader:{
        marginTop: theme.spacing(2),
        alignItems: 'left',
    },
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background:'#f1fffb',
        height: "100%",
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    switchStyle:{
        paddingRight: theme.spacing(2),
    },
}));
let calendar = null;
function AccountSetup(props) {

    const classes = useStyles();
    let preventDefault;
    const [tags, setTags]  = React.useState(
        [
            {key: 0, data: 'Tennis'},
            {key: 1, data: 'Piano'},
            {key: 2, data: 'Guitar'},
            {key: 3, data: 'Education'},
            {key: 4, data: 'Programming'},
            {key: 5, data: 'Flute'},
            {key: 6, data: 'Learning Language'},
            {key: 7, data: 'Drinking'},
            {key: 8, data: 'Netflix and Chill'},
            {key: 9, data: 'Gaming'},
            {key: 10, data: 'PlayStation 5'},
            {key: 11, data: 'Twitch'},
            {key: 12, data: 'Software Engineering'},
        ]
    );

    const [showNearMe, setShowNearMe]  = React.useState(false);
    const [selectedTags, setSelectedTags]  = React.useState([]);
    const [calendarUploaded, setCalendarUploaded] = React.useState(false);
    const [uploadDialogOpen, setUploadDialogOpen] = React.useState(false);
    function handleShowNearMe(){
        setShowNearMe(!showNearMe);
    }
    function handleUpload() {
        console.log('HANDLE PUBLISH');
    }
    function handleDialogOpen(){
        setUploadDialogOpen(true);
    }
    function handleDialogCloseCancel(){
        setUploadDialogOpen(false);
        console.log('Operation Cancel');
        console.log(calendar);
    }
    function handleDialogCloseOK(){
        setUploadDialogOpen(false);
        console.log('Operation OK');
        console.log(calendar);
        setCalendarUploaded(true);
    }
    function handleSubmit(event) {
        event.preventDefault();
    }
    function handleClickTag(data) {
        let sTags = [];
        selectedTags.map((tag,index)=>{
            sTags.push(tag);
        });
        tags.map((tag,index)=>{
            if(tag.key === data.key && !sTags.includes(data)){
                sTags.push(tag);
                console.log('Number '+index );
                tags.splice(index,1)
            }
        });
        setTags(tags);
        setSelectedTags(sTags);
        console.log(selectedTags);
        console.log('Clicked ' + data.data);
    }
    function handleDeleteTag(data) {
        console.log('Deleted ' + data);
        let sTags = [];
        selectedTags.map((tag,index)=>{
            if(tag.key !== data.key) {
                sTags.push(tag);
            }
            else{
                tags.push(data);
            }
        });
        setSelectedTags(sTags);
        setTags(tags);
    }
    return (
        <div className={classes.root}>
            <CssBaseline />
            <UserHeader/>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <div className={classes.paperTop} >
                        <h1>Event Preferences</h1>
                        <Divider flexItem/>
                        <h3 className={classes.paperCoverHeader}>Import your calendar!
                            <IconButton onClick={handleDialogOpen}
                                        >
                                <PublishIcon/>
                            </IconButton>
                        (
                            Learn how to export calendar for
                            <Link href="https://support.google.com/calendar/answer/37111?hl=en" onClick={preventDefault}>
                                {' Google Calendar '}
                            </Link>
                            and
                            <Link href="https://support.apple.com/guide/calendar/import-or-export-calendars-icl1023/mac" onClick={preventDefault} >
                                {' iCalendar '}
                            </Link>
                        )

                        </h3>
                        <Dialog disableBackdropClick disableEscapeKeyDown open={uploadDialogOpen} onClose={handleDialogOpen}>

                            <DialogContent>
                                <DropzoneArea
                                    acceptedFiles={['text/calendar','text/csv']}
                                    dropzoneText={"Drag and drop a calendar here or click to select from file system"}
                                    onChange={(files) => calendar = files}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleDialogCloseCancel} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={handleDialogCloseOK} color="primary">
                                    Ok
                                </Button>
                            </DialogActions>
                        </Dialog>

                        {
                            calendarUploaded
                                ?
                            <Typography style={{color:'green'}}>
                                {console.log(calendar)}
                                { 'Calendar Uploaded :' + calendar[0].name}
                            </Typography>
                                :
                                <Typography style={{color:'red'}}>
                                    {'Calendar Uploaded : NONE'}
                                </Typography>
                        }
                        <Typography variant='h5' >
                            My Interests (select at least 3):

                        </Typography>
                        <Paper className={classes.paperChip}>
                            {selectedTags.map((data) => {
                                return (
                                    <Chip key={data.key}
                                          label={data.data}
                                          clickable
                                          onDelete={ () => handleDeleteTag(data)}
                                          className={classes.chip}
                                    />
                                );
                            })}
                        </Paper>
                        <Paper className={classes.paperChip}>
                            {tags.map((data) => {
                                return (
                                    <Chip key={data.key}
                                        label={data.data}
                                        clickable
                                        onClick={() => handleClickTag(data)}
                                        className={classes.chip}
                                    />
                                );
                            })}
                        </Paper>
                        <Typography component={'h3'} className={classes.paperCoverHeader}>

                            You can modify your preferences from
                            <Link href="/settings" onClick={preventDefault}>
                                {' Settings '}
                            </Link>
                            >
                            <Link href="/Eventpreferences" onClick={preventDefault} >
                                {' Event Preferences '}
                            </Link>

                        </Typography>

                        <Typography>

                            <FormControlLabel
                                control={
                                    <Switch
                                        className={classes.switchStyle}
                                        checked={showNearMe}
                                        onChange={handleShowNearMe}
                                        name="showNearMe"
                                        color="primary"
                                    />
                                }
                                value="start"
                                labelPlacement="Start"
                                label="Only show me events near me"
                            />
                        </Typography>
                        <Button
                            variant="contained"
                            color="default"
                            href={'/user'}
                            className={classes.button}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"

                            className={classes.button}
                            startIcon={<SaveIcon />}
                        >
                            Save
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default withRouter(AccountSetup);