import type { GroupedTodo, Todo } from '../types/Todo'
import { PRIORITY } from '@/utils/consts'

export function groupTodosByPriority(todos: Todo[]) {
  return Object.values(PRIORITY)
    .map((priority) => {
      const todosWithPriority = todos.filter((todo) => todo.priority === priority)

      return {
        name: priority,
        todos: todosWithPriority.map((todo, index) => ({ ...todo, todoIndex: index }))
      }
    })
    .filter((priorityObject) => priorityObject.todos.length > 0)
}

export function groupTodosByStatus(todos: Todo[]) {
  const PRIORITY_ORDER = {
    critical: 1,
    moderate: 2,
    optional: 3,
    none: 4
  }

  const remaining = todos
    .filter((todo) => !todo.isCompleted)
    .map((todo, index) => ({ ...todo, todoIndex: index }))

  const completed = todos
    .filter((todo) => todo.isCompleted)
    .map((todo, index) => ({ ...todo, todoIndex: index }))

  const result = []

  if (remaining.length > 0) {
    result.push({
      name: 'In Progress',
      todos: remaining
    })
  }

  if (completed.length > 0) {
    result.push({
      name: 'Completed',
      todos: completed
    })
  }

  return result
}
