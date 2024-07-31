import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: JSON.parse(localStorage.getItem('cartItems')) || [], // Load cart items from localStorage, or initialize with an empty array
    loading: false,
    error: null,
}

const CartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
    // Reducer to add or update an item in the cart
        addToCart: (state, action) => {
            let product = action.payload.product
            const quantity = Number(action.payload.quantity)
            const existingItemIndex = state.items.findIndex(
                (item) => item.product.id === product.id
            )
            if (existingItemIndex !== -1) {
                state.items[existingItemIndex].quantity = quantity
            } else {
                const item = {
                    product,
                    quantity,
                }
                state.items.push(item)
            }
            // Save updated cart items to localStorage
            localStorage.setItem('cartItems', JSON.stringify(state.items))
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(
                (item) => item.product.id !== action.payload
            )
             // Save updated cart items to localStorage
            localStorage.setItem('cartItems', JSON.stringify(state.items))
        },
    },
})
export const { addToCart, removeFromCart } = CartSlice.actions
export const SelectAllCartItems = (state) => state.cart.items
export const selectCartItems = (state) => state.cart.items

// Selector to get the total number of items in the cart
export const totalCartItems = (state) => {
    return state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
}

// Selector to get the total amount of the cart
export const TotalAmount = (state) => {
    return state.cart.items.reduce(
        (sum, item) => sum + item.quantity * item.product.price,
        0
    )
}

export default CartSlice.reducer
