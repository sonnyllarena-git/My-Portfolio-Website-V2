import { useEffect, useRef, useState } from 'react'
import { videos, tracks } from '../data/musicLabLibrary.js'
import MusicLabSidebar from './musicLab/MusicLabSidebar.jsx'
import MusicLabScreen from './musicLab/MusicLabScreen.jsx'
import MusicLabAbout from './musicLab/MusicLabAbout.jsx'
import MusicLabPlayerBar from './musicLab/MusicLabPlayerBar.jsx'

function MusicLabApp() {
  const [activeType, setActiveType] = useState('video')
  const [activeItem, setActiveItem] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(80)
  const [isShuffleOn, setIsShuffleOn] = useState(false)
  const [isRepeatOn, setIsRepeatOn] = useState(false)
  const videoRef = useRef(null)

  const items = activeType === 'video' ? videos : tracks

  useEffect(() => {
    if (activeType !== 'video' || !videoRef.current) return
    if (isPlaying) videoRef.current.play()
    else videoRef.current.pause()
  }, [isPlaying, activeType, activeItem])

  useEffect(() => {
    if (videoRef.current) videoRef.current.volume = volume / 100
  }, [volume])

  useEffect(() => {
    if (activeType !== 'music' || !isPlaying) return
    const interval = setInterval(() => {
      setCurrentTime((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [activeType, isPlaying])

  useEffect(() => {
    if (activeType !== 'music' || !activeItem) return
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
    setDuration(item.duration ?? 0)
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
        />
        <div className="flex flex-1 flex-col overflow-auto">
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
