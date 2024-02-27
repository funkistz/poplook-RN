import { store } from '../Redux/app';
import { API_URL, API_KEY, IOS_VERSION } from "@env"

const api_test = 'https://poplook.com/webapi/';

const APIService = {

    async injectParams(params: any, isString = true) {

        let id_shop = 1;
        let device_type = 'android';

        const state: any = store.getState();
        if (state && state.session && state.session.country) {
            id_shop = Number(state.session.country.id_shop);
        }

        if (state.session && state.session.device_type) {
            device_type = state.session.device_type;
        }

        let data: any = {
            ...params,
            apikey: API_KEY,
            id_lang: 1,
            id_shop: id_shop,
            device_type: device_type,
            api_version: 'apps',
            app_version: IOS_VERSION,
            shop: id_shop,
        };

        if (isString) {
            data = new URLSearchParams(data).toString();
        }

        return data;
    },
    async getMethod(url: any, data: any = {}) {

        data = await this.injectParams(data, false)

        return await fetch(api_test + url + '?' + new URLSearchParams(data))
    },

    async putMethod(url: any, data: any = {}) {

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        const params: any = await this.injectParams(data);

        const options = {
            method: 'PUT',
            headers: myHeaders,
            body: params
        };

        return await fetch(api_test + url, options);
    },

    async postMethod(url: any, data: any = {}) {

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        const params: any = await this.injectParams(data);

        const options = {
            method: 'POST',
            headers: myHeaders,
            body: params
        };

        return await fetch(api_test + url, options);
    },

    async deleteMethod(url: any, data: any = {}) {

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        const params: any = await this.injectParams(data);

        const options = {
            method: 'DELETE',
            headers: myHeaders,
            body: params
        };

        return await fetch(api_test + url, options);
    },

}

export default APIService;
