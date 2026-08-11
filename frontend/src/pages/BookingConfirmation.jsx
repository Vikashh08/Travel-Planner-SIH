import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useBooking } from '../context/BookingContext';
import { CheckCircle, Calendar, MapPin, Navigation, Car, UserCheck, ArrowRight } from 'lucide-react';

export default function BookingConfirmation({ setActivePage }) {
  const { activeRide, activeGuideBooking } = useBooking();

  useEffect(() => {
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
  }, []);

  return (
    <div style={{ paddingTop: '60px', paddingBottom: '100px', display: 'flex', justifyContent: 'center' }}>
      <div className="glass-card" style={{ maxWidth: '640px', width: '100%', padding: '40px', borderRadius: '24px', textAlign: 'center' }}>
        <CheckCircle size={72} color="#10B981" style={{ marginBottom: '20px' }} />
        <span className="badge badge-accent" style={{ marginBottom: '12px' }}>CONFIRMED BOOKING</span>
        <h1 style={{ fontSize: '2.4rem', color: '#0F172A', marginBottom: '8px' }}>Your Travel Booking is Confirmed!</h1>
        <p style={{ color: '#64748B', fontSize: '1rem', marginBottom: '32px' }}>
          Thank you for choosing GoNomad. Below are your travel details.
        </p>

        {activeRide && (
          <div style={{ background: '#F8FAFC', padding: '24px', borderRadius: '20px', border: '1px solid #E2E8F0', textAlign: 'left', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#0F172A', marginBottom: '12px' }}>🚗 Ride Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.9rem', color: '#334155' }}>
              <div>Booking ID: <strong>{activeRide.bookingId}</strong></div>
              <div>Vehicle: <strong>{activeRide.vehicleType}</strong></div>
              <div>Driver: <strong>{activeRide.driverName}</strong></div>
              <div>Estimated Fare: <strong style={{ color: '#10B981' }}>₹{activeRide.fare}</strong></div>
              <div>FROM: <strong>{activeRide.fromLocation}</strong></div>
              <div>TO: <strong>{activeRide.toLocation}</strong></div>
            </div>
          </div>
        )}

        {activeGuideBooking && (
          <div style={{ background: '#F8FAFC', padding: '24px', borderRadius: '20px', border: '1px solid #E2E8F0', textAlign: 'left', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#0F172A', marginBottom: '12px' }}>👤 Local Guide Booking Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.9rem', color: '#334155' }}>
              <div>Booking ID: <strong>{activeGuideBooking.bookingId}</strong></div>
              <div>Guide Name: <strong>{activeGuideBooking.guideName}</strong></div>
              <div>Destination: <strong>{activeGuideBooking.destination}</strong></div>
              <div>Total Price: <strong style={{ color: '#10B981' }}>₹{activeGuideBooking.totalPrice}</strong></div>
              <div style={{ gridColumn: 'span 2' }}>
                Places Covered: <strong>{activeGuideBooking.places?.join(' ➔ ')}</strong>
              </div>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '32px' }}>
          <button className="btn btn-primary btn-lg" onClick={() => setActivePage('dashboard')}>
            Go to Dashboard <ArrowRight size={18} />
          </button>
          {activeRide && (
            <button className="btn btn-secondary btn-lg" onClick={() => setActivePage('ride')}>
              Track Ride Map
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
