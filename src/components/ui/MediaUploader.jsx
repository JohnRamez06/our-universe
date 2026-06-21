import { useRef, useState } from 'react'
import { Upload, X } from 'lucide-react'
import { guessMediaType } from '../../utils/mediaUtils'

export default function MediaUploader({ files = [], onChange, accept = 'image/*,video/*', max = 12 }) {
  const inputRef = useRef(null)
  const [drag, setDrag] = useState(false)

  const addFiles = (newOnes) => {
    const list = [...files, ...Array.from(newOnes)].slice(0, max)
    onChange?.(list)
  }
  const remove = (idx) => {
    const next = files.filter((_, i) => i !== idx)
    onChange?.(next)
  }

  return (
    <div>
      <label
        className={['uploader', drag && 'drag'].filter(Boolean).join(' ')}
        onDragOver={(e) => { e.preventDefault(); setDrag(true) }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); addFiles(e.dataTransfer.files) }}
      >
        <Upload size={24} />
        <div style={{ marginTop: 6 }}>Drop files or click to upload</div>
        <small style={{ color: 'var(--text-muted)' }}>Up to {max} files · images & videos</small>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={accept}
          onChange={(e) => addFiles(e.target.files)}
        />
      </label>
      {files.length > 0 && (
        <div className="media-grid">
          {files.map((f, i) => {
            const isStr = typeof f === 'string'
            const url = isStr ? f : URL.createObjectURL(f)
            const type = isStr ? guessMediaType(url) : (f.type?.startsWith('video') ? 'video' : 'image')
            return (
              <div className="media-thumb" key={i}>
                {type === 'video'
                  ? <video src={url} muted />
                  : <img src={url} alt="" />}
                <button type="button" className="media-thumb-remove" onClick={() => remove(i)}><X size={12} /></button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
