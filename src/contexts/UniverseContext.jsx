// src/contexts/UniverseContext.jsx
import { createContext, useContext, useState } from 'react'

const UniverseContext = createContext(null)

export function UniverseProvider({ children }) {
  const [activeSection, setActiveSection] = useState(null)
  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  return (
    <UniverseContext.Provider value={{ activeSection, setActiveSection, zoom, setZoom, position, setPosition }}>
      {children}
    </UniverseContext.Provider>
  )
}

export const useUniverseContext = () => useContext(UniverseContext)
