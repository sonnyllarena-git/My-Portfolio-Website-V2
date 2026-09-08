// Repeatedly re-triggering a shared <audio> element (currentTime = 0 + play())
// has noticeable playback latency on mobile browsers, especially for rapid-fire
// sounds like a jump or a keystroke. Web Audio API plays a pre-decoded buffer
// through a fresh source node on every call instead, which is effectively
// instant and supports overlapping triggers correctly.
let audioContext = null

function getAudioContext() {
  if (!audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    audioContext = new AudioContextClass()
  }
  return audioContext
}

const bufferCache = new Map()

function loadBuffer(url) {
  if (!bufferCache.has(url)) {
    const promise = fetch(url)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => getAudioContext().decodeAudioData(arrayBuffer))
    bufferCache.set(url, promise)
  }
  return bufferCache.get(url)
}

export function preloadSound(url) {
  loadBuffer(url).catch(() => {})
}

export function playSound(url, volume = 1) {
  if (volume <= 0) return
  const context = getAudioContext()
  if (context.state === 'suspended') context.resume().catch(() => {})
  loadBuffer(url)
    .then((buffer) => {
      const source = context.createBufferSource()
      source.buffer = buffer
      const gainNode = context.createGain()
      gainNode.gain.value = volume
      source.connect(gainNode)
      gainNode.connect(context.destination)
      source.start(0)
    })
    .catch(() => {})
}
