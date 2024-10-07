import { mount } from '@vue/test-utils'
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import TodoList from '../TodoList.vue'
import LocalStorageService from '../../services//LocalStorageService'

describe.skip('TodoList.vue', () => {
  let todosMock = [
    {
      id: 1,
      title: 'Todo 1',
      isCompleted: false,
      priority: 'low'
    },
    {
      id: 2,
      title: 'Todo 2',
      isCompleted: true,
      priority: 'high'
    }
  ]

  beforeEach(() => {
    // Mock localStorage methods
    vi.spyOn(LocalStorageService, 'getTodos').mockReturnValue(todosMock)
    vi.spyOn(LocalStorageService, 'saveTodos').mockImplementation((todos) => {
      todosMock = todos
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  test('loads todos from localStorage', () => {
    const wrapper = mount(TodoList)

    // console.log('Rendered Todos:', wrapper.html()) // Log the rendered HTML

    // Check that the todo list is rendered with items from localStorage
    const todoItems = wrapper.findAll('[data-testid^="todo-item-"]')
    console.log('Rendered Todos:', todoItems) // Log the rendered HTML

    expect(todoItems.length).toBe(2)
    expect(todoItems[0].text()).toContain('Todo 1')
    expect(todoItems[1].text()).toContain('Todo 2')
  })

  //   test('adds a new todo and saves it to localStorage', async () => {
  //     const wrapper = mount(TodoList)

  //     // Simulate adding a new todo
  //     const newTodoTitle = 'New Todo'
  //     const input = wrapper.find('[data-testid="todo-input"]')
  //     await input.setValue(newTodoTitle)

  //     const addButton = wrapper.find('[data-testid="add-todo-button"]')
  //     await addButton.trigger('click')

  //     // Check if the new todo item is added to the list
  //     const todoItems = wrapper.findAll('[data-testid^="todo-item-"]')
  //     expect(todoItems.length).toBe(3) // 2 initial + 1 new

  //     // Ensure the new todo is saved to localStorage
  //     expect(LocalStorageService.saveTodos).toHaveBeenCalled()
  //     expect(todosMock.length).toBe(3)
  //     expect(todosMock[2].title).toBe(newTodoTitle)
  //   })

  //   test('toggles the completion status of a todo and saves it to localStorage', async () => {
  //     const wrapper = mount(TodoList)

  //     // Simulate toggling the first todo's completion status
  //     const firstTodoCheckbox = wrapper.find('[data-testid="todo-item-checkbox-0"]')
  //     await firstTodoCheckbox.setValue(true)

  //     // Check if the 'toggleCompleted' event is emitted and localStorage is updated
  //     expect(LocalStorageService.saveTodos).toHaveBeenCalled()
  //     expect(todosMock[0].isCompleted).toBe(true)
  //   })

  //   test('removes a todo and updates localStorage', async () => {
  //     const wrapper = mount(TodoList)

  //     // Simulate removing the first todo
  //     const removeButton = wrapper.find('[data-testid="remove-todo-button-0"]')
  //     await removeButton.trigger('click')

  //     // Check if the todo list is updated and localStorage is updated
  //     expect(todosMock.length).toBe(1) // 1 item removed
  //     expect(todosMock[0].title).toBe('Todo 2')
  //     expect(LocalStorageService.saveTodos).toHaveBeenCalled()
  //   })
})
