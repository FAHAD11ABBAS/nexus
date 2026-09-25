# 🌌 NEXUS — Autonomous Sovereign Super App

> **The Decentralized, Zero-Cost Client-Side Digital Universe.**  
> Combining private WebRTC communications, Reels & Stories social networking, Ghost anonymous identity masking, sovereign privacy suites, deep-future cosmic archives, and a global Space Gate observatory.

---

## ✨ Features & Architecture Overview

### 👻 1. Ghost NEXUS Anonymous Ecosystem
- **Zero-Identity Ephemeral Handles**: Automatically generates cryptographic handles (e.g. `NebulaSignal#4891`, `VoidPulse#7821`) to completely mask usernames, emails, and phone numbers.
- **Global & Per-Chat Stealth**: Toggle anonymous mode globally across all interactions or activate it selectively on specific conversations.
- **Local Ephemeral Storage**: Anonymous post/comment history stored locally with zero centralized server logging.
- **On-Demand Identity Regeneration**: Cycle ephemeral ghost identities at any time with a single tap.

### 🛡️ 2. Absolute Privacy Sovereignty Suite
- **Read Receipts Sovereignty**: Global or per-chat toggle to suppress "seen/read" status without forfeiting incoming receipts.
- **One-Tap Zero-Trace Chat Wipe**: Instant cryptographic scrub of local chat history and cached attachments.
- **Self-Destruct Timers**: Presets for ephemeral message lifespans (Immediate on-read, 1h, 24h, 7d).
- **Comprehensive Moderation Hub**: Real-time management of blocked users, restricted accounts, and muted nodes.
- **Decoy Panic Protocol**: Emergency decoy interface trigger for operational security.

### 🧬 3. Deep-Future Cosmic Intelligence Hubs
- **Bio-Eco & Animal Sentinel**: Wildlife tracking logs, hydrothermal abyss archives, and biosphere telemetry.
- **Chrono-Nexus & Sci-Fi Futures**: Dyson sphere engineering, relativistic travel simulations, and post-scarcity projections.
- **Mystic & Quantum Anomalies**: Quantum consciousness paradoxes, Voynich cipher analyses, and philosophical cosmology.
- **Curated Insights**: Instant client-side filtering, searching, and community upvote counters.

### 🔭 4. Global Space Gate & Astronomy Observatory
- **Multi-Agency Archives**: Live missions, discoveries, and telemetry from NASA, ESA, SpaceX, Hubble, and JWST.
- **Deep-Field Imagery**: High-definition cosmological captures, exoplanet surveys, and Artemis lunar base specs.
- **Target Filtering**: Filter archives by mission target (Moon, Mars, Deep Space, Exoplanets).

### 🎬 5. Reels, Stories & Social Media Ecosystem
- **Vertical Reels Feed**: Smooth video playback with overlay actions (Like, Comment, Share, Save) and watermarks.
- **24-Hour Ephemeral Stories**: Top stories bar for sharing ephemeral photos and updates.
- **Creator Profiles**: Dual Public/Creator Mode with bio, verified badges, and discovery feed.
- **Career Gigs Board**: Zero-fee gig matching platform for tech, healthcare, design, and research.

### 🌐 6. 100% Comprehensive Multi-Language Localization
- **10 Supported Languages**: English, Arabic (العربية), Spanish (Español), French (Français), German (Deutsch), Brazilian Portuguese (Português), Russian (Русский), Hindi (हिन्दी), Japanese (日本語), Chinese (中文).
- **Automatic RTL Support**: Dynamic right-to-left layout activation for Arabic.
- **Zero Fallback Leaks**: Fully translated interface components, menus, buttons, and modals.
- **Permanent State Persistence**: Preserved via `localStorage`.

### 📞 7. Encrypted P2P Communications
- **WebRTC Peer-to-Peer Calls**: Low-latency video and voice calling with STUN signaling.
- **Interactive Call Controls**: Mute, camera flip, screen share, and floating overlay mode.
- **Push Notifications & Activity Center**: Integrated background notifications and centralized activity stream.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 19 + Vite |
| **Routing** | React Router v6 |
| **Styling** | Vanilla CSS + Tailwind CSS (Glassmorphism & Cyberpunk Dark Themes) |
| **Realtime & Backend** | Firebase Firestore + WebRTC (STUN signaling) |
| **Localization (i18n)** | `i18next` + `react-i18next` (10 Languages + Auto RTL) |
| **Icons** | Lucide React |
| **Build & Linting** | Vite v8 + Oxlint |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
```bash
# Clone repository
git clone https://github.com/your-username/nexus-app.git
cd nexus-app

# Install dependencies
npm install
```

### Development Server
```bash
npm run dev
```
The application will launch locally at `http://localhost:5173/`.

### Production Build
```bash
# Type check and build bundle
npm run build

# Preview production build locally
npm run preview
```

### Linter
```bash
npm run lint
```

---

## 📂 Project Structure

```
nexus-app/
├── public/                # Static assets & icons
├── src/
│   ├── assets/            # App visual assets
│   ├── components/
│   │   ├── ai/            # NEXUS AI Co-Pilot assistant
│   │   ├── calls/         # WebRTC call screens & floating overlays
│   │   ├── career/        # Career gigs modal & application forms
│   │   ├── chat/          # Messaging, media preview, expiry picker
│   │   ├── explore/       # Space Gate & Cosmic Hub modals
│   │   ├── ghost/         # Ghost NEXUS anonymous mode modals
│   │   ├── layout/        # AppShell, TopBar, BottomNav
│   │   ├── notifications/ # Push notification & activity hub
│   │   ├── privacy/       # Privacy sovereignty panel & decoy panic
│   │   ├── profile/       # Profile management & account lifecycle
│   │   ├── reels/         # Reels video feed & overlay controls
│   │   ├── stories/       # 24h stories bar, creator & viewer
│   │   ├── ui/            # Reusable glassmorphic UI components
│   │   └── wallet/        # Web3 creator economy wallet
│   ├── context/           # React Contexts (Auth, GhostMode, Notifications)
│   ├── firebase/          # Firebase initialization & configuration
│   ├── hooks/             # Custom React hooks (WebRTC, Messages, Location)
│   ├── i18n/              # Translation dictionaries (10 languages) & config
│   ├── pages/             # Route pages (Home, Chat, Reels, Explore, Profile, Settings)
│   ├── plugins/           # Open-Core modular plugin architecture
│   ├── services/          # Client-side data services & storage managers
│   ├── App.jsx            # Core router & provider shell
│   ├── index.css          # Glassmorphism design tokens & animations
│   └── main.jsx           # App entry point
├── package.json
└── vite.config.js
```

---

## 🔒 Privacy & Digital Sovereignty Principles

1. **Zero Financial Server Overhead**: Autonomous client-side architecture operating with zero recurring server-side infrastructure costs.
2. **True Ephemeral Privacy**: Messages, comments, and media feature granular self-destruct timers and immediate one-tap purge capabilities.
3. **Ghost Identity Masking**: Full cryptographic identity separation between public creator presence and anonymous ghost activity.
4. **Digital Neutrality**: Multi-perspective socio-cultural discourse engine operating with strict ethical neutrality guardrails.

---

## 📄 License

This project is licensed under the MIT License.
