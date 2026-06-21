import { useState } from 'react'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { useAuth } from '../../hooks/useAuth'
import * as svc from '../../services/music.service'
import { MUSIC_PLATFORMS } from '../../utils/constants'
import { musicPlatformFromUrl } from '../../utils/formatters'
import notify from '../../components/ui/Toast'

export default function MusicForm({ track, onDone }) {
  const { user } = useAuth()
  const [data, setData] = useState({
    title: track?.title || '',
    artist: track?.artist || '',
    link: track?.link || '',
    platform: track?.platform || 'spotify',
    description: track?.description || '',
  })
  const [saving, setSaving] = useState(false)

  const set = (k) => (e) => {
    const v = e?.target?.value ?? e
    setData(d => ({
      ...d,
      [k]: v,
      ...(k === 'link' ? { platform: musicPlatformFromUrl(v) } : {}),
    }))
  }

  const submit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (track) await svc.update(track.id, data)
      else await svc.create(user.uid, data)
      notify.success('Saved ✦')
      onDone?.()
    } catch (err) { notify.error(err.message) }
    finally { setSaving(false) }
  }

  return (
    <form onSubmit={submit}>
      <Input label="Title" value={data.title} onChange={set('title')} required />
      <Input label="Artist" value={data.artist} onChange={set('artist')} />
      <Input label="Link" type="url" value={data.link} onChange={set('link')} placeholder="https://…" />
      <Input as="select" label="Platform" value={data.platform} onChange={set('platform')}>
        {MUSIC_PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
      </Input>
      <Input as="textarea" rows={3} label="Why it matters" value={data.description} onChange={set('description')} />
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
        <Button type="button" variant="ghost" onClick={onDone}>Cancel</Button>
        <Button type="submit" variant="primary" loading={saving}>Save</Button>
      </div>
    </form>
  )
}
