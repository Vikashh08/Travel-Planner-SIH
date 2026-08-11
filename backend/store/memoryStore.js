import { initialDestinations, initialDrivers, initialGuides } from '../seed/seedData.js';

class MemoryStore {
  constructor() {
    this.destinations = [...initialDestinations];
    this.drivers = [...initialDrivers];
    this.guides = [...initialGuides];
    this.users = [];
    this.rides = [];
    this.guideBookings = [];
    this.trips = [];
    this.reviews = [];
    this.savedDestinations = [];
  }

  // User Methods
  addUser(user) {
    this.users.push(user);
    return user;
  }
  findUserByEmail(email) {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }
  findUserById(id) {
    return this.users.find(u => u.id === id || u._id === id);
  }

  // Destinations
  getDestinations() {
    return this.destinations;
  }
  getDestinationById(id) {
    return this.destinations.find(d => d.id === id || d._id === id || d.name.toLowerCase() === id.toLowerCase());
  }

  // Drivers
  getDrivers(area) {
    if (!area) return this.drivers;
    return this.drivers.filter(d => d.destinationArea.toLowerCase() === area.toLowerCase());
  }
  getDriverById(id) {
    return this.drivers.find(d => d.id === id || d._id === id);
  }

  // Guides
  getGuides(destination) {
    if (!destination) return this.guides;
    return this.guides.filter(g => g.destination.toLowerCase().includes(destination.toLowerCase()));
  }
  getGuideById(id) {
    return this.guides.find(g => g.id === id || g._id === id);
  }

  // Rides
  createRide(rideData) {
    const ride = {
      id: `ride-${Date.now()}`,
      status: 'Searching for driver',
      createdAt: new Date().toISOString(),
      ...rideData
    };
    this.rides.push(ride);
    return ride;
  }
  getRideById(id) {
    return this.rides.find(r => r.id === id);
  }
  updateRideStatus(id, status, driverInfo = null) {
    const ride = this.getRideById(id);
    if (ride) {
      ride.status = status;
      if (driverInfo) ride.driver = driverInfo;
    }
    return ride;
  }
  getUserRides(userId) {
    return this.rides.filter(r => r.userId === userId);
  }

  // Guide Bookings
  createGuideBooking(bookingData) {
    const booking = {
      id: `gbook-${Date.now()}`,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
      ...bookingData
    };
    this.guideBookings.push(booking);
    return booking;
  }
  getGuideBookings(userId) {
    return this.guideBookings.filter(b => b.userId === userId);
  }

  // Trips
  createTrip(tripData) {
    const trip = {
      id: `trip-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...tripData
    };
    this.trips.push(trip);
    return trip;
  }
  getUserTrips(userId) {
    return this.trips.filter(t => t.userId === userId);
  }
  getTripById(id) {
    return this.trips.find(t => t.id === id);
  }
  deleteTrip(id) {
    this.trips = this.trips.filter(t => t.id !== id);
    return true;
  }

  // Reviews
  addReview(reviewData) {
    const review = {
      id: `rev-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...reviewData
    };
    this.reviews.push(review);

    // Dynamic rating calculation!
    if (reviewData.targetType === 'driver' && reviewData.targetId) {
      const driver = this.getDriverById(reviewData.targetId);
      if (driver) {
        const driverReviews = this.reviews.filter(r => r.targetType === 'driver' && r.targetId === reviewData.targetId);
        const avg = driverReviews.reduce((sum, r) => sum + r.rating, 0) / driverReviews.length;
        driver.rating = parseFloat(avg.toFixed(2));
        driver.totalTrips = (driver.totalTrips || 0) + 1;
      }
    } else if (reviewData.targetType === 'guide' && reviewData.targetId) {
      const guide = this.getGuideById(reviewData.targetId);
      if (guide) {
        guide.reviews = guide.reviews || [];
        guide.reviews.push(review);
        const avg = guide.reviews.reduce((sum, r) => sum + r.rating, 0) / guide.reviews.length;
        guide.rating = parseFloat(avg.toFixed(2));
        guide.totalTrips = (guide.totalTrips || 0) + 1;
      }
    }
    return review;
  }

  getReviews(targetType, targetId) {
    return this.reviews.filter(r => r.targetType === targetType && r.targetId === targetId);
  }

  // Saved Destinations
  toggleSavedDestination(userId, destinationId) {
    const exists = this.savedDestinations.find(s => s.userId === userId && s.destinationId === destinationId);
    if (exists) {
      this.savedDestinations = this.savedDestinations.filter(s => !(s.userId === userId && s.destinationId === destinationId));
      return { saved: false };
    } else {
      this.savedDestinations.push({ userId, destinationId, createdAt: new Date().toISOString() });
      return { saved: true };
    }
  }

  getUserSavedDestinations(userId) {
    const destIds = this.savedDestinations.filter(s => s.userId === userId).map(s => s.destinationId);
    return this.destinations.filter(d => destIds.includes(d.id));
  }
}

export const memoryStore = new MemoryStore();
