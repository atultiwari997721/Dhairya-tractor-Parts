import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import Scene from '../components/Scene' // 3D Background
import { ArrowRight, ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BRANDS } from '../store/data'
import { useProducts } from '../store/ProductContext'

export default function Home() {
  const { products } = useProducts()
  
  // Get latest 8 products
  const featuredProducts = useMemo(() => {
    return products.slice(-8).reverse()
  }, [products])

  const handleOrder = (product) => {
      const message = `Hi, I am interested in buying *${product.name}* for *${product.model}* (Brand: ${product.brand}). Price: ₹${product.price}`
      window.open(`https://wa.me/917509176392?text=${encodeURIComponent(message)}`, '_blank')
  }

const getBrandHoverClass = (color) => {
    const map = {
      'red': 'hover:shadow-red-500/50 hover:border-red-500',
      'blue': 'hover:shadow-blue-500/50 hover:border-blue-500',
      'blue-dark': 'hover:shadow-blue-900/50 hover:border-blue-900',
      'green': 'hover:shadow-green-500/50 hover:border-green-500',
      'orange': 'hover:shadow-orange-500/50 hover:border-orange-500',
      'orange-dark': 'hover:shadow-orange-700/50 hover:border-orange-700',
      'blue-light': 'hover:shadow-sky-400/50 hover:border-sky-400',
      'green-light': 'hover:shadow-lime-500/50 hover:border-lime-500',
      'gray': 'hover:shadow-gray-500/50 hover:border-gray-500',
    }
    return map[color] || 'hover:shadow-red-900/20'
  }

  return (
    <div className="bg-black min-h-screen text-white">
      {/* HERO SECTION */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* The 3D Component IS the background here */}
        <div className="absolute inset-0 w-full h-full">
            <Scene />
        </div>
        
        {/* Content Overlay */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-red-500 tracking-[0.2em] font-bold text-sm md:text-base mb-4 uppercase">
              Maihar's Best Shop
            </h2>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-none bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
              THE POWER OF <br /> FARMING
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Original parts for Mahindra, Swaraj, John Deere, and more. 
              Premium quality delivered to your doorstep.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link to="/catalog" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all">
                BROWSE PARTS <ArrowRight size={20} />
              </Link>
              <a href="https://wa.me/917509176392" className="border border-white/20 hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold transition-all">
                WHATSAPP US
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-20 bg-zinc-900 border-t border-zinc-800">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">Featured Parts</h2>
            <Link to="/catalog" className="text-gray-400 hover:text-white flex items-center gap-1">View Full Catalog <ArrowRight size={16} /></Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-black border border-zinc-800 rounded-xl overflow-hidden hover:border-red-500/50 transition-all shadow-lg group"
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
                    <h3 className="font-bold text-lg leading-tight text-white mb-1 line-clamp-1">{product.name}</h3>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">Fits: <span className="text-gray-200">{product.model}</span></p>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold text-yellow-400">₹{product.price}</span>
                    <button 
                      onClick={() => handleOrder(product)}
                      className="bg-zinc-800 hover:bg-green-600 text-white p-2 rounded-lg transition-colors"
                    >
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BRANDS SECTION */}
      <section className="py-20 bg-zinc-900 border-t border-zinc-800">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Supported Brands</h2>
            <a href="/catalog" className="text-red-500 hover:text-red-400 flex items-center gap-1">View All <ArrowRight size={16} /></a>
          </div>
          
          <div className="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-6">
            {BRANDS.map((brand) => (
              <Link to={`/catalog?brand=${brand.id}`} key={brand.id} className="contents">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className={`h-20 md:h-32 rounded-xl bg-white flex items-center justify-center p-2 md:p-4 cursor-pointer shadow-lg transition-all group overflow-hidden border-2 border-transparent ${getBrandHoverClass(brand.color)}`}
                >
                  <img 
                    src={brand.logo} 
                    alt={`${brand.name} Logo`} 
                    className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <span className="hidden text-black font-bold text-lg">{brand.name}</span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES / WHY CHOOSE US */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-12 items-center">
          <div className="p-4 md:p-8 border border-white/10 rounded-2xl bg-zinc-900/50">
            <h3 className="text-sm md:text-2xl font-bold mb-2 md:mb-4 text-white">Genuine Quality</h3>
            <p className="text-xs md:text-base text-gray-400">We source directly from manufacturers to ensure every piston, clutch, and filter is authentic.</p>
          </div>
          <div className="p-4 md:p-8 border border-white/10 rounded-2xl bg-zinc-900/50">
            <h3 className="text-sm md:text-2xl font-bold mb-2 md:mb-4 text-white">Fast Delivery</h3>
            <p className="text-xs md:text-base text-gray-400">Order via WhatsApp and get express shipping across India within 3-5 working days.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
