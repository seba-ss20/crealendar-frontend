import React from 'react';
import Login from '../components/Login'
import UserService from '../services/UserService';
import {Role} from '../helpers/roles';
import Header from "../components/Header";
import {Router, Switch} from "react-router-dom";
import ls from 'local-storage'


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
            ls.set('userObject', ret['user']);
            console.log(ls.get('userObject'));
            if (ret['role'] === Role.Organizer){
                this.props.history.push('/organizer');
            }
            else if(ret['role'] === Role.User){
                this.props.history.push('/user');
            }
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
                <Login login={(username, password) => this.login(username,password)} loginError={this.state.error}></Login>
            </div>
    );
    }
}