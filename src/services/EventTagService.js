"use strict";

import HttpService from './HttpService';
import {apiURL,baseURL} from '../config';


export default class EventService {

    constructor() {
    }
    static setTagsOfUser(username, tags) {

        return new Promise((resolve, reject) => {
            HttpService.post(`${apiURL}/tag/set/${username}`, {
                username: username,
                tags: {tags},
            }, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }
    static addTagsToUser(username, tags) {

        return new Promise((resolve, reject) => {
            HttpService.post(`${apiURL}/tag/${username}`, {
                username: username,
                tags: {tags},
            }, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }
    static addTagsToEvent(eventID, tags){
        return new Promise((resolve, reject) => {
            HttpService.post(`${apiURL}/tag/${eventID}`,{
                event_id: eventID,
                tags: {tags}
            }, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static getTagsOfUser(username) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${apiURL}/tag/${username}`, function(data) {
                if(data !== undefined || Object.keys(data).length !== 0) {
                    resolve(data);
                }
                else {
                    reject('Error while retrieving tag');
                }
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }
    static getTagsOfEvent(event_id) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${apiURL}/tag/${event_id}`, function(data) {
                if(data !== undefined || Object.keys(data).length !== 0) {
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

    static listTags() {
        return new Promise((resolve, reject) => {
            HttpService.get(`${apiURL}/tag`, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    // TODO::
    static deleteTagFromUser(username,id) {
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
    //TODO::
    static deleteTagFromEvent(tag) {
        // return new Promise((resolve, reject) => {
        //     HttpService.remove(`${apiURL}/event/${username}/${event.id}`,event, function(data) {
        //         resolve(data);
        //     }, function(textStatus) {
        //         reject(textStatus);
        //     });
        // });
    }

}