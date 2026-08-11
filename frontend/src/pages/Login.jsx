import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Compass, Lock, Mail, ArrowRight } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';


export default function Login({ setActivePage }) {
  const { login, googleLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      setActivePage('dashboard');
    } else {
      setError(result.error);
    }
  };

  return (
    <div style={{ paddingTop: '60px', paddingBottom: '100px', display: 'flex', justifyContent: 'center' }}>
      <div className="glass-card" style={{ maxWidth: '440px', width: '100%', padding: '40px', borderRadius: '24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div className="logo-brand" style={{ justifyContent: 'center', marginBottom: '12px' }}>
            <Compass size={32} color="#FF5A5F" />
            <span>GO</span>NOMAD
          </div>
          <h2 style={{ fontSize: '1.8rem', color: '#0F172A' }}>Welcome Back</h2>
          <p style={{ fontSize: '0.9rem', color: '#64748B', marginTop: '4px' }}>Login to access your trips, rides & guide bookings.</p>
        </div>

        {error && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#DC2626', padding: '12px 16px', borderRadius: '12px', fontSize: '0.88rem', marginBottom: '20px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                className="form-control"
                placeholder="name@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', fontSize: '0.85rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked /> Remember me
            </label>
            <a href="#forgot" onClick={e => e.preventDefault()} style={{ color: '#FF5A5F', fontWeight: 'bold' }}>Forgot password?</a>
          </div>

          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginBottom: '16px' }} disabled={loading}>
            {loading ? 'Logging in...' : 'Login to Account'}
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
          Don't have an account?{' '}
          <a href="#signup" onClick={e => { e.preventDefault(); setActivePage('signup'); }} style={{ color: '#FF5A5F', fontWeight: 'bold' }}>
            Create Account
          </a>
        </div>
      </div>
    </div>
  );
}
