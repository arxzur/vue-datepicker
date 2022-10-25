import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import CalendarMonth from '../CalendarMonth.vue'

describe('CalendarMonth', () => {
  it('renders event button text properly', () => {
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

  // props
  // events emmitting
  // snapshot

})
