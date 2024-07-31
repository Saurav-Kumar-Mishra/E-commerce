import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const initialState = {
    products: [],
    singleProduct: null,
    loading: false,
    error: null,
    productsPerPage: 12,
    currentPage: 1,
}

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await axios.get(
            'https://fakestoreapi.in/api/products?limit=150'
        )
        return response.data.products
    }
)

export const fetchProductsByCategories = createAsyncThunk(
    'products/fetchProductsByCategories',
    async (selectedCategories) => {
        const productPromises = selectedCategories.map((category) =>
            axios.get(
                `https://fakestoreapi.in/api/products/category?type=${category}`
            )
        )
        const responses = await Promise.all(productPromises)
        const allProducts = responses.flatMap((response) => response.data)
        return allProducts
    }
)

export const fetchSingleProduct = createAsyncThunk(
    'products/fetchSingleProduct',
    async (productId) => {
        const response = await axios.get(
            `https://fakestoreapi.in/api/products/${productId}`
        )
        return response.data
    }
)

const productSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {
        nextPage: (state) => {
            state.currentPage += 1
        },
        prevPage: (state) => {
            state.currentPage -= 1
        },
        setCurrentPge: (state, action) => {
            state.currentPage = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
        builder
            .addCase(fetchProductsByCategories.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchProductsByCategories.fulfilled, (state, action) => {
                state.loading = false
                const data = action.payload.map((product) => product.products)
                state.products = data.flat()
                state.currentPage=1;
            })
            .addCase(fetchProductsByCategories.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
        builder
            .addCase(fetchSingleProduct.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchSingleProduct.fulfilled, (state, action) => {
                state.loading = false
                state.singleProduct = action.payload.product
            })
            .addCase(fetchSingleProduct.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    },
})
export const { nextPage, prevPage, setCurrentPge } = productSlice.actions
export const SelectAllProducts = (state) => state.products.products
export const SelectSingleProduct = (state) => state.products.singleProduct

export default productSlice.reducer
