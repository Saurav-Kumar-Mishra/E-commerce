import NavigationBar from './Components/NavigationBar'
import Home from './Components/Home'
import { Route, Routes } from 'react-router'
import ProductDetail from './Components/ProductDetail'
import { BrowserRouter } from 'react-router-dom'
import Cart from './Components/Cart'
import Footer from './Components/Footer'
function App() {
    return (
        <BrowserRouter>
            <NavigationBar />
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App
