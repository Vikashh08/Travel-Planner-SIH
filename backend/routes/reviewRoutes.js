import express from 'express';
import { memoryStore } from '../store/memoryStore.js';

const router = express.Router();

// POST /api/reviews
router.post('/reviews', (req, res) => {
  try {
    const { targetType, targetId, rating, categories, text, userName, tripType } = req.body;
    const userId = req.body.userId || 'demo-user-id';

    if (!targetType || !targetId || !rating) {
      return res.status(400).json({ error: 'Target type (driver/guide), targetId, and rating are required.' });
    }

    // Protect private user info by showing only first name (Requirement 21)
    const displayName = (userName || 'Anonymous').trim().split(' ')[0];

    const review = memoryStore.addReview({
      userId,
      userName: displayName,
      targetType, // 'driver' or 'guide'
      targetId,
      rating: parseFloat(rating),
      categories: categories || {},
      text: text || '',
      tripType: tripType || 'Local Trip',
      date: new Date().toISOString().split('T')[0]
    });

    // Get updated target entity for return
    let updatedTarget = null;
    if (targetType === 'driver') updatedTarget = memoryStore.getDriverById(targetId);
    if (targetType === 'guide') updatedTarget = memoryStore.getGuideById(targetId);

    res.status(201).json({
      message: 'Thank you! Your rating and review have been submitted.',
      review,
      updatedTarget
    });
  } catch (err) {
    console.error('Submit review error:', err);
    res.status(500).json({ error: 'Failed to submit review' });
  }
});

// GET /api/reviews/:type/:id
router.get('/reviews/:type/:id', (req, res) => {
  const { type, id } = req.params;
  const reviews = memoryStore.getReviews(type, id);
  res.json(reviews);
});

export default router;
