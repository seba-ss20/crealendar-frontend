"use strict";

import HttpService from './HttpService';
import {apiURL,baseURL} from '../config';


export default class EventService {

    constructor() {
    }

    static uploadCalendar(username, events ) {

        return new Promise((resolve, reject) => {
            HttpService.post(`${apiURL}/event/${username}`, {
                username: username,
                events: {events},
            }, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }
    static getEvents(username){
        return new Promise((resolve, reject) => {
            HttpService.get(`${apiURL}/event/${username}`, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static getEvent(username,id) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${apiURL}/event/${username}/${id}`, function(data) {
                if(data != undefined || Object.keys(data).length !== 0) {
                    resolve(data);
                }
                else {
                    reject('Error while retrieving event');
                }
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static deleteEvent(username,id) {
        return new Promise((resolve, reject) => {
            HttpService.remove(`${apiURL}/event/${username}/${id}`, function(data) {
                if(data.message !== undefined) {
                    resolve(data.message);
                }
                else {
                    reject('Error while deleting Event with id ' + id);
                }
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static updateEvent(username,event) {
        return new Promise((resolve, reject) => {
            HttpService.put(`${apiURL}/event/${username}/${event.id}`,event, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static createEvent(username,event) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${apiURL}/event/${username}/${event.id}`, event, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

}