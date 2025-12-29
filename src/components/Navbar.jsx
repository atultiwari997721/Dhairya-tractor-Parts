import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, ShoppingCart, Tractor } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4 backdrop-blur-md bg-black/60 border-b border-white/10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <Tractor className="w-8 h-8 text-red-500 group-hover:text-yellow-500 transition-colors" />
          <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent tracking-wider">
            Dhairya Tractor Parts
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <Link to="/" className="hover:text-red-500 transition-colors">HOME</Link>
          <Link to="/catalog" className="hover:text-red-500 transition-colors">PARTS CATALOG</Link>
          <Link to="/admin" className="hover:text-red-500 transition-colors">ADMIN</Link>
          
          <a 
            href="https://wa.me/919999999999?text=Hi,%20I%20want%20to%20order%20tractor%20parts" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-red-900/50 flex items-center gap-2"
          >
            <ShoppingCart size={18} />
            ORDER NOW
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 w-full bg-black/90 border-b border-white/10 py-4 flex flex-col items-center gap-4 text-gray-300"
        >
          <Link to="/" onClick={() => setIsOpen(false)}>HOME</Link>
          <Link to="/catalog" onClick={() => setIsOpen(false)}>CATALOG</Link>
          <Link to="/admin" onClick={() => setIsOpen(false)}>ADMIN</Link>
        </motion.div>
      )}
    </nav>
  )
}
