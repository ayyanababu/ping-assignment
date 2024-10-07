import { PRIORITY } from '@/utils/consts'

export type PriorityVal = (typeof PRIORITY)[keyof typeof PRIORITY]

export interface BaseTodo {
  title: string
  description: string
  priority: PriorityVal
  isCompleted?: boolean
  timestamp: number
  id: number
}
export interface Todo extends BaseTodo {
  subtasks?: BaseTodo[]
}

export interface GroupedTodo extends Todo {
  todoIndex: number
}

export type ViewType = 'List' | 'Grid'

export type GroupType = 'Status' | 'Priority'
