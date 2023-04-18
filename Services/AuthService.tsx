import APIService from "./ApiService";
import md5 from 'md5';
import { useSelector } from 'react-redux';

const AuthService = {

    async login(data: any) {

        const params = {
            email: data.email,
            password: md5(data.password),
            id_cart: data.id_cart,
            shop: data.id_shop
        };

        const url = 'UserAuth/login';

        return APIService.getMethod(url, params);

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

    }

}

export default AuthService;