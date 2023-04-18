import APIService from "./ApiService";

const CmsService = {

    async getCmsDetails(data: any) {

        const url = 'infos/';

        return APIService.getMethod(url + data);

    }

}

export default CmsService;