import APIService from "./ApiService";

const CmsService = {

    async getCmsDetails(data: any) {

        console.log('dataservice', data);

        const url = 'infos/';

        return APIService.getMethod(url + data);

    }

}

export default CmsService;