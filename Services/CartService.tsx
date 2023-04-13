import APIService from "./ApiService";

const CartService = {

    async getCart(cartId: String | Number) {
        const param = {
            id: String(cartId)
        };

        return APIService.getMethod('Carts/cart', param);
    },

    async addToCart(params: any) {

        console.log('addToCart', params);
        return APIService.putMethod('Carts/add', params);
    },

    async cartStep1(cartId: String | Number, giftId: String, giftMesssage: String, gift: Number|String) {

        const params = {
            id_cart: String(cartId),
            gift: gift,
            gift_message: giftMesssage,
            gift_wrap: gift,
            gift_wrap_id: giftId,
        };

        return APIService.getMethod('Carts/OrderStep1', params);
    },

    async cartStep2(cartId: String | Number, addressId: String) {

        const params = {
            id_cart: String(cartId),
            id_address_delivery: String(addressId),
            id_address_billing: String(addressId)
        };

        return APIService.getMethod('Carts/OrderStep2', params);
    },

    async cartStep3(cartId: String | Number, addressId: String, carrierId: String) {

        const params = {
            id_cart: String(cartId),
            id_address_delivery: String(addressId),
            id_carrier: String(carrierId),
            // is_store_customer: cartId.toString(),
            // message: cartId.toString(),
            // gift: cartId.toString(),
            // gift_message: cartId.toString(),
        };

        return APIService.getMethod('Carts/OrderStep3', params);

    },

    async cartStep4(cartId: String | Number, paymentType: String, message: any) {

        const params = {
          id_cart: cartId,
          payment: paymentType,
          message: message,
          // gift: cartId.toString(),
          // gift_message: cartId.toString(),
          // is_store_customer: cartId.toString(),
        };
    
        return APIService.getMethod('Carts/OrderStep4', params);
    },
    
    async cartStep5(orderId: String | Number, status: any, paymentType: any, transactionId: any, amount: any) {
    
        const params = {
          id_order: String(orderId),
          transaction_status: status,
          payment_type: String(paymentType),
          transaction_id: String(transactionId),
          total_paid: amount,
        };
    
        return APIService.getMethod('Carts/OrderStep5', params);
    }


}

export default CartService;