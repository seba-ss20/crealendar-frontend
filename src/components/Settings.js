import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import UserService from "../services/UserService";
import ls from "local-storage";
import {withRouter} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        alignItems: 'center',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        alignItems: 'center',
    },
}));

function Settings(props) {

    let user = ls.get('userObject');

    const classes = useStyles();
    const [mobilePhone, setMobilePhone] = useState(user.mobile);
    const [mobilePhoneError, setMobilePhoneError] = useState('');
    const [chatID, setChatID] = useState(user.chatID);
    const [chatIDError, setChatIDError] = useState('');


    function handleSubmit(event) {
        event.preventDefault();

        mobilePhone.length > 0 ? setMobilePhoneError("") : setMobilePhoneError("Mobile Phone is empty");
        chatID.length > 0 ? setChatIDError("") : setChatIDError("Chat ID is empty");

        UserService.addCommunicationInfo(user['username'],mobilePhone,chatID);

        props.history.push('/user');
    }

    return (
        <div className={classes.root}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} alignItems="center" justify="center">
                    <Grid item xs={12}>
                        <TextField
                            error={mobilePhoneError /*|| (signupError && signupError.length > 0)*/}
                            helperText={mobilePhoneError}
                            autoComplete="mobile"
                            name="mobile"
                            variant="outlined"
                            required
                            fullWidth
                            id="mobile"
                            label="Mobile Phone number"
                            autoFocus
                            value={mobilePhone}
                            onChange={e => setMobilePhone(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            error={chatIDError /*|| (signupError && signupError.length > 0)*/}
                            helperText={chatIDError}
                            autoComplete="chatid"
                            name="chatid"
                            variant="outlined"
                            required
                            fullWidth
                            id="chatID"
                            label="Telegram Chat ID"
                            autoFocus
                            value={chatID}
                            onChange={e => setChatID(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleSubmit}>
                    Submit Communication Details!
                </Button>
            </form>
        </div>
    );
}
export default withRouter(Settings);