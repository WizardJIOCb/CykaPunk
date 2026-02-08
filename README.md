# CykaPunk - Cyberpunk Online Browser Game

CykaPunk is a multiplayer online browser game focused on character progression, equipment & currencies, automatic round-based combat, PvE bosses & PvP matchmaking, and real-time chat with Spine 2D skeletal animations.

## Features

- **Character Progression**: Level up your character, improve stats, and unlock new abilities
- **Equipment System**: Collect and equip various items with different stats and rarities
- **Multi-Currency Economy**: Soft currency (grind), Hard currency (rare), and Upgrade currency
- **Automated Combat**: Turn-based, initiative-based combat calculated on the server
- **PvP Matchmaking**: Battle other players in real-time with skill-based matching
- **PvE Boss Arenas**: Face challenging bosses in sequential arenas
- **Real-time Chat**: Communicate with other players across multiple channels
- **Spine 2D Animations**: Smooth, professional character animations

## Tech Stack

### Backend
- Node.js with TypeScript
- Express.js framework
- PostgreSQL database with Drizzle ORM
- JWT authentication
- Passport.js with OAuth (Google, Discord, Twitter)
- Socket.IO for real-time features
- Winston for logging
- Helmet for security

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- wouter for routing
- TanStack Query for data fetching
- Socket.IO client for real-time communication
- React Hook Form + Zod for validation
- i18next for internationalization
- Spine 2D runtime for animations

## Architecture

### Backend Structure
```
backend/
├── src/
│   ├── controllers/     # Request handlers
│   ├── routes/          # API route definitions
│   ├── models/          # Data models (deprecated, using Drizzle schema)
│   ├── middleware/      # Authentication and other middleware
│   ├── services/        # Business logic services
│   ├── db/              # Database connection and schema
│   └── utils/           # Utility functions
├── drizzle/             # Drizzle migration files
└── sockets/             # Socket.IO event handlers
```

### Frontend Structure
```
frontend/
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page-level components
│   ├── hooks/           # Custom React hooks
│   ├── services/        # API clients and services
│   ├── utils/           # Utility functions
│   ├── locales/         # Translation files
│   └── types/           # TypeScript type definitions
```

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL

### Installation

1. Clone the repository
2. Install dependencies for both backend and frontend:
```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

3. Set up environment variables (see `.env.example`)

4. Run the application:
```bash
# Start both servers
npm run dev
```

## Game Systems

### Character System
- Level-based progression with stat improvements
- Equipment slots for various item types
- Spine animations for all character actions

### Combat System
- Server-authoritative turn-based combat
- Initiative-based action order
- Detailed combat logs with visual replay
- PvP matchmaking and PvE boss battles

### Economy
- Three-tier currency system
- Shop with various items
- Trading between players

### Social Features
- Multi-channel chat (General, Trade, Location, Private)
- Online player list with locations
- Private messaging system

## Environment Variables

Create `.env` files in both backend and frontend with the required configuration.

## License

This project is licensed under the MIT License.