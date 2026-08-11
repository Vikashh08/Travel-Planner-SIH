import express from 'express';
import { memoryStore } from '../store/memoryStore.js';

const router = express.Router();

// GET /api/trips
router.get('/trips', (req, res) => {
  const userId = req.query.userId || 'demo-user-id';
  const trips = memoryStore.getUserTrips(userId);
  res.json(trips);
});

// GET /api/trips/:id
router.get('/trips/:id', (req, res) => {
  const trip = memoryStore.getTripById(req.params.id);
  if (!trip) {
    return res.status(404).json({ error: 'Trip not found' });
  }
  res.json(trip);
});

// POST /api/trips
router.post('/trips', (req, res) => {
  try {
    const { destination, dates, budget, itinerary, places, transport, guideId, checklist, safety } = req.body;
    const userId = req.body.userId || 'demo-user-id';

    const trip = memoryStore.createTrip({
      userId,
      destination: destination || 'Goa',
      dates: dates || '2026-09-10 to 2026-09-14',
      budget: budget || 18000,
      itinerary: itinerary || [],
      places: places || ['Baga Beach', 'Fort Aguada', 'Dudhsagar Falls'],
      transport: transport || 'GoNomad Sedan',
      guideId: guideId || null,
      checklist: checklist || ['ID Proof', 'Power Bank', 'Sunscreen'],
      safety: safety || ['Emergency Contact Saved', 'Weather Checked']
    });

    res.status(201).json({
      message: 'Trip saved successfully to Dashboard!',
      trip
    });
  } catch (err) {
    console.error('Create trip error:', err);
    res.status(500).json({ error: 'Failed to save trip' });
  }
});

// DELETE /api/trips/:id
router.delete('/trips/:id', (req, res) => {
  memoryStore.deleteTrip(req.params.id);
  res.json({ message: 'Trip deleted successfully.' });
});

// GET /api/bookings
router.get('/bookings', (req, res) => {
  const userId = req.query.userId || 'demo-user-id';
  const rides = memoryStore.getUserRides(userId);
  const guideBookings = memoryStore.getGuideBookings(userId);

  res.json({
    rides,
    guideBookings
  });
});

// Saved Destinations
router.post('/destinations/saved/toggle', (req, res) => {
  const { destinationId } = req.body;
  const userId = req.body.userId || 'demo-user-id';
  const result = memoryStore.toggleSavedDestination(userId, destinationId);
  res.json(result);
});

router.get('/destinations/saved/all', (req, res) => {
  const userId = req.query.userId || 'demo-user-id';
  const saved = memoryStore.getUserSavedDestinations(userId);
  res.json(saved);
});

export default router;
