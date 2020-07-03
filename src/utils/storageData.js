/* eslint-disable */
/**
 * 全局数据存储
 * LocalStorage
 * cookie
 */
import Cookies from "js-cookie";

/**
* 设置存储的数据
* @param key String
* @param value String
* @param limit Boolean 是否过期（true ： 浏览器关闭后自动销毁）
* 此处数据存储 不做低版本兼容（默认都支持）
*/
export function setStorage(key,value,limit){
    if(!key) return;
    let valueStr = setValue2String(value);
    if(limit){ // sessionStorage
        sessionStorage.setItem(key, valueStr);
    }else{ // localStorage
        localStorage.setItem(key,valueStr);
    }
}
/**
* 获取key对应的value
* @param key
* @returns {*}
*/
export function getStorage(key){
    if(key){
        let val;
        if(localStorage.hasOwnProperty(key)){
            val = localStorage.getItem(key);
        }else if(sessionStorage.hasOwnProperty(key)){
            val = sessionStorage.getItem(key);
        } else {
            return null;
        }
        return val;
    }
}
/**
* 删除已存储的数据
* @param key
*/
export function removeStorage(key){
    if(key){
        if(localStorage.hasOwnProperty(key)){
            localStorage.removeItem(key);
        }else if(sessionStorage.hasOwnProperty(key)){
            sessionStorage.removeItem(key);
        }else{
            return {state: 'error', msg: '找不到数据！'}
        }
        return {state: 'success', msg: '删除成功！'}
    }else{
        sessionStorage.length && sessionStorage.clear();
        localStorage.length && localStorage.clear();
        return {state: 'success', msg: '数据已全部清除！'}
    }
}
/**
* 转换为字符串
* @param value
* @returns {*}
*/
export function setValue2String(value){
    if(Object.prototype.toString.call(value) === "[object Array]"){ // 数组
        return JSON.stringify(value);
    } else if(typeof value === "object"){
        return JSON.stringify(value);
    }else if(typeof value === "string"){
        return value;
    }else{
        return JSON.stringify(value);
    }
}

/**
 * 获取cookie、
 * @param name
 */
export function getCookie(name) {
    return Cookies.get(name);  // value || undefined
}

/**
 * 设置cookie
 * @param c_name
 * @param value
 * @param expiredays
 */
export function setCookie (c_name, value, expiredays) {
    if(expiredays){
        Cookies.set(c_name, value, expiredays);
    }else{
        Cookies.set(c_name, value);
    }
}

/**
 * 删除cookie
 * @param name
 */
export function delCookie (name) {
    Cookies.remove(name);
}