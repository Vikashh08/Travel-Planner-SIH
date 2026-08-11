import React from 'react';
import { Compass, ShieldCheck, Heart, Users, Award, MapPin } from 'lucide-react';

export default function About({ setActivePage }) {
  return (
    <div style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 56px' }}>
          <span className="badge badge-primary">About GoNomad</span>
          <h1 style={{ fontSize: '3rem', color: '#0F172A', marginTop: '8px' }}>Empowering Authentic Indian Travel</h1>
          <p style={{ color: '#64748B', fontSize: '1.1rem', marginTop: '12px', lineHeight: '1.6' }}>
            GoNomad is India's premier Travel Super App, unifying destination discovery, AI trip planning, Rapido/Ola style local ride transport, and verified local guide booking into a single platform.
          </p>
        </div>

        <div className="grid-3" style={{ marginBottom: '60px' }}>
          <div className="glass-card" style={{ padding: '32px', borderRadius: '24px', textAlign: 'center' }}>
            <Compass size={40} color="#FF5A5F" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.4rem', color: '#0F172A', marginBottom: '8px' }}>Destination Discovery</h3>
            <p style={{ color: '#64748B', fontSize: '0.9rem' }}>Comprehensive database covering North, South, East, West, Central & North-East India with weather & maps.</p>
          </div>

          <div className="glass-card" style={{ padding: '32px', borderRadius: '24px', textAlign: 'center' }}>
            <ShieldCheck size={40} color="#10B981" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.4rem', color: '#0F172A', marginBottom: '8px' }}>Local Rides & Guides</h3>
            <p style={{ color: '#64748B', fontSize: '0.9rem' }}>Book instant cabs or autos, multi-stop itineraries, and verified heritage/food guides.</p>
          </div>

          <div className="glass-card" style={{ padding: '32px', borderRadius: '24px', textAlign: 'center' }}>
            <Award size={40} color="#6366F1" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.4rem', color: '#0F172A', marginBottom: '8px' }}>Safety & Ratings</h3>
            <p style={{ color: '#64748B', fontSize: '0.9rem' }}>Verified police & hospital maps, 24/7 helplines, and dynamic driver/guide ratings.</p>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button className="btn btn-primary btn-lg" onClick={() => setActivePage('explore')}>
            Start Exploring India Now
          </button>
        </div>
      </div>
    </div>
  );
}
