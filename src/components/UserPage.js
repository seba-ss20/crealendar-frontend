import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { withRouter } from 'react-router-dom';

//TODO: remove this line after building "set the user account"

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

function UserPage () {

    const classes = useStyles();

		return (
			<Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className={classes.paper}>
                            succesfull login
            			</div>
            		</Container>
		)

}

export default withRouter(UserPage)