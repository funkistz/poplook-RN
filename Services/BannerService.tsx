import APIService from "./ApiService";

const BannerService = {

    async getBanners() {

        return APIService.getMethod('banners/mobilev2');

    },

    async getBannersVideo() {

        return APIService.getMethod('banners/video');

    },

    async getStores() {

        return APIService.getMethod('banners/visit_our_store/visit_our_store_mobile');

    }
}

export default BannerService;