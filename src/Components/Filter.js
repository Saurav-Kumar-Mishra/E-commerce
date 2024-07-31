import React, { useState } from 'react'
import './Filter.css'
import {
    fetchCategories,
    selectAllCategories,
} from '../Redux/Slices/CategorySlice'
import { useDispatch, useSelector } from 'react-redux'
import {
    fetchProductsByCategories,
    fetchProducts,
} from '../Redux/Slices/ProductSlice'

function Filter() {
    const [showCategoriesItems, setShowCategoriesItems] = useState(false)   // State to control visibility of categories
    const [selectedCategories, setSelectedCategories] = useState([])     // State to keep track of selected categories
    const dispatch = useDispatch()
    const categories = useSelector(selectAllCategories)

    // Fetch categories when the component mounts
    React.useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch])

    // Toggle the visibility of category items
    function handleCategories() {
        setShowCategoriesItems((prev) => {
            return !prev
        })
    }

     // Fetch products based on selected categories
    React.useEffect(() => {
        if (selectedCategories.length > 0) {
            dispatch(fetchProductsByCategories(selectedCategories))
        } else {
            dispatch(fetchProducts())
        }
    }, [selectedCategories, dispatch])
    
    // Handle category checkbox change
    function handleCategoryChange(category) {
        setSelectedCategories((prevSelectedCategories) => {
            if (prevSelectedCategories.includes(category)) {
                return prevSelectedCategories.filter((id) => id !== category)
            } else {
                return [...prevSelectedCategories, category]
            }
        })
    }

    return (
        <section>
            <div className="filter">
                <h2>FILTERS</h2>
                <p id="sub-heading">100+ Products</p>
                <hr />
                <div className="category">
                    <div className="" id="category">
                        <p className="category-heading">Category</p>
                        {showCategoriesItems ? (
                            <svg
                                className="arrow"
                                onClick={handleCategories}
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 -960 960 960"
                                width="100"
                                fill="#000000"
                            >
                                <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" />
                            </svg>
                        ) : (
                            <svg
                                className="arrow"
                                onClick={handleCategories}
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 -960 960 960"
                                width="100"
                                fill="#000000"
                            >
                                <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                            </svg>
                        )}
                    </div>
                    <div
                        style={{
                            display: showCategoriesItems ? 'flex' : 'none',
                        }}
                        className="category-items"
                    >
                        {categories.map((category, index) => {
                            return (
                                <div key={index} id="category-item">
                                    <input
                                        type="checkbox"
                                        id={index}
                                        checked={selectedCategories.includes(
                                            category
                                        )}
                                        onChange={() =>
                                            handleCategoryChange(category)
                                        }
                                    />
                                    <label htmlFor={index}>{category}</label>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <hr />
            </div>
        </section>
    )
}

export default Filter
