import { MODULE_API, API_KEY } from "@env"

const injectExtraParams = (params: any) => {
    let data: any = {
        ...params,
        apikey: API_KEY,
        id_lang: 1,
        id_shop: 1,
        device_type: 'apps'
    };

    data = new URLSearchParams(data).toString();

    return data;
}

const NetsuiteAPIService = {

    async getMethod(url: any, data: any = {}) {

        return await fetch(MODULE_API + url + '?' + new URLSearchParams(data))
    },

    async putMethod(url: any, data: any = {}) {

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        const options = {
            method: 'PUT',
            headers: myHeaders,
            body: injectExtraParams(data)
        };

        return await fetch(MODULE_API + url, options);
    },

    async postMethod(url: any, data: any = {}) {

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        const options = {
            method: 'POST',
            headers: myHeaders,
            body: injectExtraParams(data)
        };

        return await fetch(MODULE_API + url, options);
    },

    async deleteMethod(url: any, data: any = {}) {

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        const options = {
            method: 'DELETE',
            headers: myHeaders,
            body: injectExtraParams(data)
        };

        return await fetch(MODULE_API + url, options);
    },

}

export default NetsuiteAPIService;
