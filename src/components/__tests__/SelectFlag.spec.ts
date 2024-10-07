// test/unit/SelectFlag.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SelectFlag from '../atoms/SelectFlag.vue'
import { PRIORITY, PRIORITY_COLOR } from '../../utils/consts'

describe('SelectFlag.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(SelectFlag, {
      props: {
        priority: 'high'
      }
    })

    expect(wrapper.exists()).toBe(true)
  })

  it('receives props correctly', () => {
    const wrapper = mount(SelectFlag, {
      props: {
        priority: 'high'
      }
    })

    expect(wrapper.props().priority).toBe('high')
  })

  it('emits update:priority event when priority is changed', async () => {
    const wrapper = mount(SelectFlag, {
      props: {
        priority: 'high'
      }
    })

    await wrapper.vm.$emit('update:priority', 'low')

    expect(wrapper.emitted()).toHaveProperty('update:priority')
    expect(wrapper.emitted()['update:priority']).toEqual([['low']])
  })
})
