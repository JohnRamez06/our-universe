// src/utils/constants.js

export const USER_ROLES = {
  OWNER: 'owner',
  PARTNER: 'partner',
}

export const COLLECTIONS = {
  MEMORIES: 'memories',
  CONSTELLATIONS: 'constellations',
  JOURNAL: 'journal',
  LETTERS: 'letters',
  MUSIC: 'music',
  PLACES: 'places',
  GOALS: 'goals',
  JOKES: 'jokes',
  FUTURE: 'future',
  BIRTHDAY: 'birthday',
  NOTIFICATIONS: 'notifications',
  USERS: 'users',
}

export const STORAGE_PATHS = {
  MEMORIES: 'memories',
  JOURNAL: 'journal',
  LETTERS: 'letters',
  BIRTHDAY: 'birthday',
  FUTURE: 'future',
  JOKES: 'jokes',
  PLACES: 'places',
  AVATARS: 'avatars',
}

export const RELATIONSHIP_START = import.meta.env.VITE_RELATIONSHIP_START_DATE || '2024-01-01'

// Personalize here (or via .env).
export const COUPLE = {
  appName: 'Our Universe',
  tagline: 'A galaxy of us',
  user1: import.meta.env.VITE_USER1_NAME || 'John',
  user2: import.meta.env.VITE_USER2_NAME || 'Sylvia',
}

export const SECTIONS = [
  { key: 'home',          label: 'Universe',       path: '/',              icon: 'Sparkles',    color: '#8b5cf6' },
  { key: 'dashboard',     label: 'Dashboard',      path: '/dashboard',     icon: 'LayoutGrid',  color: '#a78bfa' },
  { key: 'memories',      label: 'Memories',       path: '/memories',      icon: 'Star',        color: '#ec4899' },
  { key: 'constellations',label: 'Constellations', path: '/constellations',icon: 'Orbit',       color: '#22d3ee' },
  { key: 'journal',       label: 'Journal',        path: '/journal',       icon: 'BookOpen',    color: '#fbbf24' },
  { key: 'letters',       label: 'Letters',        path: '/letters',       icon: 'Mail',        color: '#f472b6' },
  { key: 'music',         label: 'Music',          path: '/music',         icon: 'Music',       color: '#06b6d4' },
  { key: 'places',        label: 'Places',         path: '/places',        icon: 'MapPin',      color: '#10b981' },
  { key: 'goals',         label: 'Bucket List',    path: '/goals',         icon: 'Target',      color: '#f59e0b' },
  { key: 'jokes',         label: 'Inside Jokes',   path: '/jokes',         icon: 'Laugh',       color: '#fb7185' },
  { key: 'future',        label: 'Future Dreams',  path: '/future',        icon: 'Rocket',      color: '#8b5cf6' },
  { key: 'birthday',      label: 'Birthday',       path: '/birthday',      icon: 'Gift',        color: '#ec4899' },
  { key: 'stats',         label: 'Stats',          path: '/stats',         icon: 'BarChart3',   color: '#22d3ee' },
  { key: 'search',        label: 'Search',         path: '/search',        icon: 'Search',      color: '#c5bee0' },
]

export const MUSIC_PLATFORMS = ['spotify', 'youtube', 'apple', 'soundcloud', 'other']
