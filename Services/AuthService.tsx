import APIService from "./ApiService";
import md5 from 'md5';
import { useSelector } from 'react-redux';
import { API_KEY } from "@env"
import api from "./AxiosService";

const AuthService = {

    async login(data: any) {

        const params = {
            email: data.email,
            password: md5(data.password),
            id_cart: data.id_cart,
            shop: data.id_shop
        };

        console.log('PARAMSLOGIN' ,params)

        const url = 'login';

        return await api.post(url, params); 

    },

    register(id_cart: String, shopId: String, data: any) {

        const params = {
            ...data,
            id_shop: shopId,
            id_cart: id_cart,
            apikey: API_KEY,
        };

        const url = 'Customers/registration';

        return APIService.putMethod(url, params);

    },

    userId() {

        const session = useSelector((storeState: any) => storeState.session);

        if (session && session.user) {
            return session.user.id_customer;
        } else {
            return null;
        }

    },

    cartId() {

        const session = useSelector((storeState: any) => storeState.session);

        if (session && session.user) {
            return session.user.id_cart;
        } else {
            return 0;
        }

    },

    async updateUserInfo(customerId: any , params:any) {

        const url = 'customers/' + customerId;

        return await api.put(url, params);

    },

    forgotPassword(params:any) {

        const url = 'UserAuth/forgetPassword'; 

        return APIService.getMethod(url, params);
    },

    getVersion() {
        const url = 'Devices/versionInfo'; 

        return APIService.getMethod(url);
    },

    async customerDetails(data: any) {

        const params = {
            email: data,
        };

        const url = 'UserAuth/loginNoPassword';

        return APIService.getMethod(url, params);

    },
    async deleteAccount(data: any) {

        const params = {
            email: data,
        };

        const url = 'UserAuth/account_deletion';

        return APIService.postMethod(url, params);
    },
    


}

export default AuthService;