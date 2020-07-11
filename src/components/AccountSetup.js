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
import RecurrenceType from '../helpers/RecurrenceEnum'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Link from "@material-ui/core/Link";
import UserHeader from "./UserHeader";
import Paper from "@material-ui/core/Paper";
import IcalExpander from 'ical-expander';
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
import ICAL from 'ical.js';
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
import EventService from '../services/EventService';
import UserService from "../services/UserService";
import {Role} from "../helpers/roles";
import {sha256} from "js-sha256";

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
    const [calendarUploadError, setCalendarUploadError]  = React.useState('');
    const [uploadError, setUploadError]  = React.useState('');
    const [showNearMe, setShowNearMe]  = React.useState(false);
    const [selectedTags, setSelectedTags]  = React.useState([]);
    const [calendarUploaded, setCalendarUploaded] = React.useState(false);
    const [uploadDialogOpen, setUploadDialogOpen] = React.useState(false);
    const [atLeastOneFileUploaded, setAtLeastOneFileUploaded] = React.useState(false);

    const user_username = 'asdasda'; // TODO :: GET FROM PROP
    async function uploadCalendar(username, events) {
        try {
            let ret = await EventService.uploadCalendar(username,events);
            //TODO: remove this line after building "set the user account"

        } catch(err) {
            console.error(err);
            setCalendarUploadError(err);

        }
    }
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

        // const icalExpander = new IcalExpander({calendar,maxIterations : 1000});
        // const events = icalExpander.between(new Date('2017-01-24T00:00:00.000Z'), new Date('2020-03-30T00:00:00.000Z'));
        //
        // const mappedEvents = events.events.map(e => ({ startDate: e.startDate, summary: e.summary }));
        // const mappedOccurrences = events.occurrences.map(o => ({ startDate: o.startDate, summary: o.item.summary }));
        // const allEvents = [].concat(mappedEvents, mappedOccurrences);
        //
        // console.log(allEvents.map(e => `${e.startDate.toJSDate().toISOString()} - ${e.summary}`).join('\n'));
        var reader = new FileReader();
        reader.onload = function(progressEvent){
            // Entire file
            // return this.result;
            console.log(this.result);

            // // By lines
            // let res = '';
            // var lines = this.result.split('\n');
            // for(var line = 0; line < lines.length; line++){
            //     console.log(lines[line]);
            //     res += lines[line]+'\n';
            // }
            // return res;
        };
        ;
        // var iCalendarData_ =  reader.readAsText(calendar);
        // console.log(iCalendarData);
        let iCalendarData = 'BEGIN:VCALENDAR\n' +
            'PRODID:-//Google Inc//Google Calendar 70.9054//EN\n' +
            'VERSION:2.0\n' +
            'CALSCALE:GREGORIAN\n' +
            'METHOD:PUBLISH\n' +
            'X-WR-CALNAME:sebawebcoursetrial@gmail.com\n' +
            'X-WR-TIMEZONE:Europe/Istanbul\n' +
            'BEGIN:VTIMEZONE\n' +
            'TZID:Europe/Istanbul\n' +
            'X-LIC-LOCATION:Europe/Istanbul\n' +
            'BEGIN:STANDARD\n' +
            'TZOFFSETFROM:+0300\n' +
            'TZOFFSETTO:+0300\n' +
            'TZNAME:+03\n' +
            'DTSTART:19700101T000000\n' +
            'END:STANDARD\n' +
            'END:VTIMEZONE\n' +
            'BEGIN:VEVENT\n' +
            'DTSTART:20200708T073000Z\n' +
            'DTEND:20200708T083000Z\n' +
            'DTSTAMP:20200710T015455Z\n' +
            'UID:2061qlfnqckfqis8avjqfja2aa@google.com\n' +
            'CREATED:20200708T154041Z\n' +
            'DESCRIPTION:First Event\n' +
            'LAST-MODIFIED:20200708T154041Z\n' +
            'LOCATION:Münih\\, Almanya\n' +
            'SEQUENCE:0\n' +
            'STATUS:CONFIRMED\n' +
            'SUMMARY:First\n' +
            'TRANSP:OPAQUE\n' +
            'END:VEVENT\n' +
            'BEGIN:VEVENT\n' +
            'DTSTART;TZID=Europe/Istanbul:20200709T090000\n' +
            'DTEND;TZID=Europe/Istanbul:20200709T100000\n' +
            'RRULE:FREQ=WEEKLY;BYDAY=TH\n' +
            'DTSTAMP:20200710T015455Z\n' +
            'UID:6gioqunb7rmbltjbqf4utrqlis@google.com\n' +
            'CREATED:20200708T154123Z\n' +
            'DESCRIPTION:Pay the bills\n' +
            'LAST-MODIFIED:20200708T154123Z\n' +
            'LOCATION:Münih\\, Almanya\n' +
            'SEQUENCE:0\n' +
            'STATUS:CONFIRMED\n' +
            'SUMMARY:Work\n' +
            'TRANSP:OPAQUE\n' +
            'END:VEVENT\n' +
            'BEGIN:VEVENT\n' +
            'DTSTART;TZID=Europe/Istanbul:20200709T113000\n' +
            'DTEND;TZID=Europe/Istanbul:20200709T123000\n' +
            'RRULE:FREQ=WEEKLY;BYDAY=FR,MO,TH,TU,WE\n' +
            'DTSTAMP:20200710T015455Z\n' +
            'UID:74k227120cdjgbe77n08722djm@google.com\n' +
            'CREATED:20200708T160553Z\n' +
            'DESCRIPTION:\n' +
            'LAST-MODIFIED:20200708T160553Z\n' +
            'LOCATION:\n' +
            'SEQUENCE:0\n' +
            'STATUS:CONFIRMED\n' +
            'SUMMARY:Study\n' +
            'TRANSP:OPAQUE\n' +
            'END:VEVENT\n' +
            'BEGIN:VEVENT\n' +
            'DTSTART;VALUE=DATE:20200713\n' +
            'DTEND;VALUE=DATE:20200714\n' +
            'DTSTAMP:20200710T015455Z\n' +
            'UID:3k89e291hrlc2aimnjj57tjfep@google.com\n' +
            'CREATED:20200708T160620Z\n' +
            'DESCRIPTION:\n' +
            'LAST-MODIFIED:20200708T160621Z\n' +
            'LOCATION:\n' +
            'SEQUENCE:0\n' +
            'STATUS:CONFIRMED\n' +
            'SUMMARY:All-day corona party\n' +
            'TRANSP:TRANSPARENT\n' +
            'END:VEVENT\n' +
            'BEGIN:VEVENT\n' +
            'DTSTART;TZID=Europe/Istanbul:20200713T133000\n' +
            'DTEND;TZID=Europe/Istanbul:20200713T143000\n' +
            'RRULE:FREQ=MONTHLY;BYDAY=2MO\n' +
            'DTSTAMP:20200710T015455Z\n' +
            'UID:75b05nbkpi0boa7f92antjb11i@google.com\n' +
            'CREATED:20200708T160641Z\n' +
            'DESCRIPTION:\n' +
            'LAST-MODIFIED:20200708T160659Z\n' +
            'LOCATION:\n' +
            'SEQUENCE:0\n' +
            'STATUS:CONFIRMED\n' +
            'SUMMARY:Monthly Status Report\n' +
            'TRANSP:OPAQUE\n' +
            'END:VEVENT\n' +
            'BEGIN:VEVENT\n' +
            'DTSTART;TZID=Europe/Istanbul:20200714T143000\n' +
            'DTEND;TZID=Europe/Istanbul:20200714T153000\n' +
            'RRULE:FREQ=YEARLY\n' +
            'DTSTAMP:20200710T015455Z\n' +
            'UID:5tefud0nhvam6oall1ia1lmunm@google.com\n' +
            'CREATED:20200708T160733Z\n' +
            'DESCRIPTION:\n' +
            'LAST-MODIFIED:20200708T160740Z\n' +
            'LOCATION:\n' +
            'SEQUENCE:1\n' +
            'STATUS:CONFIRMED\n' +
            'SUMMARY:Yearly Neighbor visit\n' +
            'TRANSP:OPAQUE\n' +
            'END:VEVENT\n' +
            'BEGIN:VEVENT\n' +
            'DTSTART;TZID=Europe/Istanbul:20200715T153000\n' +
            'DTEND;TZID=Europe/Istanbul:20200715T163000\n' +
            'RRULE:FREQ=WEEKLY;BYDAY=FR,MO,TH,TU,WE\n' +
            'DTSTAMP:20200710T015455Z\n' +
            'UID:3m56iskqsisltcllc10k1eal7l@google.com\n' +
            'CREATED:20200708T160812Z\n' +
            'DESCRIPTION:\n' +
            'LAST-MODIFIED:20200708T160812Z\n' +
            'LOCATION:\n' +
            'SEQUENCE:0\n' +
            'STATUS:CONFIRMED\n' +
            'SUMMARY:Weekday sport\n' +
            'TRANSP:OPAQUE\n' +
            'END:VEVENT\n' +
            'BEGIN:VEVENT\n' +
            'DTSTART;TZID=Europe/Istanbul:20200714T040000\n' +
            'DTEND;TZID=Europe/Istanbul:20200714T050000\n' +
            'RRULE:FREQ=DAILY\n' +
            'DTSTAMP:20200710T015455Z\n' +
            'UID:5ncm1elj273f2ik75ddvkd0ipc@google.com\n' +
            'CREATED:20200710T015408Z\n' +
            'DESCRIPTION:\n' +
            'LAST-MODIFIED:20200710T015408Z\n' +
            'LOCATION:\n' +
            'SEQUENCE:0\n' +
            'STATUS:CONFIRMED\n' +
            'SUMMARY:DAILY\n' +
            'TRANSP:OPAQUE\n' +
            'END:VEVENT\n' +
            'END:VCALENDAR';
        var jcalData = ICAL.parse(iCalendarData);
        // console.log(jcalData);
        var comp = new ICAL.Component(jcalData);
        var vevents = comp.getAllSubcomponents('vevent');
        console.log(vevents);
        let crealendar_events = [];
        vevents.map((vevent)=> {
            let crealendar_event = {}
            console.log('DTSTART');
            let ical_dtstart = vevent.getFirstPropertyValue('dtstart');
            crealendar_event.dateStart = ICAL.design.icalendar.value['date-time'].undecorate(ical_dtstart);
            let ical_dtend = vevent.getFirstPropertyValue('dtend');
            crealendar_event.dateEnd = ICAL.design.icalendar.value['date-time'].undecorate(ical_dtend);
            let ical_created = vevent.getFirstPropertyValue('created');
            crealendar_event.created = ICAL.design.icalendar.value['date-time'].undecorate(ical_created);
            crealendar_event.name= vevent.getFirstPropertyValue('summary');
            crealendar_event.location= vevent.getFirstPropertyValue('location');
            crealendar_event.description= vevent.getFirstPropertyValue('description');
            crealendar_event.status= vevent.getFirstPropertyValue('status');
            crealendar_event.owner = user_username; // TODO:: Fix this part, get it from props
            crealendar_event.eventID = sha256(crealendar_event.created+''+crealendar_event.owner);
            let ical_recur = vevent.getFirstPropertyValue('rrule');
            if(ical_recur !== null && ical_recur !== undefined ){
                console.log(ical_recur);

                crealendar_event.recurrence = ICAL.design.icalendar.value['recur'].undecorate(ical_recur); // Returns { freq: "WEEKLY", count: 2 }
                console.log('EVENT ID');
                console.log(crealendar_event.recurrence);
            }
            crealendar_events.push(crealendar_event);
        });
        uploadCalendar(user_username,crealendar_events);
        // uploadCalendar(user_username,calendar)
        setCalendarUploaded(true);
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
                            calendarUploaded
                                ?
                            <Typography style={{color:'green'}}>
                                {console.log(calendar)}
                                { 'Calendar Uploaded :' + calendar.name}
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