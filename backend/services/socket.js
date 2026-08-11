import { memoryStore } from '../store/memoryStore.js';

export function setupSocketIO(io) {
  io.on('connection', (socket) => {
    console.log(`[Socket.IO] Client connected: ${socket.id}`);

    // Subscribe to driver location updates for a specific location
    socket.on('join_location_room', ({ area }) => {
      socket.join(area || 'Goa');
      console.log(`[Socket.IO] Client ${socket.id} joined room ${area}`);
    });

    // Simulate active ride state machine
    socket.on('start_ride_simulation', ({ rideId }) => {
      console.log(`[Socket.IO] Starting ride simulation for rideId: ${rideId}`);

      setTimeout(() => {
        const ride = memoryStore.updateRideStatus(rideId, 'Driver assigned');
        io.emit(`ride_update_${rideId}`, { status: 'Driver assigned', ride });
      }, 3000);

      setTimeout(() => {
        const ride = memoryStore.updateRideStatus(rideId, 'Driver arriving');
        io.emit(`ride_update_${rideId}`, { status: 'Driver arriving', ride });
      }, 7000);

      setTimeout(() => {
        const ride = memoryStore.updateRideStatus(rideId, 'Trip started');
        io.emit(`ride_update_${rideId}`, { status: 'Trip started', ride });
      }, 12000);

      setTimeout(() => {
        const ride = memoryStore.updateRideStatus(rideId, 'Trip completed');
        io.emit(`ride_update_${rideId}`, { status: 'Trip completed', ride });
      }, 18000);
    });

    socket.on('disconnect', () => {
      console.log(`[Socket.IO] Client disconnected: ${socket.id}`);
    });
  });

  // Periodic driver movement tick (simulates vehicles driving around on the map)
  setInterval(() => {
    const drivers = memoryStore.getDrivers();
    drivers.forEach(d => {
      // Slight jitter in coordinates (approx 10-30 meters)
      d.location.lat += (Math.random() - 0.5) * 0.001;
      d.location.lng += (Math.random() - 0.5) * 0.001;
    });
    io.emit('drivers_location_update', drivers);
  }, 4000);
}
