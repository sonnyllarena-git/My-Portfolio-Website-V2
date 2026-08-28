import { useState } from 'react'
import { motion } from 'framer-motion'

const BAR_COUNT = 24
const SETTLE_DURATION = 1.2
const STAGGER_STEP = 0.013

const NAMED_COLORS = {
  teal: '#14b8a6',
  red: '#ef4444',
  blue: '#3b82f6',
  pink: '#ec4899',
  white: '#ffffff',
  orange: '#f97316',
  purple: '#a855f7',
}

function peakHeight(index) {
  return 30 + Math.abs(Math.sin(index * 0.7)) * 70
}

function barColor(index, colorMode) {
  const named = NAMED_COLORS[colorMode]
  if (named) return named
  const hue = (index / BAR_COUNT) * 300
  return `hsl(${hue}, 85%, 60%)`
}

function Bar({ index, isPlaying, peak, colorMode }) {
  const [isSettled, setIsSettled] = useState(false)
  const [prevIsPlaying, setPrevIsPlaying] = useState(isPlaying)
  const delay = index * STAGGER_STEP
  const style = { backgroundColor: barColor(index, colorMode) }

  if (isPlaying !== prevIsPlaying) {
    setPrevIsPlaying(isPlaying)
    if (!isPlaying) setIsSettled(false)
  }

  if (!isPlaying) {
    return (
      <motion.div
        className="w-1.5 rounded-full"
        style={style}
        animate={{ height: '0%' }}
        transition={{ duration: SETTLE_DURATION, ease: 'easeInOut', delay }}
      />
    )
  }

  if (!isSettled) {
    return (
      <motion.div
        className="w-1.5 rounded-full"
        style={style}
        animate={{ height: `${peak}%` }}
        transition={{ duration: SETTLE_DURATION, ease: 'easeInOut', delay }}
        onAnimationComplete={() => setIsSettled(true)}
      />
    )
  }

  return (
    <motion.div
      className="w-1.5 rounded-full"
      style={style}
      animate={{ height: [`${peak * 0.25}%`, `${peak}%`, `${peak * 0.25}%`] }}
      transition={{
        duration: 0.6 + (index % 5) * 0.15,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: (index % 4) * 0.1,
      }}
    />
  )
}

function MusicWave({ isPlaying, volume = 100, colorMode = 'rainbow' }) {
  const volumeScale = Math.max(0, Math.min(100, volume)) / 100
  return (
    <div className="flex h-24 items-center justify-center gap-1.5">
      {Array.from({ length: BAR_COUNT }).map((_, index) => (
        <Bar
          key={index}
          index={index}
          isPlaying={isPlaying}
          peak={peakHeight(index) * volumeScale}
          colorMode={colorMode}
        />
      ))}
    </div>
  )
}

export default MusicWave
