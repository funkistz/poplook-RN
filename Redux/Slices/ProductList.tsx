import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import ProductService from "../../Services/ProductService";

export interface ProductList {
    page: number,
    count: number,
    limit: number,
    sort: number,
    items: any ,
    color: any,
    attribute: any,
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    message: any
}

const initialState: ProductList = {
    page: 1,
    count: 0,
    limit: 20,
    sort: 6,
    items: [],
    color: [],
    attribute: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const getFilterList = createAsyncThunk(
    'product/filter',
    async ({ categoryId, product_attribute, color , sort_option }: any, { getState, rejectWithValue }) => {
        try {
            const state: any = getState();

            const newParams = {
                shop: state.session.country.id_shop,
                category: categoryId,
                color: color.toString(),
                full: 1,
                product_attribute: product_attribute.toString(),
                sort_options: sort_option,
                num_list: state.productList.limit,
                num_page: state.productList.page,
            }

            const res = await ProductService.getFilter(newParams);
            let data = await res.json()

            if (res.status == 200) {
                if (data.code == 200) {
                    return {color: color, attribute: product_attribute, data: data}
                } else {
                    return rejectWithValue(data)
                }
            } else {
                return rejectWithValue(data)
            }
        } catch (err:any) {
            const message = err.response.data.message || err.toString();
            
            return rejectWithValue(message);
        }
    },
);

export const productListSlice = createSlice({
    name: 'productList',
    initialState,
    reducers: {
        reset: (state, action) => {

            // 
            const temp: any = {
                page: 1,
                count: 0,
                limit: 20,
                sort: 6,
                items: [],
                color: [],
                attribute: [],
                isError: false,
                isSuccess: false,
                isLoading: false,
                message: ''
            };

            state = { ...temp }

            return state;

        },
        scroll : (state, action) => {
            const JSONData = JSON.parse(JSON.stringify(state));
            const temp: any = {
                page: JSONData.page + 1,
                isSuccess: true,
                isLoading: true,
            };

            state = { ...state, ...temp }
            // 

            return state;
        },
        removeItem : (state, action) => {


            const JSONData = JSON.parse(JSON.stringify(state));
            const newSize = [...JSONData.attribute];
            const newColor = [...JSONData.color];
            const data = action.payload;

            const findIndexAttribute = newSize.includes(data)
            if(findIndexAttribute) {
                const index = newSize.indexOf(data)
                newSize.splice(index, 1);
                
            }

            const findIndexColor = JSONData.color.includes(data)
            if(findIndexColor) {
                const index = newColor.indexOf(data)
                newColor.splice(index, 1);
                
            }
            
            const temp: any = {
                attribute: [...newSize],
                color: [...newColor],
            };

            state = { ...state, ...temp }
            

            return state;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getFilterList.pending, state => {
            const JSONData = JSON.parse(JSON.stringify(state));
            const temp:any = {
                page: JSONData.page,
                count: JSONData.count,
                limit: JSONData.limit,
                sort: 6,
                items: JSONData.page === 1 ? [] : [...JSONData.items],
                // color: [],
                // attribute: [],
                isError: false,
                // isSuccess: false,
                isLoading: true,
                message: ''
            };
            state = {...state, ...temp};
            // 
            return state;
        
            
        })
        .addCase(getFilterList.fulfilled, (state, {payload}) => {

            const JSONData = JSON.parse(JSON.stringify(state));
            const result = payload.data.data;
            const temp:any = {
                page: result.pagination.current_page,
                count: result.pagination.total_items_color_group, // isse either total_items or total_items_color_group
                limit: result.pagination.limit_perpage,
                sort: JSONData.sort,
                items: JSONData.page === 1 ? [...result.products] : [...JSONData.items, ...result.products] ,
                color: [...payload.color],
                attribute: [...payload.attribute],
                isError: false,
                isSuccess: true,
                isLoading: false,
                message: ''
            };
            state = {...state, ...temp};
            // 
            return state;
        })
        .addCase(getFilterList.rejected, (state , {payload}) => {
            
            const JSONData = JSON.parse(JSON.stringify(state));
            

            return state;
        })
    },
})

// Action creators are generated for each case reducer function
export const { reset, scroll } = productListSlice.actions

export const  productListSelector = (state: any) => state.productList

export default productListSlice.reducer