import React, {Component} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function Signup(props) {
	
	const { signupError } = props.signupError;
	const classes = useStyles();
	const [username, setUsername] = useState('');
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [usernameError, setUsernameError] = useState("");
	const [firstnameError, setFirstnameError] = useState("");
	const [lastnameError, setLastnameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
	const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [switchChecked, setSwitchChecked] = useState(false);
    const [userRole, setUserRole] = useState("");

	
	function handleSubmit(event) {
        event.preventDefault();
        username.length > 0 ? setUsernameError("") : setUsernameError("Username is empty");
        firstname.length > 0 ? setFirstnameError("") : setFirstnameError("First name is empty");
        lastname.length > 0 ? setLastnameError("") : setLastnameError("Last name is empty");
        password.length > 0 ? setPasswordError("") : setPasswordError("Passwort is empty");
		confirmPassword.length > 0 ? setConfirmPasswordError("") : setConfirmPasswordError("Passwort is empty");
		switchChecked ? setUserRole("Organizer") : setUserRole("User")
        const calendar = {
            uploaded: false,
            uploadDate: ""
        };
        const tags = [];
        const eventList = [];
        const showNearMe = false;

        if (username.length > 0 && password.length > 0 && confirmPassword.length > 0 && firstname.length > 0  && lastname.length > 0  && password.localeCompare(confirmPassword) === 0)
            props.signup(username, password, firstname, lastname, userRole, calendar, tags, showNearMe, eventList);
		else {
		    setConfirmPasswordError("Passwords do not match.")
		}
    }
	
	return (
		<Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
				<Typography component="h1" variant="h5" style={{ marginBottom: '22px' }}>
                    Sign up
                </Typography>
				<form onSubmit={handleSubmit}>
					<Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                error={usernameError || (signupError && signupError.length > 0)}
                                helperText={usernameError}
                                autoComplete="username"
                                name="username"
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                autoFocus
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                        </Grid>
						<Grid item xs={12}>
                            <TextField
                                error={passwordError || (signupError && signupError.length > 0)}
                                helperText={signupError ? signupError : passwordError}
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Grid>
						<Grid item xs={12}>
                            <TextField
                                error={confirmPasswordError || (signupError && signupError.length > 0)}
                                helperText={signupError ? signupError : confirmPasswordError}
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Confirm password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={firstnameError || (signupError && signupError.length > 0)}
                                helperText={firstnameError}
                                autoComplete="firstname"
                                name="firstname"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstname"
                                label="First name"
                                autoFocus
                                value={firstname}
                                onChange={e => setFirstname(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={lastnameError || (signupError && signupError.length > 0)}
                                helperText={lastnameError}
                                autoComplete="lastname"
                                name="lastname"
                                variant="outlined"
                                required
                                fullWidth
                                id="lastname"
                                label="Last name"
                                autoFocus
                                value={lastname}
                                onChange={e => setLastname(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Switch checked={switchChecked} onChange={e => setSwitchChecked(e.target.checked)}  />}
                                label="Are you an Event Organizer?" labelPlacement='start'
                            />
                        </Grid>
					</Grid>
					<Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}>
                        Sign up
					</Button>
				</form>
				{signupError ?
                    <Typography>{signupError}</Typography> :
                    null
                }
			</div>
		</Container>	
	)
}

export default withRouter(Signup);