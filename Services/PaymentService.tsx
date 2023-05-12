import APIService from "./ApiService";
// import IPay88, { Pay } from "react-native-ipay88-integration";
import IPay88, { Pay } from "ipay88-sdk";

const PaymentService = {

    async atome(cartId: any) {

        const params: any = {
            id_payment: 16,
            id_cart: cartId,
            return_url: ''
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

    async repayIpay(orderId: any, customerId: any, paymentId: any) {

        const params: any = {
            id_order: orderId,
            id_customer: customerId,
            id_payment: paymentId,
            return_url: '',
            callback_url: ''
        };

        return APIService.postMethod('PaymentProcessor/repay_ipay88', params);

    },

    async repayIpayUsd(orderId: any, customerId: any, paymentId: any) {

        const params: any = {
            id_order: orderId,
            id_customer: customerId,
            id_payment: paymentId,
            return_url: '',
            callback_url: ''
        };

        return APIService.postMethod('PaymentProcessor/repay_usdcc', params);

    },

    ProcessIpay88(data: any) {

        try {
            const merchantCode = 'M01333_S0001'
            const merchantKey = 's8EXcXnvqK'

            const request: any = {
                paymentId: String(data.paymentId),
                merchantKey: merchantKey,
                merchantCode: merchantCode,
                amount: data.amount,
                remark: "Modest Fashion",
                referenceNo: String(data.referenceNo),
                productDescription: "Poplook Purchases",
                userName: data.userName,
                userEmail: data.userEmail,
                userContact: "0123456789",
                country: data.country,
                backendUrl: "https://poplook.com/modules/ipay88induxive/backend_response.php",
                currency: data.currency,
                utfLang: "UTF-8"

            };

            const response = Pay(request);
            console.log('result', response)

        } catch (e) {
            console.log(e);
        }

    },

    async eghl(cartId: any) {

        const params: any = {
            id_cart: cartId,
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

    async enets(cartId: any) {

        const params: any = {
            id_cart: cartId,
            id_payment: '5',
            return_url: 'https://poplook.com/modules/enets/callback_mobile.php?return_url=1',
            callback_url: 'https://poplook.com/modules/enets/callback_mobile.php'
        };

        return APIService.putMethod('PaymentProcessor/redirect_enets', params);

    },

    async repayEnets(orderId: any, customerId: any) {

        const params: any = {
            id_order: orderId,
            id_customer: customerId,
            return_url: 'https://poplook.com/modules/enets/callback_mobile.php?return_url=1',
            callback_url: 'https://poplook.com/modules/enets/callback_mobile.php'
        };

        return APIService.postMethod('PaymentProcessor/repay_enets', params);

    }

}

export default PaymentService;

