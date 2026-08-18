import { motion } from 'framer-motion'

const BAR_COUNT = 24

function peakHeight(index) {
  return 30 + Math.abs(Math.sin(index * 0.7)) * 70
}

function MusicWave({ isPlaying }) {
  return (
    <div className="flex h-24 items-center justify-center gap-1.5">
      {Array.from({ length: BAR_COUNT }).map((_, index) => {
        const peak = peakHeight(index)
        return (
          <motion.div
            key={index}
            className="w-1.5 rounded-full bg-emerald-400"
            animate={
              isPlaying
                ? { height: [`${peak * 0.25}%`, `${peak}%`, `${peak * 0.25}%`] }
                : { height: '18%' }
            }
            transition={
              isPlaying
                ? {
                    duration: 0.6 + (index % 5) * 0.15,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: (index % 4) * 0.1,
                  }
                : { duration: 0.3 }
            }
          />
        )
      })}
    </div>
  )
}

export default MusicWave
