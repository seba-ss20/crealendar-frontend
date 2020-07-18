import React from 'react';
import PropTypes from 'prop-types';
import { fade, makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import ls from 'local-storage'

// search bar
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';

// user list
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { FixedSizeList } from 'react-window';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles(theme => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
		  backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(0),
		marginLeft: 0,
		width: 300,
	  },
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
		  width: '20ch',
		},
	},
	information: {
        padding: 2,
        marginTop: 10,
    },
	listRoot: {
        borderColor: 'text.primary',
        borderStyle: 'solid',
		borderRadius: 10,
    },
}
));

type Props = {
    users: any,
};


function AddFriendsList(props: Props) {
	
	const classes = useStyles();
	const { eventData } = props;
	
	const [open, setOpen] = useState(false);
	
	
	const [selectedTags, setSelectedTags] = useState([]);
	const [username, setUsername] = useState('');
	const [items, setItems] = useState([
		{name: 'First User'},
		{name: 'Second User'},
		{name: 'Third User'},
	]);
	const [matchingUsers, setMatchingUsers] = useState([]);
	const loading = open && matchingUsers.length === 0;
	
	const [allUsers, setAllUsers] = useState();
	
	function sleep(delay = 0) {
	  return new Promise((resolve) => {
		setTimeout(resolve, delay);
	  });
	}
	
	React.useEffect(() => {
		
		let active = true;

		if (!loading) {
		  return undefined;
		}
		
		if (username === '') {
			setMatchingUsers([]);
		} else {
			(async () => {
				try {
					const response = await axios.get('http://localhost:3001/users/all', { params: {"username":username} })
					const data = await response.data;
					if (active) {
						setMatchingUsers(response.data);
						console.log("matching searched for users are: "+ matchingUsers)
					}
				} catch (error) {
					console.error(error);
				}
			})();
		}
		
		return () => {
		  active = false;
		};
	  }, [loading]);
	  
	React.useEffect(() => {
		if (!open) {
		  setMatchingUsers([]);
		}
	  }, [open]);
	
	// handles the highlighting in the recommended users for invites list
	const onClick = index => () => {
		const item = items[index];
		const newItems = [...items];
		newItems[index] = {...item, selected: !item.selected};
		setItems(newItems);
	};
	
	// send telegram message invites to seleceted users via "Crealendarbot"
	const sendTelegramMessage = event => {
		// collect all selected users 
		const allTagedUsers = [...selectedTags]
		const allSelectedUsers = items.filter(item => item.selected)
		const allUsers = allTagedUsers.concat(allSelectedUsers)
		setAllUsers(allUsers)
		
		// get logged in user _id and get username, mobile, chatID
		let loggeduser = ls.get('userObject');
		
		//send Telegram message invites to selected users
		allUsers.map(user => {
			const msg = "Hi there "+ user.username +"! "+ loggeduser.username +" send you an invite to "+ eventData.name +". You can reply to "+ loggeduser.telephoneNumber +" and discuss the details :)";
			axios.post('https://api.telegram.org/bot1295767580:AAExKza2L_COUlhxn0aIX3ajJHK4EWRy5WI/sendMessage', {"chat_id": 720148888, "text": msg}).then(response => {
				console.log(response.data);
			}).catch(err => {
				console.error(err);
			})
		})
	};
		
	
	return (
		<Container component="main"  maxWidth="xs" >
			<CssBaseline />
				<div className={classes.paper}>
					<Typography component="h1" variant="h5" >
                    See who might be interested
					</Typography>
					<div className={classes.information}></div>
					<div className={classes.search}>
						<div>
							<Autocomplete
								multiple
								selectOnFocus
								clearOnBlur
								handleHomeEndKeys
								open={open}
							    onOpen={() => {
								  setOpen(true);
							    }}
							    onClose={() => {
								  setOpen(false);
							    }}
								loading={loading}
								onChange={(event, value, reason) => setSelectedTags(value)}
								onInputChange={(event, value, reason) => console.log(value, reason)}
								id="search"
								size="small"
								getOptionLabel={(option) => option.username}
								noOptionsText='No matching users found'
								loadingText='Loading...'
								options={matchingUsers}
								renderInput={(params) => (
										 <TextField {...params} variant="standard"  placeholder="Search..."  onChange={e => setUsername(e.target.value)}
											classes={{root: classes.inputRoot,}} />
									  )}
							  />
						</div>
					</div>
					<div className={classes.information}></div>
					<div className={classes.root}>
						<List style={{ maxHeight: 400, minHeight: 400, maxWidth: 300, minWidth: 300 }} className={classes.listRoot}>
							{items.map((item, index) => (
								<ListItem key={index} button selected={item.selected} onClick={onClick(index)} >
									<ListItemText primary={item.name}>
									</ListItemText>
								</ListItem>
							))}
						</List>
					</div>
					<Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ marginTop: 22 }}
						onClick={sendTelegramMessage}
                    >
                        Send an invite
                    </Button>
				</div>
		</Container>
	);
};


// <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>

export default AddFriendsList;