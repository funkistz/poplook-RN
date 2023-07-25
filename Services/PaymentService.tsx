import APIService from "./ApiService";

const PaymentService = {

    async atome(cartId: any) {

        const params: any = {
            id_payment: 16,
            id_cart: cartId,
            // return_url: ''
        };

        return APIService.postMethod('PaymentProcessor/redirect_atomepayment', params);

    },

    async getPaymentInfo(refId: String) {

        let base64 = require("base-64");

        return fetch('https://api.apaylater.com/v2/payments/' + refId, {
            method: 'GET',
            headers: new Headers({ "Authorization": "Basic " + base64.encode('eac2f0df26f8403b998c2fae5a5e4f64' + ":" + 'd33f0678ad224f979e991682807e3adb') }),
        });

    },

    async payIpay(id_cart: any, customerId: any, paymentId: any, payment: any) {

        const params: any = {
            id_cart: id_cart,
            id_customer: customerId,
            id_payment: paymentId,
            payment: payment,
            return_url: 'https://poplook.com/modules/ipay88induxive/ipay88_mobile_bridge.php',
            callback_url: 'https://poplook.com/modules/ipay88induxive/backend_response.php'
        };

        return APIService.putMethod('PaymentProcessor/redirect_ipay88', params);

    },

    async repayIpay(orderId: any, customerId: any, paymentId: any, payment: any) {

        const params: any = {
            id_order: orderId,
            id_customer: customerId,
            id_payment: paymentId,
            payment: payment,
            return_url: 'https://poplook.com/modules/ipay88induxive/ipay88_mobile_bridge.php',
            callback_url: 'https://poplook.com/modules/ipay88induxive/backend_response.php'
        };

        return APIService.postMethod('PaymentProcessor/repay_ipay88', params);

    },

    async payIpayUsd(id_cart: any, customerId: any, paymentId: any) {

        const params: any = {
            id_cart: id_cart,
            id_customer: customerId,
            id_payment: paymentId,
            return_url: 'https://poplook.com/modules/ipay88induxive/ipay88_mobile_bridge.php',
            callback_url: 'https://poplook.com/modules/ipay88induxive/backend_response.php'
        };

        return APIService.putMethod('PaymentProcessor/redirect_usdcc', params);

    },

    async repayIpayUsd(orderId: any, customerId: any, paymentId: any) {

        const params: any = {
            id_order: orderId,
            id_customer: customerId,
            id_payment: paymentId,
            return_url: 'https://poplook.com/modules/ipay88induxive/ipay88_mobile_bridge.php',
            callback_url: 'https://poplook.com/modules/ipay88induxive/backend_response.php'
        };

        return APIService.postMethod('PaymentProcessor/repay_usdcc', params);

    },

    async eghl(cartId: any, orderId: any) {

        const params: any = {
            id_cart: cartId,
            id_order: orderId,
            id_payment: '4',
            return_url: 'https://poplook.com/modules/sgcreditcard/callback_mobile.php?return_url=1',
            callback_url: 'https://poplook.com/modules/sgcreditcard/callback_mobile.php'
        };

        return APIService.putMethod('PaymentProcessor/redirect_sgdcc', params);

    },

    async repayEghl(orderId: any, customerId: any) {

        const params: any = {
            id_order: orderId,
            id_customer: customerId,
            return_url: 'https://poplook.com/modules/sgcreditcard/callback_mobile.php?return_url=1',
            callback_url: 'https://poplook.com/modules/sgcreditcard/callback_mobile.php'
        };

        return APIService.postMethod('PaymentProcessor/repay_sgdcc', params);

    },

    async enets(cartId: any, orderId: any) {

        const params: any = {
            id_cart: cartId,
            id_order: orderId,
            id_payment: '5',
            callback_url: 'https://poplook.com/modules/enets/callback_mobile.php',
            return_url: 'https://poplook.com/modules/enets/enets_mobile_bridge.php',
        };

        return APIService.putMethod('PaymentProcessor/redirect_enets', params);

    },

    async repayEnets(orderId: any, customerId: any) {

        const params: any = {
            id_order: orderId,
            id_customer: customerId,
            callback_url: 'https://poplook.com/modules/enets/callback_mobile.php',
            return_url: 'https://poplook.com/modules/enets/enets_mobile_bridge.php',
        };

        return APIService.postMethod('PaymentProcessor/repay_enets', params);

    },

    async paypal(id_cart: any, customerId: any, paymentId: any) {

        const params: any = {
            id_cart: id_cart,
            id_customer: customerId,
            id_payment: paymentId,
            return_url: 'https://poplook.com/modules/ipay88induxive/ipay88_mobile_bridge.php',
            callback_url: 'https://poplook.com/modules/ipay88induxive/backend_response.php'
        };

        return APIService.putMethod('PaymentProcessor/redirect_paypalIpay88', params);

    },

    async repayPaypal(orderId: any, customerId: any, paymentId: any) {

        const params: any = {
            id_order: orderId,
            id_customer: customerId,
            id_payment: paymentId,
            return_url: 'https://poplook.com/modules/ipay88induxive/ipay88_mobile_bridge.php',
            callback_url: 'https://poplook.com/modules/ipay88induxive/backend_response.php'
        };

        return APIService.postMethod('PaymentProcessor/repay_paypalIpay88', params);

    },

}

export default PaymentService;

