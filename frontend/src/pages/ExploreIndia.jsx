import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import { API_BASE_URL } from '../context/AuthContext';
import { MapPin, Compass, ArrowRight, Star, Filter } from 'lucide-react';

const createCustomIcon = (name) => {
  return L.divIcon({
    className: 'custom-map-pin',
    html: `<div style="background:#FF5A5F; color:white; padding:4px 8px; border-radius:12px; font-weight:bold; font-size:12px; font-family:sans-serif; box-shadow:0 4px 10px rgba(255,90,95,0.4); border:2px solid white; white-space:nowrap;">📍 ${name}</div>`,
    iconSize: [80, 30],
    iconAnchor: [40, 15]
  });
};

export default function ExploreIndia({ setActivePage, setSelectedDestination }) {
  const [destinations, setDestinations] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchDestinations();
  }, [selectedRegion, selectedCategory]);

  const fetchDestinations = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/destinations`, {
        params: { region: selectedRegion, category: selectedCategory }
      });
      setDestinations(res.data);
    } catch (err) {
      console.error('Failed to fetch destinations for map:', err);
    }
  };

  return (
    <div style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
          <div>
            <span className="badge badge-primary">Interactive Map</span>
            <h1 style={{ fontSize: '2.5rem', color: '#0F172A', marginTop: '8px' }}>Explore India</h1>
            <p style={{ color: '#64748B' }}>Click on any destination pin on the map to discover attractions, rides, and local guides.</p>
          </div>

          {/* Region & Category Filter Controls */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <select
              className="form-control"
              value={selectedRegion}
              onChange={e => setSelectedRegion(e.target.value)}
              style={{ width: '160px', padding: '10px' }}
            >
              <option value="All">All Regions</option>
              <option value="North India">North India</option>
              <option value="South India">South India</option>
              <option value="West India">West India</option>
              <option value="East India">East India</option>
              <option value="Central India">Central India</option>
              <option value="North-East India">North-East India</option>
            </select>

            <select
              className="form-control"
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              style={{ width: '160px', padding: '10px' }}
            >
              <option value="All">All Types</option>
              <option value="Beach">Beaches</option>
              <option value="Mountain">Mountains</option>
              <option value="Heritage">Heritage</option>
              <option value="Nature">Nature</option>
              <option value="Spiritual">Spiritual</option>
            </select>
          </div>
        </div>

        {/* Leaflet Interactive India Map Container */}
        <div style={{ height: '550px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 16px 40px rgba(0,0,0,0.12)', marginBottom: '40px' }}>
          <MapContainer center={[22.5937, 78.9629]} zoom={5} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {destinations.map(dest => (
              <Marker
                key={dest.id || dest.name}
                position={[dest.coordinates.lat, dest.coordinates.lng]}
                icon={createCustomIcon(dest.name)}
              >
                <Popup>
                  <div style={{ width: '220px', padding: '4px' }}>
                    <img src={dest.image} alt={dest.name} style={{ width: '100%', height: '110px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }} />
                    <h3 style={{ fontSize: '1.1rem', margin: 0, color: '#0F172A' }}>{dest.name}</h3>
                    <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '2px 0 8px' }}>{dest.state} • {dest.category}</p>
                    <button
                      className="btn btn-primary btn-sm"
                      style={{ width: '100%' }}
                      onClick={() => { setSelectedDestination(dest.name); setActivePage('destination-details'); }}
                    >
                      View Details <ArrowRight size={14} />
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Destination Cards List */}
        <h3 style={{ fontSize: '1.6rem', color: '#0F172A', marginBottom: '24px' }}>Destinations on Map ({destinations.length})</h3>
        <div className="grid-3">
          {destinations.map(dest => (
            <div
              key={dest.id || dest.name}
              className="glass-card"
              onClick={() => { setSelectedDestination(dest.name); setActivePage('destination-details'); }}
              style={{ padding: '20px', cursor: 'pointer', display: 'flex', gap: '16px', alignItems: 'center' }}
            >
              <img src={dest.image} alt={dest.name} style={{ width: '90px', height: '90px', borderRadius: '12px', objectFit: 'cover' }} />
              <div>
                <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>{dest.category}</span>
                <h4 style={{ fontSize: '1.15rem', color: '#0F172A', marginTop: '4px' }}>{dest.name}</h4>
                <p style={{ fontSize: '0.85rem', color: '#64748B' }}>{dest.state}</p>
                <div style={{ fontSize: '0.8rem', color: '#FF5A5F', fontWeight: 'bold', marginTop: '4px' }}>
                  Best: {dest.bestTime}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
