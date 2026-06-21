import { useState } from 'react'
import { Plus, MapPin } from 'lucide-react'
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import EmptyState from '../../components/ui/EmptyState'
import Loader from '../../components/ui/Loader'
import PlaceForm from './PlaceForm'
import PlaceMarker from './PlaceMarker'
import PlaceModal from './PlaceModal'
import useRealtime from '../../hooks/useRealtime'
import * as svc from '../../services/places.service'

function ClickCatcher({ onPick }) {
  useMapEvents({
    click(e) { onPick?.(e.latlng) },
  })
  return null
}

export default function PlacesPage() {
  const { items, loading } = useRealtime(svc)
  const [adding, setAdding] = useState(null)
  const [selected, setSelected] = useState(null)

  return (
    <div>
      <div className="section-header">
        <div>
          <h1 className="section-title">Places</h1>
          <p className="section-subtitle">Pins on the map for the places that hold us.</p>
        </div>
        <Button variant="primary" icon={<Plus size={14} />} onClick={() => setAdding({})}>Pin a place</Button>
      </div>

      <div style={{ height: 500, borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
        <MapContainer center={[20, 0]} zoom={2} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png"
          />
          <ClickCatcher onPick={(ll) => setAdding({ lat: ll.lat, lng: ll.lng })} />
          {items.map(p => <PlaceMarker key={p.id} place={p} onClick={setSelected} />)}
        </MapContainer>
      </div>

      {loading
        ? <Loader />
        : items.length === 0
          ? <div className="mt-6"><EmptyState icon={<MapPin size={44} />} title="No places yet" message="Click anywhere on the map to drop your first pin." /></div>
          : null}

      <Modal open={!!adding} onClose={() => setAdding(null)} title="Pin a place">
        {adding && <PlaceForm place={adding} onDone={() => setAdding(null)} />}
      </Modal>
      <PlaceModal open={!!selected} place={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
