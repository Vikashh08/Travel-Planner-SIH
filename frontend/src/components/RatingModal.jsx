import React, { useState } from 'react';
import axios from 'axios';
import { useBooking } from '../context/BookingContext';
import { useAuth, API_BASE_URL } from '../context/AuthContext';
import { Star, X, CheckCircle } from 'lucide-react';

export default function RatingModal() {
  const { ratingTarget, setRatingTarget } = useBooking();
  const { user } = useAuth();

  const [overallRating, setOverallRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [cat1, setCat1] = useState(5);
  const [cat2, setCat2] = useState(5);
  const [cat3, setCat3] = useState(5);
  const [cat4, setCat4] = useState(5);
  const [textReview, setTextReview] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!ratingTarget) return null;

  const isDriver = ratingTarget.type === 'driver';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload = {
        targetType: ratingTarget.type,
        targetId: ratingTarget.id,
        rating: overallRating,
        categories: isDriver
          ? { driving: cat1, punctuality: cat2, behavior: cat3, safety: cat4 }
          : { knowledge: cat1, behavior: cat2, communication: cat3, timeManagement: cat4 },
        text: textReview,
        userName: user?.name || 'Happy Traveler',
        tripType: 'India Experience'
      };

      await axios.post(`${API_BASE_URL}/reviews`, payload);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setRatingTarget(null);
      }, 2500);
    } catch (err) {
      console.error('Submit review error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '24px',
        maxWidth: '520px',
        width: '100%',
        padding: '32px',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
        position: 'relative'
      }}>
        <button
          onClick={() => setRatingTarget(null)}
          style={{ position: 'absolute', top: '20px', right: '20px', background: '#F1F5F9', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <CheckCircle size={64} color="#10B981" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.5rem', color: '#0F172A', marginBottom: '8px' }}>Review Submitted!</h3>
            <p style={{ color: '#64748B' }}>Thank you for helping GoNomad maintain trusted ratings.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <span className="badge badge-primary" style={{ marginBottom: '8px' }}>
                {isDriver ? 'Rate Your Driver' : 'Rate Your Local Guide'}
              </span>
              <h3 style={{ fontSize: '1.4rem', color: '#0F172A' }}>
                {ratingTarget.name || (isDriver ? 'Vikram Singh' : 'Rahul Deshmukh')}
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#64748B', marginTop: '4px' }}>
                How was your recent trip experience?
              </p>
            </div>

            {/* Overall Star Rating */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={36}
                  fill={(hoverRating || overallRating) >= star ? "#F59E0B" : "none"}
                  color={(hoverRating || overallRating) >= star ? "#F59E0B" : "#CBD5E1"}
                  style={{ cursor: 'pointer', transition: 'transform 0.15s ease' }}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setOverallRating(star)}
                />
              ))}
            </div>

            {/* Detailed Category Ratings */}
            <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '16px', marginBottom: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.85rem' }}>
              <div>
                <label style={{ fontWeight: '600' }}>{isDriver ? 'Driving Skills' : 'Local Knowledge'}</label>
                <select className="form-control" style={{ padding: '6px 10px', marginTop: '4px' }} value={cat1} onChange={e => setCat1(Number(e.target.value))}>
                  <option value={5}>5 - Excellent</option>
                  <option value={4}>4 - Good</option>
                  <option value={3}>3 - Average</option>
                  <option value={2}>2 - Below Expectation</option>
                </select>
              </div>
              <div>
                <label style={{ fontWeight: '600' }}>{isDriver ? 'Punctuality' : 'Behavior & Courtesy'}</label>
                <select className="form-control" style={{ padding: '6px 10px', marginTop: '4px' }} value={cat2} onChange={e => setCat2(Number(e.target.value))}>
                  <option value={5}>5 - Excellent</option>
                  <option value={4}>4 - Good</option>
                  <option value={3}>3 - Average</option>
                </select>
              </div>
              <div>
                <label style={{ fontWeight: '600' }}>{isDriver ? 'Driver Behavior' : 'Communication'}</label>
                <select className="form-control" style={{ padding: '6px 10px', marginTop: '4px' }} value={cat3} onChange={e => setCat3(Number(e.target.value))}>
                  <option value={5}>5 - Polite & Professional</option>
                  <option value={4}>4 - Good</option>
                  <option value={3}>3 - Neutral</option>
                </select>
              </div>
              <div>
                <label style={{ fontWeight: '600' }}>{isDriver ? 'Vehicle Safety' : 'Time Management'}</label>
                <select className="form-control" style={{ padding: '6px 10px', marginTop: '4px' }} value={cat4} onChange={e => setCat4(Number(e.target.value))}>
                  <option value={5}>5 - Top Notch</option>
                  <option value={4}>4 - Good</option>
                  <option value={3}>3 - Average</option>
                </select>
              </div>
            </div>

            {/* Written Review */}
            <div className="form-group">
              <label>Write your feedback (Optional)</label>
              <textarea
                className="form-control"
                rows={3}
                placeholder="Share your travel experience to help future travellers..."
                value={textReview}
                onChange={e => setTextReview(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={submitting}>
              {submitting ? 'Submitting Review...' : 'Submit Rating & Review'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
