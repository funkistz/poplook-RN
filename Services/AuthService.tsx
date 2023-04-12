import APIService from "./ApiService";
import md5 from 'md5';
import { useSelector } from 'react-redux';

const AuthService = {

    async login(data: any) {

        const params = {
            email: data.email,
            password: md5(data.password),
            id_cart: data.id_cart,
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

    },
    updateUserInfo(params:any) {

        const url = 'Customers/editProfile';

        return APIService.postMethod(url, params);

    }
    // updateUserInfo(params:any) {

    //     const newParams = {
    //       ...params,
    //       apikey: environment.apiKey
    //     }
    //     return await this.apiService.post(API_PERSONAL_INFO, newParams);
    
    //     const body = new URLSearchParams();
    //     body.set('id_customer', params.id_customer);
    //     body.set('id_lang', params.id_lang);
    //     body.set('apikey', environment.apiKey);
    //     body.set('email', params.email);
    //     body.set('firstname', params.firstname);
    //     body.set('lastname', params.lastname);
    //     body.set('birthday', params.birthday);
    //     body.set('password', params.password);
    //     body.set('newsletter', params.newsletter);
    //     body.set('optin', params.optin);
    //     const options = {
    //       headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    //     };
    //     const url = this.apiService.apiUrl(API_PERSONAL_INFO);
    
    //     return this.http.post(url, body.toString(), options);
    //   }
    // },


}

export default AuthService;