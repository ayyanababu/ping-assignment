const TODO_KEY = 'todos'

export default {
  getAllTodos() {
    try {
      return JSON.parse(localStorage.getItem(TODO_KEY) || '{}')
    } catch (error) {
      console.error('Failed to parse todos from localStorage:', error)
      return {}
    }
  },

  getTodos() {
    const todayDataStr = new Date().toDateString()
    try {
      const allTodos = JSON.parse(localStorage.getItem(TODO_KEY) || '{}')
      return allTodos[todayDataStr] || []
    } catch (error) {
      console.error('Failed to parse todos from localStorage:', error)
      return []
    }
  },

  saveTodos(todos: Array<any>) {
    const todayDataStr = new Date().toDateString()
    let allTodos
    try {
      allTodos = JSON.parse(localStorage.getItem(TODO_KEY) || '{}')
    } catch (error) {
      console.error('Failed to parse todos from localStorage:', error)
      allTodos = {}
    }
    allTodos = {
      ...allTodos,
      [todayDataStr]: todos
    }
    try {
      localStorage.setItem(TODO_KEY, JSON.stringify(allTodos))
    } catch (error) {
      console.error('Failed to save todos to localStorage:', error)
    }
  },
  clearTodos() {
    localStorage.removeItem(TODO_KEY)
  }
}
