import React, {useState} from 'react';
import { withRouter } from 'react-router-dom';
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

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

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
    },
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	  },
	  selectEmpty: {
		marginTop: theme.spacing(2),
	  },
}));

function PromotionFormPage(props) {

    const classes = useStyles();

    let initStateName,initStateDateStart, initStateDesc, initStatePrice, initStateDuration;
    let initStateTags = [];

    if(props.promotion != undefined){
        initStateName = props.promotion.name;
        initStateTags = props.promotion.tags;
        initStateDateStart = props.promotion.dateStart;
		initStateDuration = props.promotion.duration;
		initStatePrice = props.promotion.price;
        initStateDesc = props.promotion.description;
    }

    const [promotionName, setPromotionName] = useState(initStateName);
    const [promotionDateStart, setPromotionDateStart] = useState(new Date());
	const [promotionDuration, setPromotionDuration] = useState(initStateDuration);
    const [price, setPrice] = useState(30);
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
	
	const handleChange = (event) => {
			setPrice(event.target.value);
			setPromotionDuration(event.target.value);
		
	  };

    function handleSubmit(e) {
        e.preventDefault();

        let promotion = props.promotion;
        if (promotion === undefined) {
            promotion = {};
        }

        promotion.name = promotionName;
        promotion.dateStart = promotionDateStart;
		promotion.duration = promotionDuration;
        promotion.status = "A";
        promotion.price = price;
        promotion.description = description;
        promotion.tags = selectedTags;
        props.onSubmit(promotion);
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
                                autoComplete="promotionName"
                                name="promotionName"
                                fullWidth={true}
                                variant="standard"
                                required
                                id="promotionName"
                                label="Promotion Name"
                                autoFocus
                                value={promotionName}
                                onChange={e => setPromotionName(e.target.value)}
                            />
                            <Box display="flex" flexDirection="row" >
                                <Box p={1}>
                                    <FormControl component="fieldset">
										<FormLabel component="legend">Duration - Price</FormLabel>
											<RadioGroup row aria-label="position" name="position" defaultValue="30" onChange={handleChange}>
												 <FormControlLabel value="30" control={<Radio color="primary" />} label="30 days" />
												 <FormControlLabel value="60" control={<Radio color="primary" />} label="60 days" />
												 <FormControlLabel value="90" control={<Radio color="primary" />} label="90 days" />
											</RadioGroup>
									</FormControl>
                                </Box>
                                <Box p={1}>
									<TextField
											className={classes.textField}
											label="Price"
											value={price}
											name="promotionPrice"
											id="promotionPrice"
											size='small'
											InputProps={{
												inputComponent: NumberFormatCustom,
											}}
										/>
                                </Box>
                            </Box>
                            <TextField
                                margin='dense'
                                name="promotionDescription"
                                variant="standard"
                                multiline
                                rows={5}
                                fullWidth={true}
                                id="promotionDescription"
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
                            disabled={promotionName === undefined || promotionName === '' || promotionDateStart === undefined}
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

export default withRouter(PromotionFormPage);