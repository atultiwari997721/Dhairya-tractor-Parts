import React from 'react'
import { useProducts } from '../store/ProductContext'

export default function Footer() {
  const { shopDetails } = useProducts()

  return (
    <footer className="bg-black text-white py-12 border-t border-gray-800">
      <div className="container mx-auto px-6 text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-red-500">DHAIRYA TRACTOR PARTS</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your one-stop destination for genuine and high-quality aftermarket tractor parts. 
              Serving farmers with pride since 2010.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-white">Returns</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <p className="text-gray-400 text-sm mb-1">Phone: {shopDetails.phone}</p>
            <p className="text-gray-400 text-sm mb-1">Email: {shopDetails.email}</p>
            <p className="text-gray-400 text-sm mb-4">Location: {shopDetails.location}</p>
            
            {/* Map Embed */}
            {shopDetails.latitude && shopDetails.longitude && (
              <div className="w-full h-32 rounded-lg overflow-hidden border border-gray-800 mt-2">
                <iframe 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  scrolling="no" 
                  marginHeight="0" 
                  marginWidth="0" 
                  src={`https://maps.google.com/maps?q=${shopDetails.latitude},${shopDetails.longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  title="Shop Location"
                  className="filter grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                ></iframe>
              </div>
            )}
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-900 text-center text-gray-500 text-xs">
          © {new Date().getFullYear()} Dhairya Tractor Parts. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
