import APIService from "./ApiService";
import IPay88, { Pay } from "react-native-ipay88-integration";
// import InAppBrowser from "react-native-inappbrowser-reborn";
import { MODULE_API } from "@env"

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

        return fetch('https://api.apaylater.net/v2/payments/' + refId, {
            method: 'GET',
            headers: new Headers({ "Authorization": "Basic " + base64.encode('fb9f8e94420c4dea8781d9282dbdc9e3' + ":" + '587c1346e7224210898b22f9d6e539cd') }),
        });
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

    },

    ProcessIpay88(data: any) {

        try {
            const merchantCode = 'M01333_S0001'
            const merchantKey = 'SSEXcXnvgK'

            const request: any = {
                paymentId: data.paymentId,
                merchantKey: merchantKey,
                merchantCode: merchantCode,
                referenceNo: data.referenceNo,
                amount: data.amount,
                currency: data.currency,
                productDescription: data.productDescription,
                userName: data.userName,
                userEmail: data.userEmail,
                userContact: "0123456789",
                remark: "Test",
                utfLang: "UTF-8",
                country: data.country,
                backendUrl: "https://poplook.com/modules/ipay88induxive/backend_response.php",
            };

            const response = Pay(request);
            console.log('result', response)

        } catch (e) {
            console.log(e);
        }

    },

    // openInAppBrowserForm (form: string) {

    //     const data = {
    //         form: form
    //     };

    //     return InAppBrowser.open(MODULE_API + 'enets/eghl_pay.php' + '?' + new URLSearchParams(data));
    // }


}

export default PaymentService;

