import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import ProtectedRoute from '../components/layout/ProtectedRoute'
import AppLayout from '../components/layout/AppLayout'
import LoginPage from '../pages/Auth/LoginPage'
import HomePage from '../pages/Home/HomePage'
import DashboardPage from '../pages/Dashboard/DashboardPage'
import MemoriesPage from '../pages/Memories/MemoriesPage'
import ConstellationsPage from '../pages/Constellations/ConstellationsPage'
import JournalPage from '../pages/Journal/JournalPage'
import LettersPage from '../pages/Letters/LettersPage'
import MusicPage from '../pages/Music/MusicPage'
import PlacesPage from '../pages/Places/PlacesPage'
import BucketListPage from '../pages/BucketList/BucketListPage'
import JokesPage from '../pages/Jokes/JokesPage'
import StatsPage from '../pages/Stats/StatsPage'
import BirthdayPage from '../pages/Birthday/BirthdayPage'
import FuturePage from '../pages/Future/FuturePage'
import SearchPage from '../pages/Search/SearchPage'

export default function AppRouter() {
  const { user, loading } = useAuth()

  if (loading) return null // or <Loader />

  return (
    <Routes>
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/memories" element={<MemoriesPage />} />
          <Route path="/constellations" element={<ConstellationsPage />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/letters" element={<LettersPage />} />
          <Route path="/music" element={<MusicPage />} />
          <Route path="/places" element={<PlacesPage />} />
          <Route path="/goals" element={<BucketListPage />} />
          <Route path="/jokes" element={<JokesPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/birthday" element={<BirthdayPage />} />
          <Route path="/future" element={<FuturePage />} />
          <Route path="/search" element={<SearchPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
