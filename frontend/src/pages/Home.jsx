import React, { useState } from 'react';
import { Search, MapPin, Compass, Navigation, Users, ShieldCheck, Star, ArrowRight, Heart, Sparkles, Car, Shield, Award } from 'lucide-react';

export default function Home({ setActivePage, setSelectedDestination, fetchDestinations }) {
  const [searchQuery, setSearchQuery] = useState('');

  const quickPopular = [
    { name: "Goa", state: "Goa", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=600&auto=format&fit=crop", cat: "Beach" },
    { name: "Manali", state: "Himachal Pradesh", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=600&auto=format&fit=crop", cat: "Mountain" },
    { name: "Jaipur", state: "Rajasthan", image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=600&auto=format&fit=crop", cat: "Heritage" },
    { name: "Kerala Backwaters", state: "Kerala", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=600&auto=format&fit=crop", cat: "Nature" }
  ];

  const experiences = [
    { title: "Beaches", icon: "🏖️", desc: "Golden sands & coastal breezes" },
    { title: "Mountains", icon: "🏔️", desc: "High altitude peaks & valley treks" },
    { title: "Heritage", icon: "🏰", desc: "Ancient forts & royal palaces" },
    { title: "Adventure", icon: "🪂", desc: "Paragliding, skiing & white water rafting" },
    { title: "Wildlife", icon: "🐅", desc: "National parks & tiger reserves" },
    { title: "Spiritual", icon: "🛕", desc: "Sacred ghats, temples & monasteries" },
    { title: "Food", icon: "🍲", desc: "Authentic regional street food trails" },
    { title: "Culture", icon: "🎭", desc: "Folk music, dance & classical arts" }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActivePage('destinations');
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        minHeight: '85vh',
        background: `linear-gradient(rgba(15, 23, 42, 0.55), rgba(15, 23, 42, 0.75)), url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1800&auto=format&fit=crop') center/cover no-repeat`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '60px 24px',
        color: '#FFFFFF'
      }}>
        <div style={{ maxWidth: '880px', width: '100%' }}>
          <span className="badge badge-primary" style={{ marginBottom: '20px', padding: '6px 16px', background: 'rgba(255, 90, 95, 0.25)', border: '1px solid #FF5A5F', color: '#FFFFFF' }}>
            <Sparkles size={16} /> India's Travel Super App
          </span>
          <h1 style={{ fontSize: '3.8rem', fontWeight: 800, lineHeight: 1.15, marginBottom: '20px' }}>
            Your Journey. Your Way.
          </h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.9, fontWeight: 400, maxWidth: '720px', margin: '0 auto 36px', lineHeight: 1.6 }}>
            Discover India, plan your perfect trip, find local rides and explore every destination with trusted local guides.
          </p>

          {/* Hero Search Box */}
          <div className="glass-card" style={{ padding: '16px', maxWidth: '720px', margin: '0 auto 36px', border: 'none', background: 'rgba(255, 255, 255, 0.92)' }}>
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, padding: '8px 16px', background: '#F8FAFC', borderRadius: '12px' }}>
                <MapPin size={22} color="#FF5A5F" />
                <input
                  type="text"
                  placeholder="Where do you want to go? (e.g. Goa, Manali, Jaipur...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '1rem', color: '#0F172A' }}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-lg" style={{ whiteSpace: 'nowrap' }}>
                <Search size={20} /> Search
              </button>
            </form>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '14px', justifyContent: 'center', fontSize: '0.85rem', color: '#64748B' }}>
              <span style={{ fontWeight: 600 }}>Popular:</span>
              {['Goa', 'Manali', 'Jaipur', 'Kerala', 'Kashmir', 'Mumbai', 'Delhi'].map(city => (
                <span
                  key={city}
                  onClick={() => { setSelectedDestination(city); setActivePage('destination-details'); }}
                  style={{ cursor: 'pointer', background: '#FFFFFF', padding: '2px 10px', borderRadius: '99px', border: '1px solid #CBD5E1', color: '#0F172A', fontWeight: 500 }}
                >
                  {city}
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button className="btn btn-primary btn-lg" onClick={() => setActivePage('explore')}>
              <Compass size={20} /> Explore India Map
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => setActivePage('planner')}>
              <Sparkles size={20} /> Plan My Trip (AI)
            </button>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
            <div>
              <span className="badge badge-primary">Popular Destinations</span>
              <h2 style={{ fontSize: '2.2rem', color: '#0F172A', marginTop: '8px' }}>Top Destinations Across India</h2>
            </div>
            <button className="btn btn-outline" onClick={() => setActivePage('destinations')}>
              View All Destinations <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid-4">
            {quickPopular.map(dest => (
              <div
                key={dest.name}
                className="glass-card"
                onClick={() => { setSelectedDestination(dest.name); setActivePage('destination-details'); }}
                style={{ overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.3s ease', borderRadius: '20px' }}
              >
                <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
                  <img src={dest.image} alt={dest.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span className="badge badge-primary" style={{ position: 'absolute', top: '16px', left: '16px' }}>{dest.cat}</span>
                </div>
                <div style={{ padding: '20px' }}>
                  <h3 style={{ fontSize: '1.3rem', color: '#0F172A' }}>{dest.name}</h3>
                  <p style={{ fontSize: '0.88rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                    <MapPin size={14} color="#FF5A5F" /> {dest.state}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore By Experience */}
      <section style={{ background: '#FFFFFF', padding: '80px 0', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 48px' }}>
            <span className="badge badge-accent">Categorized Travel</span>
            <h2 style={{ fontSize: '2.2rem', color: '#0F172A', marginTop: '8px' }}>Explore By Experience</h2>
            <p style={{ color: '#64748B' }}>Find your ideal destination based on your personal travel passion.</p>
          </div>

          <div className="grid-4">
            {experiences.map(exp => (
              <div
                key={exp.title}
                onClick={() => setActivePage('destinations')}
                style={{
                  background: '#FAF9F6',
                  borderRadius: '16px',
                  padding: '24px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  border: '1px solid #E2E8F0',
                  transition: 'all 0.25s ease'
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{exp.icon}</div>
                <h3 style={{ fontSize: '1.15rem', color: '#0F172A', marginBottom: '6px' }}>{exp.title}</h3>
                <p style={{ fontSize: '0.85rem', color: '#64748B' }}>{exp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How GoNomad Works */}
      <section style={{ padding: '80px 0', background: '#0F172A', color: '#FFFFFF' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 56px' }}>
            <span className="badge badge-primary" style={{ background: 'rgba(255,90,95,0.2)', color: '#FF5A5F' }}>Simple & Seamless</span>
            <h2 style={{ fontSize: '2.4rem', color: '#FFFFFF', marginTop: '8px' }}>How GoNomad Works</h2>
            <p style={{ color: '#94A3B8' }}>From inspiration to on-ground transport and local guides, everything in one app.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px' }}>
            {[
              { num: "1", title: "Choose Destination", desc: "Browse 15+ rich Indian regions" },
              { num: "2", title: "Plan Journey", desc: "AI day-wise & budget planner" },
              { num: "3", title: "Book Local Ride", desc: "Rapido/Ola style cabs & autos" },
              { num: "4", title: "Find Local Guide", desc: "Verified heritage & food experts" },
              { num: "5", title: "Explore", desc: "Multi-stop trips & live map tracking" },
              { num: "6", title: "Rate & Share", desc: "Dynamic review & rating system" }
            ].map(step => (
              <div key={step.num} style={{ background: '#1E293B', padding: '24px 16px', borderRadius: '16px', border: '1px solid #334155', textAlign: 'center' }}>
                <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #FF5A5F, #FF7A59)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', margin: '0 auto 16px' }}>
                  {step.num}
                </div>
                <h4 style={{ fontSize: '1rem', color: '#FFFFFF', marginBottom: '8px' }}>{step.title}</h4>
                <p style={{ fontSize: '0.8rem', color: '#94A3B8' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Guide Section */}
      <section style={{ padding: '80px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
          <div>
            <span className="badge badge-accent">Authentic Connections</span>
            <h2 style={{ fontSize: '2.5rem', color: '#0F172A', marginTop: '12px', marginBottom: '20px' }}>
              Explore like a local.
            </h2>
            <p style={{ color: '#64748B', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '24px' }}>
              Don't just visit tourist spots. Connect with handpicked, verified local guides who know every secret alley, authentic street food stall, and historic story behind India's greatest landmarks.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle color="#10B981" size={24} style={{ flexShrink: 0 }} />
                <div>
                  <h4 style={{ color: '#0F172A' }}>Verified & Background Checked</h4>
                  <p style={{ fontSize: '0.88rem', color: '#64748B' }}>100% verified identities with verified traveler reviews.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle color="#10B981" size={24} style={{ flexShrink: 0 }} />
                <div>
                  <h4 style={{ color: '#0F172A' }}>Multi-Stop Itinerary Rides</h4>
                  <p style={{ fontSize: '0.88rem', color: '#64748B' }}>Your guide accompanies you in a private GoNomad cab across all your planned stops.</p>
                </div>
              </div>
            </div>
            <button className="btn btn-primary btn-lg" onClick={() => setActivePage('guides')}>
              Find Local Guides Now <ArrowRight size={20} />
            </button>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop"
              alt="Local Guide"
              style={{ width: '100%', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
            />
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section style={{ background: '#FFF0F0', padding: '60px 0', borderTop: '1px solid #FECDD3', borderBottom: '1px solid #FECDD3' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FF5A5F', fontWeight: 'bold', fontSize: '1.1rem' }}>
              <ShieldCheck size={26} /> Travel with confidence.
            </div>
            <h3 style={{ fontSize: '1.8rem', color: '#0F172A', marginTop: '6px' }}>Integrated Safety Center & Emergency Hub</h3>
            <p style={{ color: '#64748B', marginTop: '4px' }}>
              Instant access to verified nearby Police Stations, Hospitals, 24/7 Helpline numbers (112 & 1363), and emergency tips.
            </p>
          </div>
          <button className="btn btn-primary btn-lg" onClick={() => setActivePage('safety')}>
            Open Safety Center
          </button>
        </div>
      </section>
    </div>
  );
}

function CheckCircle({ color, size }) {
  return <Award size={size} color={color} />;
}
