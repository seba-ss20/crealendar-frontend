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

type Props = {
    signupError: any,
    signup: (username: string, password: string, confirmPassword: string) => void,
};

function Signup(props: Props) {
	
	const { signup, signupError } = props;
	const classes = useStyles();
	const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
	const [confirmPasswordError, setConfirmPasswordError] = useState("");
	
	function handleSubmit(event) {
        event.preventDefault();
        username.length > 0 ? setUsernameError("") : setUsernameError("Username is empty");
        password.length > 0 ? setPasswordError("") : setPasswordError("Passwort is empty");
		confirmPassword.length > 0 ? setConfirmPasswordError("") : setConfirmPasswordError("Passwort is empty");

        if (username.length > 0 && password.length > 0 && confirmPassword.length > 0 && password.length==confirmPassword.length)
            signup(username, password, confirmPassword);
		else {
			props.showError("Passwords do not match.")
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