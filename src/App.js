import NavigationBar from './Components/NavigationBar'
import Home from './Components/Home'
import { Route, Routes } from 'react-router'
import ProductDetail from './Components/ProductDetail'
import { BrowserRouter } from 'react-router-dom'
import Cart from './Components/Cart'
import Footer from './Components/Footer'
import About from './Components/About'
import Contact from './Components/Contact'
function App() {
    return (
        <BrowserRouter>
            <NavigationBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App
