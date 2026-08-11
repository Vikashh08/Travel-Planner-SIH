import express from 'express';
import { getWeatherForCity } from '../services/weatherService.js';
import { resolveCoordinates, calculateRoute } from '../services/routeService.js';

const router = express.Router();

// GET /api/weather/:city
router.get('/weather/:city', async (req, res) => {
  const weather = await getWeatherForCity(req.params.city);
  res.json(weather);
});

// GET /api/route?from=Goa Railway Station&to=Baga Beach
router.get('/route', async (req, res) => {
  const { from, to } = req.query;
  const originCoords = resolveCoordinates(from || 'Goa Railway Station', 15.2758, 73.9859);
  const destCoords = resolveCoordinates(to || 'Baga Beach', 15.5553, 73.7517);

  const routeInfo = await calculateRoute(originCoords, destCoords);
  res.json({
    from,
    to,
    originCoords,
    destCoords,
    ...routeInfo
  });
});

// GET /api/nearby/safety?location=Goa
router.get('/nearby/safety', (req, res) => {
  const location = (req.query.location || 'Goa').toLowerCase();

  let policeStations = [];
  let hospitals = [];

  if (location.includes('goa')) {
    policeStations = [
      { name: "Calangute Police Station", distance: "2.1 km", area: "Calangute, North Goa", lat: 15.5412, lng: 73.7620, phone: "0832-2277259", verified: true },
      { name: "Anjuna Police Station", distance: "4.5 km", area: "Anjuna, North Goa", lat: 15.5820, lng: 73.7450, phone: "0832-2273233", verified: true },
      { name: "Panaji Tourist Police Desk", distance: "8.0 km", area: "Panaji City", lat: 15.4989, lng: 73.8278, phone: "112 (National Emergency)", verified: true }
    ];
    hospitals = [
      { name: "Manipal Hospital Goa", distance: "9.2 km", area: "Dona Paula, Panaji", lat: 15.4610, lng: 73.8110, phone: "0832-6644444", verified: true, emergencyServices: "24/7 Trauma Care & ICU" },
      { name: "Candolim Primary Health Centre", distance: "1.8 km", area: "Candolim, North Goa", lat: 15.5180, lng: 73.7650, phone: "Phone number unavailable", verified: false, emergencyServices: "24/7 First Aid & Ambulance" },
      { name: "Goa Medical College Hospital (GMC)", distance: "12.0 km", area: "Bambolim", lat: 15.4590, lng: 73.8560, phone: "0832-2458700", verified: true, emergencyServices: "Level-1 Super Speciality" }
    ];
  } else if (location.includes('manali')) {
    policeStations = [
      { name: "Manali Police Station", distance: "0.8 km", area: "Mall Road, Manali", lat: 32.2405, lng: 77.1890, phone: "01902-252326", verified: true }
    ];
    hospitals = [
      { name: "Civil Hospital Manali", distance: "1.2 km", area: "Left Bank, Manali", lat: 32.2420, lng: 77.1910, phone: "01902-252243", verified: true, emergencyServices: "24/7 Emergency Wing" }
    ];
  } else {
    policeStations = [
      { name: "Central City Police Station", distance: "1.5 km", area: `${location} Central`, lat: 26.9124, lng: 75.7873, phone: "112 (National Emergency)", verified: true }
    ];
    hospitals = [
      { name: "District General Hospital", distance: "2.0 km", area: `${location} City Center`, lat: 26.9180, lng: 75.7900, phone: "Phone number unavailable", verified: false, emergencyServices: "24 Hours Emergency" }
    ];
  }

  res.json({
    location,
    touristHelpLine: "1363 (India Tourist Toll-Free)",
    nationalEmergency: "112",
    womenHelpLine: "1091",
    policeStations,
    hospitals
  });
});

export default router;
