import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import CalendarMonth from '../CalendarMonth.vue'

describe('CalendarMonth', () => {
  it('renders all calendar buttons', () => {
    const wrapper = mount(CalendarMonth, {
      global: {
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })

    expect(wrapper.findAll('button')).toHaveLength(42)
  })
  it('renders event button text', () => {
    const wrapper = mount(CalendarMonth, {
      global: {
        stubs: {
          FontAwesomeIcon: true
        }
      },
      props: { eventButtonName: 'Hello Vitest' }
    })

    expect(wrapper.text()).toContain('Hello Vitest')
  })

  // snapshot
  // before each
  // props
  // events emmitting

})
