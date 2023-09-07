import APIService from "./ApiService";
import api from "./AxiosService";

const CartService = {

    async getCart(cartId: String | Number) {

        const url = 'cart/' + cartId;

        return await api.get(url)

    },

    async addToCart(cartId: String | Number, params: any) {

        const url = 'cart/' + cartId;

        return await api.put(url, params);

    },

    async delToCart(cartId: any, id_product: any, id_product_attribute: any) {

        const params = {
            id_product: id_product,
            id_product_attribute: id_product_attribute,
        };

        const url = 'cart/' + cartId;

        return await api.delete(url, { data : params })

    },

    async cartStep1(cartId: String | Number, giftId: String, giftMesssage: String, gift: Number | String) {

        const params = {
            id_cart: String(cartId),
            gift: gift,
            gift_message: giftMesssage,
            gift_wrap: gift,
            gift_wrap_id: giftId,
        };

        const url = 'cart/' +cartId+ '/order_step1';

        return await api.get(url, { params : params })

    },

    async cartStep2(cartId: String | Number, addressId: String) {

        const params = {
            id_cart: String(cartId),
            id_address_delivery: String(addressId),
            id_address_billing: String(addressId)
        };

        const url = 'cart/' +cartId+ '/order_step2';

        return await api.get(url, { params : params })

    },

    async cartStep3(cartId: String | Number, addressId: String, carrierId: String) {

        const params = {
            // id_cart: String(cartId),
            // id_address_delivery: String(addressId),
            id_carrier: String(carrierId),
            // is_store_customer: cartId.toString(),
            // message: cartId.toString(),
            // gift: cartId.toString(),
            // gift_message: cartId.toString(),
        };

        const url = 'cart/' +cartId+ '/order_step3';

        return await api.get(url, { params : params } )

    },

    async cartStep4(cartId: String | Number, paymentType: String, message: any) {

        const params = {
            // id_cart: cartId,
            payment: paymentType,
            message: message,
            // gift: cartId.toString(),
            // gift_message: cartId.toString(),
            // is_store_customer: cartId.toString(),
        };

        const url = 'cart/' +cartId+ '/order_step4';

        return await api.get(url, { params : params } )

    },

    async cartStep5(cartId: String | Number, orderId: String | Number, status: any, paymentType: any, transactionId: any, amount: any) {

        const params = {
            id_order: String(orderId),
            transaction_status: status,
            payment_type: String(paymentType),
            transaction_id: String(transactionId),
            total_paid: amount,
        };

        const url = 'cart/' +cartId+ '/order_step5';

        return await api.get(url,  { params : params } )
        
    },

    async changeAddress(cartId: String | Number, addressId: String) {

        const params = {
            id_cart: String(cartId),
            id_address_delivery: String(addressId),
            id_address_billing: String(addressId)
        };

        const url = 'Carts/updateOrderSummary';

        return APIService.getMethod(url, params);

    },

    async addVoucher(cartId: String | Number, params: any) {

        return await api.post('cart/' + cartId + '/validate_voucher', params);

    },

    async deleteVoucher(cartId: String | Number, params: any) {

        return await api.delete('cart/' + cartId + '/remove_voucher', { data: params });

    }

}

export default CartService;