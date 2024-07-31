import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    categories: [],
    loading: false,
    error: null,
}

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async () => {
        const response = await axios.get(
            'https://fakestoreapi.in/api/products/category'
        )
        return response.data
    }
)

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false
                state.categories = action.payload.categories
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    },
})

export const selectAllCategories = (state) => state.categories.categories

export default categorySlice.reducer
