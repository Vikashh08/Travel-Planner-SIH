import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../context/AuthContext';
import { ShieldCheck, Phone, MapPin, AlertTriangle, Hospital, Shield, Compass } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const policeIcon = L.divIcon({
  className: 'police-pin',
  html: `<div style="background:#1E3A8A; color:white; padding:4px 8px; border-radius:12px; font-weight:bold; font-size:12px; border:2px solid white">👮 Police</div>`
});

const hospitalIcon = L.divIcon({
  className: 'hospital-pin',
  html: `<div style="background:#DC2626; color:white; padding:4px 8px; border-radius:12px; font-weight:bold; font-size:12px; border:2px solid white">🏥 Hospital</div>`
});

export default function SafetyCenter() {
  const [location, setLocation] = useState('Goa');
  const [safetyData, setSafetyData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSafetyData();
  }, [location]);

  const fetchSafetyData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/nearby/safety`, { params: { location } });
      setSafetyData(res.data);
    } catch (err) {
      console.error('Failed to fetch safety info:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px' }}>
          <span className="badge badge-accent"><ShieldCheck size={16} /> 24/7 Verified Emergency Center</span>
          <h1 style={{ fontSize: '2.8rem', color: '#0F172A', marginTop: '8px' }}>GoNomad Safety Center</h1>
          <p style={{ color: '#64748B' }}>Travel with 100% confidence. Locate verified Police Stations, Hospitals, and emergency helplines in any Indian city.</p>
        </div>

        {/* National Helplines Bar */}
        <div className="grid-3" style={{ marginBottom: '40px' }}>
          <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', padding: '24px', borderRadius: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', color: '#DC2626', fontWeight: 'bold' }}>📞 112</div>
            <h4 style={{ color: '#0F172A', marginTop: '4px' }}>National Emergency Response</h4>
            <p style={{ fontSize: '0.8rem', color: '#64748B' }}>Police, Fire & Medical Emergency across India</p>
          </div>

          <div style={{ background: '#EFF6FF', border: '1px solid #93C5FD', padding: '24px', borderRadius: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', color: '#2563EB', fontWeight: 'bold' }}>📞 1363</div>
            <h4 style={{ color: '#0F172A', marginTop: '4px' }}>Ministry of Tourism Helpline</h4>
            <p style={{ fontSize: '0.8rem', color: '#64748B' }}>Multi-lingual Tourist Assistance & Safety</p>
          </div>

          <div style={{ background: '#ECFDF5', border: '1px solid #6EE7B7', padding: '24px', borderRadius: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', color: '#059669', fontWeight: 'bold' }}>📞 1091</div>
            <h4 style={{ color: '#0F172A', marginTop: '4px' }}>Women Helpline Number</h4>
            <p style={{ fontSize: '0.8rem', color: '#64748B' }}>24/7 Dedicated Support & Assistance</p>
          </div>
        </div>

        {/* Location Selector */}
        <div className="glass-card" style={{ padding: '20px', borderRadius: '20px', marginBottom: '32px', display: 'flex', gap: '16px', alignItems: 'center' }}>
          <label style={{ fontWeight: 'bold', color: '#0F172A', whiteSpace: 'nowrap' }}>Search Destination Safety Info:</label>
          <select className="form-control" value={location} onChange={e => setLocation(e.target.value)} style={{ maxWidth: '240px' }}>
            <option value="Goa">Goa</option>
            <option value="Manali">Manali</option>
            <option value="Jaipur">Jaipur</option>
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
          </select>
        </div>

        {safetyData && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
            {/* List of Stations & Hospitals */}
            <div>
              {/* Nearby Police Stations */}
              <div className="glass-card" style={{ padding: '28px', borderRadius: '24px', marginBottom: '32px' }}>
                <h3 style={{ fontSize: '1.4rem', color: '#0F172A', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Shield color="#1E3A8A" size={22} /> Nearby Police Stations
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {safetyData.policeStations.map((ps, idx) => (
                    <div key={idx} style={{ background: '#F8FAFC', padding: '16px 20px', borderRadius: '16px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h4 style={{ color: '#0F172A', fontSize: '1.1rem' }}>{ps.name}</h4>
                        <p style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '2px' }}>{ps.area} • {ps.distance} away</p>
                        <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: ps.phone.includes('unavailable') ? '#94A3B8' : '#2563EB', marginTop: '4px' }}>
                          📞 {ps.phone}
                        </div>
                      </div>
                      <button className="btn btn-outline btn-sm" onClick={() => window.open(`https://maps.google.com/?q=${ps.lat},${ps.lng}`)}>
                        Navigate
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nearby Hospitals */}
              <div className="glass-card" style={{ padding: '28px', borderRadius: '24px' }}>
                <h3 style={{ fontSize: '1.4rem', color: '#0F172A', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Hospital color="#DC2626" size={22} /> Nearby Hospitals & Medical Care
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {safetyData.hospitals.map((hosp, idx) => (
                    <div key={idx} style={{ background: '#F8FAFC', padding: '16px 20px', borderRadius: '16px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h4 style={{ color: '#0F172A', fontSize: '1.1rem' }}>{hosp.name}</h4>
                        <p style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '2px' }}>{hosp.area} • {hosp.distance} away</p>
                        <p style={{ fontSize: '0.82rem', color: '#059669', fontWeight: '600' }}>{hosp.emergencyServices}</p>
                        <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: hosp.phone.includes('unavailable') ? '#94A3B8' : '#DC2626', marginTop: '4px' }}>
                          📞 {hosp.phone}
                        </div>
                      </div>
                      <button className="btn btn-outline btn-sm" onClick={() => window.open(`https://maps.google.com/?q=${hosp.lat},${hosp.lng}`)}>
                        Navigate
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Emergency Map View */}
            <div>
              <div className="glass-card" style={{ padding: '20px', borderRadius: '24px', height: '520px', position: 'sticky', top: '100px' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginBottom: '12px' }}>Safety Locations Map</h3>
                <div style={{ height: '430px', borderRadius: '16px', overflow: 'hidden' }}>
                  <MapContainer center={[15.4989, 73.8278]} zoom={10} style={{ height: '100%', width: '100%' }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {safetyData.policeStations.map((ps, idx) => (
                      <Marker key={`p-${idx}`} position={[ps.lat, ps.lng]} icon={policeIcon}>
                        <Popup><strong>{ps.name}</strong><br />Ph: {ps.phone}</Popup>
                      </Marker>
                    ))}
                    {safetyData.hospitals.map((h, idx) => (
                      <Marker key={`h-${idx}`} position={[h.lat, h.lng]} icon={hospitalIcon}>
                        <Popup><strong>{h.name}</strong><br />Ph: {h.phone}</Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
