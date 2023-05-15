import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import SearchService from "../../Services/SearchService";

export interface SearchList {
    page: number,
    count: number | null,
    limit: number,
    sort: number,
    items: any ,
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    message: any,
    keyword: any,
}

const initialState: SearchList = {
    page: 1,
    count: null,
    limit: 20,
    sort: 0,
    items: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    keyword: '',
}

export const getSearch: any = createAsyncThunk(
    'search/get',
    async ({ keyword, sort }: any, { getState, rejectWithValue }) => {
        try {

            const state: any = getState();
            const user = state.session.user.tier;
            const params = {
                keyword:  keyword,
                num_page: state.search.page,
                sort_options: sort ,
                tier: user,
            }
            // console.log('params: ', params)

            const res = await SearchService.getProducts(params);
            let data = await res.json()

            if (res.status == 200) {
                if (data.code == 200) {
                    return { keyword: keyword, sort: sort, data: data}
                } else {
                    return rejectWithValue(data)
                }
            } else {
                return rejectWithValue(data)
            }
        } catch (err:any) {
            const message = err.response.data.message || err.toString();
            console.log('Error Message: ', message )
            return rejectWithValue(err);
        }
    },
);

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        reset: (state, action) => {

            const JSONData = JSON.parse(JSON.stringify(state));
            const temp: any = {
                page: 1,
                count: 0,
                limit: 20,
                sort: 0,
                items: [],
                isError: false,
                isSuccess: false,
                isLoading: false,
                message: '',
                keyword: JSONData.keyword,
            };

            state = { ...temp }

            return state;

        },
        scroll : (state, action) => {
            // console.log('Enter Scroll Search.......')
            const JSONData = JSON.parse(JSON.stringify(state));
            const temp: any = {
                page: JSONData.page + 1,
            };

            state = { ...state, ...temp }
            // console.log('Result Scroll Search:', state)
            return state;
            
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getSearch.pending, state => {

            const JSONData = JSON.parse(JSON.stringify(state));
            const temp:any = {
                page: JSONData.page,
                count: JSONData.count,
                limit: JSONData.limit,
                items: JSONData.page === 1 ? [] : [...JSONData.items],
                isSuccess: false,
                isLoading: true,
                keyword: JSONData.keyword,
                sort: JSONData.sort,
            };
            state = {...state, ...temp};

            // console.log('Pending State GetList: ', state)
            return state;
        
        })
        .addCase(getSearch.fulfilled, (state, {payload}) => {

            const JSONData = JSON.parse(JSON.stringify(state));
            const result = payload.data;
            const keyword = payload.keyword;
            const sort = payload.sort;
            const temp:any = {
                page: parseInt(result.data.pagination.current_page) ,
                count:  parseInt(result.data.pagination.total_items),
                limit: parseInt(result.data.pagination.limit_perpage),
                items: JSONData.page === 1 ? [...result.data.result] : [...JSONData.items, ...result.data.result] ,
                isSuccess: true,
                isLoading: false,
                keyword: keyword,
                sort: sort,
            };
            state = {...state, ...temp};

            // console.log('Fulfill State GetList: ', state)
            return state;

        })
        .addCase(getSearch.rejected, (state, {payload}) => {
            console.log('Start Rejected.............')
            const JSONData = JSON.parse(JSON.stringify(state));
            console.log('State Reject: ',JSONData)
            console.log('State payload: ',payload)

            return state;

        })
    },
})

export const { reset, scroll } = searchSlice.actions

export default searchSlice.reducer