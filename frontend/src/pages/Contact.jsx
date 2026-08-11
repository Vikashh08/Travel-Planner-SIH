import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px' }}>
          <span className="badge badge-primary">24/7 Assistance</span>
          <h1 style={{ fontSize: '2.8rem', color: '#0F172A', marginTop: '8px' }}>Contact GoNomad Support</h1>
          <p style={{ color: '#64748B' }}>Have questions about rides, guide bookings, or custom itineraries? We are here to help!</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '40px', maxWidth: '960px', margin: '0 auto' }}>
          <div>
            <div className="glass-card" style={{ padding: '32px', borderRadius: '24px', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.4rem', color: '#0F172A', marginBottom: '20px' }}>Support Information</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.95rem', color: '#334155' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Phone color="#FF5A5F" size={20} /> <strong>National Support:</strong> 1800-GONOMAD (4666)
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Mail color="#10B981" size={20} /> <strong>Email Support:</strong> support@gonomad.in
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <MapPin color="#6366F1" size={20} /> <strong>HQ Office:</strong> Cyber City, Gurugram / Panaji, Goa
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="glass-card" style={{ padding: '32px', borderRadius: '24px' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '30px 0' }}>
                  <CheckCircle size={56} color="#10B981" style={{ marginBottom: '12px' }} />
                  <h3 style={{ fontSize: '1.4rem', color: '#0F172A' }}>Message Received!</h3>
                  <p style={{ color: '#64748B', marginTop: '4px' }}>Our support team will get back to you within 2 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 style={{ fontSize: '1.4rem', color: '#0F172A', marginBottom: '20px' }}>Send Us a Message</h3>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input className="form-control" placeholder="Your Name" required />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input className="form-control" type="email" placeholder="name@example.com" required />
                  </div>
                  <div className="form-group">
                    <label>Message / Inquiry</label>
                    <textarea className="form-control" rows={4} placeholder="How can we assist your India travel plans?" required />
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                    <Send size={18} /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
