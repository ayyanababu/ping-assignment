import { mount } from '@vue/test-utils'
import NoTodo from '../molecules/NoTodo.vue'
import { describe, it, expect } from 'vitest'

describe('NoTodo.vue', () => {
  it('renders "No tasks added" text when no name prop is passed', () => {
    const wrapper = mount(NoTodo)
    expect(wrapper.text()).toContain('No tasks added')
  })

  it('renders "Take nap" text when no name prop is passed', () => {
    const wrapper = mount(NoTodo)
    expect(wrapper.text()).toContain('Take nap')
  })

  it('renders cat image when no name prop is passed', () => {
    const wrapper = mount(NoTodo)
    expect(wrapper.find('img').exists()).toBe(true)
  })

  it('renders "No tasks added in {name}" when name prop is passed', () => {
    const wrapper = mount(NoTodo, {
      props: {
        name: 'Work'
      }
    })
    expect(wrapper.text()).toContain('No tasks added in Work')
  })

  it('does not render "Take nap" text when name prop is passed', () => {
    const wrapper = mount(NoTodo, {
      props: {
        name: 'Work'
      }
    })
    expect(wrapper.text()).not.toContain('Take nap')
  })

  it('does not render cat image when name prop is passed', () => {
    const wrapper = mount(NoTodo, {
      props: {
        name: 'Work'
      }
    })
    expect(wrapper.find('img').exists()).toBe(false)
  })
})
