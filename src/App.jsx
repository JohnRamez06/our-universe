import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext'
import { NotificationProvider } from './contexts/NotificationContext'
import { UniverseProvider } from './contexts/UniverseContext'
import AppRouter from './lib/router'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <UniverseProvider>
            <AppRouter />
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: 'rgba(15, 10, 30, 0.9)',
                  color: '#e2d9f3',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  backdropFilter: 'blur(10px)',
                },
              }}
            />
          </UniverseProvider>
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
