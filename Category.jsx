import React, { useState } from 'react'
import useStore from '../store'
import Widget from './Widget'

export default function Category({ category, searchQuery }){
  const addWidget = useStore(s => s.addWidget)
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [text, setText] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if(!name) return
    addWidget(category.id, name, text || 'Placeholder text')
    setName(''); setText(''); setShowForm(false)
  }

  const filtered = category.widgets.filter(w => {
    if(!searchQuery) return true
    const q = searchQuery.toLowerCase()
    return w.name.toLowerCase().includes(q) || w.text.toLowerCase().includes(q)
  })

  return (
    <section className="category">
      <div className="category-header">
        <h2>{category.title}</h2>
        <div>
          <button onClick={() => setShowForm(s => !s)}>+ Add Widget</button>
        </div>
      </div>

      {showForm && (
        <form className="add-form" onSubmit={submit}>
          <input placeholder="Widget name" value={name} onChange={e=>setName(e.target.value)} />
          <input placeholder="Widget text" value={text} onChange={e=>setText(e.target.value)} />
          <button type="submit">Add</button>
        </form>
      )}

      <div className="widgets">
        {filtered.length === 0 && <div className="empty">No widgets match your search.</div>}
        {filtered.map(w => <Widget key={w.id} widget={w} categoryId={category.id} />)}
      </div>
    </section>
  )
}
