import APIService from "./ApiService";

const InfoService = {

    async getCountries() {
        return APIService.getMethod('preferences/shippingto');
    },

    async countryList(shopId: any) {

        const param = {
            shop: shopId
        };
        console.log('url' ,APIService.getMethod('infos/countries', param))
        return APIService.getMethod('infos/countries', param);
    },

    async stateList(code: String, shopId: any) {

        const param = {
            shop: shopId
        };

        return APIService.getMethod('infos/countries/' + code, param);
    },
}

export default InfoService;