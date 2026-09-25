// src/services/nexusNavigationService.js
// NEXUS Navigation & Real-World Intelligence — NEXOS Maps, Wi-Fi/Satellite Finder, Food & Events (zero-cost client-side)

export const DEFAULT_MAP_LOCATIONS = [
  { id: 'loc-1', name: 'Global Science & Tech Hub', lat: 46.2044, lng: 6.1432, category: 'Hub', country: 'Global Node • Alpha' },
  { id: 'loc-2', name: 'Neo Tokyo Interplanetary Terminal', lat: 35.6762, lng: 139.6503, category: 'Terminal', country: 'East Asia Node • Beta' },
  { id: 'loc-3', name: 'Global Quantum Data Center', lat: 37.7749, lng: -122.4194, category: 'Node', country: 'Americas Node • Gamma' },
];

export const DEFAULT_RESTAURANTS = [
  { id: 'r-1', name: 'Cosmic Artisanal Bistro', cuisine: 'International Fusion', rating: '4.9 ★', location: 'Metropolis Plaza', signature: 'Gourmet Truffle & Ancient Grains' },
  { id: 'r-2', name: 'Cyber Neon Ramen Lab', cuisine: 'Japanese Cyberpunk', rating: '4.8 ★', location: 'Tokyo Central', signature: 'Tonkotsu Quantum Broth' },
];

export const DEFAULT_EVENTS = [
  { id: 'e-1', title: 'Global Open-Core Singularity Hackathon', date: '2026-10-15', location: 'Virtual P2P Mesh Stage', status: 'Open Registration' },
  { id: 'e-2', title: 'Decentralized Epistemology Symposium', date: '2026-10-20', location: 'Global Cultural Forum', status: 'Seats Available' },
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
