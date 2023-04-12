import APIService from "./ApiService";

const CartService = {

    async getCart(cartId: String | Number) {
        const param = {
            id: String(cartId)
        };

        return APIService.getMethod('Carts/cart', param);
    },

    async addToCart(params: any) {

        // console.log('addToCart', params);
        return APIService.putMethod('Carts/add', params);
    },

    async delToCart(params: any) {
        console.log('delToCart', params);
        return APIService.deleteMethod('Carts/removeProduct', params);
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

    async giftWrap(cartId: String, giftId: String, giftMesssage: String, gift: Number | String) {

        const params = {
            id_cart: cartId,
            gift: gift,
            gift_message: giftMesssage,
            gift_wrap: gift,
            gift_wrap_id: giftId,
        };

        return APIService.getMethod('Carts/OrderStep1', params);
    }

}

export default CartService;