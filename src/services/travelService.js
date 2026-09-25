// src/services/travelService.js
// NEXUS Global Travel, Mobility & Logistics — Maps, Weather, Flights, Hotels, Transport, Wi-Fi

const TRAVEL_KEY = 'nexus_travel_v1';

const WORLD_CITIES = [
  { id: 'c1', name: 'Geneva', country: 'Switzerland', flag: '🇨🇭', lat: 46.20, lng: 6.14, tz: 'GMT+1', pop: '0.5M' },
  { id: 'c2', name: 'New York', country: 'USA', flag: '🇺🇸', lat: 40.71, lng: -74.01, tz: 'GMT-5', pop: '8.3M' },
  { id: 'c3', name: 'London', country: 'UK', flag: '🇬🇧', lat: 51.51, lng: -0.13, tz: 'GMT+0', pop: '9.0M' },
  { id: 'c4', name: 'Tokyo', country: 'Japan', flag: '🇯🇵', lat: 35.68, lng: 139.69, tz: 'GMT+9', pop: '13.9M' },
  { id: 'c5', name: 'Paris', country: 'France', flag: '🇫🇷', lat: 48.86, lng: 2.35, tz: 'GMT+1', pop: '2.2M' },
  { id: 'c6', name: 'Dubai', country: 'UAE', flag: '🇦🇪', lat: 25.20, lng: 55.27, tz: 'GMT+4', pop: '3.5M' },
  { id: 'c7', name: 'Berlin', country: 'Germany', flag: '🇩🇪', lat: 52.52, lng: 13.40, tz: 'GMT+1', pop: '3.7M' },
  { id: 'c8', name: 'Istanbul', country: 'Turkey', flag: '🇹🇷', lat: 41.01, lng: 28.98, tz: 'GMT+3', pop: '15.8M' },
  { id: 'c9', name: 'Mumbai', country: 'India', flag: '🇮🇳', lat: 19.08, lng: 72.88, tz: 'GMT+5:30', pop: '20.7M' },
  { id: 'c10', name: 'São Paulo', country: 'Brazil', flag: '🇧🇷', lat: -23.55, lng: -46.63, tz: 'GMT-3', pop: '22.0M' },
  { id: 'c11', name: 'Cairo', country: 'Egypt', flag: '🇪🇬', lat: 30.04, lng: 31.24, tz: 'GMT+2', pop: '10.1M' },
  { id: 'c12', name: 'Shanghai', country: 'China', flag: '🇨🇳', lat: 31.23, lng: 121.47, tz: 'GMT+8', pop: '24.9M' },
  { id: 'c13', name: 'Sydney', country: 'Australia', flag: '🇦🇺', lat: -33.87, lng: 151.21, tz: 'GMT+11', pop: '5.4M' },
  { id: 'c14', name: 'Moscow', country: 'Russia', flag: '🇷🇺', lat: 55.76, lng: 37.62, tz: 'GMT+3', pop: '12.6M' },
  { id: 'c15', name: 'Seoul', country: 'South Korea', flag: '🇰🇷', lat: 37.57, lng: 126.98, tz: 'GMT+9', pop: '9.7M' },
  { id: 'c16', name: 'Rome', country: 'Italy', flag: '🇮🇹', lat: 41.90, lng: 12.50, tz: 'GMT+1', pop: '2.9M' },
  { id: 'c17', name: 'Toronto', country: 'Canada', flag: '🇨🇦', lat: 43.65, lng: -79.38, tz: 'GMT-5', pop: '2.9M' },
  { id: 'c18', name: 'Riyadh', country: 'Saudi Arabia', flag: '🇸🇦', lat: 24.71, lng: 46.68, tz: 'GMT+3', pop: '7.7M' },
  { id: 'c19', name: 'Singapore', country: 'Singapore', flag: '🇸🇬', lat: 1.35, lng: 103.82, tz: 'GMT+8', pop: '5.9M' },
  { id: 'c20', name: 'Zurich', country: 'Switzerland', flag: '🇨🇭', lat: 47.37, lng: 8.54, tz: 'GMT+1', pop: '0.4M' },
];

const WEATHER_CONDITIONS = ['☀️ Sunny', '⛅ Partly Cloudy', '☁️ Cloudy', '🌧️ Rain', '⛈️ Thunderstorm', '🌤️ Clear', '🌫️ Foggy', '❄️ Snow', '🌪️ Windy'];

function generateWeatherForecast(city) {
  const baseTemp = city.lat > 30 ? 32 : city.lat > 15 ? 28 : city.lat > 0 ? 24 : city.lat > -15 ? 20 : 15;
  const days = [];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();

  for (let i = 0; i < 5; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    const tempVariation = Math.floor(Math.random() * 10) - 3;
    const high = baseTemp + tempVariation + Math.floor(Math.random() * 5);
    const low = high - 5 - Math.floor(Math.random() * 5);
    days.push({
      day: dayNames[d.getDay()],
      date: d.toISOString().split('T')[0],
      condition: WEATHER_CONDITIONS[Math.floor(Math.random() * WEATHER_CONDITIONS.length)],
      high,
      low,
      humidity: 30 + Math.floor(Math.random() * 50),
      windSpeed: 5 + Math.floor(Math.random() * 30),
    });
  }
  return days;
}

function generateFlights(origin, destination) {
  const airlines = ['NEXUS Air', 'Quantum Airways', 'CyberJet', 'Aether Airlines', 'Neon Pacific', 'Atlas Global'];
  const flights = [];
  for (let i = 0; i < 5; i++) {
    const depHour = 6 + Math.floor(Math.random() * 16);
    const duration = 2 + Math.floor(Math.random() * 14);
    const arrHour = (depHour + duration) % 24;
    flights.push({
      id: `fl_${Date.now()}_${i}`,
      airline: airlines[Math.floor(Math.random() * airlines.length)],
      flightNo: `NX${100 + Math.floor(Math.random() * 900)}`,
      origin: origin.name,
      destination: destination.name,
      departure: `${String(depHour).padStart(2, '0')}:${Math.random() > 0.5 ? '00' : '30'}`,
      arrival: `${String(arrHour).padStart(2, '0')}:${Math.random() > 0.5 ? '15' : '45'}`,
      duration: `${duration}h ${Math.floor(Math.random() * 4) * 15}m`,
      price: 150 + Math.floor(Math.random() * 1200),
      currency: 'USD',
      stops: Math.random() > 0.6 ? 0 : Math.random() > 0.5 ? 1 : 2,
      class: 'Economy',
    });
  }
  return flights.sort((a, b) => a.price - b.price);
}

function generateHotels(city) {
  const hotelNames = ['Grand Nexus Hotel', 'Quantum Suites', 'Cyber Palace', 'Aether Resort', 'Neon Tower Inn', 'Atlas Boutique', 'Sovereign Lodge', 'Prism Residences'];
  const amenities = ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Bar', 'Parking', 'Room Service', 'Airport Shuttle'];
  const hotels = [];
  for (let i = 0; i < 6; i++) {
    const stars = 3 + Math.floor(Math.random() * 3);
    const numAmenities = 3 + Math.floor(Math.random() * 5);
    hotels.push({
      id: `htl_${i}`,
      name: `${hotelNames[i % hotelNames.length]} ${city.name}`,
      city: city.name,
      stars,
      rating: (3.5 + Math.random() * 1.5).toFixed(1),
      pricePerNight: 60 + Math.floor(Math.random() * 400),
      currency: 'USD',
      amenities: amenities.sort(() => Math.random() - 0.5).slice(0, numAmenities),
      image: `https://images.unsplash.com/photo-${1560000000000 + Math.floor(Math.random() * 100000000000)}?w=400`,
    });
  }
  return hotels.sort((a, b) => b.stars - a.stars);
}

const TRANSPORT_MODES = [
  { id: 'car', name: 'Car / Taxi', icon: '🚗', speedKmh: 40, costPerKm: 0.8 },
  { id: 'bus', name: 'Public Bus', icon: '🚌', speedKmh: 25, costPerKm: 0.15 },
  { id: 'metro', name: 'Metro / Subway', icon: '🚇', speedKmh: 50, costPerKm: 0.10 },
  { id: 'walk', name: 'Walking', icon: '🚶', speedKmh: 5, costPerKm: 0 },
  { id: 'bike', name: 'Bicycle', icon: '🚲', speedKmh: 15, costPerKm: 0 },
];

const WIFI_HOTSPOTS = [
  { name: 'Central Library WiFi', type: 'Public', speed: '50 Mbps', security: 'Open' },
  { name: 'City Park Free WiFi', type: 'Public', speed: '25 Mbps', security: 'Open' },
  { name: 'Airport Terminal WiFi', type: 'Airport', speed: '100 Mbps', security: 'WPA2' },
  { name: 'Mall Zone WiFi', type: 'Commercial', speed: '40 Mbps', security: 'Open' },
  { name: 'University Campus Net', type: 'Education', speed: '80 Mbps', security: 'WPA2' },
  { name: 'Café Cloud Spot', type: 'Café', speed: '30 Mbps', security: 'Open' },
];

class TravelService {
  getData() {
    try {
      const raw = localStorage.getItem(TRAVEL_KEY);
      if (!raw) return { bookmarks: [], searchHistory: [] };
      return JSON.parse(raw);
    } catch { return { bookmarks: [], searchHistory: [] }; }
  }

  save(data) { localStorage.setItem(TRAVEL_KEY, JSON.stringify(data)); }

  getCities() { return WORLD_CITIES; }
  getCityById(id) { return WORLD_CITIES.find((c) => c.id === id); }
  searchCities(q) {
    const query = q.toLowerCase();
    return WORLD_CITIES.filter((c) => c.name.toLowerCase().includes(query) || c.country.toLowerCase().includes(query));
  }

  getWeather(city) { return generateWeatherForecast(city); }
  getFlights(origin, destination) { return generateFlights(origin, destination); }
  getHotels(city) { return generateHotels(city); }
  getTransportModes() { return TRANSPORT_MODES; }
  getWifiHotspots() { return WIFI_HOTSPOTS; }

  calculateRoute(distanceKm, mode) {
    const transport = TRANSPORT_MODES.find((t) => t.id === mode);
    if (!transport) return null;
    const timeHours = distanceKm / transport.speedKmh;
    const timeMinutes = Math.round(timeHours * 60);
    const cost = (distanceKm * transport.costPerKm).toFixed(2);
    return { mode: transport, distanceKm, timeMinutes, cost, displayTime: timeMinutes > 60 ? `${Math.floor(timeMinutes / 60)}h ${timeMinutes % 60}m` : `${timeMinutes}m` };
  }

  bookmarkCity(cityId) {
    const data = this.getData();
    if (!data.bookmarks.includes(cityId)) {
      data.bookmarks.push(cityId);
      this.save(data);
    }
  }

  getBookmarkedCities() {
    const data = this.getData();
    return WORLD_CITIES.filter((c) => data.bookmarks.includes(c.id));
  }
}

const travelService = new TravelService();
export default travelService;
