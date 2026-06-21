import { lazy, Suspense } from 'react'
import 'react-quill-new/dist/quill.snow.css'

const ReactQuill = lazy(() => import('react-quill-new'))

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'blockquote'],
    ['clean'],
  ],
}

export default function RichTextEditor({ value, onChange, placeholder = 'Pour your thoughts…' }) {
  return (
    <Suspense fallback={<div className="textarea" style={{ minHeight: 200 }}>Loading editor…</div>}>
      <div className="glass" style={{ padding: 4 }}>
        <ReactQuill theme="snow" value={value || ''} onChange={onChange} modules={modules} placeholder={placeholder} />
      </div>
    </Suspense>
  )
}
