import React, { useState } from 'react'
import useStore from './store'
import Category from './components/Category'
import Sidebar from './components/Sidebar'
import SearchBar from './components/SearchBar'

export default function App(){
  const categories = useStore(s => s.dashboard.categories)
  const addCategory = useStore(s => s.addCategory)
  const [query, setQuery] = useState('')
  const [showSidebar, setShowSidebar] = useState(true)

  return (
    <div className="app">
      <header>
        <h1>Dynamic Dashboard</h1>
        <div className="header-actions">
          <SearchBar query={query} setQuery={setQuery} />
          <button onClick={() => setShowSidebar(s => !s)}>{showSidebar ? 'Hide' : 'Show'} Sidebar</button>
          <button onClick={() => addCategory({ title: 'New Category', id: 'cat-' + Date.now(), widgets: []})}>+ Add Category</button>
        </div>
      </header>
      <div className="main">
        {showSidebar && <Sidebar />}
        <div className="categories">
          {categories.map(cat => (
            <Category key={cat.id} category={cat} searchQuery={query} />
          ))}
        </div>
      </div>
    </div>
  )
}
