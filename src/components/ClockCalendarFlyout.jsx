import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { buildCalendarGrid } from '../utils/calendarGrid.js'
import { useSystemSettings } from '../context/SystemSettingsContext.jsx'
import { accentColors } from '../data/accentColors.js'
import { useIsMobile } from '../hooks/useIsMobile.js'

const WEEKDAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

const panelMotion = {
  initial: { opacity: 0, y: 12, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 12, scale: 0.96 },
  transition: { duration: 0.2, ease: 'easeOut' },
}

function formatBigTime(date) {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  })
}

function formatFullDate(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function ClockCalendarFlyout({ now }) {
  const isMobile = useIsMobile()
  const { accentColor } = useSystemSettings()
  const accentHex = accentColors.find((c) => c.id === accentColor)?.hex
  const [viewedMonth, setViewedMonth] = useState(() => ({
    year: now.getFullYear(),
    month: now.getMonth(),
  }))

  const todayKey = now.toDateString()
  const cells = useMemo(
    () =>
      buildCalendarGrid(
        viewedMonth.year,
        viewedMonth.month,
        new Date(todayKey),
      ),
    [viewedMonth.year, viewedMonth.month, todayKey],
  )

  function goToPrevMonth() {
    setViewedMonth(({ year, month }) => {
      const d = new Date(year, month - 1, 1)
      return { year: d.getFullYear(), month: d.getMonth() }
    })
  }

  function goToNextMonth() {
    setViewedMonth(({ year, month }) => {
      const d = new Date(year, month + 1, 1)
      return { year: d.getFullYear(), month: d.getMonth() }
    })
  }

  const monthLabel = new Date(
    viewedMonth.year,
    viewedMonth.month,
    1,
  ).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  return (
    <motion.div
      {...panelMotion}
      style={{ transformOrigin: isMobile ? 'bottom' : 'bottom right' }}
      className={
        isMobile
          ? 'absolute inset-x-0 bottom-full mb-0 border border-white/10 bg-[#1f1f1f]/95 p-6 text-white shadow-2xl backdrop-blur-md'
          : 'absolute bottom-full right-0 w-[480px] border border-white/10 bg-[#1f1f1f]/95 p-6 text-white shadow-2xl backdrop-blur-md'
      }
    >
      <div className="text-4xl font-light">{formatBigTime(now)}</div>
      <div className="text-base text-white/70">{formatFullDate(now)}</div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-base font-semibold">{monthLabel}</span>
        <div className="flex flex-col">
          <button
            type="button"
            onClick={goToPrevMonth}
            aria-label="Previous month"
            className="flex h-5 w-7 items-center justify-center text-sm text-white/60 hover:text-white"
          >
            ▲
          </button>
          <button
            type="button"
            onClick={goToNextMonth}
            aria-label="Next month"
            className="flex h-5 w-7 items-center justify-center text-sm text-white/60 hover:text-white"
          >
            ▼
          </button>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-7 text-center text-sm text-white/50">
        {WEEKDAY_LABELS.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-1 text-center text-base">
        {cells.map((cell) => (
          <div
            key={cell.date.toISOString()}
            className={`flex items-center justify-center rounded-md py-1.5 ${
              cell.isCurrentMonth ? 'text-white' : 'text-white/30'
            }`}
            style={
              cell.isToday
                ? { outline: `2px solid ${accentHex}`, outlineOffset: '-2px' }
                : undefined
            }
          >
            {cell.day}
          </div>
        ))}
      </div>

      <div className="mt-4 border-t border-white/10 pt-3">
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold">Today</span>
          <button
            type="button"
            aria-label="Add event (not implemented)"
            className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-white/10"
          >
            +
          </button>
        </div>
        <p className="mt-2 flex items-center gap-2 text-sm text-white/60">
          <span aria-hidden="true">📅</span>
          Set up your calendars to see where you need to be
        </p>
      </div>
    </motion.div>
  )
}

export default ClockCalendarFlyout
