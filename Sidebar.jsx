import React from 'react'
import useStore from '../store'

export default function Sidebar(){
  const categories = useStore(s => s.dashboard.categories)
  // Build a master list of widgets (unique by id)
  const widgetsMap = {}
  categories.forEach(cat => {
    cat.widgets.forEach(w => widgetsMap[w.id] = w)
  })
  const widgets = Object.values(widgetsMap)

  const toggle = useStore(s => s.toggleWidgetInCategory)

  return (
    <aside className="sidebar">
      <h3>All Widgets</h3>
      {widgets.length === 0 && <div>No widgets available.</div>}
      <ul>
        {widgets.map(w => (
          <li key={w.id}>
            <strong>{w.name}</strong>
            <div className="actions">
              {categories.map(cat => {
                const checked = !!cat.widgets.find(x => x.id === w.id)
                return (
                  <label key={cat.id}>
                    <input type="checkbox" checked={checked} onChange={e=>toggle(cat.id, w, e.target.checked)} />
                    {cat.title}
                  </label>
                )
              })}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  )
}
