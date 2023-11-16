import APIService from "./ApiService";
import api from "./AxiosService";

const CategoryService = {

    async getCategories() {

        const url = 'menus/get_active_mobile_menu';

        return APIService.getMethod(url);

    },

    async getMenus() {

        const url = 'top_menu/mobile' ;

        return await api.get(url)

    },
}

export default CategoryService;