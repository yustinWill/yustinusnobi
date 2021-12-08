import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKey } from '../configs/GlobalConfig';

/**
 * Run the function after x ms
 * @param {milisec} ms 
 */
export function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export const isEmptyResult = (result) => {
    return Array.isArray(result) && result.length == 0
}

export function isJSON(str) {
    try {
        return (JSON.parse(str) && !!str);
    } catch (e) {
        return false;
    }
}

export const inputValidation = (inputFunction, validation = '') => (value) => {
    switch (validation) {
        case 'alphanumeric':
            value = value.replace(/[^a-zA-Z 0-9]/g, "")
            inputFunction(value)
            break;
        case 'alphabet':
            value = value.replace(/[^a-zA-Z]/g, "")
            inputFunction(value)
            break;
        case 'number':
        default:
            value = value.trim()
            value = value.replace(/[^0-9$.]/g, '')
            inputFunction(value)
            break;
    }
}

/**
 * Check the formatting of string
 * @param {String} param 
 */
export function isEmail(param) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return reg.test(param)
}

/**
 * Return the user_data Local Storage :
 * @param {milisec} ms 
 */
export function getUserToken() {
    return new Promise((resolve, reject) => {
        try {
            AsyncStorage.getItem(StorageKey.USER_TOKEN, (err, res) => {
                if (res) resolve(res)
                else resolve(err)
            })
        } catch (e) {
            reject(e)
        }
    })
}

/**
 * Transform Object to Array Form URL Encoded
 * @param {Object} post_data Data to sent to API
 * @returns Array
 */
export const processBodyFormUrlEncode = (post_data) => {
    // if (!isJSON(post_data)) throw "Not valid JSON"

    var formBody = [];

    for (var item in post_data) {
        var encodedKey = encodeURIComponent(item);
        var encodedValue = encodeURIComponent(post_data[item]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    return formBody
}