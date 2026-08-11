import express from 'express';
import { generateAiItinerary, generateSmartRecommendations } from '../services/aiService.js';

const router = express.Router();

// POST /api/ai/itinerary
router.post('/ai/itinerary', async (req, res) => {
  try {
    const itineraryData = await generateAiItinerary(req.body);
    res.json(itineraryData);
  } catch (err) {
    console.error('AI Itinerary generation error:', err);
    res.status(500).json({ error: 'Failed to generate AI itinerary.' });
  }
});

// POST /api/ai/recommend
router.post('/ai/recommend', async (req, res) => {
  try {
    const recommendations = await generateSmartRecommendations(req.body);
    res.json(recommendations);
  } catch (err) {
    console.error('AI Recommendation error:', err);
    res.status(500).json({ error: 'Failed to generate recommendations.' });
  }
});

export default router;
