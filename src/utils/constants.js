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
