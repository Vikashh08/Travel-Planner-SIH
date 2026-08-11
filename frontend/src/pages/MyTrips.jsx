import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../context/AuthContext';
import { Calendar, MapPin, Trash2, Sparkles, ArrowRight } from 'lucide-react';

export default function MyTrips({ setActivePage }) {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/trips`);
      setTrips(res.data);
    } catch (err) {
      console.error('Failed to load trips:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/trips/${id}`);
      setTrips(trips.filter(t => t.id !== id));
    } catch (err) {
      console.error('Failed to delete trip:', err);
    }
  };

  return (
    <div style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <span className="badge badge-primary">Saved Plans</span>
            <h1 style={{ fontSize: '2.5rem', color: '#0F172A', marginTop: '6px' }}>My Saved Trips</h1>
          </div>
          <button className="btn btn-primary" onClick={() => setActivePage('planner')}>
            + Create New AI Trip
          </button>
        </div>

        {trips.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {trips.map(trip => (
              <div key={trip.id} className="glass-card" style={{ padding: '28px', borderRadius: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <h2 style={{ fontSize: '1.6rem', color: '#0F172A' }}>{trip.destination} Trip Plan</h2>
                    <p style={{ color: '#64748B', fontSize: '0.9rem' }}>{trip.dates} • Est. Budget: <strong style={{ color: '#10B981' }}>₹{trip.budget}</strong></p>
                  </div>
                  <button className="btn btn-outline btn-sm" onClick={() => handleDelete(trip.id)} style={{ color: '#EF4444', borderColor: '#FCA5A5' }}>
                    <Trash2 size={16} /> Delete
                  </button>
                </div>

                <div style={{ background: '#F8FAFC', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0', marginBottom: '20px' }}>
                  <h4 style={{ color: '#0F172A', marginBottom: '8px' }}>Day-wise Activities Highlights</h4>
                  <ul style={{ paddingLeft: '20px', fontSize: '0.9rem', color: '#334155', lineHeight: '1.7' }}>
                    {trip.places?.map((p, idx) => <li key={idx}>{p}</li>)}
                  </ul>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button className="btn btn-primary btn-sm" onClick={() => setActivePage('ride')}>
                    Book Ride Transport For Trip
                  </button>
                  <button className="btn btn-outline btn-sm" onClick={() => setActivePage('guides')}>
                    Book Local Guide For Trip
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card" style={{ padding: '60px', textAlign: 'center', borderRadius: '24px', color: '#64748B' }}>
            <h3>No Saved Trips Found</h3>
            <p style={{ marginTop: '8px', marginBottom: '20px' }}>Generate a custom day-wise itinerary using AI Trip Planner!</p>
            <button className="btn btn-primary" onClick={() => setActivePage('planner')}>
              Go to AI Trip Planner
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
