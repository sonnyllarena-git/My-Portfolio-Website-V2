import { describe, it, expect } from 'vitest'
import { buildCalendarGrid } from './calendarGrid.js'

describe('buildCalendarGrid', () => {
  it('pads a month that does not start on Sunday with leading and trailing days', () => {
    const today = new Date(2026, 7, 25)
    const cells = buildCalendarGrid(2026, 7, today)

    expect(cells).toHaveLength(42)
    expect(cells[0]).toMatchObject({ day: 26, isCurrentMonth: false })
    expect(cells[6]).toMatchObject({ day: 1, isCurrentMonth: true })
    expect(cells[30]).toMatchObject({
      day: 25,
      isCurrentMonth: true,
      isToday: true,
    })
    expect(cells[41]).toMatchObject({ day: 5, isCurrentMonth: false })
  })

  it('adds zero leading days for a month that starts on Sunday', () => {
    const cells = buildCalendarGrid(2026, 10, new Date(2026, 7, 25))

    expect(cells[0]).toMatchObject({ day: 1, isCurrentMonth: true })
    expect(cells[30]).toMatchObject({ day: 1, isCurrentMonth: false })
  })
})
