import APIService from "./ApiService";

const AddressService = {

    async getAddressList(customerId: String) {
        const param = {
            id: String(customerId)
        };

        return APIService.getMethod('Addresses/customer', param);
    },

    async getAddressOne(addressId: String) {
    
        const param = {
          id: String(addressId)
        }
    
        return APIService.getMethod('Addresses/address', param);
    },

    async addAddress(params: any) {

        return APIService.putMethod('Addresses/addAddress', params);
    }

    
}

export default AddressService;