import APIService from "./ApiService";

const SearchService = {

    async getProducts(data: any) {

        const params = {
            keyword: data.keyword,
            sort_options: data.sort_options,
            tier: data.tier,
            num_page: data.num_page,
        };


        const url = 'Products/search';

        return APIService.getMethod(url, params);

    },
}

export default SearchService;