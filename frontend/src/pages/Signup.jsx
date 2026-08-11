import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Compass, ArrowRight } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';


export default function Signup({ setActivePage }) {
  const { signup, googleLogin } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [interests, setInterests] = useState(['Beaches', 'Culture']);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleSuccess = async (credentialResponse) => {
    setError('');
    setLoading(true);
    const result = await googleLogin(credentialResponse.credential);
    setLoading(false);
    if (result.success) {
      setActivePage('dashboard');
    } else {
      setError(result.error);
    }
  };

  const handleInterestToggle = (interest) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter(i => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    const result = await signup({
      name,
      email,
      phone,
      password,
      travelInterests: interests
    });
    setLoading(false);

    if (result.success) {
      setActivePage('dashboard');
    } else {
      setError(result.error);
    }
  };

  return (
    <div style={{ paddingTop: '50px', paddingBottom: '100px', display: 'flex', justifyContent: 'center' }}>
      <div className="glass-card" style={{ maxWidth: '500px', width: '100%', padding: '40px', borderRadius: '24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div className="logo-brand" style={{ justifyContent: 'center', marginBottom: '12px' }}>
            <Compass size={32} color="#FF5A5F" />
            <span>GO</span>NOMAD
          </div>
          <h2 style={{ fontSize: '1.8rem', color: '#0F172A' }}>Create Your Account</h2>
          <p style={{ fontSize: '0.9rem', color: '#64748B', marginTop: '4px' }}>Join GoNomad to plan trips, book rides & find verified guides.</p>
        </div>

        {error && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#DC2626', padding: '12px 16px', borderRadius: '12px', fontSize: '0.88rem', marginBottom: '20px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" className="form-control" placeholder="e.g. Aarav Mehta" value={name} onChange={e => setName(e.target.value)} required />
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" className="form-control" placeholder="aarav@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" className="form-control" placeholder="+91 98221XXXXX" value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" className="form-control" placeholder="••••••••" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
            </div>
          </div>

          <div className="form-group">
            <label>Select Travel Interests (Optional)</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '6px' }}>
              {['Beaches', 'Mountains', 'Heritage', 'Adventure', 'Wildlife', 'Spiritual', 'Food'].map(int => (
                <span
                  key={int}
                  onClick={() => handleInterestToggle(int)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '99px',
                    fontSize: '0.82rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    background: interests.includes(int) ? '#FF5A5F' : '#F1F5F9',
                    color: interests.includes(int) ? 'white' : '#475569'
                  }}
                >
                  {int}
                </span>
              ))}
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '12px', marginBottom: '16px' }} disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
          
          <div style={{ textAlign: 'center', marginBottom: '16px', color: '#64748B', fontSize: '0.9rem' }}>OR</div>
          
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError('Google Login Failed')}
            />
          </div>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: '#64748B' }}>
          Already have an account?{' '}
          <a href="#login" onClick={e => { e.preventDefault(); setActivePage('login'); }} style={{ color: '#FF5A5F', fontWeight: 'bold' }}>
            Login
          </a>
        </div>
      </div>
    </div>
  );
}
