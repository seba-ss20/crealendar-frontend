import HttpService from './HttpService';
import {baseURL} from '../config';

export default class CalendarView {
    constructor() {
    }
    static uploadCalendar(user, calendar) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${baseURL}/upload_calendar`, {
                user: user,
                file: calendar,
            }, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            },'text/calendar');
        });
    }
}