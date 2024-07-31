import React from 'react'
import SkeletonElement from './SkeletonElement'
import './ProductCardSkeleton.css'

function ProductCardSkeleton() {
  return (
    <div className='product-card-container'>
    <SkeletonElement type="title"/>
    <SkeletonElement type="image"/>
    <SkeletonElement type="text"/>
    <SkeletonElement type="text"/>
    <SkeletonElement type="button"/>
    </div>
  )
}

export default ProductCardSkeleton
