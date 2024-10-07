import type { Todo } from '../types/Todo';

export function sortByPriority(todos: Todo[]) {
  const priorityOrder = { critical: 1, moderate: 2, optional: 3, none: 4 };
  return todos.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
}
