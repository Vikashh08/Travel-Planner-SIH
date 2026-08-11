import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth, API_BASE_URL } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { User, Calendar, Navigation, Heart, Star, Compass, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

export default function UserDashboard({ setActivePage, setSelectedDestination, setSelectedGuide }) {
  const { user } = useAuth();
  const { activeRide, activeGuideBooking, setRatingTarget } = useBooking();

  const [trips, setTrips] = useState([]);
  const [bookings, setBookings] = useState({ rides: [], guideBookings: [] });
  const [savedDests, setSavedDests] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const tripsRes = await axios.get(`${API_BASE_URL}/trips`);
      setTrips(tripsRes.data);

      const bookingsRes = await axios.get(`${API_BASE_URL}/bookings`);
      setBookings(bookingsRes.data);

      const savedRes = await axios.get(`${API_BASE_URL}/destinations/saved/all`);
      setSavedDests(savedRes.data);
    } catch (err) {
      console.error('Failed to load user dashboard data:', err);
    }
  };

  return (
    <div style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      <div className="container">
        {/* Welcome Header */}
        <div className="glass-card" style={{ padding: '32px', borderRadius: '24px', marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(135deg, #0F172A, #1E293B)', color: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <img src={user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=GoNomad"} alt={user?.name} style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'white' }} />
            <div>
              <span className="badge badge-primary" style={{ marginBottom: '6px' }}>GoNomad Member</span>
              <h1 style={{ fontSize: '2.2rem', color: 'white' }}>Welcome back, {user?.name || 'Traveler'}!</h1>
              <p style={{ fontSize: '0.9rem', color: '#94A3B8' }}>{user?.email || 'traveler@gonomad.in'} • {user?.travelInterests?.join(', ') || 'Exploring India'}</p>
            </div>
          </div>
          <button className="btn btn-primary" onClick={() => setActivePage('planner')}>
            + Create New Trip
          </button>
        </div>

        {/* Active Ride / Guide Booking Notification Cards */}
        {activeRide && (
          <div style={{ background: '#FFF0F0', border: '1.5px solid #FF5A5F', padding: '20px', borderRadius: '20px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span className="badge badge-primary" style={{ marginBottom: '4px' }}>Active Local Ride</span>
              <h4 style={{ color: '#0F172A', fontSize: '1.15rem' }}>{activeRide.vehicleType} • {activeRide.status}</h4>
              <p style={{ fontSize: '0.85rem', color: '#64748B' }}>From {activeRide.fromLocation} to {activeRide.toLocation}</p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              {activeRide.status === 'Trip completed' && (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setRatingTarget({ type: 'driver', id: 'driver-1', name: activeRide.driverName })}
                >
                  Rate Driver ⭐
                </button>
              )}
              <button className="btn btn-outline btn-sm" onClick={() => setActivePage('ride')}>
                Track Ride Map
              </button>
            </div>
          </div>
        )}

        {activeGuideBooking && (
          <div style={{ background: '#ECFDF5', border: '1.5px solid #10B981', padding: '20px', borderRadius: '20px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span className="badge badge-accent" style={{ marginBottom: '4px' }}>Upcoming Guide Booking</span>
              <h4 style={{ color: '#0F172A', fontSize: '1.15rem' }}>Guide: {activeGuideBooking.guideName} • {activeGuideBooking.destination}</h4>
              <p style={{ fontSize: '0.85rem', color: '#64748B' }}>{activeGuideBooking.places?.join(' ➔ ')}</p>
            </div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => setRatingTarget({ type: 'guide', id: activeGuideBooking.guideId, name: activeGuideBooking.guideName })}
            >
              Rate Guide ⭐
            </button>
          </div>
        )}

        {/* Saved Trips Section */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.6rem', color: '#0F172A' }}>My Saved Trips ({trips.length})</h2>
            <button className="btn btn-outline btn-sm" onClick={() => setActivePage('mytrips')}>View All Trips</button>
          </div>

          {trips.length > 0 ? (
            <div className="grid-3">
              {trips.map(trip => (
                <div key={trip.id} className="glass-card" style={{ padding: '24px', borderRadius: '20px' }}>
                  <span className="badge badge-primary" style={{ marginBottom: '8px' }}>Saved Trip</span>
                  <h3 style={{ fontSize: '1.3rem', color: '#0F172A' }}>{trip.destination}</h3>
                  <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '12px' }}>{trip.dates}</p>
                  <p style={{ fontSize: '0.9rem', color: '#10B981', fontWeight: 'bold' }}>Est. Budget: ₹{trip.budget}</p>
                  <button className="btn btn-outline btn-sm" style={{ marginTop: '16px', width: '100%' }} onClick={() => setActivePage('mytrips')}>
                    View Itinerary Details
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card" style={{ padding: '40px', textAlign: 'center', color: '#64748B', borderRadius: '20px' }}>
              <p>No saved trips yet. Use our AI Trip Planner to create your first itinerary!</p>
            </div>
          )}
        </div>

        {/* Recent Ride & Guide Bookings History */}
        <div>
          <h2 style={{ fontSize: '1.6rem', color: '#0F172A', marginBottom: '20px' }}>My Bookings History</h2>
          <div className="grid-2">
            <div className="glass-card" style={{ padding: '24px', borderRadius: '20px' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginBottom: '12px' }}>Ride Bookings</h3>
              {bookings.rides.length > 0 ? bookings.rides.map(r => (
                <div key={r.id} style={{ background: '#F8FAFC', padding: '12px', borderRadius: '12px', marginBottom: '10px', fontSize: '0.88rem' }}>
                  <strong>{r.vehicleType}</strong> • ₹{r.fare} • <span style={{ color: '#10B981', fontWeight: 'bold' }}>{r.status}</span>
                  <div style={{ color: '#64748B', fontSize: '0.78rem' }}>{r.fromLocation} ➔ {r.toLocation}</div>
                </div>
              )) : <p style={{ fontSize: '0.88rem', color: '#94A3B8' }}>No past ride bookings.</p>}
            </div>

            <div className="glass-card" style={{ padding: '24px', borderRadius: '20px' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginBottom: '12px' }}>Guide Bookings</h3>
              {bookings.guideBookings.length > 0 ? bookings.guideBookings.map(gb => (
                <div key={gb.id} style={{ background: '#F8FAFC', padding: '12px', borderRadius: '12px', marginBottom: '10px', fontSize: '0.88rem' }}>
                  <strong>{gb.guideName}</strong> ({gb.destination}) • ₹{gb.totalPrice} • <span style={{ color: '#10B981', fontWeight: 'bold' }}>{gb.status}</span>
                  <div style={{ color: '#64748B', fontSize: '0.78rem' }}>Places: {gb.places?.join(', ')}</div>
                </div>
              )) : <p style={{ fontSize: '0.88rem', color: '#94A3B8' }}>No past guide bookings.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
