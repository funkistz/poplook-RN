import api from "./AxiosService";

const WishlistService = {

    async getWishlist(wishlistId: any) {

        const url = 'wishlist/' + wishlistId;

        return api.get(url)

    },

    async deleteWishlist(id_customer: any, id_wishlist:any, id_product:any, id_product_attribute: any) {

        const params = {
            id_customer: id_customer,
            id_wishlist: id_wishlist,
            id_product: id_product,
            id_product_attribute: id_product_attribute
        };

        const url = 'wishlist/' + id_wishlist;

        return api.delete(url, { data: params });

    },

    async addToWishlist(wishlistId: any, params: any) {

        const url = 'wishlist/' + wishlistId;

        return api.put(url, params);

    },

    async addToCart(wishlistId: any, params: any) {

        const url = 'wishlist/' + wishlistId + '/add_to_cart';

        return api.post(url, params);

    },

}

export default WishlistService;