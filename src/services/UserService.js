import HttpService from './HttpService';
import {baseURL, eventURL} from '../config';
import ls from 'local-storage';
import axios from "axios";

export default class UserService {

    constructor() {
    }

    static register(user, pass, firstname, lastname, role, calendar, tags, showNearMe, eventList) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${baseURL}/register`, {
                username: user,
                password: pass,
                firstname: firstname,
                lastname: lastname,
                role: role,
                calendar: calendar,
                tags: tags,
                showNearMe: showNearMe,
                eventList: eventList
            }, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static login(user, pass) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${baseURL}/login`, {
                username: user,
                password: pass
            }, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static logout(){
        window.localStorage.removeItem('jwtToken');
        ls.clear();
    }

    static getCurrentUser() {
        let token = window.localStorage['jwtToken'];
        if (!token) return {};

        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        return {
            id : JSON.parse(window.atob(base64)).id,
            username: JSON.parse(window.atob(base64)).username
        };
    }

    static isAuthenticated() {
        return !!window.localStorage['jwtToken'];
    }
    static setShowNearMe(username,nearme){
        return new Promise((resolve, reject) => {
            HttpService.post(`${baseURL}/nearme`, {
                username: username,
                near_me: nearme
            }, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }
    static getUser(username){
        return new Promise((resolve, reject) => {
            HttpService.post(`${baseURL}/getUser`, {
                username: username,
            }, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }
    static addCommunicationInfo(username,mobilePhone,chatID){
        return new Promise((resolve, reject) => {
            HttpService.post(`${baseURL}/addCommunication`, {
                username: username,
                mobile: mobilePhone,
                chatid: chatID,
            }, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }
    static addAvatar(userId,image) {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('avatar',image);
            formData.append('_id',userId);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            return axios.post(`${baseURL}/uploadAvatar`, formData,config);
        });
    }

}