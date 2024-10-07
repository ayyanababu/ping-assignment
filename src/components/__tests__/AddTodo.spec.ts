import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import AddTodo from '../molecules/AddTodo.vue' // Adjust path based on your project

describe('AddTodo.vue', () => {
  test('renders input and add button', () => {
    const wrapper = mount(AddTodo)

    // Check if the input field is rendered
    const input = wrapper.find('[data-testid="todo-input-title"]')
    expect(input.exists()).toBe(true)

    // Check if the add button is rendered
    const button = wrapper.find('[data-testid="add-todo-button"]')
    expect(button.exists()).toBe(true)

    const textArea = wrapper.find('[data-testid="todo-input-description"]')
    expect(textArea.exists()).toBe(true)
  })

  test('adds text to text area for description', async () => {
    const wrapper = mount(AddTodo)

    // Find the text area for description and add text
    const descriptionInput = wrapper.find('[data-testid="todo-input-description"]')
    await descriptionInput.setValue('Test Task Description')

    // Check if the value is correctly set
    expect(descriptionInput.element.value).toBe('Test Task Description')
  })

  test.skip('adds a todo by invoking submitTodo method directly', async () => {
    const wrapper = mount(AddTodo)

    // Set the necessary input values
    await wrapper.setData({
      newTodo: {
        title: 'TestTask',
        description: 'Test Task Description',
        priority: 'moderate',
        isCompleted: false,
        subtasks: []
      }
    })

    // Call submitTodo directly
    await wrapper.vm.submitTodo()

    // Check if the 'addTodo' event is emitted with the correct payload
    expect(wrapper.emitted('addTodo')).toBeTruthy()
    expect(wrapper.emitted('addTodo')[0]).toEqual([
      {
        title: 'TestTask',
        description: 'Test Task Description',
        priority: 'moderate',
        isCompleted: false,
        timestamp: expect.any(Number), // We can't predict the exact timestamp
        subtasks: []
      }
    ])
  })
})
