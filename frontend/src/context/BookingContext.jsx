import React, { createContext, useContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import confetti from 'canvas-confetti';

const BookingContext = createContext(null);

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
const socket = io(SOCKET_URL, {
  autoConnect: true,
  reconnection: true
});

export function BookingProvider({ children }) {
  const [activeRide, setActiveRide] = useState(() => {
    const saved = localStorage.getItem('gonomad_active_ride');
    return saved ? JSON.parse(saved) : null;
  });

  const [activeGuideBooking, setActiveGuideBooking] = useState(() => {
    const saved = localStorage.getItem('gonomad_active_guide_booking');
    return saved ? JSON.parse(saved) : null;
  });

  const [ratingTarget, setRatingTarget] = useState(null); // { type: 'driver'|'guide', id: string, name: string }

  // Save state changes
  useEffect(() => {
    if (activeRide) {
      localStorage.setItem('gonomad_active_ride', JSON.stringify(activeRide));
    } else {
      localStorage.removeItem('gonomad_active_ride');
    }
  }, [activeRide]);

  useEffect(() => {
    if (activeGuideBooking) {
      localStorage.setItem('gonomad_active_guide_booking', JSON.stringify(activeGuideBooking));
    } else {
      localStorage.removeItem('gonomad_active_guide_booking');
    }
  }, [activeGuideBooking]);

  // Subscribe to real-time ride updates over Socket.IO
  useEffect(() => {
    if (activeRide && activeRide.id) {
      const eventName = `ride_update_${activeRide.id}`;
      const handleUpdate = (data) => {
        console.log('[Socket.IO] Ride status update received:', data);
        setActiveRide(prev => ({
          ...prev,
          status: data.status,
          ...(data.ride || {})
        }));

        if (data.status === 'Trip completed') {
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        }
      };

      socket.on(eventName, handleUpdate);
      return () => socket.off(eventName, handleUpdate);
    }
  }, [activeRide?.id]);

  const triggerRideSimulation = (rideId) => {
    socket.emit('start_ride_simulation', { rideId });
  };

  const clearActiveRide = () => setActiveRide(null);
  const clearActiveGuideBooking = () => setActiveGuideBooking(null);

  return (
    <BookingContext.Provider value={{
      activeRide,
      setActiveRide,
      triggerRideSimulation,
      clearActiveRide,
      activeGuideBooking,
      setActiveGuideBooking,
      clearActiveGuideBooking,
      ratingTarget,
      setRatingTarget,
      socket
    }}>
      {children}
    </BookingContext.Provider>
  );
}

export const useBooking = () => useContext(BookingContext);
