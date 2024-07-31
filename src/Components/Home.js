import React from 'react'
import { fetchProducts } from '../Redux/Slices/ProductSlice'
import { useDispatch, useSelector } from 'react-redux'
import {
    SelectAllProducts,
    nextPage,
    prevPage,
    setCurrentPge,
} from '../Redux/Slices/ProductSlice'
import './Home.css'
import Filter from './Filter'
import { Link } from 'react-router-dom'
import SkeletonElement from './Skeleton/SkeletonElement'
import ProductCardSkeleton from './Skeleton/ProductCardSkeleton'
function Home() {
    const dispatch = useDispatch()
    const products = useSelector(SelectAllProducts)
    const productsPerPage = useSelector(
        (state) => state.products.productsPerPage
    )

    React.useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])
    // const error = useSelector((state) => state.products.error)
    const loading = useSelector((state) => state.products.loading)

    const currentPage = useSelector((state) => state.products.currentPage)
    const totalPages = Math.ceil(products.length / productsPerPage)
    const pages = [...Array(totalPages + 1).keys()].slice(1)
    const lastPageIndex = currentPage * productsPerPage
    const firstPageIndex = lastPageIndex - productsPerPage
    const visibleProducts = products.slice(firstPageIndex, lastPageIndex)
    function handleNextPage() {
        if (currentPage < totalPages) dispatch(nextPage())
    }
    function handlePrevPage() {
        if (currentPage > 1) dispatch(prevPage())
    }
    function handlePages(e) {
        dispatch(setCurrentPge(Number(e.target.innerText)))
    }

    if (products.length < 1)
        return (
            <div className="grid place-content-center text-2xl font-bold ">
                No product found
            </div>
        )

    return (
        <div className="container">
            {/* {loading ? <SkeletonElement type="card" /> : <Filter />} */}
            <Filter />
            <div className="product-page-container">
                {loading ? (
                    <SkeletonElement type="text" />
                ) : (
                    <p className="current-page">
                        page {currentPage} of {totalPages}
                    </p>
                )}
                <div className="product-container">
                    {loading
                        ? Array.from({ length: productsPerPage }).map(
                              (_, index) => (
                                  <div key={index} className="card">
                                      <ProductCardSkeleton />
                                  </div>
                              )
                          )
                        : visibleProducts.map((product) => {
                              return (
                                  <div key={product.id} className="card">
                                      <h3 className="product-title">
                                          {product.title.length > 15
                                              ? `${product.title.substring(
                                                    0,
                                                    20
                                                )}...`
                                              : product.title}
                                      </h3>
                                      <img
                                          src={product.image}
                                          alt={product.title}
                                          className="product-img"
                                      />

                                      <p className="product-price">
                                          Price: ${product.price}
                                      </p>
                                      <p className="product-desc">
                                          {product.description.length > 100
                                              ? `${product.description.substring(
                                                    0,
                                                    100
                                                )}...`
                                              : product.description}
                                      </p>
                                      <Link
                                          to={`/product/${product.id}`}
                                          className="see-more-btn"
                                      >
                                          See More
                                      </Link>
                                  </div>
                              )
                          })}
                </div>
                {loading ? (
                    <SkeletonElement type="text" />
                ) : (
                    <footer className="pagination-container">
                        <button onClick={handlePrevPage}>prev</button>
                        {pages.map((page) => {
                            return (
                                <button key={page} onClick={handlePages}>
                                    {page}
                                </button>
                            )
                        })}
                        <button onClick={(e) => handleNextPage(e)}>next</button>
                    </footer>
                )}
            </div>
        </div>
    )
}

export default Home
