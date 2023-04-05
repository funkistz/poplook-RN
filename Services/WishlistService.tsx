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

        // const params = {
        //     id_customer: id_customer,
        //     id_wishlist: id_wishlist,
        //     id_product: id_product,
        //     id_product_attribute: id_product_attribute,
        //     id_cart: id_cart,
        //     quantity: quantity
        // };

        return APIService.putMethod(url, params);

    },

    // async addToCart(params) {

    //     const url = this.apiService.apiUrl(API_MOVE_TO_CART);
    
    //     const options2: HttpOptions = {
    //       url: url,
    //       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //       data: {
    //         id_customer: params.id_customer,
    //         id_wishlist: params.id_wishlist,
    //         id_product: params.id_product,
    //         id_product_attribute: params.id_product_attribute,
    //         id_cart: params.id_cart,
    //         quantity: params.quantity,
    //         apikey: environment.apiKey
    //       },
    //       method: 'PUT'
    //     };
    
    //     const response: HttpResponse = await CapacitorHttp.request(options2);
    //     return response;
    //   }


}

export default WishlistService;