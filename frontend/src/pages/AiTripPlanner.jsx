import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../context/AuthContext';
import { Sparkles, Compass, MapPin, Calendar, DollarSign, CheckCircle, ShieldCheck, ArrowRight, Save } from 'lucide-react';

export default function AiTripPlanner({ setActivePage }) {
  const [destination, setDestination] = useState('Goa');
  const [startingLocation, setStartingLocation] = useState('Ahmedabad');
  const [days, setDays] = useState(4);
  const [budget, setBudget] = useState(15000);
  const [travelType, setTravelType] = useState('Family / Friends');
  const [interests, setInterests] = useState(['Nature', 'Beaches', 'Local Food']);

  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleGenerateItinerary = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSavedSuccess(false);

    try {
      const res = await axios.post(`${API_BASE_URL}/ai/itinerary`, {
        destination,
        startingLocation,
        days,
        budget,
        travelType,
        interests
      });
      setItinerary(res.data);
      toast.success('AI Itinerary generated successfully!');
    } catch (err) {
      console.error('Failed to generate AI itinerary:', err);
      toast.error('Failed to generate itinerary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateRecommendations = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/ai/recommend`, {
        startingCity: startingLocation,
        budget,
        days,
        interest: interests[0] || 'Nature'
      });
      setRecommendations(res.data);
      toast.success('AI Recommendations ready!');
    } catch (err) {
      console.error('Failed to generate recommendations:', err);
      toast.error('Failed to generate recommendations.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTrip = async () => {
    if (!itinerary) return;
    try {
      await axios.post(`${API_BASE_URL}/trips`, {
        destination: itinerary.destination,
        dates: `Next Month (${days} Days)`,
        budget: itinerary.totalBudgetEstimated,
        itinerary: itinerary.dayWiseItinerary,
        places: itinerary.dayWiseItinerary.flatMap(d => d.activities),
        transport: 'GoNomad Local Cab / Auto',
        checklist: itinerary.packingList,
        safety: itinerary.safetyTips
      });
      setSavedSuccess(true);
      toast.success('Trip saved to your Dashboard!');
    } catch (err) {
      console.error('Failed to save trip:', err);
      toast.error('Failed to save trip.');
    }
  };

  return (
    <div style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px' }}>
          <span className="badge badge-primary">Gemini 1.5 AI Engine</span>
          <h1 style={{ fontSize: '2.8rem', color: '#0F172A', marginTop: '8px' }}>AI Trip Planner</h1>
          <p style={{ color: '#64748B' }}>Generate custom day-wise itineraries, budget breakdowns, safety checklists, and smart destination recommendations.</p>
        </div>

        <div className="ai-grid">
          {/* Inputs Form */}
          <div>
            <div className="glass-card" style={{ padding: '28px', borderRadius: '24px', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.4rem', color: '#0F172A', marginBottom: '20px' }}>Plan Your Itinerary</h3>
              <form onSubmit={handleGenerateItinerary}>
                <div className="form-group">
                  <label>Destination City</label>
                  <input className="form-control" value={destination} onChange={e => setDestination(e.target.value)} placeholder="e.g. Goa, Manali, Jaipur..." />
                </div>

                <div className="form-group">
                  <label>Starting City</label>
                  <input className="form-control" value={startingLocation} onChange={e => setStartingLocation(e.target.value)} placeholder="e.g. Ahmedabad, Delhi, Mumbai..." />
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label>Duration (Days)</label>
                    <input type="number" className="form-control" value={days} onChange={e => setDays(e.target.value)} min={1} max={14} />
                  </div>
                  <div className="form-group">
                    <label>Budget (₹ INR)</label>
                    <input type="number" className="form-control" value={budget} onChange={e => setBudget(e.target.value)} step={1000} />
                  </div>
                </div>

                <div className="form-group">
                  <label>Travel Style</label>
                  <select className="form-control" value={travelType} onChange={e => setTravelType(e.target.value)}>
                    <option value="Solo Explorer">Solo Explorer</option>
                    <option value="Family / Friends">Family / Friends</option>
                    <option value="Honeymoon / Couple">Honeymoon / Couple</option>
                    <option value="Backpacker / Budget">Backpacker / Budget</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={loading}>
                  {loading ? <span className="spinner" style={{width: '20px', height: '20px', borderWidth: '2px'}}></span> : <Sparkles size={20} />} 
                  {loading ? ' Generating AI Itinerary...' : ' Generate AI Itinerary'}
                </button>
              </form>

              <button
                className="btn btn-outline"
                style={{ width: '100%', marginTop: '12px' }}
                onClick={handleGenerateRecommendations}
                disabled={loading}
              >
                {loading ? <span className="spinner" style={{width: '18px', height: '18px', borderWidth: '2px', borderColor: 'rgba(15,23,42,0.2)', borderLeftColor: 'var(--dark)'}}></span> : null}
                {loading ? ' Generating...' : ' Need Ideas? Get AI Recommendations'}
              </button>
            </div>
          </div>

          {/* AI Output Result View */}
          <div>
            {recommendations && (
              <div className="glass-card" style={{ padding: '24px', borderRadius: '20px', marginBottom: '24px', background: '#ECFDF5', border: '1px solid #A7F3D0' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#047857', marginBottom: '12px' }}>AI Recommended Destinations for You</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {recommendations.map(rec => (
                    <div key={rec.name} style={{ background: 'white', padding: '14px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h4 style={{ color: '#0F172A' }}>{rec.name} ({rec.state}) • Match: {rec.matchScore}%</h4>
                        <p style={{ fontSize: '0.82rem', color: '#475569' }}>{rec.whyRecommended}</p>
                      </div>
                      <button className="btn btn-primary btn-sm" onClick={() => setDestination(rec.name)}>
                        Select
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {itinerary ? (
              <div className="glass-card" style={{ padding: '32px', borderRadius: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div>
                    <span className="badge badge-accent">Generated Itinerary</span>
                    <h2 style={{ fontSize: '1.8rem', color: '#0F172A', marginTop: '4px' }}>{itinerary.destination} Trip</h2>
                  </div>
                  <button className="btn btn-primary btn-sm" onClick={handleSaveTrip} disabled={savedSuccess}>
                    <Save size={16} /> {savedSuccess ? 'Saved to Dashboard!' : 'Save Trip'}
                  </button>
                </div>

                {/* Day Wise Plan */}
                <h3 style={{ fontSize: '1.3rem', color: '#0F172A', marginBottom: '16px' }}>Day-wise Plan</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
                  {itinerary.dayWiseItinerary.map(dayPlan => (
                    <div key={dayPlan.day} style={{ background: '#F8FAFC', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span className="badge badge-primary">Day {dayPlan.day}</span>
                        <span style={{ fontSize: '0.85rem', color: '#10B981', fontWeight: 'bold' }}>Est. ₹{dayPlan.estimatedCost}</span>
                      </div>
                      <h4 style={{ fontSize: '1.15rem', color: '#0F172A', marginBottom: '8px' }}>{dayPlan.title}</h4>
                      <ul style={{ paddingLeft: '20px', fontSize: '0.88rem', color: '#475569', lineHeight: '1.7' }}>
                        {dayPlan.activities.map((act, idx) => <li key={idx}>{act}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Budget Breakdown */}
                {itinerary.budgetBreakdown && (
                  <div style={{ background: '#F8FAFC', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0', marginBottom: '24px' }}>
                    <h4 style={{ fontSize: '1.1rem', color: '#0F172A', marginBottom: '12px' }}>Estimated Budget Breakdown (Total: ₹{itinerary.totalBudgetEstimated})</h4>
                    <div className="grid-2" style={{ fontSize: '0.88rem', color: '#475569' }}>
                      <div>Travel to Destination: <strong>₹{itinerary.budgetBreakdown.travelToDestination}</strong></div>
                      <div>Hotel Stay: <strong>₹{itinerary.budgetBreakdown.hotelStay}</strong></div>
                      <div>Food & Dining: <strong>₹{itinerary.budgetBreakdown.foodAndDining}</strong></div>
                      <div>Local Rides & Guide: <strong>₹{itinerary.budgetBreakdown.localRidesAndGuide}</strong></div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="glass-card" style={{ padding: '60px 24px', textAlign: 'center', borderRadius: '24px', color: '#64748B' }}>
                <Sparkles size={48} color="#FF5A5F" style={{ marginBottom: '16px' }} />
                <h3>Your AI Itinerary Will Appear Here</h3>
                <p style={{ marginTop: '8px' }}>Fill in your preferences on the left and click "Generate AI Itinerary".</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
