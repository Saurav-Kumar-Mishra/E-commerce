import React from 'react'
import './SkeletonElement.css'
function SkeletonElement({ type }) {
    const classes = `skeleton ${type}`
    return <div className={classes}></div>
}

export default SkeletonElement
