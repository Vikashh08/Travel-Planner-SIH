import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { User, MapPin, Star, Calendar, Clock, Plus, Trash2, ShieldCheck, Car, CheckCircle, ArrowRight } from 'lucide-react';

const stopPin = L.divIcon({
  className: 'stop-pin',
  html: `<div style="background:#FF5A5F; color:white; padding:4px 8px; border-radius:12px; font-weight:bold; font-size:12px; border:2px solid white; box-shadow:0 2px 8px rgba(0,0,0,0.3)">📍 Stop</div>`
});

export default function GuideDetails({ guideId, setActivePage }) {
  const { setActiveGuideBooking } = useBooking();
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(true);

  // Multi-stop Trip Planner State (Requirement 17 & 18)
  const [startPoint, setStartPoint] = useState('Goa Hotel');
  const [stops, setStops] = useState(['Baga Beach', 'Fort Aguada', 'Candolim Beach', 'Anjuna Market']);
  const [newStopInput, setNewStopInput] = useState('');
  const [bookingDate, setBookingDate] = useState('2026-09-15');
  const [bookingTime, setBookingTime] = useState('09:00 AM');
  const [durationHours, setDurationHours] = useState(6);
  const [includeRide, setIncludeRide] = useState(true); // Guide + Ride Combo (Requirement 19)

  const [routeEstimate, setRouteEstimate] = useState(null);

  useEffect(() => {
    fetchGuide();
  }, [guideId]);

  useEffect(() => {
    if (guide) {
      calculateMultiStop();
    }
  }, [startPoint, stops, includeRide, guide]);

  const fetchGuide = async () => {
    setLoading(true);
    try {
      const id = guideId || 'guide-1';
      const res = await axios.get(`${API_BASE_URL}/guides/${id}`);
      setGuide(res.data);
    } catch (err) {
      console.error('Failed to fetch guide details:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateMultiStop = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/guides/estimate-multistop`, {
        startPoint,
        stops,
        returnPoint: startPoint,
        guideId: guide?.id
      });
      setRouteEstimate(res.data);
    } catch (err) {
      console.error('Failed to compute multi-stop route:', err);
      toast.error('Failed to compute route.');
    }
  };

  const handleAddStop = () => {
    if (newStopInput.trim()) {
      setStops([...stops, newStopInput.trim()]);
      setNewStopInput('');
    }
  };

  const handleRemoveStop = (idx) => {
    setStops(stops.filter((_, i) => i !== idx));
  };

  const handleBookGuide = async () => {
    try {
      const totalPrice = includeRide
        ? (routeEstimate?.comboTotalPrice || 3300)
        : (guide?.pricePerDay || 1500);

      const res = await axios.post(`${API_BASE_URL}/guides/book`, {
        guideId: guide.id,
        destination: guide.destination,
        startPoint,
        places: stops,
        date: bookingDate,
        startTime: bookingTime,
        durationHours,
        includeRide,
        totalPrice
      });

      setActiveGuideBooking(res.data.booking);
      toast.success('Guide booked successfully!');
      setActivePage('booking-confirmation');
    } catch (err) {
      console.error('Failed to book guide:', err);
      toast.error('Failed to book guide.');
    }
  };

  if (loading || !guide) {
    return <div style={{ textAlign: 'center', padding: '100px 0' }}>Loading guide profile...</div>;
  }

  return (
    <div style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      <div className="container">
        {/* Header Profile */}
        <div className="glass-card" style={{ padding: '32px', borderRadius: '24px', marginBottom: '32px', display: 'flex', gap: '32px', alignItems: 'center' }}>
          <img src={guide.profileImage} alt={guide.name} style={{ width: '140px', height: '140px', borderRadius: '24px', objectFit: 'cover' }} />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span className="badge badge-accent">✓ Verified Local Guide</span>
                <h1 style={{ fontSize: '2.4rem', color: '#0F172A', marginTop: '4px' }}>{guide.name}</h1>
                <p style={{ color: '#64748B', fontSize: '1rem' }}>Destination: <strong>{guide.destination}</strong></p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#F59E0B' }}>⭐ {guide.rating}</div>
                <span style={{ fontSize: '0.85rem', color: '#64748B' }}>{guide.totalTrips} Completed Trips</span>
              </div>
            </div>

            <p style={{ fontSize: '0.95rem', color: '#334155', marginTop: '12px', lineHeight: '1.6' }}>
              {guide.description}
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
          {/* Left Column: Multi-Stop Itinerary Planner (Requirement 17 & 18) */}
          <div>
            <div className="glass-card" style={{ padding: '28px', borderRadius: '24px', marginBottom: '32px' }}>
              <span className="badge badge-primary" style={{ marginBottom: '12px' }}>CORE FEATURE</span>
              <h2 style={{ fontSize: '1.6rem', color: '#0F172A', marginBottom: '8px' }}>Create Multi-Stop Guide Trip</h2>
              <p style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: '24px' }}>
                Add multiple destinations across {guide.destination}. Your local guide will take you to every location.
              </p>

              {/* Start Location */}
              <div className="form-group">
                <label>Starting Point (Hotel / Railway Station / Airport)</label>
                <input
                  type="text"
                  className="form-control"
                  value={startPoint}
                  onChange={e => setStartPoint(e.target.value)}
                />
              </div>

              {/* Stops List */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontWeight: 'bold', fontSize: '0.9rem', display: 'block', marginBottom: '10px' }}>Places to Visit ({stops.length})</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {stops.map((stop, idx) => (
                    <div key={idx} style={{ background: '#F8FAFC', padding: '12px 16px', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: '600', color: '#0F172A' }}>📍 Stop {idx + 1}: {stop}</span>
                      <button onClick={() => handleRemoveStop(idx)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Stop Input */}
              <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add another place (e.g. Calangute Beach)..."
                  value={newStopInput}
                  onChange={e => setNewStopInput(e.target.value)}
                />
                <button className="btn btn-outline" onClick={handleAddStop} style={{ whiteSpace: 'nowrap' }}>
                  <Plus size={18} /> Add Stop
                </button>
              </div>

              {/* Combo Toggle */}
              <div style={{ background: '#FFF0F0', border: '1.5px solid #FF5A5F', padding: '16px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <div>
                  <h4 style={{ color: '#0F172A', fontSize: '1rem' }}>Include GoNomad Private Cab & Driver</h4>
                  <p style={{ fontSize: '0.82rem', color: '#64748B' }}>Guide + Ride combo for seamless multi-stop travel.</p>
                </div>
                <input
                  type="checkbox"
                  checked={includeRide}
                  onChange={e => setIncludeRide(e.target.checked)}
                  style={{ width: '22px', height: '22px', accentColor: '#FF5A5F', cursor: 'pointer' }}
                />
              </div>

              {/* Price Breakdown */}
              {routeEstimate && (
                <div style={{ background: '#F8FAFC', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0', marginBottom: '24px' }}>
                  <h4 style={{ fontSize: '1.1rem', color: '#0F172A', marginBottom: '12px' }}>Trip Summary & Fare Breakdown</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem', color: '#475569' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Total Distance:</span> <strong>{routeEstimate.totalDistanceKm} km</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Guide Daily Fee:</span> <strong>₹{routeEstimate.estimatedGuideFee}</strong>
                    </div>
                    {includeRide && (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Cab Transport Cost:</span> <strong>₹{routeEstimate.estimatedLocalTransportCost}</strong>
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #CBD5E1', paddingTop: '8px', fontSize: '1.15rem', color: '#10B981', fontWeight: 'bold' }}>
                      <span>Total Price:</span> <span>₹{includeRide ? routeEstimate.comboTotalPrice : routeEstimate.estimatedGuideFee}</span>
                    </div>
                  </div>
                </div>
              )}

              <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={handleBookGuide}>
                Book This Guide & Trip <ArrowRight size={18} />
              </button>
            </div>

            {/* Guide Reviews */}
            <div className="glass-card" style={{ padding: '28px', borderRadius: '24px' }}>
              <h3 style={{ fontSize: '1.4rem', color: '#0F172A', marginBottom: '16px' }}>Traveler Reviews ({guide.reviews?.length || 0})</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {guide.reviews?.map(rev => (
                  <div key={rev.id} style={{ background: '#F8FAFC', padding: '16px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <strong style={{ color: '#0F172A' }}>{rev.userName}</strong>
                      <span style={{ color: '#F59E0B', fontWeight: 'bold' }}>⭐ {rev.rating}</span>
                    </div>
                    <p style={{ fontSize: '0.88rem', color: '#475569' }}>{rev.comment}</p>
                    <span style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'block', marginTop: '6px' }}>{rev.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Multi-stop Route Map Visualization */}
          <div>
            <div className="glass-card" style={{ padding: '20px', borderRadius: '24px', height: '550px', position: 'sticky', top: '100px' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginBottom: '12px' }}>Multi-Stop Route Map</h3>
              <div style={{ height: '460px', borderRadius: '16px', overflow: 'hidden' }}>
                <MapContainer center={[15.2993, 74.1240]} zoom={11} style={{ height: '100%', width: '100%' }}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  {routeEstimate && routeEstimate.polyline && (
                    <Polyline positions={routeEstimate.polyline} color="#FF5A5F" weight={5} opacity={0.8} />
                  )}
                </MapContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
