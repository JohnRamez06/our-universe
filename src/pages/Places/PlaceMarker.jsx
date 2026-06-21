import L from 'leaflet'
import { Marker, Popup } from 'react-leaflet'

const icon = L.divIcon({
  className: 'place-marker',
  html: '<div style="width:18px;height:18px;border-radius:50%;background:radial-gradient(circle,#fff,#ec4899);box-shadow:0 0 12px rgba(236,72,153,0.8);border:2px solid white;"></div>',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
})

export default function PlaceMarker({ place, onClick }) {
  return (
    <Marker
      position={[place.lat, place.lng]}
      icon={icon}
      eventHandlers={{ click: () => onClick?.(place) }}
    >
      <Popup>
        <strong>{place.name}</strong>
        {place.story && <div style={{ marginTop: 4, fontSize: 12, maxWidth: 180 }}>{place.story.slice(0, 80)}…</div>}
      </Popup>
    </Marker>
  )
}
