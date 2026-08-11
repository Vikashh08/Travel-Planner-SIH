import React, { useState, useEffect } from 'react';
import axios from 'axios';
import L from 'leaflet';
import toast from 'react-hot-toast';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { useBooking } from '../context/BookingContext';
import { useAuth, API_BASE_URL } from '../context/AuthContext';
import { Car, MapPin, Navigation, Clock, ShieldCheck, Star, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

const userPin = L.divIcon({
  className: 'user-pin',
  html: `<div style="background:#FF5A5F; color:white; padding:6px 10px; border-radius:50%; font-weight:bold; border:3px solid white; box-shadow:0 0 15px rgba(255,90,95,0.6)">📍</div>`
});

const destPin = L.divIcon({
  className: 'dest-pin',
  html: `<div style="background:#10B981; color:white; padding:6px 10px; border-radius:50%; font-weight:bold; border:3px solid white; box-shadow:0 0 15px rgba(16,185,129,0.6)">🏁</div>`
});

const vehiclePin = (icon) => L.divIcon({
  className: 'vehicle-pin',
  html: `<div style="background:#0F172A; color:white; padding:6px 10px; border-radius:16px; font-weight:bold; font-size:16px; border:2px solid #FF5A5F; box-shadow:0 4px 10px rgba(0,0,0,0.3)">${icon}</div>`
});

function MapRecenter({ bounds }) {
  const map = useMap();
  useEffect(() => {
    if (bounds && bounds.length > 0) {
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [bounds, map]);
  return null;
}

export default function RideTransport({ setActivePage }) {
  const { user } = useAuth();
  const { activeRide, setActiveRide, triggerRideSimulation, setRatingTarget } = useBooking();

  const [fromLoc, setFromLoc] = useState('Goa Railway Station');
  const [toLoc, setToLoc] = useState('Baga Beach');
  const [estimateData, setEstimateData] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Initial estimate calculation on mount
  useEffect(() => {
    handleCalculateEstimate();
  }, []);

  const handleCalculateEstimate = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/rides/estimate`, {
        fromLocation: fromLoc,
        toLocation: toLoc
      });
      setEstimateData(res.data);
      if (res.data.vehicles && res.data.vehicles.length > 0) {
        setSelectedVehicle(res.data.vehicles[1]); // Default to Sedan
      }
    } catch (err) {
      console.error('Failed to estimate ride:', err);
      toast.error('Failed to estimate route.');
    } finally {
      setLoading(false);
    }
  };

  const handleBookRide = async () => {
    if (!selectedVehicle || !estimateData) return;
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE_URL}/rides/book`, {
        fromLocation: fromLoc,
        toLocation: toLoc,
        vehicleType: selectedVehicle.type,
        driverName: selectedVehicle.driverName,
        fare: selectedVehicle.fare,
        distance: estimateData.distanceKm,
        etaMinutes: selectedVehicle.etaMinutes
      });

      const rideObj = res.data.ride;
      setActiveRide(rideObj);
      setBookingSuccess(true);
      toast.success('Ride booked successfully! Driver is on the way.');

      // Trigger Socket.IO status transitions (Requirement 12)
      triggerRideSimulation(rideObj.id);
    } catch (err) {
      console.error('Failed to book ride:', err);
      toast.error('Failed to book ride. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const centerCoords = estimateData ? [estimateData.originCoords.lat, estimateData.originCoords.lng] : [15.2993, 74.1240];

  return (
    <div style={{ paddingTop: '30px', paddingBottom: '80px' }}>
      <div className="container">
        <div style={{ marginBottom: '24px' }}>
          <span className="badge badge-primary">Rapido / Ola Style Local Ride System</span>
          <h1 style={{ fontSize: '2.5rem', color: '#0F172A', marginTop: '6px' }}>GoNomad Ride Transport</h1>
          <p style={{ color: '#64748B' }}>Book instant local rides & cabs with live map driver tracking.</p>
        </div>

        {activeRide && activeRide.status !== 'Trip completed' && activeRide.status !== 'Cancelled' ? (
          /* Active Ride Tracker View */
          <div className="glass-card" style={{ padding: '32px', borderRadius: '24px', maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
            <span className="badge badge-accent" style={{ marginBottom: '12px' }}>LIVE RIDE TRACKER</span>
            <h2 style={{ fontSize: '1.8rem', color: '#0F172A' }}>Ride Status: {activeRide.status}</h2>
            <p style={{ color: '#64748B', marginTop: '4px', marginBottom: '24px' }}>Booking ID: <strong>{activeRide.bookingId}</strong></p>

            <div style={{ background: '#F8FAFC', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0', textAlign: 'left', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div>
                  <h4 style={{ color: '#0F172A', fontSize: '1.2rem' }}>{activeRide.vehicleType}</h4>
                  <p style={{ fontSize: '0.88rem', color: '#64748B' }}>Driver: <strong>{activeRide.driverName}</strong></p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#10B981' }}>₹{activeRide.fare}</div>
                  <span style={{ fontSize: '0.8rem', color: '#64748B' }}>{activeRide.distance} km</span>
                </div>
              </div>

              <div style={{ fontSize: '0.9rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div>📍 <strong>FROM:</strong> {activeRide.fromLocation}</div>
                <div>🏁 <strong>TO:</strong> {activeRide.toLocation}</div>
              </div>
            </div>

            {/* Ride Status State Progress Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px', position: 'relative' }}>
              {['Searching for driver', 'Driver assigned', 'Driver arriving', 'Trip started', 'Trip completed'].map((st, idx) => {
                const states = ['Searching for driver', 'Driver assigned', 'Driver arriving', 'Trip started', 'Trip completed'];
                const currentIdx = states.indexOf(activeRide.status);
                const isPassed = currentIdx >= idx;
                return (
                  <div key={st} style={{ flex: 1, textAlign: 'center', opacity: isPassed ? 1 : 0.4 }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: isPassed ? '#10B981' : '#CBD5E1', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px', fontSize: '12px' }}>
                      {isPassed ? '✓' : idx + 1}
                    </div>
                    <div style={{ fontSize: '0.72rem', fontWeight: '600', color: '#0F172A' }}>{st}</div>
                  </div>
                );
              })}
            </div>

            <button
              className="btn btn-outline"
              style={{ borderColor: '#EF4444', color: '#EF4444' }}
              onClick={async () => {
                await axios.post(`${API_BASE_URL}/rides/${activeRide.id}/cancel`);
                setActiveRide(null);
              }}
            >
              Cancel Ride
            </button>
          </div>
        ) : (
          /* Normal Pickup & Drop Ride Selection View */
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '32px' }}>
            {/* Left Selection Controls */}
            <div>
              <div className="glass-card" style={{ padding: '24px', borderRadius: '20px', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.25rem', color: '#0F172A', marginBottom: '16px' }}>Select Route</h3>

                <div className="form-group">
                  <label>FROM (Current / Search Location)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={fromLoc}
                    onChange={e => setFromLoc(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>TO (Destination / Hotel / Station)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={toLoc}
                    onChange={e => setToLoc(e.target.value)}
                  />
                </div>

                <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleCalculateEstimate} disabled={loading}>
                  {loading ? 'Calculating Route...' : 'Find Vehicles & Route'}
                </button>
              </div>

              {/* Vehicle Options List */}
              {estimateData && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <h3 style={{ fontSize: '1.15rem', color: '#0F172A' }}>Available Local Vehicles</h3>
                  {estimateData.vehicles.map(veh => {
                    const isSelected = selectedVehicle?.id === veh.id;
                    return (
                      <div
                        key={veh.id}
                        onClick={() => setSelectedVehicle(veh)}
                        style={{
                          background: isSelected ? '#FFF0F0' : 'white',
                          border: isSelected ? '2px solid #FF5A5F' : '1px solid #E2E8F0',
                          padding: '16px',
                          borderRadius: '16px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '16px',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{ fontSize: '2rem' }}>{veh.icon}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h4 style={{ fontSize: '1.1rem', color: '#0F172A' }}>{veh.type}</h4>
                            <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#10B981' }}>₹{veh.fare}</span>
                          </div>
                          <p style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '2px' }}>
                            Driver: {veh.driverName} • ⭐ {veh.driverRating}
                          </p>
                          <div style={{ fontSize: '0.78rem', color: '#FF5A5F', fontWeight: '600', marginTop: '4px' }}>
                            ETA: {veh.etaMinutes} min away • {estimateData.distanceKm} km route
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <button
                    className="btn btn-primary btn-lg"
                    style={{ width: '100%', marginTop: '12px' }}
                    onClick={handleBookRide}
                    disabled={loading || !selectedVehicle}
                  >
                    Confirm & Book Ride
                  </button>
                </div>
              )}
            </div>

            {/* Right Side Map with Animated Demo Vehicles */}
            <div style={{ height: '620px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 16px 40px rgba(0,0,0,0.12)', position: 'relative' }}>
              {estimateData && (
                <MapContainer center={centerCoords} zoom={13} style={{ height: '100%', width: '100%' }}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap'
                  />
                  <MapRecenter bounds={[
                    [estimateData.originCoords.lat, estimateData.originCoords.lng],
                    [estimateData.destCoords.lat, estimateData.destCoords.lng]
                  ]} />

                  {/* Polyline Route */}
                  {estimateData.polyline && (
                    <Polyline positions={estimateData.polyline} color="#FF5A5F" weight={5} opacity={0.8} />
                  )}

                  {/* Start Marker */}
                  <Marker position={[estimateData.originCoords.lat, estimateData.originCoords.lng]} icon={userPin}>
                    <Popup><strong>FROM:</strong> {fromLoc}</Popup>
                  </Marker>

                  {/* Destination Marker */}
                  <Marker position={[estimateData.destCoords.lat, estimateData.destCoords.lng]} icon={destPin}>
                    <Popup><strong>TO:</strong> {toLoc}</Popup>
                  </Marker>

                  {/* Nearby Demo Vehicles Markers around origin */}
                  {estimateData.vehicles.map((v, idx) => {
                    const offsetLat = estimateData.originCoords.lat + (idx === 0 ? 0.005 : idx === 1 ? -0.004 : idx === 2 ? 0.003 : -0.006);
                    const offsetLng = estimateData.originCoords.lng + (idx === 0 ? 0.004 : idx === 1 ? 0.006 : idx === 2 ? -0.005 : -0.003);
                    return (
                      <Marker key={v.id} position={[offsetLat, offsetLng]} icon={vehiclePin(v.icon)}>
                        <Popup>
                          <div style={{ padding: '4px' }}>
                            <h4 style={{ margin: 0, color: '#0F172A' }}>{v.driverName}</h4>
                            <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '2px 0 6px' }}>{v.type} • ⭐ {v.driverRating}</p>
                            <span style={{ fontSize: '0.75rem', background: '#F1F5F9', padding: '2px 6px', borderRadius: '4px', display: 'block', color: '#475569' }}>
                              Demo Driver / Simulated Availability
                            </span>
                          </div>
                        </Popup>
                      </Marker>
                    );
                  })}
                </MapContainer>
              )}

              <div style={{ position: 'absolute', bottom: '16px', left: '16px', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', padding: '10px 16px', borderRadius: '12px', fontSize: '0.8rem', color: '#64748B', zIndex: 500, border: '1px solid #CBD5E1' }}>
                ℹ️ Demo Mode: Vehicle locations simulated in real-time.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
