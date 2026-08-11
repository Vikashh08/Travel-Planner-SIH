import React from 'react';
import { Compass, ShieldCheck, Phone, Heart, Globe, Mail } from 'lucide-react';

export default function Footer({ setActivePage }) {
  const handleNavClick = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ background: '#0F172A', color: '#94A3B8', paddingTop: '60px', paddingBottom: '30px', marginTop: '80px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '40px', paddingBottom: '40px', borderBottom: '1px solid #1E293B' }}>
          <div>
            <div className="logo-brand" style={{ color: '#FFFFFF', marginBottom: '16px' }}>
              <Compass size={28} color="#FF5A5F" strokeWidth={2.5} />
              <span>GO</span>NOMAD
            </div>
            <p style={{ fontSize: '0.92rem', lineHeight: '1.7', maxWidth: '360px', marginBottom: '20px' }}>
              India's premier travel super app. Discover destinations, plan AI itineraries, book verified local rides, and explore every corner with trusted local guides.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <span className="badge badge-accent"><ShieldCheck size={14} /> Verified Platform</span>
              <span className="badge badge-primary">🇮🇳 Made for India</span>
            </div>
          </div>

          <div>
            <h4 style={{ color: '#FFFFFF', marginBottom: '16px', fontSize: '1.05rem' }}>Explore</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li><a href="#destinations" onClick={(e) => { e.preventDefault(); handleNavClick('destinations'); }}>Popular Destinations</a></li>
              <li><a href="#explore" onClick={(e) => { e.preventDefault(); handleNavClick('explore'); }}>Interactive India Map</a></li>
              <li><a href="#ride" onClick={(e) => { e.preventDefault(); handleNavClick('ride'); }}>Rapido/Ola Style Rides</a></li>
              <li><a href="#guides" onClick={(e) => { e.preventDefault(); handleNavClick('guides'); }}>Verified Local Guides</a></li>
              <li><a href="#planner" onClick={(e) => { e.preventDefault(); handleNavClick('planner'); }}>AI Trip Planner</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#FFFFFF', marginBottom: '16px', fontSize: '1.05rem' }}>Safety & Support</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li><a href="#safety" onClick={(e) => { e.preventDefault(); handleNavClick('safety'); }}>Safety Center</a></li>
              <li><a href="#police" onClick={(e) => { e.preventDefault(); handleNavClick('safety'); }}>Nearby Police Stations</a></li>
              <li><a href="#hospitals" onClick={(e) => { e.preventDefault(); handleNavClick('safety'); }}>Nearby Hospitals</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}>24/7 Helpline</a></li>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}>About GoNomad</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#FFFFFF', marginBottom: '16px', fontSize: '1.05rem' }}>Emergency Call</h4>
            <div style={{ background: '#1E293B', padding: '16px', borderRadius: '12px', color: '#FFFFFF' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#FF5A5F', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '4px' }}>
                <Phone size={20} /> 112 / 1363
              </div>
              <p style={{ fontSize: '0.8rem', color: '#94A3B8' }}>National Tourist Emergency & Safety Helpline</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '30px', fontSize: '0.85rem' }}>
          <div>© {new Date().getFullYear()} GoNomad Technologies India Pvt. Ltd. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#privacy" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}>Privacy Policy</a>
            <a href="#terms" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}>Terms of Service</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}>Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
