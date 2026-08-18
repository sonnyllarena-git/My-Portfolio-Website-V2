import { motion } from 'framer-motion'

const PREVIEW_WIDTH = 200
const PREVIEW_HEIGHT = 130

function TaskbarPreview({ label, content, naturalWidth, naturalHeight }) {
  const scale = content ? PREVIEW_WIDTH / naturalWidth : 1

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.12 }}
      className="pointer-events-none absolute bottom-full left-1/2 mb-2 w-[200px] -translate-x-1/2 overflow-hidden rounded-md border border-white/10 bg-[#1f2126] shadow-xl"
    >
      <div className="truncate border-b border-white/10 px-2 py-1 text-xs text-white/80">
        {label}
      </div>
      {content && (
        <div
          className="overflow-hidden bg-[#1a1c22]"
          style={{ height: PREVIEW_HEIGHT }}
        >
          <div
            style={{
              width: naturalWidth,
              height: naturalHeight,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
          >
            {content}
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default TaskbarPreview
