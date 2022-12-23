import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import VueDatepicker from '../VueDatepicker.vue'

describe('CalendarMonth', () => {
  const wrapper = mount(VueDatepicker, {
    global: {
      stubs: {
        FontAwesomeIcon: true
      }
    },
    props: { eventButtonName: 'My event button text' }
  })

  it('renders all calendar buttons', () => {
    expect(wrapper.findAll('button')).toHaveLength(42)
  })
  it('renders event button text', () => {
    expect(wrapper.text()).toContain('My event button text')
  })
  it('emits event on button click', async () => {
    await wrapper.find('#event-button').trigger('click')

    expect(wrapper.emitted('addEvent')).toBeTruthy()
  })
})
