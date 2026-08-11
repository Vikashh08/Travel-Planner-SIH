import express from 'express';
import { memoryStore } from '../store/memoryStore.js';
import { resolveCoordinates, calculateRoute } from '../services/routeService.js';
import { authMiddleware } from './authRoutes.js';

const router = express.Router();

// GET /api/rides/nearby?area=Goa&lat=15.29&lng=74.12
router.get('/rides/nearby', (req, res) => {
  const { area, lat, lng } = req.query;
  let drivers = memoryStore.getDrivers(area);

  // Clearly label demo/simulated driver availability (Requirement 9 & 41)
  const nearbyVehicles = drivers.map(d => ({
    ...d,
    isDemoDriver: true,
    label: "Demo Driver / Simulated Availability"
  }));

  res.json({
    area: area || 'Goa',
    center: { lat: parseFloat(lat) || 15.2993, lng: parseFloat(lng) || 74.1240 },
    vehicles: nearbyVehicles
  });
});

// POST /api/rides/estimate
router.post('/rides/estimate', async (req, res) => {
  try {
    const { fromLocation, toLocation } = req.body;

    if (!fromLocation || !toLocation) {
      return res.status(400).json({ error: 'Origin (FROM) and Destination (TO) locations are required.' });
    }

    const originCoords = resolveCoordinates(fromLocation, 15.2758, 73.9859);
    const destCoords = resolveCoordinates(toLocation, 15.5553, 73.7517);

    const routeInfo = await calculateRoute(originCoords, destCoords);
    const distanceKm = routeInfo.distanceKm;

    // Vehicle cards options with fare calculation
    const vehicles = [
      {
        id: "veh-mini",
        type: "GoNomad Mini",
        icon: "🚗",
        driverName: "Ramesh Naik (Demo Driver)",
        driverRating: 4.8,
        etaMinutes: 6,
        baseFare: 80,
        perKmRate: 14,
        fare: Math.round(80 + distanceKm * 14)
      },
      {
        id: "veh-sedan",
        type: "GoNomad Sedan",
        icon: "🚙",
        driverName: "Vikram Singh (Demo Driver)",
        driverRating: 4.9,
        etaMinutes: 4,
        baseFare: 120,
        perKmRate: 18,
        fare: Math.round(120 + distanceKm * 18)
      },
      {
        id: "veh-suv",
        type: "GoNomad SUV",
        icon: "🚐",
        driverName: "Suresh Fernandes (Demo Driver)",
        driverRating: 4.95,
        etaMinutes: 3,
        baseFare: 200,
        perKmRate: 24,
        fare: Math.round(200 + distanceKm * 24)
      },
      {
        id: "veh-auto",
        type: "Auto",
        icon: "🛺",
        driverName: "Ganesh Auto (Demo Driver)",
        driverRating: 4.7,
        etaMinutes: 5,
        baseFare: 50,
        perKmRate: 11,
        fare: Math.round(50 + distanceKm * 11)
      }
    ];

    res.json({
      fromLocation,
      toLocation,
      originCoords,
      destCoords,
      distanceKm,
      estimatedDurationMin: routeInfo.durationMin,
      polyline: routeInfo.polyline,
      vehicles
    });
  } catch (err) {
    console.error('Ride estimate error:', err);
    res.status(500).json({ error: 'Failed to calculate route and ride fare.' });
  }
});

// POST /api/rides/book
router.post('/rides/book', (req, res) => {
  try {
    const { fromLocation, toLocation, vehicleType, driverName, fare, distance, etaMinutes } = req.body;
    const userId = req.headers.authorization ? (req.user?.id || 'demo-user-id') : 'demo-user-id';

    const ride = memoryStore.createRide({
      userId,
      fromLocation: fromLocation || 'Goa Railway Station',
      toLocation: toLocation || 'Baga Beach',
      vehicleType: vehicleType || 'GoNomad Sedan',
      driverName: driverName || 'Vikram Singh (Demo Driver)',
      fare: fare || 250,
      distance: distance || 8.2,
      etaMinutes: etaMinutes || 4,
      bookingId: `GN-RIDE-${Math.floor(100000 + Math.random() * 900000)}`,
      driver: {
        name: driverName || 'Vikram Singh (Demo Driver)',
        vehicleNumber: 'GA 03 AB 1234',
        rating: 4.9,
        phone: '+91 98221 XXXXX',
        isDemoDriver: true
      }
    });

    res.status(201).json({
      message: 'Ride booked successfully!',
      ride
    });
  } catch (err) {
    console.error('Book ride error:', err);
    res.status(500).json({ error: 'Failed to book ride.' });
  }
});

// GET /api/rides/:id
router.get('/rides/:id', (req, res) => {
  const ride = memoryStore.getRideById(req.params.id);
  if (!ride) {
    return res.status(404).json({ error: 'Ride booking not found.' });
  }
  res.json(ride);
});

// POST /api/rides/:id/cancel
router.post('/rides/:id/cancel', (req, res) => {
  const ride = memoryStore.updateRideStatus(req.params.id, 'Cancelled');
  if (!ride) return res.status(404).json({ error: 'Ride not found' });
  res.json({ message: 'Ride booking cancelled.', ride });
});

// POST /api/rides/:id/complete
router.post('/rides/:id/complete', (req, res) => {
  const ride = memoryStore.updateRideStatus(req.params.id, 'Trip completed');
  if (!ride) return res.status(404).json({ error: 'Ride not found' });
  res.json({ message: 'Ride completed successfully.', ride });
});

export default router;
