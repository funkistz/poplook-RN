import APIService from "./ApiService";

const CmsService = {

    async getCmsDetails(data: any) {

        console.log('dataservice', data);

        const url = 'infos/';

        return APIService.getMethod(url + data);

    },

    async getCsDetails() {

        const url = 'Infos/contactus_pages';

        return APIService.getMethod(url);
    
    }
    

}

export default CmsService;