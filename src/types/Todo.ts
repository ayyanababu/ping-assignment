import { PRIORITY } from '@/utils/consts'

export type PriorityVal = (typeof PRIORITY)[keyof typeof PRIORITY]

interface Repeat {
  interval: 'daily' | 'weekly' | 'monthly'
  nextOccurance: Date
}

interface Attachment {
  type: string
  url: string
}
export interface BaseTodo {
  title: string
  description: string
  priority: PriorityVal
  isCompleted?: boolean
  timestamp: number
  id: number
  repeat?: Repeat
  attachments?: Attachment[]
}
export interface Todo extends BaseTodo {
  subtasks?: BaseTodo[]
}

export interface GroupedTodo extends Todo {
  todoIndex: number
}

export type ViewType = 'List' | 'Grid'

export type GroupType = 'Status' | 'Priority'
