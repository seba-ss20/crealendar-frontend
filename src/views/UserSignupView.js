"use strict";

import React from 'react';
import Signup from '../components/Signup';
import UserService from '../services/UserService';


export class UserSignupView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: '',
        };
    }

    async signup(username, password) {
        try {
            let ret = await UserService.register(username, password);
            this.props.history.push('/');
        } catch(err) {
            console.error(err);
            this.setState({
                error: err
            });
        }
    }

    render() {
        return (
            <Signup signup={(username, password) => this.signup(username, password)} signupError={this.state.error}></Signup>
    );
    }
}