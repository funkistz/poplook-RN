import APIService from "./ApiService";
import { API_URL, API_KEY } from "@env"

const RegisterService = {

    async register(id_cart: String, shopId: String, data: any) {

        const params = {
            ...data,
            id_shop: shopId,
            id_cart: id_cart,
            apikey: API_KEY,
        };

        const url = 'Customers/registration';

        return APIService.putMethod(url, params);

    }

}

export default RegisterService;