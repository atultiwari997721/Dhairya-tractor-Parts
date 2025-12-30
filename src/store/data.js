export const BRANDS = [
  { 
    id: 'mahindra', 
    name: 'Mahindra', 
    color: 'red',
    logo: 'https://companieslogo.com/img/orig/M_M.NS_BIG-03046522.png?t=1661330366',
    domain: 'mahindra.com'
  },
  { 
    id: 'swaraj', 
    name: 'Swaraj', 
    color: 'blue',
    logo: 'https://www.swarajtractors.com/sites/default/files/2023-11/swaraj_logo_new.png', 
    domain: 'swarajtractors.com'
  },
  { 
    id: 'sonalika', 
    name: 'Sonalika', 
    color: 'blue-dark',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/SONALIKA_LOGO_hd.jpg',
    domain: 'sonalika.com'
  },
  { 
    id: 'johndeere', 
    name: 'John Deere', 
    color: 'green',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/John_Deere_logo.svg',
    domain: 'deere.com'
  },
  { 
    id: 'tafe', 
    name: 'TAFE', 
    color: 'orange',
    logo: 'https://companieslogo.com/img/orig/TAFE.NS-b9492167.png?t=1720244494',
    domain: 'tafe.com'
  },
  {
    id: 'massey',
    name: 'Massey Ferguson',
    color: 'red',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Massey_Ferguson_logo.svg',
    domain: 'masseyferguson.com'
  },
  { 
    id: 'powertrac', 
    name: 'Powertrac', 
    color: 'blue',
    logo: 'https://www.escortskubota.com/assets/images/Powertrac-logo.png',
    domain: 'escorts.com'
  },
  { 
    id: 'farmtrac', 
    name: 'Farmtrac', 
    color: 'blue-light',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Farmtrac_Tractors_Europe.svg',
    domain: 'farmtrac.com'
  },
  { 
    id: 'newholland', 
    name: 'New Holland', 
    color: 'blue',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/New_Holland_Agriculture_Logo.svg',
    domain: 'newholland.com'
  },
  { 
    id: 'kubota', 
    name: 'Kubota', 
    color: 'orange-dark',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Kubota_logo.svg',
    domain: 'kubota.com'
  },
  { 
    id: 'eicher', 
    name: 'Eicher', 
    color: 'red-dark',
    logo: 'https://eichertractors.in/images/header-footer/eicher-logo.jpg',
    domain: 'eichertractors.in'
  },
  {
    id: 'solis',
    name: 'Solis',
    color: 'blue',
    logo: 'https://seeklogo.com/images/S/solis-yanmar-logo-2EB5A71358-seeklogo.com.png',
    domain: 'solis-world.com'
  },
   {
    id: 'preet',
    name: 'Preet',
    color: 'green',
    logo: 'https://preet.co/wp-content/uploads/2021/08/logo-color.png',
    domain: 'preet.co'
  },
  {
    id: 'indo-farm',
    name: 'Indo Farm',
    color: 'green-light',
    logo: 'https://www.indofarm.in/images/logo.png',
    domain: 'indofarm.in'
  },
  {
    id: 'ace',
    name: 'ACE',
    color: 'orange',
    logo: 'https://www.ace-cranes.com/wps/wcm/connect/ace-cranes/8573fc9a-14d2-43bb-a5a0-972172023594/ACE+Logo.png?MOD=AJPERES&CACHEID=ROOTWORKSPACE.Z18_28021240MOID90Q7J28I5O0000-8573fc9a-14d2-43bb-a5a0-972172023594-l7y.x1',
    domain: 'ace-cranes.com'
  },
  {
    id: 'vst',
    name: 'VST Shakti',
    color: 'red',
    logo: 'https://companieslogo.com/img/orig/VSTTILLERS.NS-023a1a3d.png?t=1720244494',
    domain: 'vsttractors.com'
  },
  {
    id: 'force',
    name: 'Force Motors',
    color: 'gray',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Force_Motors_Logo.svg',
    domain: 'forcemotors.com'
  },
  {
    id: 'captain',
    name: 'Captain',
    color: 'green',
    logo: 'https://www.captaintractors.com/assets/images/logo.png',
    domain: 'captaintractors.com'
  },
  {
    id: 'claas',
    name: 'Claas',
    color: 'green-light',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Claas-logo-red.svg',
    domain: 'claas.com'
  },
  {
    id: 'kartar',
    name: 'Kartar',
    color: 'red',
    logo: 'https://www.kartaragro.com/images/logo.png',
    domain: 'kartaragro.com'
  }
]

export const INITIAL_PRODUCTS = [
  // Existing Data
  {
    id: 1,
    name: 'Clutch Plate & Pressure Plate Assembly',
    brand: 'mahindra',
    model: '575 DI',
    price: '4500',
    category: 'Transmission',
    description: 'Genuine Mahindra Clutch Plate for smooth shifting. Heavy duty capability.',
    image: 'https://placehold.co/400x300/1a1a1a/white?text=Clutch+Plate'
  },
  {
    id: 2,
    name: 'Water Pump Assembly',
    brand: 'swaraj',
    model: '744 FE',
    price: '1850',
    category: 'Engine',
    description: 'High efficiency water pump for Swaraj tractors. Prevents overheating.',
    image: 'https://placehold.co/400x300/1a1a1a/white?text=Water+Pump'
  },
  {
    id: 3,
    name: 'Hydraulic Pump',
    brand: 'sonalika',
    model: 'DI 60',
    price: '3200',
    category: 'Hydraulics',
    description: 'Heavy lift hydraulic pump. Durable and long lasting.',
    image: 'https://placehold.co/400x300/1a1a1a/white?text=Hydraulic+Pump'
  },
  {
    id: 4,
    name: 'Self Starter Motor',
    brand: 'mahindra',
    model: 'Arjun Novo',
    price: '5500',
    category: 'Electrical',
    description: 'Quick start motor for all weather conditions.',
    image: 'https://placehold.co/400x300/1a1a1a/white?text=Starter+Motor'
  },
  {
    id: 5,
    name: 'Piston Ring Set',
    brand: 'johndeere',
    model: '5310',
    price: '1200',
    category: 'Engine',
    description: 'Precision engineered piston rings for maximum compression.',
    image: 'https://placehold.co/400x300/1a1a1a/white?text=Piston+Rings'
  },
  {
    id: 6,
    name: 'Head Light Assembly',
    brand: 'eicher',
    model: '380',
    price: '850',
    category: 'Electrical',
    description: 'Bright halogen headlamp assembly with cover.',
    image: 'https://placehold.co/400x300/1a1a1a/white?text=Head+Light'
  },
  {
    id: 7,
    name: 'Fuel Filter (Primary)',
    brand: 'mahindra',
    model: 'Universal',
    price: '250',
    category: 'Filters',
    description: 'Original Bosch fuel filter for diesel engines.',
    image: 'https://placehold.co/400x300/1a1a1a/white?text=Fuel+Filter'
  },
  
  // SCRAPED DATA FROM INDIAMART (Inferred details)
  {
    id: 101,
    name: 'Coolant Bottle Farmtrac 60',
    brand: 'farmtrac',
    model: 'Farmtrac 60',
    price: '450',
    category: 'Cooling',
    description: 'White Mild Steel Coolant Bottle for Industrial application.',
    image: 'https://placehold.co/400x300/1a1a1a/white?text=Coolant+Bottle'
  },
  {
    id: 102,
    name: 'Tractor Spare Kunda Pin',
    brand: 'universal',
    model: 'Universal',
    price: '120',
    category: 'Body',
    description: 'Iron Kunda Pin available in all sizes.',
    image: 'https://placehold.co/400x300/1a1a1a/white?text=Kunda+Pin'
  },
  {
    id: 103,
    name: 'Spindle Arum 4 Hole',
    brand: 'swaraj',
    model: 'Swaraj RS',
    price: '1500',
    category: 'Steering',
    description: 'Spindle Arum 4 Hole Single Pump Assembly.',
    image: 'https://placehold.co/400x300/1a1a1a/white?text=Spindle+Arum'
  },
  {
    id: 104,
    name: 'Stabilizer Rod (Mild Steel)',
    brand: 'swaraj',
    model: 'Swaraj',
    price: '850',
    category: 'Linkage',
    description: 'Mild Steel Tractor Stabilizer Rod for heavy duty use.',
    image: 'https://placehold.co/400x300/1a1a1a/white?text=Stabilizer+Rod'
  },
  {
    id: 105,
    name: 'Cast Iron Stabilizer Rod',
    brand: 'universal',
    model: 'Universal',
    price: '950',
    category: 'Linkage',
    description: 'Size: 20inch Length. Material: Cast Iron.',
    image: 'https://placehold.co/400x300/1a1a1a/white?text=Stabilizer+Rod+Iron'
  },
  {
    id: 106,
    name: 'Bent Hitch Pin / Lock Pin',
    brand: 'universal',
    model: 'Universal',
    price: '180',
    category: 'Linkage',
    description: 'GIC Brand Machined Parts. Size: 4 inch. Zinc plated.',
    image: 'https://placehold.co/400x300/1a1a1a/white?text=Hitch+Pin'
  },
  {
    id: 107,
    name: 'Stainless Steel Tractor Housing',
    brand: 'newholland',
    model: 'Other',
    price: '3500',
    category: 'Transmission',
    description: 'Part No: 82824129 / 87720130 / 47536242. Durable Steel.',
    image: 'https://placehold.co/400x300/1a1a1a/white?text=Housing+Unit'
  },
  {
    id: 108,
    name: 'Linch Pin (8mm)',
    brand: 'universal',
    model: 'Universal',
    price: '40',
    category: 'Body',
    description: 'Zinc Plated Mild Steel Tractor Linch Pin. 8mm Dia, 30mm Length.',
    image: 'https://placehold.co/400x300/1a1a1a/white?text=Linch+Pin'
  },
  {
    id: 109,
    name: 'Steering Box Guide Assembly',
    brand: 'massey',
    model: 'Massey Ferguson',
    price: '2100',
    category: 'Steering',
    description: 'Alloy Steel Steering Box Guide for Massey.',
    image: 'https://placehold.co/400x300/1a1a1a/white?text=Steering+Box'
  },
  {
    id: 110,
    name: 'Hydraulic Lift Arm (MF245)',
    brand: 'massey',
    model: 'MF 245',
    price: '2800',
    category: 'Hydraulics',
    description: '50 Splines. Part No: 85444M91. Stainless Steel.',
    image: 'https://placehold.co/400x300/1a1a1a/white?text=Hydraulic+Arm'
  },
  {
    id: 111,
    name: 'Spindle Repair Kit',
    brand: 'newholland',
    model: '3230',
    price: '650',
    category: 'Axle',
    description: 'Rubber Spendle Repair Kit for New Holland 3230.',
    image: 'https://placehold.co/400x300/1a1a1a/white?text=Spindle+Kit'
  },
  {
    id: 112,
    name: 'Front Wheel Rim (7x20)',
    brand: 'universal',
    model: 'UTB',
    price: '3200',
    category: 'Wheels',
    description: 'Orange Steel UTB Tractor Front Wheel. Size 7x20.',
    image: 'https://placehold.co/400x300/1a1a1a/white?text=Wheel+Rim'
  },
  {
    id: 113,
    name: 'Tractor Y Rod',
    brand: 'swaraj',
    model: 'Swaraj',
    price: '450',
    category: 'Linkage',
    description: 'Iron Y Rod. Weight: 300-400g.',
    image: 'https://placehold.co/400x300/1a1a1a/white?text=Y+Rod'
  },
  {
    id: 114,
    name: 'UJ Cross RE271430',
    brand: 'johndeere',
    model: 'John Deere',
    price: '950',
    category: 'Transmission',
    description: 'Diameter: 28mm. Alloy Steel Universal Joint Cross.',
    image: 'https://placehold.co/400x300/1a1a1a/white?text=UJ+Cross'
  },
  {
    id: 115,
    name: 'Lift Speed Control Valve',
    brand: 'universal',
    model: 'Universal',
    price: '1250',
    category: 'Hydraulics',
    description: 'Cast Iron 3045102R21 Valve Assembly. Polished Finish.',
    image: 'https://placehold.co/400x300/1a1a1a/white?text=Control+Valve'
  },
  {
    id: 116,
    name: 'Utility Clevis',
    brand: 'universal',
    model: 'OEM Standard',
    price: '350',
    category: 'Unknown',
    description: 'Standard Utility Clevis for AG manufacturing.',
    image: 'https://placehold.co/400x300/1a1a1a/white?text=Clevis'
  },
  {
    id: 117,
    name: 'Gear Lever Knob',
    brand: 'universal',
    model: 'Universal',
    price: '150',
    category: 'Body',
    description: 'Plastic/Rubber Gear Lever Knob for tractors.',
    image: 'https://placehold.co/400x300/1a1a1a/white?text=Gear+Knob'
  },
  {
    id: 118,
    name: 'Air Cleaner Assembly (5L)',
    brand: 'massey',
    model: 'TAFE',
    price: '1800',
    category: 'Filters',
    description: 'Mild Steel Air Cleaner Assembly for TAFE tractors.',
    image: 'https://placehold.co/400x300/1a1a1a/white?text=Air+Cleaner'
  }
]
