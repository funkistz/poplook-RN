import APIService from "./ApiService";
import NetsuiteAPIService from "./NetsuiteApiService";

const ProductService = {

    async getProducts(data: any) {

        const params = {
            id: data.id,
            num_page: data.num_page,
            sort_by: data.sort_by,
        };

        const url = 'Products/category/id/' + data.id;

        return APIService.getMethod(url, params);

    },


    async getProduct(data: any) {

        const url = 'Products/details/id/' + data.product_id + '/shop/' + data.id_shop + '/lang/' + data.lang + '/full/' + data.full;

        return APIService.getMethod(url);

    },

    async getSize() {

        return APIService.getMethod(API_SIZE);

    },

    async getColor() {

        return APIService.getMethod(API_COLOR);

    },

    async getStoreAvailability(params: any) {
    
        return NetsuiteAPIService.getMethod(API_STORE_AVAILABILITY, params);

    },

    async getFilter(params: any) {
    
        return APIService.getMethod(API_FILTER, params);

    },
}

export const API_COLOR = 'Products/filterType/name/color'; 
export const API_SIZE = 'Products/filterType/name/size/lang/1'; 
export const API_FILTER = 'Products/filterCategoryProducts'; 
export const API_STORE_AVAILABILITY = 'poplookproductquantity/product_quantity_api.php';

export default ProductService;
