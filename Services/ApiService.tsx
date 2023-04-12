import { store } from '../Redux/app';
import { API_URL, API_KEY } from "@env"

// import axios from 'axios';
// import { store } from '../Redux/app';
// store.subscribe(listener)

// function select(state: any) {
//     return state.auth.tokens.authentication_token
// }

// function listener() {
//     let token = select(store.getState())
//     axios.defaults.headers.common['Authorization'] = token;
// }

const injectExtraParams = (params: any, isString = true) => {
    let data: any = {
        ...params,
        apikey: API_KEY,
        id_lang: 1,
        id_shop: 1,
        device_type: 'apps',
        api_version: 'apps'
    };

    if (isString) {
        data = new URLSearchParams(data).toString();
    }

    return data;
}

const APIService = {

    async injectParams(params: any, isString = true) {

        let id_shop = 1;

        const state: any = store.getState();
        console.log('state from api', state.session.country);
        if (state && state.session && state.session.country) {
            id_shop = Number(state.session.country.id_shop);
        }

        let data: any = {
            ...params,
            apikey: API_KEY,
            id_lang: 1,
            id_shop: id_shop,
            device_type: 'apps',
            api_version: 'apps'
        };

        if (isString) {
            data = new URLSearchParams(data).toString();
        }

        return data;
    },
    async getMethod(url: any, data: any = {}) {

        data = await this.injectParams(data, false)

        // console.log('url', API_URL + url + '?' + new URLSearchParams(data));

        return await fetch(API_URL + url + '?' + new URLSearchParams(data))
    },

    async putMethod(url: any, data: any = {}) {

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        const options = {
            method: 'PUT',
            headers: myHeaders,
            body: injectExtraParams(data)
        };

        console.log('url', API_URL + url, options);

        return await fetch(API_URL + url, options);
    },

    async postMethod(url: any, data: any = {}) {

        const myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        const options = {
            method: 'POST',
            headers: myHeaders,
            body: injectExtraParams(data)
        };

        console.log('url', API_URL + url, options);

        return await fetch(API_URL + url, options);
    },

    async deleteMethod(url: any, data: any = {}) {

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        const options = {
            method: 'DELETE',
            headers: myHeaders,
            body: injectExtraParams(data)
        };

        // console.log('url', API_URL + url, options);

        return await fetch(API_URL + url, options);
    },

}

export default APIService;
