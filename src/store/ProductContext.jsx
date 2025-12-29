import React, { createContext, useContext, useState, useEffect } from 'react'
import { INITIAL_PRODUCTS } from './data'

const ProductContext = createContext()

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => {
    // Load from local storage or use initial data
    const saved = localStorage.getItem('dhairya_products')
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS
  })

  useEffect(() => {
    localStorage.setItem('dhairya_products', JSON.stringify(products))
  }, [products])

  // Shop Details State
  const [shopDetails, setShopDetails] = useState(() => {
    const saved = localStorage.getItem('dhairya_shop_details')
    return saved ? JSON.parse(saved) : {
      phone: '+91 75091 76392',
      email: 'contact@dhairya.com', 
      location: 'Jabalpur, MP, India',
      latitude: '23.1815',
      longitude: '79.9864',
      gstId: '23AAAAA0000A1Z5'
    }
  })

  // Persist Shop Details
  useEffect(() => {
    localStorage.setItem('dhairya_shop_details', JSON.stringify(shopDetails))
  }, [shopDetails])

  const updateShopDetails = (details) => {
    setShopDetails(prev => ({ ...prev, ...details }))
  }

  // Auto-migration for existing localStorage data
  useEffect(() => {
    if (shopDetails.location === 'Indore, MP, India') {
      setShopDetails(prev => ({
        ...prev,
        location: 'Jabalpur, MP, India',
        latitude: '23.1815',
        longitude: '79.9864'
      }))
    }
  }, [])



  const addProduct = (product) => {
    setProducts(prev => [...prev, { ...product, id: Date.now(), stock: product.stock || 0 }])
  }

  const updateProduct = (id, updates) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p))
  }

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, shopDetails, updateShopDetails }}>
      {children}
    </ProductContext.Provider>
  )
}

export function useProducts() {
  return useContext(ProductContext)
}
