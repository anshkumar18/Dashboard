import React from 'react'
import useStore from '../store'

export default function Widget({ widget, categoryId }){
  const removeWidget = useStore(s => s.removeWidget)

  return (
    <div className="widget">
      <button className="remove" onClick={() => removeWidget(categoryId, widget.id)}>✖</button>
      <h3>{widget.name}</h3>
      <p>{widget.text}</p>
    </div>
  )
}
