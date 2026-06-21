// src/components/layout/AppLayout.jsx
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import StarField from '../animations/StarField'
import NebulaBackground from '../animations/NebulaBackground'

export default function AppLayout() {
  return (
    <div className="app-layout">
      <NebulaBackground />
      <StarField count={80} />
      <Sidebar />
      <div className="app-main">
        <Navbar />
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
