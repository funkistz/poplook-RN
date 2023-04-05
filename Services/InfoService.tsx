import APIService from "./ApiService";

const InfoService = {

    async getCountries() {
        return APIService.getMethod('preferences/shippingto');
    },

    async countryList() {
        return APIService.getMethod('infos/countries');
    },

    async stateList(code: String) {

        return APIService.getMethod('infos/countries/' + code);
    },
}

export default InfoService;