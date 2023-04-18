import APIService from "./ApiService";

const WishlistService = {

    async getWishlist(wishlistId: any) {

        const param = {
            customer: wishlistId,
        };

        const url = 'Wishlists/list';

        return APIService.getMethod(url, param);

    },

    async deleteWishlist(id_customer: any, id_wishlist:any, id_product:any, id_product_attribute: any) {

        const params = {
            id_customer: id_customer,
            id_wishlist: id_wishlist,
            id_product: id_product,
            id_product_attribute: id_product_attribute
        };

        const url = 'Wishlists/removeProduct';

        return APIService.deleteMethod(url, params);

    },

    async addToWishlist(params: any) {

        const url = 'Wishlists/addProduct';

        return APIService.putMethod(url, params);

    },

    async addToCart(params: any) {

        const url = 'Wishlists/addProductCart';

        return APIService.putMethod(url, params);

    },

}

export default WishlistService;