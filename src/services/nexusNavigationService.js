// src/services/nexusNavigationService.js
// NEXUS Navigation & Real-World Intelligence — NEXOS Maps, Wi-Fi/Satellite Finder, Food & Events (zero-cost client-side)

export const DEFAULT_MAP_LOCATIONS = [
  { id: 'loc-1', name: 'Baghdad Science & Tech Hub', lat: 33.3152, lng: 44.3661, category: 'Hub', country: 'Iraq 🇮🇶' },
  { id: 'loc-2', name: 'Neo Tokyo Interplanetary Terminal', lat: 35.6762, lng: 139.6503, category: 'Terminal', country: 'Japan 🇯🇵' },
  { id: 'loc-3', name: 'Dubai Web3 Quantum Node', lat: 25.2048, lng: 55.2708, category: 'Node', country: 'UAE 🇦🇪' },
];

export const DEFAULT_RESTAURANTS = [
  { id: 'r-1', name: 'Al-Safa Traditional Iraqi Grill', cuisine: 'Iraqi / Middle Eastern', rating: '4.9 ★', location: 'Baghdad, Iraq 🇮🇶', signature: 'Masgouf & Biryani' },
  { id: 'r-2', name: 'Cyber Neon Ramen Lab', cuisine: 'Japanese Cyberpunk', rating: '4.8 ★', location: 'Shinjuku, Tokyo 🇯🇵', signature: 'Tonkotsu Quantum Broth' },
];

export const DEFAULT_EVENTS = [
  { id: 'e-1', title: 'Global Open-Core Singularity Hackathon', date: '2026-10-15', location: 'Virtual P2P Mesh Stage', status: 'Open Registration' },
  { id: 'e-2', title: 'Hadith & Epistemology Symposium', date: '2026-10-20', location: 'Baghdad Cultural Center', status: 'Seats Available' },
];

class NexusNavigationService {
  getLocations() {
    return DEFAULT_MAP_LOCATIONS;
  }

  getRestaurants() {
    return DEFAULT_RESTAURANTS;
  }

  getEvents() {
    return DEFAULT_EVENTS;
  }
}

const nexusNavigationService = new NexusNavigationService();
export default nexusNavigationService;
