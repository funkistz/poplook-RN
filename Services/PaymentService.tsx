import APIService from "./ApiService";

const PaymentService = {

    async atome(cartId: any) {

        const params: any = {
            id_payment: 16,
            id_cart: cartId,
            return_url: ''
        };

        return APIService.postMethod('PaymentProcessor/redirect_atomepayment', params);

    },

    async eghl(orderId: any, customerId: any) {

        const params: any = {
            id_order: orderId,
            id_customer: customerId
        };

        return APIService.postMethod('PaymentProcessor/repay_sgdcc', params);

    },

    async getPaymentInfo(refId: String) {

        let base64 = require("base-64"); 
        
        return fetch('https://api.apaylater.net/v2/payments/' + refId, { 
            method: 'GET', 
            headers: new Headers({ "Authorization": "Basic " + base64.encode('fb9f8e94420c4dea8781d9282dbdc9e3' + ":" + '587c1346e7224210898b22f9d6e539cd') }),
        });;
    }

}

export default PaymentService;

