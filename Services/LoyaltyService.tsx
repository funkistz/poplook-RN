import APIService from "./ApiService";

const LoyaltyService = {

    async getLoyalty(id_customer: any) {

        const url = 'Customers/loyalty';

        return APIService.getMethod(url, {id: id_customer});

    },

    async getFaqRewards() {

        const url = 'Infos/contactus_pages/desktop/1';

        return APIService.getMethod(url);

    },
}

export default LoyaltyService;