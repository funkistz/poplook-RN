import APIService from "./ApiService";

const BannerService = {

    async getBanners() {

        return APIService.getMethod('banners/mobilev2');

    }
}

export default BannerService;