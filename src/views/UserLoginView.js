"use strict";

import React from 'react';
import Login from '../components/Login'
import UserService from '../services/UserService';


export class UserLoginView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: ' ',
        };
    }

    async login(username, password) {
        try {
            let ret = await UserService.login(username, password);
            this.props.history.push('/user'); //TODO: remove this line after building "set the user account"
        } catch(err) {
            console.error(err);
            this.setState({
                error: err
            });
        }
    }

    render() {
        return (
            <Login login={(username, password) => this.login(username,password)} loginError={this.state.error}></Login>
    );
    }
}