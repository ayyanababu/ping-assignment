import { mount } from '@vue/test-utils'
import TodoItem from '@/components/TodoItem.vue'
import { describe, expect, test, vi } from 'vitest'

// Mocking the PRIORITY_COLOR constant
vi.mock('@/utils/consts', () => ({
  PRIORITY_COLOR: {
    critical: '#ff0000',
    moderate: '#ffa500',
    none: '#00ff00'
  }
}))

describe('TodoItem.vue', () => {
  const todoMock = {
    title: 'TestTask',
    description: 'Test Task Description',
    priority: 'moderate',
    isCompleted: false,
    timestamp: 1728272753334,
    subtasks: [
      {
        title: 'Subtask1',
        isCompleted: false,
        priority: 'critical',
        timestamp: 1728272750000
      }
    ]
  }

  test('renders todo item with correct details', () => {
    const wrapper = mount(TodoItem, {
      props: {
        todo: todoMock
      }
    })

    // Verify that the title is rendered
    expect(wrapper.text()).toContain('TestTask')

    // Verify that the priority color is applied
    const div = wrapper.find('div[data-priority="moderate"]')
    expect(div.exists()).toBe(true)

    // Check the accordion icon is initially down
    const accordionIcon = wrapper.find('[data-testid="accordion-icon"]')
    expect(accordionIcon.classes()).toContain('pi-chevron-down')
  })

  test('removes the task when the remove button is clicked', async () => {
    const wrapper = mount(TodoItem, {
      props: {
        todo: todoMock
      }
    })

    const removeButton = wrapper.find('[data-testid="remove-TestTask"]')
    expect(removeButton.exists()).toBe(true)

    // Simulate click on the remove button
    await removeButton.trigger('click')

    // Assert that the event 'removeItem' was emitted
    expect(wrapper.emitted()).toHaveProperty('removeItem')
  })

  test('shows edit dialog when edit button is clicked', async () => {
    const wrapper = mount(TodoItem, {
      props: {
        todo: todoMock
      }
    })

    // Simulate hover by manually removing the 'invisible' class
    const todoItem = wrapper.find('[data-testid="todo-item"]')
    todoItem.element.classList.add('group-hover:visible')

    // Now find the edit button, which should be visible after the hover simulation
    const editButton = wrapper.find('[data-testid="edit-button"]')
    expect(editButton.exists()).toBe(true)

    // Simulate click on the edit button
    await editButton.trigger('click')

    // Assert that the event 'showEditDialog' was emitted
    expect(wrapper.emitted()).toHaveProperty('showEditDialog')
  })

  test('renders subtasks correctly and toggles them', async () => {
    const wrapper = mount(TodoItem, {
      props: {
        todo: todoMock
      }
    })

    // Simulate opening the accordion
    const accordionIcon = wrapper.find('[data-testid="accordion-icon"]')
    await accordionIcon.trigger('click')
    expect(wrapper.vm.isOpen).toBe(true)

    // Check if subtask is rendered
    const subtaskLabel = wrapper.find('[data-testid="subtask-Subtask1"]')
    expect(subtaskLabel.exists()).toBe(true)
    expect(subtaskLabel.text()).toBe('Subtask1')

    // Simulate checking the checkbox for subtask completion
    const subtaskCheckbox = wrapper.findAllComponents({ name: 'Checkbox' }).at(1) // Ensure you are selecting the right checkbox for the subtask
    await subtaskCheckbox.setValue(true)

    console.log('Subtask Classes:', subtaskLabel.classes(), subtaskLabel.element.classList)
    console.log('Subtask Data After Checkbox Click:', wrapper.vm.todo.subtasks)
    await wrapper.vm.$nextTick()

    // Ensure the checkbox is checked and line-through class is applied
    expect(subtaskLabel.classes()).toContain('line-through')
  })
})
