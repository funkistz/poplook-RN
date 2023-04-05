import APIService from "./ApiService";
import { API_URL, API_KEY } from "@env"

const OrderHistoryService = {

  async orderHistoryList(customerId: any) {

    const url = 'Orders/histories/customer/';

    return APIService.getMethod(url + customerId);

  },

  async orderHistoryDetails(orderId: any) {

    const params = {
      id: orderId
    }

    const url = 'Orders/order/';

    return APIService.getMethod(url, params);
  },

  async cancelOrderHistory(orderId: any) {

    const params = {
      id_order: orderId,
      apikey: API_KEY
    }

    const url = 'Orders/cancel/';

    return APIService.postMethod(url, params);
  },

  async repay(cartId: any) {

    const params = {
      id_cart: cartId,
      apikey: API_KEY
    }

    const url = 'Orders/PayNowFromOrder';

    return APIService.getMethod(url, params);
  }


}

export default OrderHistoryService;