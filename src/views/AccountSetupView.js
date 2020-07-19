import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import UserHeader from "../components/UserHeader";
import AccountSetup from "../components/AccountSetup";

// TODO:: ON EMAIL CHANGE, Change ID of all events as well.
// TODO:: Disable OK Button of calendar upload if there is no item uploaded.

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },

}));

function AccountSetupView(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <UserHeader history={props.history}/>
            <AccountSetup> </AccountSetup>
        </div>
    )
}

export default withRouter(AccountSetupView);