import React, { useState, useEffect, Suspense, lazy } from 'react'
const ShopMap = lazy(() => import('../components/ShopMap'))
import { useProducts } from '../store/ProductContext'
import { BRANDS } from '../store/data'
import { Trash2, Plus, ShieldCheck, Lock, MapPin, Search, Printer, FileText, LayoutDashboard } from 'lucide-react'
import { motion } from 'framer-motion'
// import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
// import 'leaflet/dist/leaflet.css'
// import L from 'leaflet'

// Map Click Component
/*
function LocationMarker({ position, setPosition, setShopForm }) {
  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng
      setPosition([lat, lng])
      setShopForm(prev => ({
        ...prev,
        latitude: lat,
        longitude: lng,
        location: `Lat: ${lat.toFixed(4)}, Long: ${lng.toFixed(4)}`
      }))
    },
  })

  return position === null ? null : (
    <Marker position={position}></Marker>
  )
}
*/

export default function Admin() {
  const { products, addProduct, deleteProduct, updateProduct, shopDetails, updateShopDetails } = useProducts()
  
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('dashboard') // dashboard | billing | inventory

  // Shop Details Form State
  const [shopForm, setShopForm] = useState(shopDetails)
  const [mapPosition, setMapPosition] = useState(
    shopDetails.latitude ? [shopDetails.latitude, shopDetails.longitude] : [23.1815, 79.9864]
  )

  // ... (Keep existing handlers: handleShopChange, handleShopSubmit, handleFileChange, LocationMarker) ...

  // Inventory Filter State
  const [searchTerm, setSearchTerm] = useState('')

  // Filtered Products
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  // Handlers for Shop Details
  const handleShopChange = (e) => {
    setShopForm({ ...shopForm, [e.target.name]: e.target.value })
  }

  const handleShopSubmit = (e) => {
    e.preventDefault()
    updateShopDetails(shopForm)
    alert('Shop Details Updated!')
  }

  // --- BILLING STATE ---
  // ... (Keep existing Billing state and logic) ...
  const [billCustomer, setBillCustomer] = useState({ name: '', phone: '', address: '' })
  const [billItems, setBillItems] = useState([])
  const [selectedProduct, setSelectedProduct] = useState('')
  const [billQty, setBillQty] = useState(1)

  const addToBill = () => {
    if (!selectedProduct) return
    const product = products.find(p => p.id === parseInt(selectedProduct))
    if (!product) return

    const newItem = {
      ...product,
      qty: parseInt(billQty),
      total: product.price * parseInt(billQty)
    }
    setBillItems([...billItems, newItem])
    setSelectedProduct('')
    setBillQty(1)
  }

  const removeFromBill = (index) => {
    const newItems = [...billItems]
    newItems.splice(index, 1)
    setBillItems(newItems)
  }

  const billSubtotal = billItems.reduce((sum, item) => sum + item.total, 0)
  const billGST = billSubtotal * 0.18 // 18% GST default
  const billTotal = billSubtotal + billGST

  // --- ADD PRODUCT FORM STATE ---
  const [formData, setFormData] = useState({
    name: '',
    brand: 'mahindra',
    model: '',
    price: '',
    stock: '', // NEW Stock Field
    category: 'Engine',
    description: '',
    image: '',
    file: null,
    filePreview: ''
  })

  // Handlers
  const handleLogin = (e) => {
    e.preventDefault()
    if (pin === '1234' || pin === 'admin') {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Invalid PIN')
    }
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, file: file, filePreview: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.price) return
    
    // Priority: File Upload > Image URL > Placeholder
    const finalImage = formData.filePreview || formData.image || `https://placehold.co/400x300/1a1a1a/white?text=${encodeURIComponent(formData.name)}`

    const productToAdd = {
      ...formData,
      image: finalImage,
      price: Number(formData.price),
      stock: Number(formData.stock) || 0,
      file: undefined,
      filePreview: undefined 
    }
    
    addProduct(productToAdd)
    
    // Reset form
    setFormData({
      name: '',
      brand: 'mahindra',
      model: '',
      price: '',
      stock: '',
      category: 'Engine',
      description: '',
      image: '',
      file: null,
      filePreview: ''
    })
    
    alert('Product Added Successfully!')
  }

  // Define LocationMarker again inside component if scope issue or keep outside
  // Keeping outside as per previous file structure is safer, assuming usage is correct.

  if (!isAuthenticated) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center p-6">
        <div 
          className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 w-full max-w-md"
        >
          <div className="flex justify-center mb-6">
            <Lock className="w-12 h-12 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-center text-white mb-6">Admin Access</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="Enter PIN (1234)" 
              className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none text-center tracking-widest text-xl"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors">
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-black min-h-screen pt-24 pb-20 px-6">
      <div className="container mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="text-green-500" /> Admin Dashboard
          </h1>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all ${activeTab === 'dashboard' ? 'bg-red-600 text-white' : 'bg-zinc-800 text-gray-400 hover:text-white'}`}
            >
              <LayoutDashboard size={20} /> Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('inventory')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all ${activeTab === 'inventory' ? 'bg-red-600 text-white' : 'bg-zinc-800 text-gray-400 hover:text-white'}`}
            >
              <Search size={20} /> Inventory
            </button>
            <button 
              onClick={() => setActiveTab('billing')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all ${activeTab === 'billing' ? 'bg-red-600 text-white' : 'bg-zinc-800 text-gray-400 hover:text-white'}`}
            >
              <FileText size={20} /> GST Billing
            </button>
            <button onClick={() => setIsAuthenticated(false)} className="text-gray-400 hover:text-white underline ml-4">
              Logout
            </button>
          </div>
        </div>

        {/* --- DASHBOARD TAB --- */}
        {activeTab === 'dashboard' && (
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Shop Settings */}
            <div className="lg:col-span-1 ">
              {/* ... (Keep Shop Settings Form) ... */}
              <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 mb-8">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <MapPin size={20} className="text-blue-500" /> Shop Settings
                  </h2>
                  <form onSubmit={handleShopSubmit} className="space-y-3">
                    <div>
                      <label className="block text-gray-400 text-xs mb-1">Shop Location</label>
                      <div className="flex gap-2">
                        <input type="text" name="location" value={shopForm.location} onChange={handleShopChange} className="w-full bg-black border border-gray-700 rounded p-2 text-white" />
                        <button 
                          type="button"
                          onClick={() => {
                             if (navigator.geolocation) {
                                navigator.geolocation.getCurrentPosition((position) => {
                                  const { latitude, longitude } = position.coords
                                  setShopForm(prev => ({ 
                                    ...prev, 
                                    location: `Lat: ${latitude.toFixed(4)}, Long: ${longitude.toFixed(4)}`,
                                    latitude, longitude
                                  }))
                                  setMapPosition([latitude, longitude])
                                })
                             }
                          }}
                          className="bg-zinc-800 hover:bg-zinc-700 text-white p-2 rounded border border-gray-700"
                          title="Use My Current Location"
                        >
                          <MapPin size={20} className="text-red-500" />
                        </button>
                      </div>
                    </div>

                    <div className="h-48 w-full rounded-lg overflow-hidden border border-gray-700 z-0">
                       {/* 
                       <Suspense fallback={<div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-400">Loading Map...</div>}>
                          <ShopMap mapPosition={mapPosition} setMapPosition={setMapPosition} setShopForm={setShopForm} />
                       </Suspense>
                       */}
                       <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500 text-sm">
                          Map Disabled (Troubleshooting)
                       </div>
                    </div>

                    <div>
                      <label className="block text-gray-400 text-xs mb-1">Coordinates</label>
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                          <div className="bg-black p-2 rounded border border-gray-800">Lat: {shopForm.latitude?.toString().slice(0,7) || 'N/A'}</div>
                          <div className="bg-black p-2 rounded border border-gray-800">Long: {shopForm.longitude?.toString().slice(0,7) || 'N/A'}</div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs mb-1">Phone</label>
                      <input type="text" name="phone" value={shopForm.phone} onChange={handleShopChange} className="w-full bg-black border border-gray-700 rounded p-2 text-white" />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs mb-1">Email</label>
                      <input type="email" name="email" value={shopForm.email} onChange={handleShopChange} className="w-full bg-black border border-gray-700 rounded p-2 text-white" />
                    </div>
                     <div>
                      <label className="block text-gray-400 text-xs mb-1">GST ID</label>
                      <input type="text" name="gstId" value={shopForm.gstId || ''} onChange={handleShopChange} className="w-full bg-black border border-gray-700 rounded p-2 text-white uppercase" placeholder="GSTIN..." />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition-colors text-sm">
                      Update Details
                    </button>
                  </form>
              </div>
            </div>

            {/* Add Product Form */}
            <div className="lg:col-span-2">
              <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 sticky top-24">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Plus size={20} /> Add New Part
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                      <label className="block text-gray-400 text-xs mb-1">Part Name</label>
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full bg-black border border-gray-700 rounded p-2 text-white" />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs mb-1">Stock Qty</label>
                      <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} className="w-full bg-black border border-gray-700 rounded p-2 text-white" placeholder="0" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-xs mb-1">Brand</label>
                      <select name="brand" value={formData.brand} onChange={handleInputChange} className="w-full bg-black border border-gray-700 rounded p-2 text-white">
                        {BRANDS.map(b => (
                          <option key={b.id} value={b.id}>{b.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs mb-1">Price (₹)</label>
                      <input type="number" name="price" value={formData.price} onChange={handleInputChange} required className="w-full bg-black border border-gray-700 rounded p-2 text-white" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-xs mb-1">Compatible Model</label>
                    <input type="text" name="model" value={formData.model} onChange={handleInputChange} placeholder="e.g. 575 DI" className="w-full bg-black border border-gray-700 rounded p-2 text-white" />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-xs mb-1">Category</label>
                    <select name="category" value={formData.category} onChange={handleInputChange} className="w-full bg-black border border-gray-700 rounded p-2 text-white">
                      <option value="Engine">Engine</option>
                      <option value="Transmission">Transmission</option>
                      <option value="Hydraulics">Hydraulics</option>
                      <option value="Electrical">Electrical</option>
                      <option value="Body">Body</option>
                      <option value="Filters">Filters</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* IMAGE UPLOAD SECTION */}
                  <div>
                    <label className="block text-gray-400 text-xs mb-1">Product Image</label>
                    <div className="space-y-2">
                       <input type="text" name="image" value={formData.image} onChange={handleInputChange} placeholder="Image URL (http://...)" className="w-full bg-black border border-gray-700 rounded p-2 text-white text-sm" />
                       <div className="text-center text-gray-500 text-xs">- OR -</div>
                       <input type="file" accept="image/*" onChange={handleFileChange} className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-800 file:text-white hover:file:bg-gray-700"/>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-xs mb-1">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" className="w-full bg-black border border-gray-700 rounded p-2 text-white"></textarea>
                  </div>

                  <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded transition-colors">
                    Add Product
                  </button>

                </form>
              </div>
            </div>
          </div>
        )}

        {/* --- INVENTORY TAB --- */}
        {activeTab === 'inventory' && (
           <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden p-6">
             <div className="flex justify-between items-center mb-6">
               <h2 className="text-xl font-bold text-white">Live Inventory Management</h2>
               <div className="relative">
                 <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
                 <input 
                   type="text" 
                   placeholder="Search parts..." 
                   className="bg-black border border-gray-700 rounded-full py-2 pl-10 pr-4 text-white focus:border-red-500 focus:outline-none w-64"
                   value={searchTerm}
                   onChange={e => setSearchTerm(e.target.value)}
                 />
               </div>
             </div>
             
             <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-black text-gray-400 text-xs uppercase">
                  <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Brand/Model</th>
                    <th className="p-4">Price (₹)</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {filteredProducts.map(product => (
                    <tr key={product.id} className="hover:bg-zinc-800/50 transition-colors group">
                      <td className="p-4">
                        <div className="font-bold text-white">{product.name}</div>
                        <div className="text-xs text-gray-500">{product.category}</div>
                      </td>
                      <td className="p-4 text-sm text-gray-300">
                        {BRANDS.find(b => b.id === product.brand)?.name || product.brand}
                        <div className="text-xs text-gray-500">{product.model}</div>
                      </td>
                      <td className="p-4">
                        <input 
                          type="number" 
                          className="bg-transparent border border-transparent hover:border-gray-700 focus:border-blue-500 rounded p-1 w-24 text-yellow-400 font-bold"
                          value={product.price}
                          onChange={(e) => updateProduct(product.id, { price: Number(e.target.value) })}
                        />
                      </td>
                      <td className="p-4">
                         <div className="flex items-center gap-2">
                           <button onClick={() => updateProduct(product.id, { stock: Math.max(0, (product.stock || 0) - 1) })} className="text-gray-500 hover:text-white bg-gray-800 rounded p-1">-</button>
                           <span className={`font-bold w-8 text-center ${(product.stock || 0) < 5 ? 'text-red-500' : 'text-green-500'}`}>{product.stock || 0}</span>
                           <button onClick={() => updateProduct(product.id, { stock: (product.stock || 0) + 1 })} className="text-gray-500 hover:text-white bg-gray-800 rounded p-1">+</button>
                         </div>
                      </td>
                      <td className="p-4">
                        <button 
                           onClick={() => {
                             if(window.confirm('Are you sure you want to delete this item?')) deleteProduct(product.id)
                           }}
                           className="text-red-500 hover:text-red-400 p-2 rounded hover:bg-red-500/10 transition-colors"
                         >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredProducts.length === 0 && (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-gray-500">No products found matching your search.</td>
                    </tr>
                  )}
                </tbody>
              </table>
             </div>
           </div>
        )}

        {/* --- BILLING TAB --- */}
        {activeTab === 'billing' && (
           // ... (Same Billing Component as before) ...
           <div className="grid lg:grid-cols-2 gap-8">
            {/* Invoice Generator */}
            <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 h-fit">
               <h2 className="text-xl font-bold text-white mb-6">Create New Bill</h2>
               
               <div className="space-y-4 mb-6">
                 <input 
                    type="text" placeholder="Customer Name" 
                    className="w-full bg-black border border-gray-700 rounded p-2 text-white"
                    value={billCustomer.name} onChange={e => setBillCustomer({...billCustomer, name: e.target.value})}
                 />
                 <input 
                    type="text" placeholder="Phone Number" 
                    className="w-full bg-black border border-gray-700 rounded p-2 text-white"
                    value={billCustomer.phone} onChange={e => setBillCustomer({...billCustomer, phone: e.target.value})}
                 />
                 <textarea 
                    placeholder="Address" 
                    className="w-full bg-black border border-gray-700 rounded p-2 text-white"
                    value={billCustomer.address} onChange={e => setBillCustomer({...billCustomer, address: e.target.value})}
                 ></textarea>
               </div>

               <div className="border-t border-gray-800 pt-6">
                 <h3 className="text-lg font-bold text-white mb-4">Add Items</h3>
                 <div className="flex gap-2 mb-4">
                   <select 
                      className="w-full bg-black border border-gray-700 rounded p-2 text-white"
                      value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)}
                   >
                     <option value="">Select Part...</option>
                     {products.map(p => (
                       <option key={p.id} value={p.id}>{p.name} - ₹{p.price}</option>
                     ))}
                   </select>
                   <input 
                      type="number" min="1" value={billQty} onChange={e => setBillQty(e.target.value)}
                      className="w-20 bg-black border border-gray-700 rounded p-2 text-white"
                   />
                   <button onClick={addToBill} className="bg-green-600 text-white px-4 rounded hover:bg-green-700"><Plus /></button>
                 </div>
               </div>
            </div>

            {/* Bill Preview / Print Area */}
            <div className="bg-white text-black p-8 rounded-xl shadow-2xl relative" id="printable-bill">
               <div className="border-b-2 border-dashed border-gray-300 pb-4 mb-4">
                  <h1 className="text-3xl font-extrabold uppercase">Dhairya Tractor Parts</h1>
                  <p className="text-sm text-gray-600">{shopDetails.location}</p>
                  <p className="text-sm text-gray-600">Tel: {shopDetails.phone}</p>
                  <p className="text-sm font-bold mt-2">GSTIN: {shopDetails.gstId}</p>
               </div>

               <div className="flex justify-between mb-6">
                 <div>
                   <p className="text-xs text-gray-500 uppercase">Billed To:</p>
                   <p className="font-bold">{billCustomer.name || 'Walk-in Customer'}</p>
                   <p className="text-sm">{billCustomer.phone}</p>
                   <p className="text-sm max-w-[200px]">{billCustomer.address}</p>
                 </div>
                 <div className="text-right">
                   <p className="text-xs text-gray-500 uppercase">Invoice No:</p>
                   <p className="font-bold">INV-{Date.now().toString().slice(-6)}</p>
                   <p className="text-xs text-gray-500 uppercase mt-2">Date:</p>
                   <p className="font-bold">{new Date().toLocaleDateString()}</p>
                 </div>
               </div>

               <table className="w-full mb-6">
                 <thead className="bg-gray-100 border-b border-gray-300">
                   <tr>
                     <th className="text-left py-2 px-2 text-sm">Item</th>
                     <th className="text-center py-2 px-2 text-sm">Qty</th>
                     <th className="text-right py-2 px-2 text-sm">Price</th>
                     <th className="text-right py-2 px-2 text-sm">Total</th>
                   </tr>
                 </thead>
                 <tbody>
                   {billItems.map((item, index) => (
                     <tr key={index} className="border-b border-gray-100">
                        <td className="py-2 px-2 text-sm">{item.name}<br/><span className="text-xs text-gray-500">{item.brand}</span></td>
                        <td className="text-center py-2 px-2 text-sm">{item.qty}</td>
                        <td className="text-right py-2 px-2 text-sm">₹{item.price}</td>
                        <td className="text-right py-2 px-2 text-sm">₹{item.total}</td>
                     </tr>
                   ))}
                 </tbody>
               </table>

               <div className="flex justify-end">
                 <div className="w-48 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>₹{billSubtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>CGST (9%):</span>
                      <span>₹{(billGST/2).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>SGST (9%):</span>
                      <span>₹{(billGST/2).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold border-t border-gray-300 pt-2 mt-2">
                      <span>Total:</span>
                      <span>₹{billTotal.toFixed(2)}</span>
                    </div>
                 </div>
               </div>

               <div className="mt-8 pt-8 border-t border-gray-200 text-center text-xs text-gray-500">
                 <p>Thank you for your business!</p>
                 <p>Subject to Indore Jurisdiction.</p>
               </div>
               
               {/* No-Print Actions */}
               <div className="absolute -top-12 right-0 print:hidden">
                 <button onClick={() => window.print()} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2 font-bold shadow-lg">
                   <Printer size={18} /> Print Bill
                 </button>
               </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
