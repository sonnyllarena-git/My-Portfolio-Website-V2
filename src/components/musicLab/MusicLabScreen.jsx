import MusicWave from './MusicWave.jsx'
import PlayIcon from '../icons/PlayIcon.jsx'
import PauseIcon from '../icons/PauseIcon.jsx'

function MusicLabScreen({
  activeType,
  activeItem,
  isPlaying,
  onTogglePlay,
  onShuffle,
  videoRef,
  onVideoTimeUpdate,
  onVideoLoadedMetadata,
  onVideoEnded,
  audioRef,
  onAudioTimeUpdate,
  onAudioLoadedMetadata,
  onAudioEnded,
}) {
  return (
    <section className="flex flex-col border-b border-white/10">
      <div className="flex h-72 items-center justify-center overflow-hidden bg-gradient-to-br from-[#1f2430] to-[#0d0e11]">
        {activeType === 'video' && activeItem && (
          <video
            ref={videoRef}
            src={activeItem.mediaSrc}
            poster={activeItem.thumbnailSrc ?? undefined}
            controls
            className="h-full w-full bg-black object-contain"
            onTimeUpdate={onVideoTimeUpdate}
            onLoadedMetadata={onVideoLoadedMetadata}
            onEnded={onVideoEnded}
          />
        )}
        {activeType === 'music' && activeItem && (
          <>
            <MusicWave isPlaying={isPlaying} />
            {activeItem.mediaSrc && (
              <audio
                ref={audioRef}
                src={activeItem.mediaSrc}
                className="hidden"
                onTimeUpdate={onAudioTimeUpdate}
                onLoadedMetadata={onAudioLoadedMetadata}
                onEnded={onAudioEnded}
              />
            )}
          </>
        )}
        {!activeItem && (
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-4xl font-bold text-white">
            S
          </div>
        )}
      </div>
      <div className="flex items-center gap-4 px-6 py-5 text-white">
        <div className="min-w-0 flex-1">
          <div className="text-xs font-semibold tracking-wide text-white/50 uppercase">
            {activeType === 'video'
              ? 'Video'
              : activeType === 'music'
                ? 'Track'
                : 'Music Lab'}
          </div>
          <h2 className="truncate text-3xl font-bold">
            {activeItem?.title ?? 'Music Lab'}
          </h2>
          <div className="truncate text-sm text-white/50">
            {activeItem
              ? activeItem.album
              : 'Select something from Your Library to get started'}
          </div>
        </div>
        <button
          onClick={onTogglePlay}
          disabled={!activeItem}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1ed760] text-black shadow-lg hover:scale-105 hover:bg-[#22e065] disabled:opacity-40 disabled:hover:scale-100"
        >
          {isPlaying ? (
            <PauseIcon className="h-7 w-7" />
          ) : (
            <PlayIcon className="ml-0.5 h-7 w-7" />
          )}
        </button>
        <button
          onClick={onShuffle}
          disabled={!activeItem}
          className="rounded-full border border-white/30 px-4 py-2 text-sm font-medium hover:bg-white/10 disabled:opacity-40"
        >
          Shuffle
        </button>
      </div>
    </section>
  )
}

export default MusicLabScreen
