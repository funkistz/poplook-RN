import APIService from "./ApiService";

const VoucherService = {

    async validateVoucher(params:any) {

        return APIService.getMethod('vouchers/validate/'+ 'code/' + params.code + '/cart/' + params.id_cart + '/shop_id/' + params.shop_id );

    },

    async delValidateVoucher(params:any) {
        console.log('params: ', params)

        return APIService.deleteMethod('carts/removeVoucher', params);

    }


}

export default VoucherService;

