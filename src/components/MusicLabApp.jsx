import { useEffect, useRef, useState } from 'react'
import { videos, tracks } from '../data/musicLabLibrary.js'
import MusicLabSidebar from './musicLab/MusicLabSidebar.jsx'
import MusicLabScreen from './musicLab/MusicLabScreen.jsx'
import MusicLabAbout from './musicLab/MusicLabAbout.jsx'
import MusicLabPlayerBar from './musicLab/MusicLabPlayerBar.jsx'
import { useIsMobile } from '../hooks/useIsMobile.js'
import { useSystemSettings } from '../context/SystemSettingsContext.jsx'

function MusicLabApp() {
  const isMobile = useIsMobile()
  const { volume: masterVolume, isMuted: isMasterMuted } = useSystemSettings()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeType, setActiveType] = useState('video')
  const [activeItem, setActiveItem] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(80)
  const [isShuffleOn, setIsShuffleOn] = useState(false)
  const [isRepeatOn, setIsRepeatOn] = useState(false)
  const videoRef = useRef(null)
  const audioRef = useRef(null)

  const items = activeType === 'video' ? videos : tracks

  useEffect(() => {
    const el =
      activeType === 'video'
        ? videoRef.current
        : activeItem?.mediaSrc
          ? audioRef.current
          : null
    if (!el) return
    if (isPlaying) el.play()
    else el.pause()
  }, [isPlaying, activeType, activeItem])

  useEffect(() => {
    const effective = isMasterMuted ? 0 : (volume / 100) * (masterVolume / 100)
    if (videoRef.current) videoRef.current.volume = effective
    if (audioRef.current) audioRef.current.volume = effective
  }, [volume, masterVolume, isMasterMuted])

  useEffect(() => {
    if (activeType !== 'music' || !isPlaying || activeItem?.mediaSrc) return
    const interval = setInterval(() => {
      setCurrentTime((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [activeType, isPlaying, activeItem])

  useEffect(() => {
    if (activeType !== 'music' || !activeItem || activeItem.mediaSrc) return
    if (currentTime < activeItem.duration) return
    const timeout = setTimeout(() => {
      setCurrentTime(activeItem.duration)
      setIsPlaying(false)
    }, 0)
    return () => clearTimeout(timeout)
  }, [currentTime, activeType, activeItem])

  function resetPlayback() {
    setIsPlaying(false)
    setCurrentTime(0)
  }

  function handleSelectType(type) {
    setActiveType(type)
    setActiveItem(null)
    resetPlayback()
    setDuration(0)
  }

  function handleSelectItem(item) {
    setActiveItem(item)
    resetPlayback()
    setDuration(item.mediaSrc ? 0 : (item.duration ?? 0))
  }

  function stepItem(offset) {
    if (!activeItem) return
    const index = items.findIndex((item) => item.id === activeItem.id)
    const next = items[(index + offset + items.length) % items.length]
    handleSelectItem(next)
  }

  function handleShuffle() {
    if (items.length === 0) return
    handleSelectItem(items[Math.floor(Math.random() * items.length)])
  }

  function handleTogglePlay() {
    if (!activeItem) return
    setIsPlaying((prev) => !prev)
  }

  function handleSeek(newTime) {
    setCurrentTime(newTime)
    if (activeType === 'video' && videoRef.current) {
      videoRef.current.currentTime = newTime
    } else if (
      activeType === 'music' &&
      activeItem?.mediaSrc &&
      audioRef.current
    ) {
      audioRef.current.currentTime = newTime
    }
  }

  function handleClose() {
    setActiveItem(null)
    resetPlayback()
    setDuration(0)
  }

  return (
    <div className="flex h-full flex-col bg-[#0d0e11] text-white">
      <div className="flex flex-1 overflow-hidden">
        <MusicLabSidebar
          activeType={activeType}
          onSelectType={handleSelectType}
          items={items}
          selectedItemId={activeItem?.id}
          onSelectItem={handleSelectItem}
          isMobile={isMobile}
          isOpen={isSidebarOpen}
          onRequestClose={() => setIsSidebarOpen(false)}
        />
        <div className="flex flex-1 flex-col overflow-auto">
          {isMobile && (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="m-2 self-start rounded bg-white/10 px-3 py-1.5 text-sm hover:bg-white/20"
            >
              ☰ Library
            </button>
          )}
          <MusicLabScreen
            activeType={activeType}
            activeItem={activeItem}
            isPlaying={isPlaying}
            onTogglePlay={handleTogglePlay}
            onShuffle={handleShuffle}
            videoRef={videoRef}
            onVideoTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
            onVideoLoadedMetadata={(e) => setDuration(e.target.duration)}
            onVideoEnded={() => setIsPlaying(false)}
            audioRef={audioRef}
            onAudioTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
            onAudioLoadedMetadata={(e) => setDuration(e.target.duration)}
            onAudioEnded={() => setIsPlaying(false)}
          />
          <MusicLabAbout />
        </div>
      </div>
      <MusicLabPlayerBar
        activeItem={activeItem}
        activeType={activeType}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        onPrev={() => stepItem(-1)}
        onNext={() => stepItem(1)}
        isShuffleOn={isShuffleOn}
        onToggleShuffle={() => setIsShuffleOn((prev) => !prev)}
        isRepeatOn={isRepeatOn}
        onToggleRepeat={() => setIsRepeatOn((prev) => !prev)}
        currentTime={currentTime}
        duration={duration}
        onSeek={handleSeek}
        volume={volume}
        onVolumeChange={setVolume}
        onClose={handleClose}
      />
    </div>
  )
}

export default MusicLabApp
