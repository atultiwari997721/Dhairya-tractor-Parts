import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Admin from './pages/Admin'

import { ProductProvider } from './store/ProductContext'

import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <ProductProvider>
      <BrowserRouter>
         <ScrollToTop />
         <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-red-500 selection:text-white">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                 <Route path="/" element={<Home />} />
                 <Route path="/catalog" element={<Catalog />} />
                 <Route path="/admin" element={<Admin />} />
              </Routes>
            </main>
            <Footer />
         </div>
      </BrowserRouter>
    </ProductProvider>
  )
}

export default App
