import APIService from "./ApiService";

const CategoryService = {

    async getCategories() {

        const url = 'menus/get_active_mobile_menu';

        return APIService.getMethod(url);

    }
}

export default CategoryService;