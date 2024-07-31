import React, { useEffect, useState } from 'react'
import './ProductDetail.css'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import {
    fetchSingleProduct,
    SelectSingleProduct,
} from '../Redux/Slices/ProductSlice'
import Spinner from './Spinner'
import { addToCart } from '../Redux/Slices/CartSlice'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProductDetailSkeleton from './ProductDetailSkeleton'
const ProductDetail = () => {
    const [quantity, setQuantity] = useState({
        qty: 1,
    })
    function handleQuantity(qty) {
        setQuantity({ qty })
    }

    function handleAddToCart() {
        if (product) {
            dispatch(addToCart({ product, quantity: quantity.qty }))
            toast('Added to Cart', {
                position: 'bottom-right',
                autoClose: 2000,
            })
        }
    }

    const dispatch = useDispatch()
    const { id } = useParams()

    const product = useSelector(SelectSingleProduct)
    const loading = useSelector((state) => state.products.loading)
    const error = useSelector((state) => state.products.error)

    useEffect(() => {
        dispatch(fetchSingleProduct(id))
    }, [dispatch, id])

    if (loading) return <ProductDetailSkeleton/>
    if (error) return <div>Error: {error}</div>
    if (!product) return <div>No product found</div>
    return (
        <div className="product-detail-container">
            <div className="image-container">
                <img src={product.image} alt={product.title} />
            </div>
            <div className="details-container">
                <h1>{product.title}</h1>
                <hr />
                {product.popular && <span className="popular">Popular</span>}
                <div className="discounted-container">
                    <p className="discount">
                        -{product.discount ? product.discount : 0}%
                    </p>
                    <div className="discounted-price-container">
                        <p className="currency">$</p>
                        <p className="discounted-price">
                            {(
                                product.price -
                                (product.discount / 100) * product.price
                            ).toFixed(2)}
                        </p>
                    </div>
                </div>
                <p className="price">
                    Price:
                    <span className="actual-price">${product.price}</span>
                </p>
                <p id="tax">Inclusive of all taxes</p>
                <p id="emi">EMI starts at $1. No Cost EMI available.</p>
                <hr />
                <p className="description">{product.description}</p>
                <p>
                    <strong>Brand:</strong> {product.brand}
                </p>
                <p>
                    <strong>Model:</strong> {product.model}
                </p>
                <p>
                    <strong>Color:</strong> {product.color}
                </p>
                <p>
                    <strong>Category:</strong> {product.category}
                </p>
                {product.discount > 0 && (
                    <p>
                        <strong>Discount:</strong> {product.discount}%
                    </p>
                )}
                <div className="cart-btn-qty-container">
                    <button
                        onClick={handleAddToCart}
                        className="add-to-cart-btn"
                    >
                        Add to cart
                    </button>
                    <div className=" qty-container">
                        <p>Quantity:</p>
                        <select
                            value={quantity.qty}
                            onChange={(e) => handleQuantity(e.target.value)}
                            className="px-1"
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
