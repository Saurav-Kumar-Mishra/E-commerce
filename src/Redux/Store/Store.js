import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../Slices/ProductSlice'
import categoryReducer from '../Slices/CategorySlice'
import CartSlice from '../Slices/CartSlice'
const Store = configureStore({
    reducer: {
        products: productReducer,
        categories: categoryReducer,
        cart: CartSlice,
    },
})

export default Store
