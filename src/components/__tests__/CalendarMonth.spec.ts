import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import CalendarMonth from '../CalendarMonth.vue'

describe('CalendarMonth', () => {
  const wrapper = mount(CalendarMonth, {
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

  // props
  // events emmitting

})
