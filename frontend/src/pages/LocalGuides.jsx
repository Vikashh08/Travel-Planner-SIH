import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../context/AuthContext';
import { Search, MapPin, Star, Award, ArrowRight, ShieldCheck, CheckCircle, Users } from 'lucide-react';

export default function LocalGuides({ setActivePage, setSelectedGuide }) {
  const [guides, setGuides] = useState([]);
  const [selectedDest, setSelectedDest] = useState('Goa');
  const [selectedSpec, setSelectedSpec] = useState('All');

  useEffect(() => {
    fetchGuides();
  }, [selectedDest, selectedSpec]);

  const fetchGuides = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/guides`, {
        params: { destination: selectedDest, specialization: selectedSpec }
      });
      setGuides(res.data);
    } catch (err) {
      console.error('Failed to fetch guides:', err);
    }
  };

  const specializationsList = [
    "All", "Historical Guide", "Food Guide", "Adventure Guide", "Nature Guide",
    "Photography Guide", "Cultural Guide", "Religious Guide", "Shopping Guide",
    "Nightlife Guide", "Family Guide"
  ];

  return (
    <div style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px' }}>
          <span className="badge badge-accent">Verified Experts</span>
          <h1 style={{ fontSize: '2.8rem', color: '#0F172A', marginTop: '8px' }}>Find Local Guides</h1>
          <p style={{ color: '#64748B' }}>Discover trusted, background-verified local guides for immersive heritage, food & multi-stop experiences.</p>
        </div>

        {/* Filters */}
        <div className="glass-card" style={{ padding: '20px', borderRadius: '20px', marginBottom: '40px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Select Destination</label>
            <select className="form-control" value={selectedDest} onChange={e => setSelectedDest(e.target.value)}>
              <option value="Goa">Goa</option>
              <option value="Manali">Manali</option>
              <option value="Jaipur">Jaipur</option>
              <option value="Kerala">Kerala</option>
              <option value="Kashmir">Kashmir</option>
              <option value="Varanasi">Varanasi</option>
            </select>
          </div>

          <div style={{ flex: 1, minWidth: '220px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Guide Specialization</label>
            <select className="form-control" value={selectedSpec} onChange={e => setSelectedSpec(e.target.value)}>
              {specializationsList.map(sp => (
                <option key={sp} value={sp}>{sp}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Guides Grid */}
        <div className="grid-2">
          {guides.map(guide => (
            <div key={guide.id} className="glass-card" style={{ padding: '28px', borderRadius: '24px', display: 'flex', gap: '24px', alignItems: 'center' }}>
              <img src={guide.profileImage} alt={guide.name} style={{ width: '110px', height: '110px', borderRadius: '20px', objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    {guide.verified && <span className="badge badge-accent" style={{ fontSize: '0.7rem' }}>✓ Verified Local Guide</span>}
                    <h3 style={{ fontSize: '1.4rem', color: '#0F172A', marginTop: '4px' }}>{guide.name}</h3>
                  </div>
                  <div style={{ fontWeight: 'bold', color: '#F59E0B', fontSize: '1.1rem' }}>⭐ {guide.rating}</div>
                </div>

                <p style={{ fontSize: '0.88rem', color: '#64748B', margin: '4px 0 10px' }}>
                  Languages: <strong>{guide.languages.join(', ')}</strong> • {guide.experience} Exp
                </p>

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                  {guide.specializations.map(s => (
                    <span key={s} style={{ background: '#F1F5F9', color: '#475569', fontSize: '0.78rem', padding: '2px 8px', borderRadius: '6px', fontWeight: '600' }}>
                      {s}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F1F5F9', paddingTop: '16px' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'block' }}>DAILY FEE</span>
                    <span style={{ fontWeight: 'bold', color: '#10B981', fontSize: '1.1rem' }}>₹{guide.pricePerDay}</span>
                  </div>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => { setSelectedGuide(guide.id); setActivePage('guide-details'); }}
                  >
                    View Guide & Plan Trip <ArrowRight size={14} />
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
