import React from 'react'

export default function SearchBar({ query, setQuery }){
  return (
    <input
      className="search"
      placeholder="Search widgets..."
      value={query}
      onChange={e=>setQuery(e.target.value)}
    />
  )
}
