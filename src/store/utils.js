const API_ROOT = 'http://codeial.codingninjas.com:8000/api/v2';

export const API_URLS = {
    login : `${API_ROOT}/users/login`,
    signup : `${API_ROOT}/users/signup`
}
export const LOCALSTORAGE_TOKEY_KEY = '__auth_token__';

export const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i ;

export const setItemInLocalStorage = (key , value) => {
    if(!key && !value) {
        return console.log("To store in localStorage , you have pass value and key to set item in it.")
    }

    const valueToStoreInLocalStorage = typeof value !== 'string' ? JSON.stringify(value) : value;
    localStorage.setItem(key , valueToStoreInLocalStorage);
}

export const getItemInLocalStorage = (key) => {
    if(!key) {
        return console.group("To fetch item from local storage , you have to pass the required key");
    }
    return localStorage.getItem(key);
}

export const removeItemFromLocalStorage = (key) => {
    if(!key) {
        return console.group("To fetch item from local storage , you have to pass the required key");
    }
    return localStorage.removeItem(key);
}

export const getFormBody = (params) => {
    let formBody = [];
    for(let property in params){
        let encodekey = encodeURIComponent(property);
        let encodeValue = encodeURIComponent(params[property]);
        formBody.push(encodekey+'='+encodeValue);
    }
    return formBody.join('&');
}