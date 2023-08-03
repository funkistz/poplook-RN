import api from "./AxiosService";

const StoreCreditService = {

    async getStoreCredit() {
        
        const url = 'store_credit';

        return api.get(url)

    },
}

export default StoreCreditService;