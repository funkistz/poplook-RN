import api from "./AxiosService";

const AddressService = {

    async getAddressList() {

        const url = 'address';

        return await api.get(url)

    },

    async getAddressOne(addressId: String) {

        const url = 'address/' + addressId;

        return await api.get(url)

    },

    async addAddress(params: any) {

        return await api.post('address', params);
    },

    async updateAddress(addressId: String, params: any) {

        return await api.put('address/' + addressId, params);
    },

    async deleteAddress(addressId: String) {

        return await api.delete('address/' + addressId);
    },

    async setDefaultAddress(params: any) {

        return await api.post('address/set_default_address/', params);
    },


}

export default AddressService;