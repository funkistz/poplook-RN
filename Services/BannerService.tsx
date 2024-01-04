import APIService from "./ApiService";
import api from "./AxiosService";

const BannerService = {

    async getBanners() {

        return APIService.getMethod('banners/mobilev2');

    },

    async getBannersVideo() {

        return APIService.getMethod('banners/video');

    },

    async getStores() {

        return APIService.getMethod('banners/visit_our_store/visit_our_store_mobile');

    },

    async getMobileBanners(shopId: any) {

        const param = {
            shop_id: shopId
        }

        const url = 'home_banner/mobile';

        return await api.get(url, { params : param })

    },

    async getCustomPage(link: any) {

        const param = {
            url: link
        }

        const url = 'custom_page';

        return await api.get(url, { params : param })

    },

    async getTopBanners(categoryId: any, shopId: any) {

        const param = {
            categoryId: categoryId,
            shop_id: shopId
        }

        const url = 'top_banner/mobile';

        return await api.get(url, { params : param })

    }
}

export default BannerService;