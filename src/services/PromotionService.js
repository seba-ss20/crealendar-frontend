import HttpService from './HttpService';
import {promotionURL} from '../config';


export default class PromotionService {

    constructor() {
    }

    static getPromotions(username){
        return new Promise((resolve, reject) => {
            HttpService.get(`${promotionURL}/${username}`, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static getPromotion(promotionId) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${promotionURL}/${promotionId}`, function(data) {
                if(data != undefined || Object.keys(data).length !== 0) {
                    resolve(data);
                }
                else {
                    reject('Error while retrieving promotion');
                }
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

	// no
    static deletePromotion(id) {
        return new Promise((resolve, reject) => {
            HttpService.remove(`${promotionURL}/${id}`, function(data) {
                if(data.message !== undefined) {
                    resolve(data.message);
                }
                else {
                    reject('Error while deleting Promotion with id ' + id);
                }
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

	//no
    static updatePromotion(promotion) {
        return new Promise((resolve, reject) => {
            HttpService.put(`${promotionURL}/users/promotions/${promotion._id}`,promotion, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static createPromotion(userId,promotion) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${promotionURL}/users/${userId}/addPromotion`, promotion, function(data) {
                resolve(data);
				console.log("here")
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static getPromotionsByOwnerId(userId) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${promotionURL}/users/${userId}`, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

}