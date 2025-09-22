import create from 'zustand'

const initial = {
  dashboard: {
    title: 'Assignment Dashboard',
    categories: [
      {
        id: 'cspm-exec',
        title: 'CSPM Executive Dashboard',
        widgets: [
          { id: 'w-1', name: 'Security Score', text: 'Shows overall cloud security score.' },
          { id: 'w-2', name: 'Compliance Summary', text: 'Shows compliance trend over time.' }
        ]
      },
      {
        id: 'cloud-overview',
        title: 'Cloud Overview',
        widgets: [
          { id: 'w-3', name: 'Cloud Inventory', text: 'Shows cloud resources (dummy data).' }
        ]
      }
    ]
  }
}

const useStore = create(set => ({
  ...initial,
  addWidget: (categoryId, name, text) => set(state => {
    const cat = state.dashboard.categories.find(c => c.id === categoryId)
    if(!cat) return state
    const newWidget = { id: 'w-' + Date.now(), name, text }
    cat.widgets = [...cat.widgets, newWidget]
    return { ...state }
  }),
  removeWidget: (categoryId, widgetId) => set(state => {
    const cat = state.dashboard.categories.find(c => c.id === categoryId)
    if(!cat) return state
    cat.widgets = cat.widgets.filter(w => w.id !== widgetId)
    return { ...state }
  }),
  toggleWidgetInCategory: (categoryId, widget, checked) => set(state => {
    const cat = state.dashboard.categories.find(c => c.id === categoryId)
    if(!cat) return state
    if(checked){
      // add if not present
      if(!cat.widgets.find(w => w.id === widget.id)){
        cat.widgets = [...cat.widgets, widget]
      }
    } else {
      cat.widgets = cat.widgets.filter(w => w.id !== widget.id)
    }
    return { ...state }
  }),
  addCategory: (category) => set(state => {
    state.dashboard.categories = [...state.dashboard.categories, category]
    return { ...state }
  })
}))

export default useStore
