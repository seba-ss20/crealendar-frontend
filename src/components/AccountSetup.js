import React, {Component, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Link from "@material-ui/core/Link";
import UserHeader from "./UserHeader";
import Paper from "@material-ui/core/Paper";
import SaveIcon from "@material-ui/icons/Save";
import Divider from "@material-ui/core/Divider";
import PublishIcon from '@material-ui/icons/Publish';
import IconButton from '@material-ui/core/IconButton';
import ICAL from 'ical.js';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {DropzoneArea} from "material-ui-dropzone";
import EventService from '../services/EventService';
import UserService from "../services/UserService";
import EventTagService from "../services/EventTagService";
import {Role} from "../helpers/roles";
import {sha256} from "js-sha256";
import ls from 'local-storage'
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

// TODO:: ON EMAIL CHANGE, Change ID of all events as well.
// TODO:: Disable OK Button of calendar upload if there is no item uploaded.

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
    // console.log('OUR USER IS');
    // console.log(props.user);
    const [calendarUploadError, setCalendarUploadError]  = React.useState('');
    const [uploadError, setUploadError]  = React.useState('');
    const [showNearMe, setShowNearMe]  = React.useState(false);
    const [selectedTags, setSelectedTags]  = React.useState([]);
    const [calendarUploaded, setCalendarUploaded] = React.useState(
        {uploaded:false,uploadDate: ''}
    );
    let user = ls.get('userObject');
    const user_username = user['username'];

    const [uploadDialogOpen, setUploadDialogOpen] = React.useState(false);
    const [atLeastOneFileUploaded, setAtLeastOneFileUploaded] = React.useState(false);
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
    const [autoCompleteValue, setAutoCompleteValue] = useState(...tags);
    async function uploadCalendar(username, events) {
        return await EventService.uploadCalendar(username,events);
    }


    async function handleSetupSave() {
        console.log('Setting tags to :' + selectedTags);
        await EventTagService.setTagsOfUser(user_username,selectedTags)
            .then(response  => {
                console.log('Tag setting for ' + user_username);
                console.log(response);
            })
            .catch(reason => {
                console.log('Tag setting failed');
                console.log(reason);
            });
        await UserService.setShowNearMe(user_username,showNearMe)
            .then(response  => {
                console.log('Setting "show near me" for  ' + user_username);
                console.log(response);
            })
            .catch(reason => {
                console.log('Show near me failed');
                console.log(reason);
            });
        props.history.push('/user');
    }
    const classes = useStyles();
    let preventDefault;

    useEffect(()=>{
        EventTagService.listTags()
            .then(response => {
                console.log('Getting All Tags: ');
                console.log(response);
            });
        EventTagService.getTagsOfUser(user_username)
            .then(response => {
                console.log('Getting Tags of the user');
                console.log(response[0].tags);
                console.log(tags);
                let userSelectedTags = response[0].tags
                let sTags = []
                userSelectedTags.map((tag,idx)=> {
                    tags.map((_t,_i) =>
                    {
                            if (_t.data === tag) {
                                sTags.push(_t);
                                tags.splice(_i, 1);
                            }
                    });
                });
                setSelectedTags(sTags);
                console.log('tags');
                console.log(tags);
                setTags(tags);
            });
        // TODO :: GET USERNAME AS PROP AND RECEIVE IT FROM SERVER TO SHOW NEAR ME AND OTHER STUFF
        UserService.getUser(user_username)
            .then(response => {
                console.log(response);
                setShowNearMe(response.showNearMe);
                setCalendarUploaded(response.calendar);
            });
    },[]);
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

    function readFile(file){
        return new Promise((resolve, reject) => {
            var fr = new FileReader();
            fr.onload = () => {
                resolve(fr.result )
            };
            fr.readAsText(file);
        });
    }

    async function handleDialogCloseOK() {
        setUploadDialogOpen(false);
        console.log('Operation OK');
        console.log(calendar);

        readFile(calendar)
            .then(res => {
                var crealendar_events = [];
                // Entire file
                var iCalendarData = res;
                var jcalData = ICAL.parse(iCalendarData);
                var comp = new ICAL.Component(jcalData);
                var vevents = comp.getAllSubcomponents('vevent');
                console.log(vevents);
                for(let k = 0 ; k < vevents.length ; k++){
                    let vevent = vevents[k];
                    let crealendar_event = {};
                    let ical_dtstart = vevent.getFirstPropertyValue('dtstart');
                    crealendar_event.dateStart = ICAL.design.icalendar.value['date-time'].undecorate(ical_dtstart);
                    let ical_dtend = vevent.getFirstPropertyValue('dtend');
                    crealendar_event.dateEnd = ICAL.design.icalendar.value['date-time'].undecorate(ical_dtend);
                    let ical_created = vevent.getFirstPropertyValue('created');
                    crealendar_event.created = ICAL.design.icalendar.value['date-time'].undecorate(ical_created);
                    crealendar_event.name = vevent.getFirstPropertyValue('summary');
                    crealendar_event.location = vevent.getFirstPropertyValue('location');
                    crealendar_event.description = vevent.getFirstPropertyValue('description');
                    crealendar_event.status = vevent.getFirstPropertyValue('status');
                    crealendar_event.owner = user['_id'];
                    let id = sha256(crealendar_event.created + '' + crealendar_event.owner)
                    crealendar_event._id = id.substring(0, 24);
                    let ical_recur = vevent.getFirstPropertyValue('rrule');
                    if (ical_recur !== null && ical_recur !== undefined) {
                        crealendar_event.recurrence = ICAL.design.icalendar.value['recur'].undecorate(ical_recur); // Returns { freq: "WEEKLY", count: 2 }
                    }
                    crealendar_events.push(crealendar_event);
                }
                console.log('crealendar_events');
                console.log(crealendar_events);
                return uploadCalendar(user_username, crealendar_events);
            }).then(response  => {
                setCalendarUploaded(response.calendar)
                console.log(response);
            }).catch(err => {
                console.log('err');
                console.log(err);
        });

    }
    function handleSubmit(event) {
        event.preventDefault();
    }
    function handleAtLeastOneFileUpload(files) {
        calendar = files[0];
        setAtLeastOneFileUploaded(true);
        console.log('At least one file uploaded. OK BUTTON: ' + atLeastOneFileUploaded);
    }
    function handleNoFileUpload() {
        calendar = null;
        setAtLeastOneFileUploaded(false)
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
                tags.unshift(data);
            }
        });
        setSelectedTags(sTags);
        setTags(tags);
    }


    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={11}>
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
                                    onChange={(files) => (files.length === 1) ?  handleAtLeastOneFileUpload(files): handleNoFileUpload()}
                                    filesLimit={1}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleDialogCloseCancel} color="primary">
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleDialogCloseOK}
                                    color="primary"
                                    // disabled={atLeastOneFileUploaded}
                                >
                                    Ok
                                </Button>
                            </DialogActions>
                        </Dialog>

                        {
                            calendarUploaded['uploaded']
                                ?
                            <Typography style={{color:'green'}}>
                                {console.log(calendar)}
                                { 'Calendar Uploaded : ' + calendarUploaded['uploadDate']}
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
                        {/*<Paper className={classes.paperChip}>*/}
                            {/*<Autocomplete*/}
                            {/*    multiple*/}
                            {/*    id="tags-outlined"*/}
                            {/*    options={autoCompleteValue}*/}
                            {/*    getOptionLabel={(t)=> t.data}*/}
                            {/*    value={autoCompleteValue}*/}
                            {/*    onChange={(e, newval, reason) => {*/}
                            {/*        setAutoCompleteValue(newval);*/}
                            {/*    }}*/}
                            {/*    renderInput={params => (*/}
                            {/*        <TextField*/}
                            {/*            {...params}*/}
                            {/*            variant="outlined"*/}
                            {/*            label="filterSelectedOptions"*/}
                            {/*            placeholder="Search or Add Tag!"*/}
                            {/*            onKeyDown={e => {*/}
                            {/*                if (e.keyCode === 13 && e.target.value) {*/}
                            {/*                    setAutoCompleteValue(autoCompleteValue.concat(e.target.value));*/}
                            {/*                }*/}
                            {/*            }}*/}
                            {/*        />*/}
                            {/*    )}*/}
                            {/*/>*/}
                        {/*</Paper>*/}
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
                        <div>
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
                                onClick={handleSetupSave}
                                className={classes.button}
                                startIcon={<SaveIcon />}
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </Grid>
            </Grid>

        </div>
    )
}

export default withRouter(AccountSetup);