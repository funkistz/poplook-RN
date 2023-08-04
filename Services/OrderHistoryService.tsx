import api from "./AxiosService";

const OrderHistoryService = {

  async orderHistoryList() {

    const url = 'order';

    return await api.get(url)

  },

  async orderHistoryDetails(orderId: any) {

    const url = 'order/' + orderId;

    return await api.get(url)

  },

  async cancelOrderHistory(orderId: any) {

    const url = 'order/' + orderId + '/cancel';

    return await api.post(url)

  },

  async repay(cartId: any) {

    const url = 'order/' + cartId + '/repay';

    return await api.get(url)

  }

}

export default OrderHistoryService;