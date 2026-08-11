import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../context/AuthContext';
import { Search, MapPin, ArrowRight, Compass, Filter } from 'lucide-react';

export default function Destinations({ setActivePage, setSelectedDestination }) {
  const [destinations, setDestinations] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchDestinations();
  }, [search, selectedRegion, selectedCategory]);

  const fetchDestinations = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/destinations`, {
        params: { search, region: selectedRegion, category: selectedCategory }
      });
      setDestinations(res.data);
    } catch (err) {
      console.error('Failed to load destinations:', err);
    }
  };

  return (
    <div style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px' }}>
          <span className="badge badge-primary">Comprehensive Database</span>
          <h1 style={{ fontSize: '2.8rem', color: '#0F172A', marginTop: '8px' }}>India Destinations</h1>
          <p style={{ color: '#64748B' }}>Discover top tourist locations across North, South, East, West, Central & North-East India.</p>
        </div>

        {/* Filter Bar */}
        <div className="glass-card" style={{ padding: '20px', borderRadius: '20px', marginBottom: '40px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: '240px', display: 'flex', alignItems: 'center', gap: '10px', background: '#F8FAFC', padding: '10px 16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <Search size={20} color="#64748B" />
            <input
              type="text"
              placeholder="Search destination, state or activity..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.95rem' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <select className="form-control" value={selectedRegion} onChange={e => setSelectedRegion(e.target.value)} style={{ padding: '10px 16px' }}>
              <option value="All">All Regions</option>
              <option value="North India">North India</option>
              <option value="South India">South India</option>
              <option value="West India">West India</option>
              <option value="East India">East India</option>
              <option value="Central India">Central India</option>
              <option value="North-East India">North-East India</option>
            </select>

            <select className="form-control" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} style={{ padding: '10px 16px' }}>
              <option value="All">All Experiences</option>
              <option value="Beach">Beaches</option>
              <option value="Mountain">Mountains</option>
              <option value="Heritage">Heritage</option>
              <option value="Nature">Nature</option>
              <option value="Spiritual">Spiritual</option>
            </select>
          </div>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid-3">
          {destinations.map(dest => (
            <div
              key={dest.id || dest.name}
              className="glass-card"
              onClick={() => { setSelectedDestination(dest.name); setActivePage('destination-details'); }}
              style={{ overflow: 'hidden', cursor: 'pointer', borderRadius: '20px', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ height: '220px', position: 'relative' }}>
                <img src={dest.image} alt={dest.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span className="badge badge-primary" style={{ position: 'absolute', top: '16px', left: '16px' }}>{dest.category}</span>
                <span className="badge badge-dark" style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(0,0,0,0.6)', color: 'white' }}>{dest.region}</span>
              </div>

              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.4rem', color: '#0F172A', marginBottom: '4px' }}>{dest.name}</h3>
                  <p style={{ fontSize: '0.88rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>
                    <MapPin size={14} color="#FF5A5F" /> {dest.state}
                  </p>
                  <p style={{ fontSize: '0.9rem', color: '#334155', lineHeight: '1.6', marginBottom: '16px' }}>
                    {dest.description.substring(0, 100)}...
                  </p>
                </div>

                <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'block' }}>ESTIMATED BUDGET</span>
                    <span style={{ fontWeight: 'bold', color: '#10B981', fontSize: '0.95rem' }}>{dest.budget}</span>
                  </div>
                  <button className="btn btn-primary btn-sm">
                    Explore <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
