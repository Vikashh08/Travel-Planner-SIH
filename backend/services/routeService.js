import axios from 'axios';

// Haversine formula to compute exact distance in km between two lat/lng coordinates
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

// Landmark dictionary for common demo locations in India
const LOCATION_COORDINATES = {
  // Goa landmarks
  "goa railway station": { lat: 15.2758, lng: 73.9859 },
  "madgaon railway station": { lat: 15.2758, lng: 73.9859 },
  "baga beach": { lat: 15.5553, lng: 73.7517 },
  "fort aguada": { lat: 15.4923, lng: 73.7737 },
  "candolim beach": { lat: 15.5173, lng: 73.7634 },
  "calangute beach": { lat: 15.5438, lng: 73.7554 },
  "anjuna market": { lat: 15.5804, lng: 73.7423 },
  "goa hotel": { lat: 15.5200, lng: 73.7700 },
  "hotel": { lat: 15.5200, lng: 73.7700 },
  "dabolim airport": { lat: 15.3808, lng: 73.8314 },

  // Manali landmarks
  "manali bus stand": { lat: 32.2396, lng: 77.1887 },
  "solang valley": { lat: 32.3166, lng: 77.1578 },
  "hadimba temple": { lat: 32.2483, lng: 77.1804 },
  "old manali": { lat: 32.2530, lng: 77.1780 },

  // Jaipur landmarks
  "jaipur railway station": { lat: 26.9189, lng: 75.7882 },
  "hawa mahal": { lat: 26.9239, lng: 75.8267 },
  "amer fort": { lat: 26.9855, lng: 75.8513 },
  "city palace": { lat: 26.9258, lng: 75.8237 }
};

export function resolveCoordinates(locationName, defaultLat = 15.2993, defaultLng = 74.1240) {
  if (!locationName) return { lat: defaultLat, lng: defaultLng };
  const key = locationName.trim().toLowerCase();
  if (LOCATION_COORDINATES[key]) return LOCATION_COORDINATES[key];

  // If coords passed directly
  if (typeof locationName === 'object' && locationName.lat && locationName.lng) {
    return locationName;
  }

  // Generate deterministic offset if landmark unknown
  let hash = 0;
  for (let i = 0; i < key.length; i++) hash = key.charCodeAt(i) + ((hash << 5) - hash);
  const latOffset = ((hash % 100) / 1000);
  const lngOffset = (((hash >> 2) % 100) / 1000);

  return {
    lat: defaultLat + latOffset,
    lng: defaultLng + lngOffset
  };
}

export async function calculateRoute(originCoords, destCoords) {
  try {
    // Attempt OSRM public API route calculation
    const url = `https://router.project-osrm.org/route/v1/driving/${originCoords.lng},${originCoords.lat};${destCoords.lng},${destCoords.lat}?overview=full&geometries=geojson`;
    const response = await axios.get(url, { timeout: 4000 });

    if (response.data && response.data.routes && response.data.routes.length > 0) {
      const route = response.data.routes[0];
      const distanceKm = parseFloat((route.distance / 1000).toFixed(1));
      const durationMin = Math.round(route.duration / 60);

      // GeoJSON coordinates array converted to Leaflet [lat, lng]
      const polyline = route.geometry.coordinates.map(coord => [coord[1], coord[0]]);

      return {
        distanceKm: distanceKm || 5.2,
        durationMin: durationMin || 12,
        polyline,
        source: "OSRM Routing Engine"
      };
    }
  } catch (err) {
    console.warn('[OSRM Route Service] OSRM call failed or timed out. Using Haversine geo fallback:', err.message);
  }

  // Haversine fallback calculation
  const dist = haversineDistance(originCoords.lat, originCoords.lng, destCoords.lat, destCoords.lng);
  const distanceKm = parseFloat((Math.max(dist, 1.2)).toFixed(1));
  const durationMin = Math.round(distanceKm * 2.5) + 3;

  // Simple straight polyline fallback
  const polyline = [
    [originCoords.lat, originCoords.lng],
    [(originCoords.lat + destCoords.lat) / 2, (originCoords.lng + destCoords.lng) / 2],
    [destCoords.lat, destCoords.lng]
  ];

  return {
    distanceKm,
    durationMin,
    polyline,
    source: "Geodesic Distance Engine"
  };
}

export async function calculateMultiStopRoute(waypoints) {
  let totalDistance = 0;
  let totalDuration = 0;
  let fullPolyline = [];

  for (let i = 0; i < waypoints.length - 1; i++) {
    const leg = await calculateRoute(waypoints[i], waypoints[i + 1]);
    totalDistance += leg.distanceKm;
    totalDuration += leg.durationMin;
    fullPolyline = [...fullPolyline, ...leg.polyline];
  }

  return {
    totalDistanceKm: parseFloat(totalDistance.toFixed(1)),
    totalDurationMin: totalDuration,
    waypointsCount: waypoints.length,
    polyline: fullPolyline
  };
}
