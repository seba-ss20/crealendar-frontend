import React, {useState} from 'react';
import { withRouter } from 'react-router-dom';
import DateFnsUtils from '@date-io/date-fns';
import {DateTimePicker,MuiPickersUtilsProvider} from '@material-ui/pickers';
import TextField from "@material-ui/core/TextField";
import NumberFormat from 'react-number-format';
import {NumberFormatCustom} from '../helpers/NumberFormatCustom'
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import OrganizerHeader from "./OrganizerHeader";
import Box from '@material-ui/core/Box';
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import SaveIcon from "@material-ui/icons/Save";

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
    },

    textField: {
        margin:'10px',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    paperChip: {
        width: '50%',
        height: '20%',
        marginTop: theme.spacing(3),
    },
    saveButton:{
        '&:hover': {
            backgroundColor: '#e13434',
        }
    }
}));

function EventFormPage(props) {

    const classes = useStyles();

    let initStateName,initStateDateStart,initStateDateEnd, initStateDesc, initStateLoc, initStateCap, initStatePrice;
    let initStateTags = [];

    if(props.event != undefined){
        initStateName = props.event.name;
        initStateTags = props.event.tags;
        initStateDateEnd = props.event.dateEnd;
        initStateDateStart = props.event.dateStart;
        initStateCap = props.event.capacity;
        initStateDesc = props.event.description;
        initStateLoc = props.event.location;
        initStatePrice = props.event.price;
    }

    const [eventName, setEventName] = useState(initStateName);
    const [eventDateStart, setEventDateStart] = useState(initStateDateStart);
    const [eventDateEnd, setEventDateEnd] = useState(initStateDateEnd);
    const [price, setPrice] = useState(initStatePrice);
    const [capacity, setCapacity] = useState(initStateCap);
    const [location, setLocation] = useState(initStateLoc);
    const [description, setDescription] = useState(initStateDesc);
    const [selectedTags, setSelectedTags]  = React.useState(initStateTags);
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
            {key: 13, data: 'Outdoor'},
            {key: 14, data: 'Festival'},
            {key: 15, data: 'Music'},
        ]
    );



    function handleClickTag(data) {
        let sTags = [];
        selectedTags.map((tag,index)=>{
            sTags.push(tag);
        });
        tags.map((tag,index)=>{
            if(tag.key === data.key && !sTags.includes(data)){
                sTags.push(tag);
                tags.splice(index,1)
            }
        });
        setTags(tags);
        setSelectedTags(sTags);
    }
    function handleDeleteTag(data) {
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

    function handleSubmit(e) {
        e.preventDefault();

        let event = props.event;
        if (event === undefined) {
            event = {};
        }
        event.name = eventName;
        event.dateStart = eventDateStart;
        event.dateEnd = eventDateEnd;
        event.status = "A";
        event.price = price;
        event.capacity = capacity;
        event.location = location;
        event.description = description;
        event.tags = selectedTags;
        props.onSubmit(event);
    }

    return (
        <div className={classes.root}>
            <OrganizerHeader/>
                <Grid container spacing={3} >
                    <Grid item xs={11}>
                        <div className={classes.paperTop} >
                        <form  onSubmit={handleSubmit} onReset={() => props.history.push('/organizer')}>

                            <TextField
                                margin='dense'
                                autoComplete="eventName"
                                name="eventName"
                                fullWidth={true}
                                variant="standard"
                                required
                                id="eventName"
                                label="Event Name"
                                autoFocus
                                value={eventName}
                                onChange={e => setEventName(e.target.value)}
                            />
                            <Box display="flex" flexDirection="row" >
                                <Box p={1}>

                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DateTimePicker
                                            label="Event start date"
                                            value={eventDateStart}
                                            onChange={(e) => {
                                                let d = e.toISOString();
                                                // console.log(d);
                                                setEventDateStart(d);
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>

                                </Box>
                                <Box p={1}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DateTimePicker
                                            label="Event end date"
                                            value={eventDateEnd}
                                            onChange={(e) => {
                                                    let d = e.toISOString();
                                                    // console.log(d);
                                                    setEventDateEnd(d);
                                                }
                                            }
                                        />
                                    </MuiPickersUtilsProvider>
                                </Box>
                            </Box>
                        <Box display="flex" flexDirection="row" >
                            <Box p={1}>
                            <TextField
                                className={classes.textField}
                                label="Price"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                name="eventPrice"
                                id="eventPrice"
                                size='small'
                                InputProps={{
                                    inputComponent: NumberFormatCustom,
                                }}
                            />
                            </Box>
                            <Box p={1}>
                                <TextField
                                    className={classes.textField}
                                    label="Capacity"
                                    value={capacity}
                                    onChange={e => setCapacity(e.target.value)}
                                    name="eventCapacity"
                                    id="eventCapacity"
                                    size='small'
                                    InputProps={{
                                        inputComponent: NumberFormat,
                                    }}
                                />
                            </Box>
                            <Box p={1}>
                                <TextField
                                    className={classes.textField}
                                    name="eventLocation"
                                    variant="standard"
                                    id="eventLocation"
                                    label="Location"
                                    size='small'
                                    autoFocus
                                    value={location}
                                    onChange={e => setLocation(e.target.value)}
                                />
                            </Box>
                        </Box>
                            <TextField
                                margin='dense'
                                name="eventDescription"
                                variant="standard"
                                multiline
                                rows={5}
                                fullWidth={true}
                                id="eventDescription"
                                label="Description"
                                autoFocus
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        <Box display="flex" flexDirection="row">
                            <Box p={1}>
                            <Typography>Selected Tags</Typography>
                            </Box>
                            <Box p={1}>
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
                            </Box>
                        </Box>
                            <Paper >
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
                    <Box display="flex" justifyContent="flex-end" m={1} p={1}>
                    <Button id="submit" type="submit" startIcon={<SaveIcon />} className={classes.saveButton}
                            disabled={eventName === undefined || eventName === '' || eventDateStart === undefined || eventDateStart === ''}
                    >Save</Button>
                    <Button id="reset" type="reset">Dismiss</Button>
                    </Box>
                </form>
                        </div>
                    </Grid>
                </Grid>
            </div>
    );
}

export default withRouter(EventFormPage);