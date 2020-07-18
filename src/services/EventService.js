import HttpService from './HttpService';
import {eventURL} from '../config';


export default class EventService {

    constructor() {
    }

    static uploadCalendar(username, events ) {

        return new Promise((resolve, reject) => {
            HttpService.post(`${eventURL}/${username}`, {
                username: username,
                events: {events},
            }, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }
    static getEvents(userId){
        return new Promise((resolve, reject) => {
            HttpService.get(`${eventURL}/users/${userId}`, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static getAllEvents(userId){
        return new Promise((resolve, reject) => {
            HttpService.get(`${eventURL}/all`, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }


    static getEvent(eventId) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${eventURL}/${eventId}`, function(data) {
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

    static deleteEvent(id) {
        return new Promise((resolve, reject) => {
            HttpService.remove(`${eventURL}/${id}`, function(data) {
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

    static updateEvent(event) {
        return new Promise((resolve, reject) => {
            HttpService.put(`${eventURL}/users/events/${event._id}`,event, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static createEvent(userId,event) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${eventURL}/users/${userId}/addEvent`, event, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static getEventsByOwnerId(userId) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${eventURL}/users/${userId}`, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

}