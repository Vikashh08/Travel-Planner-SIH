import express from 'express';
import { memoryStore } from '../store/memoryStore.js';

const router = express.Router();

// GET /api/destinations
router.get('/destinations', (req, res) => {
  const { region, category, search } = req.query;
  let destinations = memoryStore.getDestinations();

  if (region && region !== 'All') {
    destinations = destinations.filter(d => d.region.toLowerCase() === region.toLowerCase());
  }

  if (category && category !== 'All') {
    destinations = destinations.filter(d => d.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    destinations = destinations.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.state.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q)
    );
  }

  res.json(destinations);
});

// GET /api/destinations/:id
router.get('/destinations/:id', (req, res) => {
  const dest = memoryStore.getDestinationById(req.params.id);
  if (!dest) {
    return res.status(404).json({ error: 'Destination not found' });
  }
  res.json(dest);
});

// GET /api/search
router.get('/search', (req, res) => {
  const query = (req.query.q || '').toLowerCase();
  if (!query) {
    return res.json({ destinations: [], guides: [], attractions: [] });
  }

  const destinations = memoryStore.getDestinations().filter(d =>
    d.name.toLowerCase().includes(query) ||
    d.state.toLowerCase().includes(query) ||
    d.activities.some(act => act.toLowerCase().includes(query))
  );

  const guides = memoryStore.getGuides().filter(g =>
    g.name.toLowerCase().includes(query) ||
    g.destination.toLowerCase().includes(query) ||
    g.specializations.some(s => s.toLowerCase().includes(query))
  );

  const attractions = [];
  memoryStore.getDestinations().forEach(d => {
    d.attractions.forEach(att => {
      if (att.name.toLowerCase().includes(query) || att.type.toLowerCase().includes(query)) {
        attractions.push({ ...att, destinationName: d.name });
      }
    });
  });

  res.json({
    destinations,
    guides,
    attractions
  });
});

export default router;
