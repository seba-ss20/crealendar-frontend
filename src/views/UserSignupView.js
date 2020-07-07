"use strict";

import React from 'react';
import Signup from '../components/Signup';
import UserService from '../services/UserService';
import Header from "../components/Header";


export class UserSignupView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: '',
        };
    }

    async signup(username, password, userRole) {
        try {
            let ret = await UserService.register(username, password, userRole);
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
            <div>
                <Header/>
                <Signup signup={(username, password, userRole) => this.signup(username, password, userRole)} signupError={this.state.error}></Signup>
            </div>
        );
    }
}