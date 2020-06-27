import React from 'react';

import logo from '../images/logo_withbackground.jpg'

import { makeStyles } from '@material-ui/core/styles';
//import { Divider } from '@material-ui/core';

import AppBar from '@material-ui/core/AppBar';
//import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
//import ListItemIcon from '@material-ui/core/ListItemIcon';
//import ListItemText from '@material-ui/core/ListItemText';
//import Menu from '@material-ui/core/Menu';
//import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
//import ExitIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
//import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
//import Tooltip from '@material-ui/core/Tooltip';

import { goToLoginPage } from '../router/functions'
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
	root: {
       display: 'flex',
    },
	logo: {
		maxWidth: 160,
	},
	rightButton: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	toolbar: {
        paddingLeft: 16,
        backgroudColor: '#ff5252',
    },
	toolbarButtons: {
		marginLeft: 'auto',
	},
	appBar:{
		background: '#69d0c3',
	},
});

function Header() {
	const classes = useStyles()
	
	return (
		<div className={classes.root}>
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar className={classes.toolbar}>
					<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
						<MenuIcon />
					</IconButton>
					<img src={logo} alt="logo" className={classes.logo}/>
					<Typography variant="title" color="inherit" style={{ flex: 1 }}>
					</Typography>
					<Button component= {Link} to='/login' color="inherit" className={classes.rightButton}>Login</Button>
					<Button component= {Link} to='/signup' color="inherit" className={classes.rightButton}>Sign Up</Button>
				</Toolbar>
			</AppBar>
        </div>
	)
}

export default Header;