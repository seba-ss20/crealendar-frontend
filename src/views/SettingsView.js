import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CssBaseline from '@material-ui/core/CssBaseline';
import UserHeader from "../components/UserHeader";
import Settings from "../components/Settings";
import AccountSetup from "../components/AccountSetup";

// TODO:: ON EMAIL CHANGE, Change ID of all events as well.
// TODO:: Disable OK Button of calendar upload if there is no item uploaded.

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    paper: {
        marginTop: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

}));

function SettingsView(props) {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <UserHeader history={props.history}/>
            <div className={classes.paper}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>Account Setup</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <AccountSetup></AccountSetup>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography className={classes.heading}>Telegram and Phone setup</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div>
                            <Settings></Settings>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    )
}

export default withRouter(SettingsView);