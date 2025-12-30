import React from 'react'
import { useProducts } from '../store/ProductContext'

export default function Footer() {
  const { shopDetails } = useProducts()

  return (
    <footer className="bg-black text-white py-8 border-t border-gray-800">
      <div className="container mx-auto px-6 text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-2 text-red-500">DHAIRYA TRACTOR PARTS</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your one-stop destination for genuine and high-quality aftermarket tractor parts. 
              Serving farmers with pride since 2010.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Contact Us</h3>
            <p className="text-white text-base mb-2 font-medium">Phone: {shopDetails.phone}</p>
            <p className="text-white text-base mb-4 font-medium">Email: {shopDetails.email}</p>
            
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
        <div className="mt-6 pt-4 border-t border-gray-900 text-center text-gray-500 text-xs">
          © {new Date().getFullYear()} Dhairya Tractor Parts. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
