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
    },

    async updateAddress(params: any) {

        return APIService.postMethod('Addresses/updateAddress', params);
    },

    async deleteAddress(params: any) {

        return APIService.deleteMethod('Addresses/deleteAddress', params);
    }
}

export default AddressService;