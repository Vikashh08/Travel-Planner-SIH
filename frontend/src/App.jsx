import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RatingModal from './components/RatingModal';

import Home from './pages/Home';
import ExploreIndia from './pages/ExploreIndia';
import Destinations from './pages/Destinations';
import DestinationDetails from './pages/DestinationDetails';
import RideTransport from './pages/RideTransport';
import AiTripPlanner from './pages/AiTripPlanner';
import LocalGuides from './pages/LocalGuides';
import GuideDetails from './pages/GuideDetails';
import BookingConfirmation from './pages/BookingConfirmation';
import SafetyCenter from './pages/SafetyCenter';
import UserDashboard from './pages/UserDashboard';
import MyTrips from './pages/MyTrips';
import MyBookings from './pages/MyBookings';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Contact from './pages/Contact';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedDestination, setSelectedDestination] = useState('Goa');
  const [selectedGuide, setSelectedGuide] = useState('guide-1');

  const renderCurrentPage = () => {
    switch (activePage) {
      case 'home':
        return <Home setActivePage={setActivePage} setSelectedDestination={setSelectedDestination} />;
      case 'explore':
        return <ExploreIndia setActivePage={setActivePage} setSelectedDestination={setSelectedDestination} />;
      case 'destinations':
        return <Destinations setActivePage={setActivePage} setSelectedDestination={setSelectedDestination} />;
      case 'destination-details':
        return <DestinationDetails destinationName={selectedDestination} setActivePage={setActivePage} setSelectedGuide={setSelectedGuide} />;
      case 'ride':
        return <RideTransport setActivePage={setActivePage} />;
      case 'planner':
        return <AiTripPlanner setActivePage={setActivePage} />;
      case 'guides':
        return <LocalGuides setActivePage={setActivePage} setSelectedGuide={setSelectedGuide} />;
      case 'guide-details':
        return <GuideDetails guideId={selectedGuide} setActivePage={setActivePage} />;
      case 'booking-confirmation':
        return <BookingConfirmation setActivePage={setActivePage} />;
      case 'safety':
        return <SafetyCenter />;
      case 'dashboard':
        return <UserDashboard setActivePage={setActivePage} setSelectedDestination={setSelectedDestination} setSelectedGuide={setSelectedGuide} />;
      case 'mytrips':
        return <MyTrips setActivePage={setActivePage} />;
      case 'bookings':
        return <MyBookings setActivePage={setActivePage} />;
      case 'login':
        return <Login setActivePage={setActivePage} />;
      case 'signup':
        return <Signup setActivePage={setActivePage} />;
      case 'about':
        return <About setActivePage={setActivePage} />;
      case 'contact':
        return <Contact />;
      default:
        return <Home setActivePage={setActivePage} setSelectedDestination={setSelectedDestination} />;
    }
  };

  return (
    <AuthProvider>
      <BookingProvider>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar activePage={activePage} setActivePage={setActivePage} />
          <main style={{ flex: 1 }}>
            {renderCurrentPage()}
          </main>
          <RatingModal />
          <Footer setActivePage={setActivePage} />
        </div>
      </BookingProvider>
    </AuthProvider>
  );
}
