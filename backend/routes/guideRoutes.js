import express from 'express';
import { memoryStore } from '../store/memoryStore.js';
import { resolveCoordinates, calculateMultiStopRoute } from '../services/routeService.js';

const router = express.Router();

// GET /api/guides
router.get('/guides', (req, res) => {
  const { destination, specialization } = req.query;
  let guides = memoryStore.getGuides(destination);

  if (specialization && specialization !== 'All') {
    guides = guides.filter(g => g.specializations.includes(specialization));
  }

  res.json(guides);
});

// GET /api/guides/:id
router.get('/guides/:id', (req, res) => {
  const guide = memoryStore.getGuideById(req.params.id);
  if (!guide) {
    return res.status(404).json({ error: 'Guide profile not found.' });
  }
  res.json(guide);
});

// POST /api/guides/estimate-multistop
router.post('/guides/estimate-multistop', async (req, res) => {
  try {
    const { startPoint, stops, returnPoint, guideId } = req.body;

    const places = [startPoint || 'Goa Hotel', ...(stops || []), returnPoint || startPoint || 'Goa Hotel'].filter(Boolean);
    const coordsList = places.map(place => resolveCoordinates(place, 15.2993, 74.1240));

    const routeResult = await calculateMultiStopRoute(coordsList);
    const guide = memoryStore.getGuideById(guideId);

    const guideBaseFee = guide ? guide.pricePerDay : 1500;
    const transportCost = Math.round(routeResult.totalDistanceKm * 18 + 200);

    res.json({
      places,
      totalPlacesCount: places.length - 1,
      totalDistanceKm: routeResult.totalDistanceKm,
      totalDurationMin: routeResult.totalDurationMin,
      polyline: routeResult.polyline,
      estimatedGuideFee: guideBaseFee,
      estimatedLocalTransportCost: transportCost,
      comboTotalPrice: guideBaseFee + transportCost
    });
  } catch (err) {
    console.error('Estimate multi-stop error:', err);
    res.status(500).json({ error: 'Failed to compute multi-stop route.' });
  }
});

// POST /api/guides/book
router.post('/guides/book', (req, res) => {
  try {
    const { guideId, destination, startPoint, places, date, startTime, durationHours, numberOfPeople, language, interests, includeRide, totalPrice } = req.body;
    const userId = req.headers.authorization ? (req.user?.id || 'demo-user-id') : 'demo-user-id';

    const guide = memoryStore.getGuideById(guideId);

    const booking = memoryStore.createGuideBooking({
      userId,
      guideId,
      guideName: guide ? guide.name : 'Rahul Deshmukh (Demo Guide)',
      guideImage: guide ? guide.profileImage : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
      destination: destination || 'Goa',
      startPoint: startPoint || 'Hotel',
      places: places || ['Baga Beach', 'Fort Aguada', 'Candolim Beach', 'Anjuna Market'],
      date: date || new Date().toISOString().split('T')[0],
      startTime: startTime || '09:00 AM',
      durationHours: durationHours || 6,
      numberOfPeople: numberOfPeople || 2,
      language: language || 'English',
      interests: interests || ['Heritage', 'Food'],
      includeRide: includeRide || false,
      totalPrice: totalPrice || 1800,
      bookingId: `GN-GUIDE-${Math.floor(100000 + Math.random() * 900000)}`
    });

    res.status(201).json({
      message: 'Local Guide booked successfully!',
      booking
    });
  } catch (err) {
    console.error('Book guide error:', err);
    res.status(500).json({ error: 'Failed to book guide.' });
  }
});

export default router;
