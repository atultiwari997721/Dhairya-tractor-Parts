import React, { useState, useMemo, useEffect } from 'react'
import { useProducts } from '../store/ProductContext'
import { BRANDS } from '../store/data'
import { Search, Filter, ShoppingCart } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

const ALL_Category = 'All'

export default function Catalog() {
  const { products } = useProducts()
  const [selectedBrand, setSelectedBrand] = useState('All')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const location = useLocation()

  // Handle URL Query Params
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const brandParam = params.get('brand')
    if (brandParam) {
        setSelectedBrand(brandParam)
    }
  }, [location.search])

  // Derive categories from products
  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category))
    return ['All', ...Array.from(cats)]
  }, [products])

  // Filter Products
  const filteredProducts = products.filter(product => {
    const matchesBrand = selectedBrand === 'All' || product.brand === selectedBrand
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.model.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesBrand && matchesCategory && matchesSearch
  })

  const handleOrder = (product) => {
    const message = `Hi, I am interested in buying *${product.name}* for *${product.model}* (Brand: ${product.brand}). Price: ₹${product.price}`
    window.open(`https://wa.me/917509176392?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <div className="bg-black min-h-screen pt-20 pb-20">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent mb-4">
            Parts Catalog
          </h1>
          <p className="text-gray-400">Find the perfect part for your tractor</p>
        </div>

        {/* Filters & Search */}
        <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/10 mb-10 backdrop-blur-sm sticky top-20 z-40 shadow-xl">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            
            {/* Search */}
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Search part name or model..." 
                className="w-full bg-black border border-gray-700 rounded-full py-2 pl-10 pr-4 text-white focus:outline-none focus:border-red-500 transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Brand Filter */}
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
              <button 
                onClick={() => setSelectedBrand('All')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedBrand === 'All' ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
              >
                All Brands
              </button>
              {BRANDS.map(brand => (
                <button 
                  key={brand.id}
                  onClick={() => setSelectedBrand(brand.id)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedBrand === brand.id ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                >
                  {brand.name}
                </button>
              ))}
            </div>

            {/* Category Filter */}
            <select 
              className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-red-500 w-full md:w-auto"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl">No parts found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5 }}
                className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-red-500/50 transition-all shadow-lg group"
              >
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <span className="absolute bottom-2 left-2 z-20 bg-red-600 text-white text-xs px-2 py-1 rounded-md font-bold uppercase">
                    {BRANDS.find(b => b.id === product.brand)?.name || product.brand}
                  </span>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg leading-tight text-white mb-1 line-clamp-2 min-h-[3rem]">{product.name}</h3>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">Fits: <span className="text-gray-200">{product.model}</span></p>
                  <p className="text-xs text-gray-500 mb-4 line-clamp-2">{product.description}</p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-bold text-yellow-400">₹{product.price}</span>
                    <button 
                      onClick={() => handleOrder(product)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                    >
                      <ShoppingCart size={16} /> Order
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
