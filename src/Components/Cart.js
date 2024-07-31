import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    removeFromCart,
    selectCartItems,
    TotalAmount,
} from '../Redux/Slices/CartSlice'
import { addToCart } from '../Redux/Slices/CartSlice'
import './Cart.css'
import EmptyCart from './EmptyCart'

const Cart = () => {
    const dispatch = useDispatch()
    const cartItems = useSelector(selectCartItems)
    const Total_Amount = useSelector(TotalAmount)

    // Handles removing an item from the cart
    const handleRemove = (id) => {
        dispatch(removeFromCart(id))
    }

    // Handles changing the quantity of an item in the cart
    function handleQuantity(qty, item) {
        dispatch(addToCart({ product: item.product, quantity: qty }))
    }

    return (
        <div className="cart-page-container">
            <div className="product-details-container">
                {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                        <div
                            key={item.product.id}
                            className="product-detail-card"
                        >
                            <img
                                src={item.product.image}
                                alt={item.product.title}
                                className="product-image"
                            />
                            <div className="product-info">
                                <h2 className="cart-product-title">
                                    {item.product.title}
                                </h2>
                                <p>Price: ${item.product.price}</p>
                                <div className=" qty-container">
                                    <p>Quantity:</p>

                                    <select
                                        value={item.quantity}
                                        onChange={(e) =>
                                            handleQuantity(e.target.value, item)
                                        }
                                        className="px-1"
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </div>
                                <p>
                                    item no:{' '}
                                    <span className="item-no">{index + 1}</span>
                                </p>
                                <button
                                    onClick={() =>
                                        handleRemove(item.product.id)
                                    }
                                    className="remove-button"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <EmptyCart />
                )}
            </div>
            <div className="cart-summary-container">
                <h2>Cart Summary</h2>
                <hr />
                <div className="summary-details">
                    <table>
                        <thead>
                            <tr>
                                <th>Item No</th>
                                <th>Qty.</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item, index) => (
                                <tr key={item.product.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.quantity}</td>
                                    <td>
                                        $
                                        {(
                                            item.product.price * item.quantity
                                        ).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <hr />
                    <p>Total Items: {cartItems.length}</p>
                    <p>Total Amount: ${Total_Amount.toFixed(2)}</p>
                </div>
                <button className="checkout-button">Proceed to Checkout</button>
            </div>
        </div>
    )
}

export default Cart
