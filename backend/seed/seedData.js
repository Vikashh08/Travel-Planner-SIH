export const initialDestinations = [
  {
    id: "dest-goa",
    name: "Goa",
    state: "Goa",
    region: "West India",
    description: "Sun-kissed golden beaches, vibrant Portuguese heritage, bustling flea markets, and exquisite seafood make Goa India's ultimate coastal destination.",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587922546307-776227941871?q=80&w=1200&auto=format&fit=crop"
    ],
    coordinates: { lat: 15.2993, lng: 74.1240 },
    bestTime: "November to February",
    recommendedDuration: "4-5 Days",
    budget: "₹12,000 - ₹25,000",
    category: "Beach",
    attractions: [
      { name: "Baga Beach", type: "Beach", rating: 4.7, desc: "Famous for nightlife, water sports, and beach shacks." },
      { name: "Fort Aguada", type: "Heritage", rating: 4.8, desc: "17th-century Portuguese lighthouse and fort overlooking the Arabian Sea." },
      { name: "Basilica of Bom Jesus", type: "Spiritual", rating: 4.9, desc: "UNESCO World Heritage site containing the mortal remains of St. Francis Xavier." },
      { name: "Dudhsagar Falls", type: "Nature", rating: 4.8, desc: "Four-tiered waterfall located on the Mandovi River, surrounded by lush forest." },
      { name: "Anjuna Flea Market", type: "Shopping", rating: 4.6, desc: "Vibrant market offering boho clothes, handicrafts, and local artifacts." }
    ],
    activities: ["Water Sports", "Scuba Diving", "Spice Plantation Tour", "Casino Cruise", "Beach Hopping"],
    food: ["Goan Fish Curry Rice", "Pork Vindaloo", "Bebinca", "Prawn Balchão", "Feni Cocktail"],
    culture: "Blends traditional Goan Konkani customs with 450 years of Portuguese influence. Known for warmth, music, and Susegad lifestyle.",
    safetyInfo: "Safe tourist area. Keep emergency numbers handy. Avoid swimming during monsoon season (June-September). Lifeguards stationed at major beaches.",
    transportInfo: "Reachable via Dabolim Airport (GOI) or Mopa Airport (GOX). Major railway stations: Madgaon & Thivim. Local autos, taxis, and GoNomad rides available 24/7.",
    nearbyDestinations: ["Gokarna", "Dandeli", "Hampi"]
  },
  {
    id: "dest-manali",
    name: "Manali",
    state: "Himachal Pradesh",
    region: "North India",
    description: "Nestled in the Beas River Valley, Manali offers breathtaking snow-capped peaks, pine forests, adventure sports, and serene mountain valleys.",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1200&auto=format&fit=crop"
    ],
    coordinates: { lat: 32.2432, lng: 77.1892 },
    bestTime: "October to June (Snow in Dec-Feb)",
    recommendedDuration: "3-5 Days",
    budget: "₹10,000 - ₹20,000",
    category: "Mountain",
    attractions: [
      { name: "Solang Valley", type: "Adventure", rating: 4.8, desc: "Hub for paragliding, zorbing, skiing, and quad biking." },
      { name: "Rohtang Pass", type: "Snow Peak", rating: 4.9, desc: "High mountain pass with stunning panoramic Himalayan views." },
      { name: "Hadimba Temple", type: "Heritage", rating: 4.7, desc: "Wooden pagoda-style temple surrounded by dense Cedar forest." },
      { name: "Old Manali", type: "Culture", rating: 4.8, desc: "Charming wooden houses, cozy cafes, and vibrant hippie vibe." }
    ],
    activities: ["Paragliding", "Skiing", "River Rafting", "Trekking to Jogini Waterfalls", "Hot Spring Bath"],
    food: ["Siddu", "Trout Fish", "Thukpa & Momos", "Babru", "Himachali Dham"],
    culture: "Deep Himalayan traditions, vibrant wooden craftsmanship, traditional Himachali woolen caps, and peaceful Buddhist monasteries.",
    safetyInfo: "Check weather forecast before heading to Rohtang Pass. Carry heavy woolens in winter. Drive carefully on mountain winding roads.",
    transportInfo: "Nearest airport: Bhuntar (Kullu, 50 km). Regular luxury buses run from Delhi and Chandigarh. Private local rides easily available.",
    nearbyDestinations: ["Kasol", "Spiti Valley", "Dharamshala"]
  },
  {
    id: "dest-jaipur",
    name: "Jaipur",
    state: "Rajasthan",
    region: "West India",
    description: "The 'Pink City' of India, world-renowned for majestic hilltop forts, opulent royal palaces, bustling bazaars, and rich Rajputana heritage.",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200&auto=format&fit=crop"
    ],
    coordinates: { lat: 26.9124, lng: 75.7873 },
    bestTime: "October to March",
    recommendedDuration: "3 Days",
    budget: "₹8,000 - ₹18,000",
    category: "Heritage",
    attractions: [
      { name: "Hawa Mahal", type: "Heritage", rating: 4.9, desc: "Iconic honeycomb Pink Sandstone palace with 953 intricate windows." },
      { name: "Amer Fort", type: "Heritage", rating: 4.9, desc: "Grand hilltop fortress with mirror palace (Sheesh Mahal) and elephant rides." },
      { name: "City Palace", type: "Heritage", rating: 4.8, desc: "Royal residence housing museums, courtyards, and royal artifacts." },
      { name: "Jantar Mantar", type: "Science/Heritage", rating: 4.7, desc: "UNESCO astronomical observatory featuring the world's largest stone sundial." }
    ],
    activities: ["Fort Exploration", "Elephant Ride", "Heritage Walk", "Bazaar Shopping for Gemstones", "Chokhi Dhani Cultural Night"],
    food: ["Dal Baati Churma", "Pyaaz Kachori", "Laal Maas", "Ghevar", "Ker Sangri"],
    culture: "Royal Rajput customs, folk music (Manganiyar), Kalbelia dance, hand-block printing, and vibrant textiles.",
    safetyInfo: "Safe city with Tourist Police assistance. Beware of overpriced shopping guides. Always confirm auto fares or use GoNomad App.",
    transportInfo: "Jaipur International Airport (JAI) connects major cities. Direct trains from Delhi/Mumbai. Metro and GoNomad rides connect all attractions.",
    nearbyDestinations: ["Udaipur", "Jodhpur", "Pushkar", "Agra"]
  },
  {
    id: "dest-kerala",
    name: "Kerala Backwaters",
    state: "Kerala",
    region: "South India",
    description: "God's Own Country. Serene networks of brackish lagoons, emerald palm-fringed canals, luxury houseboats, and ancient Ayurvedic wellness retreats.",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200&auto=format&fit=crop"
    ],
    coordinates: { lat: 9.4981, lng: 76.3388 },
    bestTime: "September to March",
    recommendedDuration: "4 Days",
    budget: "₹14,000 - ₹30,000",
    category: "Nature",
    attractions: [
      { name: "Alleppey Houseboat Cruise", type: "Cruising", rating: 4.9, desc: "Overnight stay on traditional Kettuvallam moving through calm backwater canals." },
      { name: "Kumarakom Bird Sanctuary", type: "Wildlife", rating: 4.7, desc: "Lush sanctuary home to migratory birds around Vembanad Lake." },
      { name: "Marari Beach", type: "Beach", rating: 4.8, desc: "Quiet, peaceful coconut-grove beach ideal for relaxation." }
    ],
    activities: ["Houseboat Stay", "Ayurvedic Massage", "Canoe Village Tour", "Kathakali Dance Show", "Sunset Boating"],
    food: ["Kerala Sadya on Banana Leaf", "Karimeen Pollichathu", "Appam with Stew", "Puttu & Kadala Curry", "Tender Coconut Shakes"],
    culture: "Rich classical arts including Kathakali dance, Theyyam rituals, Kalaripayattu martial arts, and peaceful coastal traditions.",
    safetyInfo: "Very safe and welcoming for solo travellers and families. Follow boat safety instructions during lake cruises.",
    transportInfo: "Cochin International Airport (COK) is 85 km away. Railway station: Alleppey (ALLP). Taxis and GoNomad rides available.",
    nearbyDestinations: ["Munnar", "Wayanad", "Varkala", "Kochi"]
  },
  {
    id: "dest-kashmir",
    name: "Kashmir Valley",
    state: "Jammu & Kashmir",
    region: "North India",
    description: "Paradise on Earth. Shimmering Dal Lake, colourful Shikaras, snow-capped peaks of Gulmarg, and lush green meadows of Pahalgam.",
    image: "https://images.unsplash.com/photo-1566837945700-30057527ade0?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1566837945700-30057527ade0?q=80&w=1200&auto=format&fit=crop"
    ],
    coordinates: { lat: 34.0837, lng: 74.7973 },
    bestTime: "March to October (Snow sports Dec-Feb)",
    recommendedDuration: "5-6 Days",
    budget: "₹18,000 - ₹35,000",
    category: "Mountain",
    attractions: [
      { name: "Dal Lake Shikara Ride", type: "Nature", rating: 4.9, desc: "Glide across reflective waters visiting floating vegetable markets." },
      { name: "Gulmarg Gondola", type: "Snow Sports", rating: 4.9, desc: "World's second-highest cable car taking visitors to Apharwat Peak." },
      { name: "Betaab Valley Pahalgam", type: "Nature", rating: 4.8, desc: "Picturesque valley named after Bollywood movie Betaab with crystal streams." }
    ],
    activities: ["Houseboat Stay", "Gondola Ride", "Skiing", "Pony Ride", "Shopping for Pashmina Shawls & Saffron"],
    food: ["Wazwan Feast", "Rogan Josh", "Kahwa Tea", "Modur Pulao", "Kashmiri Naan"],
    culture: "Centuries-old hospitality, intricate wood carving, Pashmina weaving, and soulful Sufi music traditions.",
    safetyInfo: "Tourists are warmly welcomed. Tourist police stationed across Srinagar, Gulmarg, and Pahalgam.",
    transportInfo: "Srinagar Airport (SXR) is well-connected to major metros. Local prepaid rides and GoNomad cabs available across Kashmir.",
    nearbyDestinations: ["Sonamarg", "Leh Ladakh", "Jammu"]
  },
  {
    id: "dest-varanasi",
    name: "Varanasi",
    state: "Uttar Pradesh",
    region: "North India",
    description: "The spiritual heart of India. One of the world's oldest continually inhabited cities, famed for sacred Ganges Ghats and mesmerizing evening Ganga Aarti.",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=1200&auto=format&fit=crop"
    ],
    coordinates: { lat: 25.3176, lng: 82.9739 },
    bestTime: "October to March",
    recommendedDuration: "3 Days",
    budget: "₹6,000 - ₹14,000",
    category: "Spiritual",
    attractions: [
      { name: "Dashashwamedh Ghat", type: "Spiritual", rating: 4.9, desc: "Site of the legendary grand evening Ganga Aarti ritual." },
      { name: "Kashi Vishwanath Temple", type: "Spiritual", rating: 4.9, desc: "Sacred shrine dedicated to Lord Shiva featuring a golden spire." },
      { name: "Sarnath", type: "Heritage", rating: 4.8, desc: "Historical site where Lord Buddha preached his first sermon after enlightenment." }
    ],
    activities: ["Sunrise Boat Ride", "Ganga Aarti", "Temple Walk", "Banarasi Silk Shopping", "Street Food Crawl"],
    food: ["Banarasi Paan", "Kachori Jalebi", "Malaiyyo", "Lassi", "Tamatar Chaat"],
    culture: "Deep spiritual roots, classical Hindustani music, Banarasi saree weaving tradition, and philosophical heritage.",
    safetyInfo: "Narrow crowded lanes; keep personal belongings safe. Respect local religious customs and cremation ghat photography restrictions.",
    transportInfo: "Lal Bahadur Shastri Airport (VNS). Varanasi Junction railway station. E-rickshaws and GoNomad cabs operate citywide.",
    nearbyDestinations: ["Prayagraj", "Ayodhya", "Bodhgaya"]
  }
];

export const initialDrivers = [
  {
    id: "driver-1",
    name: "Vikram Singh",
    vehicleType: "GoNomad Sedan",
    vehicleNumber: "GA 03 AB 1234",
    rating: 4.9,
    totalTrips: 342,
    location: { lat: 15.2950, lng: 74.1200 },
    isAvailable: true,
    destinationArea: "Goa",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    baseFare: 150,
    perKmFare: 18,
    etaMinutes: 4
  },
  {
    id: "driver-2",
    name: "Ramesh Naik",
    vehicleType: "GoNomad Mini",
    vehicleNumber: "GA 07 C 5678",
    rating: 4.8,
    totalTrips: 215,
    location: { lat: 15.3020, lng: 74.1280 },
    isAvailable: true,
    destinationArea: "Goa",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    baseFare: 100,
    perKmFare: 14,
    etaMinutes: 6
  },
  {
    id: "driver-3",
    name: "Suresh Fernandes",
    vehicleType: "GoNomad SUV",
    vehicleNumber: "GA 01 X 9988",
    rating: 4.95,
    totalTrips: 489,
    location: { lat: 15.2910, lng: 74.1180 },
    isAvailable: true,
    destinationArea: "Goa",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    baseFare: 220,
    perKmFare: 24,
    etaMinutes: 3
  },
  {
    id: "driver-4",
    name: "Ganesh Auto",
    vehicleType: "Auto",
    vehicleNumber: "GA 08 T 3311",
    rating: 4.7,
    totalTrips: 180,
    location: { lat: 15.3050, lng: 74.1300 },
    isAvailable: true,
    destinationArea: "Goa",
    profileImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop",
    baseFare: 60,
    perKmFare: 10,
    etaMinutes: 5
  }
];

export const initialGuides = [
  {
    id: "guide-1",
    name: "Rahul Deshmukh",
    profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
    destination: "Goa",
    languages: ["English", "Hindi", "Konkani", "Marathi"],
    specializations: ["Historical Guide", "Food Guide", "Cultural Guide"],
    experience: "7 Years",
    rating: 4.9,
    totalTrips: 210,
    pricePerDay: 1500,
    availability: "Available Today",
    description: "Certified heritage historian and food lover. I take travellers through hidden Portuguese fort trails, vintage Latin quarter walks, and authentic secret spice eateries.",
    verified: true,
    placesCovered: ["Fort Aguada", "Basilica of Bom Jesus", "Fontainhas Latin Quarter", "Baga Beach", "Anjuna Flea Market"],
    reviews: [
      { id: "rev-1", userName: "Aarav Mehta", rating: 5, date: "2026-07-20", comment: "Rahul made our Goa trip unforgettable! His knowledge of Portuguese architecture and secret food joints was top notch." },
      { id: "rev-2", userName: "Priya Sharma", rating: 5, date: "2026-06-14", comment: "Super courteous and punctual. Took us to 5 places comfortably in a day." }
    ]
  },
  {
    id: "guide-2",
    name: "Ananya Roy",
    profileImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop",
    destination: "Goa",
    languages: ["English", "Hindi", "French"],
    specializations: ["Photography Guide", "Nature Guide", "Nightlife Guide"],
    experience: "5 Years",
    rating: 4.85,
    totalTrips: 165,
    pricePerDay: 1800,
    availability: "Available Tomorrow",
    description: "Professional travel photographer & nature activist. Specialized in coastal sunset photo tours, Dudhsagar trekking, and high-end beach shack music scenes.",
    verified: true,
    placesCovered: ["Dudhsagar Falls", "Vagator Beach Sunset Point", "Chorao Island Bird Sanctuary", "Ashwem Beach"],
    reviews: [
      { id: "rev-3", userName: "David Miller", rating: 5, date: "2026-05-10", comment: "Ananya showed us the most stunning hidden photo spots in North Goa!" }
    ]
  },
  {
    id: "guide-3",
    name: "Sunil Thakur",
    profileImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop",
    destination: "Manali",
    languages: ["Hindi", "English", "Pahari"],
    specializations: ["Adventure Guide", "Nature Guide"],
    experience: "9 Years",
    rating: 4.95,
    totalTrips: 340,
    pricePerDay: 2000,
    availability: "Available Today",
    description: "High-altitude mountain trekking specialist and certified ski instructor. Born in Old Manali valley.",
    verified: true,
    placesCovered: ["Solang Valley", "Rohtang Pass", "Jogini Waterfall", "Hadimba Temple", "Hampta Pass Base"],
    reviews: []
  },
  {
    id: "guide-4",
    name: "Karan Singh Rathore",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    destination: "Jaipur",
    languages: ["Hindi", "English", "Rajasthani"],
    specializations: ["Historical Guide", "Cultural Guide", "Shopping Guide"],
    experience: "8 Years",
    rating: 4.9,
    totalTrips: 280,
    pricePerDay: 1600,
    availability: "Available Today",
    description: "Royal historian with deep expertise in Amer Fort, City Palace, Johari Bazaar gemstone markets, and traditional Rajasthani royal dining.",
    verified: true,
    placesCovered: ["Amer Fort", "Hawa Mahal", "City Palace", "Jantar Mantar", "Chokhi Dhani"],
    reviews: []
  }
];
