import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Compass, MapPin, Navigation, UserCheck, Calendar, User, LogOut, Menu, X, ShieldAlert, Sparkles } from 'lucide-react';

export default function Navbar({ activePage, setActivePage }) {
  const { user, isLoggedIn, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        {/* Logo */}
        <div className="logo-brand" onClick={() => handleNavClick('home')} style={{ cursor: 'pointer' }}>
          <Compass size={28} color="#FF5A5F" strokeWidth={2.5} />
          <span>GO</span>NOMAD
        </div>

        {/* Main Nav Links (Desktop) - Styled like Dashboard Items */}
        <ul className="nav-links">
          <li>
            <a
              href="#home"
              className={`btn btn-sm ${activePage === 'home' ? 'btn-primary' : 'btn-outline'}`}
              onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#explore"
              className={`btn btn-sm ${activePage === 'explore' ? 'btn-primary' : 'btn-outline'}`}
              onClick={(e) => { e.preventDefault(); handleNavClick('explore'); }}
            >
              Explore
            </a>
          </li>
          <li>
            <a
              href="#destinations"
              className={`btn btn-sm ${activePage === 'destinations' ? 'btn-primary' : 'btn-outline'}`}
              onClick={(e) => { e.preventDefault(); handleNavClick('destinations'); }}
            >
              Destinations
            </a>
          </li>
          <li>
            <a
              href="#ride"
              className={`btn btn-sm ${activePage === 'ride' ? 'btn-primary' : 'btn-outline'}`}
              onClick={(e) => { e.preventDefault(); handleNavClick('ride'); }}
            >
              Local Transport
            </a>
          </li>
          <li>
            <a
              href="#planner"
              className={`btn btn-sm ${activePage === 'planner' ? 'btn-primary' : 'btn-outline'}`}
              onClick={(e) => { e.preventDefault(); handleNavClick('planner'); }}
            >
              Trip Planner
            </a>
          </li>
          <li>
            <a
              href="#guides"
              className={`btn btn-sm ${activePage === 'guides' ? 'btn-primary' : 'btn-outline'}`}
              onClick={(e) => { e.preventDefault(); handleNavClick('guides'); }}
            >
              Local Guides
            </a>
          </li>
          <li>
            <a
              href="#safety"
              className={`btn btn-sm ${activePage === 'safety' ? 'btn-primary' : 'btn-outline'}`}
              onClick={(e) => { e.preventDefault(); handleNavClick('safety'); }}
            >
              Safety
            </a>
          </li>
        </ul>

        {/* Right Side Auth Actions (Original, Unchanged) */}
        <div className="auth-actions">
          {isLoggedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                className={`btn btn-sm ${activePage === 'dashboard' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => handleNavClick('dashboard')}
              >
                <User size={16} />
                Dashboard
              </button>
              <button
                className={`btn btn-sm ${activePage === 'mytrips' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => handleNavClick('mytrips')}
              >
                <Calendar size={16} />
                My Trips
              </button>
              <button
                className={`btn btn-sm ${activePage === 'bookings' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => handleNavClick('bookings')}
              >
                <Navigation size={16} />
                Bookings
              </button>
              <button
                className="btn btn-sm btn-outline"
                onClick={logout}
                title="Logout"
                style={{ color: '#EF4444', borderColor: '#FCA5A5' }}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                className="btn btn-sm btn-outline"
                onClick={() => handleNavClick('login')}
              >
                Login
              </button>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => handleNavClick('signup')}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>

        {/* Hamburger Mobile Toggle for Main Links */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay for Main Links */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '76px',
          left: 0,
          right: 0,
          background: 'white',
          borderBottom: '1px solid #E2E8F0',
          padding: '24px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          zIndex: 999
        }}>
          <a href="#home" className={`mobile-nav-link ${activePage === 'home' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>Home</a>
          <a href="#explore" className={`mobile-nav-link ${activePage === 'explore' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleNavClick('explore'); }}>Explore</a>
          <a href="#destinations" className={`mobile-nav-link ${activePage === 'destinations' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleNavClick('destinations'); }}>Destinations</a>
          <a href="#ride" className={`mobile-nav-link ${activePage === 'ride' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleNavClick('ride'); }}>Local Transport</a>
          <a href="#planner" className={`mobile-nav-link ${activePage === 'planner' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleNavClick('planner'); }}>Trip Planner</a>
          <a href="#guides" className={`mobile-nav-link ${activePage === 'guides' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleNavClick('guides'); }}>Local Guides</a>
          <a href="#safety" className={`mobile-nav-link ${activePage === 'safety' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleNavClick('safety'); }}>Safety</a>

          <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '16px 0' }} />
          
          {/* Auth Actions inside Mobile Menu */}
          {isLoggedIn ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <button className={`btn btn-sm ${activePage === 'dashboard' ? 'btn-primary' : 'btn-outline'}`} onClick={() => handleNavClick('dashboard')} style={{width: '100%'}}>
                <User size={16} /> Dashboard
              </button>
              <button className={`btn btn-sm ${activePage === 'mytrips' ? 'btn-primary' : 'btn-outline'}`} onClick={() => handleNavClick('mytrips')} style={{width: '100%'}}>
                <Calendar size={16} /> My Trips
              </button>
              <button className={`btn btn-sm ${activePage === 'bookings' ? 'btn-primary' : 'btn-outline'}`} onClick={() => handleNavClick('bookings')} style={{width: '100%'}}>
                <Navigation size={16} /> Bookings
              </button>
              <button className="btn btn-sm btn-outline" onClick={logout} style={{ color: '#EF4444', borderColor: '#FCA5A5', width: '100%' }}>
                <LogOut size={16} /> Logout
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <button className="btn btn-sm btn-outline" onClick={() => handleNavClick('login')} style={{width: '100%'}}>Login</button>
              <button className="btn btn-sm btn-primary" onClick={() => handleNavClick('signup')} style={{width: '100%'}}>Sign Up</button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}


