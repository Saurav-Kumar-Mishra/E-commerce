import React from 'react';
import { Link } from 'react-router-dom';
import './EmptyCart.css'; // Import the CSS file

function EmptyCart() {
    return (
        <div className="empty-cart-container">
            <div className="empty-cart-content">
                <p className="message">Your Cart is Empty!</p>
                <Link to="/home" className="shop-now-button">
                    Shop Now
                </Link>
            </div>
        </div>
    );
}

export default EmptyCart;
