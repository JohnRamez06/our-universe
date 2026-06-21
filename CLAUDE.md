# Our Universe — Claude Code Instructions

## Project Overview
A private relationship memory app for two users. Space/cosmos aesthetic. React + Vite + Firebase.

## Tech Stack
- React 19 + Vite
- React Router v6
- Framer Motion (all animations)
- Firebase Auth, Firestore, Storage
- react-hot-toast (notifications)
- date-fns (date utilities)
- Leaflet + react-leaflet (Places map)
- react-quill (rich text editor for Journal)
- lucide-react (icons)

## Setup
1. `npm install`
2. Copy `.env.example` → `.env` and fill in Firebase credentials
3. Create two Firebase Auth accounts manually (no signup page)
4. Create a `users` Firestore doc for each user: `{ role: 'owner'|'partner', displayName, avatar }`
5. `npm run dev`

## Design System
- All CSS variables in `src/styles/variables.css`
- Dark/space theme. Background: `#05030f`. Accent: `#8b5cf6` (violet), `#ec4899` (pink), `#06b6d4` (teal)
- Fonts: `Cinzel` (headings/display), `Inter` (body)
- Glassmorphism: use `.glass` or `.glass-dark` CSS classes
- All animations via Framer Motion. Use `AnimatePresence` for mount/unmount
- CSS animations in `src/styles/animations.css`

## Folder Structure
```
src/
  assets/          Static assets
  components/
    ui/            Reusable primitive components (Button, Modal, Card...)
    layout/        AppLayout, Sidebar, Navbar, ProtectedRoute
    shared/        Cross-feature components (MediaGallery, SearchBar...)
    animations/    StarField, ShootingStar, NebulaBackground, etc.
  contexts/        AuthContext, NotificationContext, UniverseContext
  hooks/           useAuth, useFirestore, useStorage, useMemories...
  lib/             firebase.js, router.jsx
  pages/           One folder per section (12 sections total)
  services/        Firebase CRUD per collection (memories.service.js etc.)
  styles/          globals.css, variables.css, animations.css...
  types/           JSDoc type definitions
  utils/           dateUtils, constants, formatters, validators
```

## Firestore Collections
- `memories` — { title, description, date, location, photos[], videos[], tags[], createdBy, createdAt }
- `constellations` — { name, memoryIds[], color, icon, createdBy, createdAt }
- `journal` — { title, content (rich HTML), images[], date, createdBy, createdAt }
- `letters` — { title, message, unlockDate?, createdBy, createdAt }
- `music` — { title, artist, link, platform, memoryId?, description, createdBy, createdAt }
- `places` — { name, lat, lng, story, photos[], createdBy, createdAt }
- `goals` — { title, description, completed, completedAt?, createdBy, createdAt }
- `jokes` — { title, description, images[], createdBy, createdAt }
- `future` — { title, description, targetDate?, images[], completed, memoryId?, createdBy, createdAt }
- `birthday` — { year, videos[], photos[], messages[], createdBy, createdAt }
- `users` — { role, displayName, avatar, email }
- `notifications` — { type, message, read, userId, createdAt }

## Firebase Storage Structure
```
/memories/{userId}/{memoryId}/
/journal/{userId}/{entryId}/
/letters/{userId}/{letterId}/
/birthday/{year}/
/future/{dreamId}/
/jokes/{jokeId}/
/places/{placeId}/
/avatars/{userId}/
```

## Key Implementation Notes
- Home page (`/`) = interactive universe canvas. Stars = memories. Planets = sections.
- Use `framer-motion` `drag` for panning the universe canvas
- Use CSS `transform: scale()` + state for zoom
- Sidebar navigation links to all 12 sections
- `ProtectedRoute` guards all routes. No public register page.
- `letters.service.js` must check `unlockDate` before returning content
- `future.service.js`: when marking a dream complete, auto-create a memory
- `stats` page reads aggregate counts from all collections
- Memory of the Day: pick random from `memories` collection daily (store last shown date in localStorage)

## Priority Build Order (suggested for Claude Code)
1. Firebase setup (lib/firebase.js ✅ done)
2. Auth (LoginPage, AuthContext ✅ skeleton done, useAuth ✅)
3. Layout (AppLayout, Sidebar, Navbar)
4. Animations (StarField, NebulaBackground for background)
5. UI components (Button, Modal, Card, MediaUploader)
6. Memories (most important section)
7. Dashboard
8. Remaining sections in order
