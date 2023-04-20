import APIService from "./ApiService";

const StoreCreditService = {

    async getStoreCredit(id_customer: any) {
        const url = 'StoreCredits/list/customer/';

        return APIService.getMethod(url + id_customer , id_customer);

    },
}

export default StoreCreditService;