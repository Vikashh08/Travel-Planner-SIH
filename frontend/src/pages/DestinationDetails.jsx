import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../context/AuthContext';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Sun, Cloud, Wind, Calendar, DollarSign, ShieldCheck, Compass, Car, Users, ArrowRight, CheckCircle, Utensils, Award } from 'lucide-react';

const pinIcon = L.divIcon({
  className: 'custom-map-pin',
  html: `<div style="background:#FF5A5F; color:white; padding:6px 12px; border-radius:16px; font-weight:bold; font-size:13px; border:2px solid white; box-shadow:0 4px 12px rgba(0,0,0,0.3)">📍 Destination</div>`
});

export default function DestinationDetails({ destinationName, setActivePage, setSelectedGuide }) {
  const [dest, setDest] = useState(null);
  const [weather, setWeather] = useState(null);
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetails();
  }, [destinationName]);

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const name = destinationName || 'Goa';
      const destRes = await axios.get(`${API_BASE_URL}/destinations/${name}`);
      setDest(destRes.data);

      const weatherRes = await axios.get(`${API_BASE_URL}/weather/${name}`);
      setWeather(weatherRes.data);

      const guideRes = await axios.get(`${API_BASE_URL}/guides`, { params: { destination: name } });
      setGuides(guideRes.data);
    } catch (err) {
      console.error('Failed to fetch destination details:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !dest) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0' }}>
        <Compass size={48} className="spin" color="#FF5A5F" />
        <h3 style={{ marginTop: '16px', color: '#64748B' }}>Loading destination details...</h3>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* Hero Cover */}
      <div style={{
        height: '420px',
        position: 'relative',
        background: `linear-gradient(rgba(15, 23, 42, 0.4), rgba(15, 23, 42, 0.8)), url('${dest.image}') center/cover no-repeat`,
        display: 'flex',
        alignItems: 'flex-end',
        color: 'white',
        paddingBottom: '40px'
      }}>
        <div className="container">
          <span className="badge badge-primary" style={{ marginBottom: '12px' }}>{dest.category} • {dest.region}</span>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '800', lineHeight: 1.1 }}>{dest.name}</h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
            <MapPin size={18} color="#FF5A5F" /> {dest.state}, India
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '40px' }}>
        <div className="dest-grid">
          {/* Main Info */}
          <div>
            {/* Overview */}
            <div className="glass-card" style={{ padding: '32px', borderRadius: '24px', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '1.8rem', color: '#0F172A', marginBottom: '16px' }}>Destination Overview</h2>
              <p style={{ fontSize: '1.05rem', color: '#334155', lineHeight: '1.7' }}>{dest.description}</p>
            </div>

            {/* Top Attractions */}
            <div className="glass-card" style={{ padding: '32px', borderRadius: '24px', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '1.8rem', color: '#0F172A', marginBottom: '20px' }}>Top Attractions</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {dest.attractions.map(att => (
                  <div key={att.name} style={{ background: '#F8FAFC', padding: '16px 20px', borderRadius: '16px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>{att.type}</span>
                      <h4 style={{ fontSize: '1.15rem', color: '#0F172A', marginTop: '4px' }}>{att.name}</h4>
                      <p style={{ fontSize: '0.88rem', color: '#64748B', marginTop: '2px' }}>{att.desc}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontWeight: 'bold', color: '#F59E0B', fontSize: '1.1rem' }}>⭐ {att.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Local Food & Culture */}
            <div className="grid-2" style={{ marginBottom: '32px' }}>
              <div className="glass-card" style={{ padding: '24px', borderRadius: '20px' }}>
                <h3 style={{ fontSize: '1.3rem', color: '#0F172A', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Utensils size={20} color="#FF5A5F" /> Must-Try Local Food
                </h3>
                <ul style={{ paddingLeft: '20px', color: '#475569', fontSize: '0.92rem', lineHeight: '1.8' }}>
                  {dest.food.map(f => <li key={f}>{f}</li>)}
                </ul>
              </div>

              <div className="glass-card" style={{ padding: '24px', borderRadius: '20px' }}>
                <h3 style={{ fontSize: '1.3rem', color: '#0F172A', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Compass size={20} color="#10B981" /> Culture & Tradition
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.6' }}>{dest.culture}</p>
              </div>
            </div>

            {/* Local Guides Available */}
            <div className="glass-card" style={{ padding: '32px', borderRadius: '24px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '1.6rem', color: '#0F172A' }}>Available Local Guides in {dest.name}</h2>
                <button className="btn btn-outline btn-sm" onClick={() => setActivePage('guides')}>
                  View All Guides
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {guides.map(guide => (
                  <div key={guide.id} style={{ background: '#F8FAFC', padding: '16px 20px', borderRadius: '16px', border: '1px solid #E2E8F0', display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <img src={guide.profileImage} alt={guide.name} style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '1.1rem', color: '#0F172A' }}>{guide.name} ⭐ {guide.rating}</h4>
                      <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
                        Languages: {guide.languages.join(', ')} • {guide.experience} Exp
                      </p>
                    </div>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => { setSelectedGuide(guide.id); setActivePage('guide-details'); }}
                    >
                      View & Book Guide
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Explore With Local Guide Action Box (Requirement 8 & 19) */}
            <div style={{
              background: 'linear-gradient(135deg, #0F172A, #1E293B)',
              color: 'white',
              padding: '28px',
              borderRadius: '24px',
              marginBottom: '24px',
              boxShadow: '0 12px 30px rgba(15,23,42,0.25)'
            }}>
              <span className="badge badge-primary" style={{ marginBottom: '12px' }}>CORE FEATURE</span>
              <h3 style={{ fontSize: '1.4rem', color: 'white', marginBottom: '10px' }}>Explore With Local Guide & Ride</h3>
              <p style={{ fontSize: '0.88rem', color: '#94A3B8', marginBottom: '20px', lineHeight: '1.6' }}>
                Book a local cab + verified guide combo to visit multiple places across {dest.name} seamlessly.
              </p>
              <button
                className="btn btn-primary"
                style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
                onClick={() => setActivePage('ride')}
              >
                <Car size={18} /> Book Local Transport & Guide
              </button>
            </div>

            {/* Weather Widget */}
            {weather && (
              <div className="glass-card" style={{ padding: '24px', borderRadius: '20px', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.15rem', color: '#0F172A', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sun size={20} color="#F59E0B" /> Current Weather
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#0F172A' }}>{weather.temp}°C</div>
                    <div style={{ fontSize: '0.88rem', color: '#64748B', fontWeight: '600' }}>{weather.condition}</div>
                  </div>
                  <div style={{ textAlign: 'right', fontSize: '0.82rem', color: '#64748B' }}>
                    <div>Humidity: {weather.humidity}%</div>
                    <div>Wind: {weather.windSpeed} km/h</div>
                  </div>
                </div>
              </div>
            )}

            {/* Travel Essentials */}
            <div className="glass-card" style={{ padding: '24px', borderRadius: '20px', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.15rem', color: '#0F172A', marginBottom: '16px' }}>Travel Quick Facts</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#334155' }}>
                  <Calendar size={18} color="#FF5A5F" /> <strong>Best Time:</strong> {dest.bestTime}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#334155' }}>
                  <DollarSign size={18} color="#10B981" /> <strong>Est. Budget:</strong> {dest.budget}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#334155' }}>
                  <Compass size={18} color="#6366F1" /> <strong>Duration:</strong> {dest.recommendedDuration}
                </div>
              </div>
            </div>

            {/* Safety Banner */}
            <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', padding: '20px', borderRadius: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#059669', fontWeight: 'bold', fontSize: '1rem', marginBottom: '6px' }}>
                <ShieldCheck size={20} /> Verified Destination Safety
              </div>
              <p style={{ fontSize: '0.82rem', color: '#047857', lineHeight: '1.5' }}>
                {dest.safetyInfo}
              </p>
              <button className="btn btn-outline btn-sm" style={{ marginTop: '12px', width: '100%', borderColor: '#10B981', color: '#047857' }} onClick={() => setActivePage('safety')}>
                View Nearby Emergency Help
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
