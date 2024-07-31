import React from 'react'

import { RiShoppingBag4Line } from 'react-icons/ri'
import './NavigationBar.css'
import { totalCartItems } from '../Redux/Slices/CartSlice'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function NavigationBar() {
    const [sidebar, setSidebar] = React.useState('none')
    const totalItemsInCart = useSelector(totalCartItems)
    function handleSidebar() {
        setSidebar((prev) => {
            if (prev === 'none') return 'flex'
            else return 'none'
        })
    }
    return (
        <nav>
            {/* Section 1- Logo */}

            <div className="nav-logo">
                <RiShoppingBag4Line size={30} />
                <p>OneStopShop</p>
            </div>

            {/* Section 2- Links */}

            <ul className="nav-links">
                <li className="hideOnMobile">
                    <Link to="/home">HOME</Link>
                </li>
                <li className="hideOnMobile">
                    <Link to="/about">ABOUT</Link>
                </li>
                <li className="hideOnMobile">
                    <Link to="/contact">CONTACT</Link>
                </li>
                <div className="shop-cart">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#ffffff"
                    >
                        <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
                    </svg>
                    <sup className="total-items-count">{totalItemsInCart}</sup>
                    <Link to="/cart">Cart</Link>
                </div>

                <li className="showMenu" onClick={handleSidebar}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#ffffff"
                    >
                        <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
                    </svg>
                </li>
            </ul>
            <ul style={{ display: sidebar }} className="sidebar">
                <li onClick={handleSidebar}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#000000"
                    >
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                    </svg>
                </li>
                <li onClick={handleSidebar}>
                    <Link to="/home">HOME</Link>
                </li>
                <li onClick={handleSidebar}>
                    <Link to="/about">ABOUT</Link>
                </li>
                <li onClick={handleSidebar}>
                    <Link to="/contact">CONTACT</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavigationBar
