import React from 'react'
import SkeletonElement from './SkeletonElement'
import './ProductDetailSkeleton.css'

function ProductDetailSkeleton() {
    return (
        <div className="product-detail-container">
            <div className="image-container">
                <SkeletonElement type="image" className="skeleton image" />
            </div>
            <div className="details-container">
                <SkeletonElement type="text" className="skeleton text large" />
                <hr />
                <div className="discounted-container">
                    <SkeletonElement type="text" className="skeleton text medium" />
                    <div className="discounted-price-container">
                        <SkeletonElement type="text" className="skeleton text medium" />
                        <SkeletonElement type="text" className="skeleton text medium" />
                    </div>
                </div>
                <SkeletonElement type="text" className="skeleton text medium" />
                <SkeletonElement type="text" className="skeleton text medium" />
                <SkeletonElement type="text" className="skeleton text small" />
                <SkeletonElement type="text" className="skeleton text small" />
            </div>
        </div>
    )
}

export default ProductDetailSkeleton
