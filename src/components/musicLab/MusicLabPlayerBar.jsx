import ShuffleIcon from '../icons/ShuffleIcon.jsx'
import PreviousIcon from '../icons/PreviousIcon.jsx'
import NextIcon from '../icons/NextIcon.jsx'
import RepeatIcon from '../icons/RepeatIcon.jsx'
import PlayIcon from '../icons/PlayIcon.jsx'
import PauseIcon from '../icons/PauseIcon.jsx'
import CastIcon from '../icons/CastIcon.jsx'
import SpeakerIcon from '../icons/SpeakerIcon.jsx'
import CloseIcon from '../icons/CloseIcon.jsx'
import { useIsMobile } from '../../hooks/useIsMobile.js'

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

function MusicLabPlayerBar({
  activeItem,
  activeType,
  isPlaying,
  onTogglePlay,
  onPrev,
  onNext,
  isShuffleOn,
  onToggleShuffle,
  isRepeatOn,
  onToggleRepeat,
  currentTime,
  duration,
  onSeek,
  volume,
  onVolumeChange,
  onClose,
}) {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <div className="flex items-center gap-3 border-t border-white/10 bg-[#0d0e11] px-3 py-2 text-white">
        {activeItem?.thumbnailSrc ? (
          <img
            src={activeItem.thumbnailSrc}
            alt=""
            className="h-9 w-9 shrink-0 rounded object-cover"
          />
        ) : (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-white/10 text-lg">
            {activeType === 'video' ? '🎬' : '🎵'}
          </div>
        )}
        <div className="min-w-0 flex-1 truncate text-sm font-medium">
          {activeItem?.title ?? 'Nothing playing'}
        </div>
        <button
          onClick={onPrev}
          aria-label="Previous"
          className="text-white/70 hover:text-white"
        >
          <PreviousIcon className="h-5 w-5" />
        </button>
        <button
          onClick={onTogglePlay}
          disabled={!activeItem}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-black disabled:opacity-40"
        >
          {isPlaying ? (
            <PauseIcon className="h-4 w-4" />
          ) : (
            <PlayIcon className="ml-0.5 h-4 w-4" />
          )}
        </button>
        <button
          onClick={onNext}
          aria-label="Next"
          className="text-white/70 hover:text-white"
        >
          <NextIcon className="h-5 w-5" />
        </button>
        <button
          onClick={onClose}
          aria-label="Close now playing"
          className="text-white/50 hover:text-white"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4 border-t border-white/10 bg-[#0d0e11] px-4 py-3 text-white">
      <div className="flex w-56 shrink-0 items-center gap-3">
        {activeItem?.thumbnailSrc ? (
          <img
            src={activeItem.thumbnailSrc}
            alt=""
            className="h-10 w-10 rounded object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded bg-white/10 text-lg">
            {activeType === 'video' ? '🎬' : '🎵'}
          </div>
        )}
        <div className="min-w-0">
          <div className="truncate text-sm font-medium">
            {activeItem?.title ?? 'Nothing playing'}
          </div>
          <div className="truncate text-xs text-white/50">
            {activeItem ? activeItem.album : '—'}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center gap-1">
        <div className="flex items-center gap-5">
          <button
            onClick={onToggleShuffle}
            aria-label="Shuffle"
            className={
              isShuffleOn ? 'text-[#1ed760]' : 'text-white/60 hover:text-white'
            }
          >
            <ShuffleIcon className="h-4 w-4" />
          </button>
          <button
            onClick={onPrev}
            aria-label="Previous"
            className="text-white/70 hover:text-white"
          >
            <PreviousIcon className="h-5 w-5" />
          </button>
          <button
            onClick={onTogglePlay}
            disabled={!activeItem}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black disabled:opacity-40"
          >
            {isPlaying ? (
              <PauseIcon className="h-4 w-4" />
            ) : (
              <PlayIcon className="ml-0.5 h-4 w-4" />
            )}
          </button>
          <button
            onClick={onNext}
            aria-label="Next"
            className="text-white/70 hover:text-white"
          >
            <NextIcon className="h-5 w-5" />
          </button>
          <button
            onClick={onToggleRepeat}
            aria-label="Repeat"
            className={
              isRepeatOn ? 'text-[#1ed760]' : 'text-white/60 hover:text-white'
            }
          >
            <RepeatIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="flex w-full max-w-xl items-center gap-2 text-xs text-white/50">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={Math.min(currentTime, duration || 0)}
            onChange={(e) => onSeek(Number(e.target.value))}
            className="h-1 flex-1 accent-[#1ed760]"
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex w-40 shrink-0 items-center justify-end gap-3">
        <span className="text-white/60">
          <CastIcon className="h-4 w-4" />
        </span>
        <span className="text-white/60">
          <SpeakerIcon className="h-4 w-4" />
        </span>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => onVolumeChange(Number(e.target.value))}
          className="h-1 w-20 accent-[#1ed760]"
        />
        <button
          onClick={onClose}
          aria-label="Close now playing"
          className="text-white/50 hover:text-white"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export default MusicLabPlayerBar
