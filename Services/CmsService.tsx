import APIService from "./ApiService";
import api from "./AxiosService";

const CmsService = {

    async getCmsDetails(data: any) {

        const url = 'infos/';

        return APIService.getMethod(url + data);

    },

    async getCsDetails() {

        const url = 'Infos/contactus_pages';

        return APIService.getMethod(url);
    
    },

    async sendEmail(params: any) {

        const url = 'cms/send_email';

        return await api.post(url, params)
    
    },
    

}

export default CmsService;