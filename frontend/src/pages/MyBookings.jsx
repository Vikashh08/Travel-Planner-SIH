import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { Navigation, Car, UserCheck, Star, Calendar, CheckCircle } from 'lucide-react';

export default function MyBookings({ setActivePage }) {
  const { setRatingTarget } = useBooking();
  const [activeTab, setActiveTab] = useState('rides'); // 'rides' | 'guides'
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'Upcoming' | 'Completed' | 'Cancelled'
  const [bookings, setBookings] = useState({ rides: [], guideBookings: [] });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/bookings`);
      setBookings(res.data);
    } catch (err) {
      console.error('Failed to load bookings:', err);
    }
  };

  const ridesList = bookings.rides.filter(r => statusFilter === 'All' || r.status.toLowerCase().includes(statusFilter.toLowerCase()));
  const guidesList = bookings.guideBookings.filter(g => statusFilter === 'All' || g.status.toLowerCase().includes(statusFilter.toLowerCase()));

  return (
    <div style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      <div className="container">
        <div style={{ marginBottom: '32px' }}>
          <span className="badge badge-primary">Booking History</span>
          <h1 style={{ fontSize: '2.5rem', color: '#0F172A', marginTop: '6px' }}>My Bookings</h1>
        </div>

        {/* Tab & Filter Bar */}
        <div className="glass-card" style={{ padding: '16px 24px', borderRadius: '20px', marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              className={`btn btn-sm ${activeTab === 'rides' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveTab('rides')}
            >
              <Car size={16} /> Ride Bookings ({bookings.rides.length})
            </button>
            <button
              className={`btn btn-sm ${activeTab === 'guides' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveTab('guides')}
            >
              <UserCheck size={16} /> Guide Bookings ({bookings.guideBookings.length})
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem' }}>
            <span>Status:</span>
            <select className="form-control" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: '6px 12px' }}>
              <option value="All">All Statuses</option>
              <option value="Upcoming">Upcoming / In Progress</option>
              <option value="Completed">Trip Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Bookings Content */}
        {activeTab === 'rides' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {ridesList.length > 0 ? ridesList.map(ride => (
              <div key={ride.id} className="glass-card" style={{ padding: '24px', borderRadius: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                    <span className="badge badge-primary">{ride.bookingId || 'GN-RIDE-123'}</span>
                    <span className="badge badge-accent">{ride.status}</span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', color: '#0F172A' }}>{ride.vehicleType}</h3>
                  <p style={{ fontSize: '0.88rem', color: '#64748B' }}>Driver: <strong>{ride.driverName}</strong></p>
                  <p style={{ fontSize: '0.85rem', color: '#334155', marginTop: '4px' }}>
                    📍 {ride.fromLocation} ➔ 🏁 {ride.toLocation} ({ride.distance} km)
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#10B981' }}>₹{ride.fare}</div>
                  <button
                    className="btn btn-outline btn-sm"
                    style={{ marginTop: '10px' }}
                    onClick={() => setRatingTarget({ type: 'driver', id: 'driver-1', name: ride.driverName })}
                  >
                    Rate Driver ⭐
                  </button>
                </div>
              </div>
            )) : <div style={{ textAlign: 'center', color: '#94A3B8', padding: '40px' }}>No ride bookings found.</div>}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {guidesList.length > 0 ? guidesList.map(g => (
              <div key={g.id} className="glass-card" style={{ padding: '24px', borderRadius: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                    <span className="badge badge-primary">{g.bookingId || 'GN-GUIDE-888'}</span>
                    <span className="badge badge-accent">{g.status}</span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', color: '#0F172A' }}>Guide: {g.guideName}</h3>
                  <p style={{ fontSize: '0.88rem', color: '#64748B' }}>Destination: <strong>{g.destination}</strong> • Date: {g.date}</p>
                  <p style={{ fontSize: '0.85rem', color: '#334155', marginTop: '4px' }}>
                    Places Covered: {g.places?.join(' ➔ ')}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#10B981' }}>₹{g.totalPrice}</div>
                  <button
                    className="btn btn-outline btn-sm"
                    style={{ marginTop: '10px' }}
                    onClick={() => setRatingTarget({ type: 'guide', id: g.guideId, name: g.guideName })}
                  >
                    Rate Guide ⭐
                  </button>
                </div>
              </div>
            )) : <div style={{ textAlign: 'center', color: '#94A3B8', padding: '40px' }}>No guide bookings found.</div>}
          </div>
        )}
      </div>
    </div>
  );
}
