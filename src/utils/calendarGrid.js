function isSameDate(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function buildCalendarGrid(year, month, today = new Date()) {
  const firstOfMonth = new Date(year, month, 1)
  const leadingDays = firstOfMonth.getDay()
  const startDate = new Date(year, month, 1 - leadingDays)

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + index,
    )
    return {
      date,
      day: date.getDate(),
      isCurrentMonth: date.getMonth() === month,
      isToday: isSameDate(date, today),
    }
  })
}
