import { motion } from 'framer-motion'
import { ContactCardBody } from './ContactProfileModal.jsx'

function ContactModalLayer({ icon, anchor, onClose }) {
  const startLeft = anchor?.x ?? '50%'
  const startTop = anchor?.y ?? '50%'

  return (
    <motion.div
      onClick={onClose}
      onContextMenu={(e) => e.stopPropagation()}
      initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
      animate={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
      exit={{ backgroundColor: 'rgba(0,0,0,0)' }}
      className="fixed inset-0 z-50"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{
          left: startLeft,
          top: startTop,
          x: '-50%',
          y: '-50%',
          scale: 0.15,
          opacity: 0.4,
        }}
        animate={{
          left: '50%',
          top: '50%',
          x: '-50%',
          y: '-50%',
          scale: 1,
          opacity: 1,
        }}
        exit={{
          left: startLeft,
          top: startTop,
          x: '-50%',
          y: '-50%',
          scale: 0.15,
          opacity: 0,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        className="fixed w-full max-w-sm rounded-lg border border-white/10 bg-[#0d0e11] text-white shadow-2xl"
      >
        <ContactCardBody icon={icon} onClose={onClose} />
      </motion.div>
    </motion.div>
  )
}

export default ContactModalLayer
