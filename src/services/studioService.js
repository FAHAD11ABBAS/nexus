// src/services/studioService.js
// NEXUS Studio, CAD & Design — Image manipulation, 2D floor planner, design hub

const DB_NAME = 'nexus_studio_db';
const DB_VERSION = 1;
const STORE_PROJECTS = 'projects';
const FLOOR_KEY = 'nexus_floor_plans_v1';

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_PROJECTS)) {
        db.createObjectStore(STORE_PROJECTS, { keyPath: 'id' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

// ── Image Filters ──
const IMAGE_FILTERS = [
  { id: 'none', name: 'Original', css: 'none' },
  { id: 'grayscale', name: 'Grayscale', css: 'grayscale(100%)' },
  { id: 'sepia', name: 'Sepia', css: 'sepia(100%)' },
  { id: 'bright', name: 'Brightness+', css: 'brightness(1.4)' },
  { id: 'contrast', name: 'Contrast+', css: 'contrast(1.5)' },
  { id: 'blur', name: 'Blur', css: 'blur(3px)' },
  { id: 'invert', name: 'Invert', css: 'invert(100%)' },
  { id: 'saturate', name: 'Saturate', css: 'saturate(2)' },
  { id: 'hue90', name: 'Hue Shift', css: 'hue-rotate(90deg)' },
  { id: 'vintage', name: 'Vintage', css: 'sepia(40%) contrast(1.1) brightness(0.9)' },
  { id: 'cool', name: 'Cool Tone', css: 'hue-rotate(180deg) saturate(1.2)' },
  { id: 'warm', name: 'Warm Tone', css: 'sepia(25%) saturate(1.5) brightness(1.05)' },
];

// ── Furniture Items for Floor Planner ──
const FURNITURE_CATALOG = [
  { id: 'bed', name: 'Bed', width: 80, height: 100, color: '#6366f1', icon: '🛏️' },
  { id: 'desk', name: 'Desk', width: 60, height: 30, color: '#f59e0b', icon: '🪑' },
  { id: 'sofa', name: 'Sofa', width: 90, height: 40, color: '#10b981', icon: '🛋️' },
  { id: 'table', name: 'Table', width: 50, height: 50, color: '#8b5cf6', icon: '🪑' },
  { id: 'chair', name: 'Chair', width: 25, height: 25, color: '#ec4899', icon: '💺' },
  { id: 'wardrobe', name: 'Wardrobe', width: 50, height: 25, color: '#64748b', icon: '🗄️' },
  { id: 'bookshelf', name: 'Bookshelf', width: 40, height: 15, color: '#d97706', icon: '📚' },
  { id: 'tv', name: 'TV Stand', width: 60, height: 15, color: '#1e293b', icon: '📺' },
  { id: 'bathtub', name: 'Bathtub', width: 70, height: 35, color: '#0ea5e9', icon: '🛁' },
  { id: 'toilet', name: 'Toilet', width: 20, height: 25, color: '#e2e8f0', icon: '🚽' },
  { id: 'sink', name: 'Sink', width: 20, height: 20, color: '#94a3b8', icon: '🚰' },
  { id: 'fridge', name: 'Fridge', width: 30, height: 30, color: '#334155', icon: '🧊' },
];

// ── Design Inspiration Gallery ──
const DESIGN_GALLERY = [
  { id: 'g1', title: 'Modern Minimalist Loft', category: 'Modern', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600', description: 'Clean lines, neutral tones, open space' },
  { id: 'g2', title: 'Industrial Chic Studio', category: 'Industrial', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600', description: 'Exposed brick, metal accents, raw textures' },
  { id: 'g3', title: 'Scandinavian Living Room', category: 'Minimalist', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600', description: 'Light wood, white walls, cozy textiles' },
  { id: 'g4', title: 'Classic Victorian Study', category: 'Classic', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600', description: 'Rich wood, ornate details, warm lighting' },
  { id: 'g5', title: 'Japanese Zen Garden', category: 'Minimalist', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600', description: 'Natural elements, tranquility, simplicity' },
  { id: 'g6', title: 'Futuristic Cyberpunk Den', category: 'Modern', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600', description: 'Neon accents, dark tones, tech-forward' },
  { id: 'g7', title: 'Art Deco Penthouse', category: 'Classic', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600', description: 'Geometric patterns, gold accents, luxury' },
  { id: 'g8', title: 'Eco-Sustainable Home', category: 'Modern', image: 'https://images.unsplash.com/photo-1600573472591-ee6981cf81d6?w=600', description: 'Green walls, recycled materials, solar panels' },
];

// ── Floor Plan Service ──
function getFloorPlans() {
  try {
    return JSON.parse(localStorage.getItem(FLOOR_KEY) || '[]');
  } catch { return []; }
}

function saveFloorPlan(plan) {
  const plans = getFloorPlans();
  const idx = plans.findIndex((p) => p.id === plan.id);
  if (idx >= 0) plans[idx] = plan;
  else plans.push(plan);
  localStorage.setItem(FLOOR_KEY, JSON.stringify(plans));
}

function createFloorPlan(name = 'My Room') {
  return {
    id: `floor_${Date.now()}`,
    name,
    roomWidth: 500,
    roomHeight: 400,
    furniture: [],
    createdAt: new Date().toISOString(),
  };
}

function deleteFloorPlan(id) {
  const plans = getFloorPlans().filter((p) => p.id !== id);
  localStorage.setItem(FLOOR_KEY, JSON.stringify(plans));
}

// ── Canvas Image Save/Load via IndexedDB ──
async function saveImageProject(project) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_PROJECTS, 'readwrite');
    const store = tx.objectStore(STORE_PROJECTS);
    const req = store.put(project);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

async function getImageProjects() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_PROJECTS, 'readonly');
    const store = tx.objectStore(STORE_PROJECTS);
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}

const studioService = {
  IMAGE_FILTERS,
  FURNITURE_CATALOG,
  DESIGN_GALLERY,
  getFloorPlans,
  saveFloorPlan,
  createFloorPlan,
  deleteFloorPlan,
  saveImageProject,
  getImageProjects,
};

export default studioService;
