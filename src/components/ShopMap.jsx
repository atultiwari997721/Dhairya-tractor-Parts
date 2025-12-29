import React from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix Leaflet Icon Issue
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Internal Click Handler
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

export default function ShopMap({ mapPosition, setMapPosition, setShopForm }) {
  if (typeof window === 'undefined') return null // Server-side guard (generic)

  return (
    <MapContainer center={mapPosition} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <LocationMarker position={mapPosition} setPosition={setMapPosition} setShopForm={setShopForm} />
    </MapContainer>
  )
}
