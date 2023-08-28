import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ProductService from '../../Services/ProductService';

export interface FilterState {
    // sort: Array<any>,
    sizes: Array<any> | null;
    colors: Array<any> | null;
}

const initialState: FilterState = {
    // sort: [],
    sizes: [],
    colors: []
}

export const getSizes: any = createAsyncThunk(
    "filter/sizes",
    async (_: void, { getState, rejectWithValue })  => {
        try {

            const response = await ProductService.getSize();
            let data = await response.json();

            if (data.code == 200) {
                return data
            } else {
                return rejectWithValue(data)
            }
        } catch (e: any) {
            rejectWithValue(e.response.data)
        }
    }
)

export const getColors: any = createAsyncThunk(
    "filter/colors",
    async (_: void, { getState, rejectWithValue })  => {
        try {

            const response = await ProductService.getColor();
            let data = await response.json();

            if (response.status == 200) {
                if (data.code == 200) {
                    return data
                } else {
                    return rejectWithValue(data)
                }
            } else {
                return rejectWithValue(data)
            }
        } catch (e: any) {
            rejectWithValue(e.response.data)
        }
    }
)


export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        clearFilter: (state) => {

            const temp: any = initialState;

            state = { ...state, ...temp }
            return state;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getSizes.fulfilled, (state, { payload }) => {

            const temp: any = {};

            if (payload.data) {
                temp.sizes = payload.data;

                state = { ...state, ...temp }
            }

            return state;
        }).addCase(getSizes.pending, (state, { payload }) => {

        }).addCase(getSizes.rejected, (state, { payload }) => {
            // GeneralService.toast({ description: payload.message });
        }).addCase(getColors.fulfilled, (state, { payload }) => {

            const temp: any = {};

            if (payload.data) {
                temp.colors = payload.data;

                state = { ...state, ...temp }
            }

            return state;
        }).addCase(getColors.pending, (state, { payload }) => {

        }).addCase(getColors.rejected, (state, { payload }) => {
            // GeneralService.toast({ description: payload.message });
        })
    },
})

// Action creators are generated for each case reducer function
export const { clearFilter } = filterSlice.actions

export const filterSelector = (state: any) => state.filter

export default filterSlice.reducer
