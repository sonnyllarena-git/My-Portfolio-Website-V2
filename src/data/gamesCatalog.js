import flappyBirdIcon from '../components/games/flappybird/assets/icon/flappy bird icon.png'
import flappyBirdThumbnail from '../components/games/flappybird/assets/components/flappy thumbnail.png'
import typingSpeedThumbnail from '../components/games/typing/assets/components/typing speed test thumbnail.png'

export const gamesCatalog = [
  {
    id: 'flappy-bird',
    title: 'Flappy Bird',
    tagline: 'Tap to fly, dodge the pipes.',
    icon: '🐦',
    iconImage: flappyBirdIcon,
    thumbnail: flappyBirdThumbnail,
    scoreLabel: 'Best Score',
    sortOrder: 'desc',
    status: 'ready',
  },
  {
    id: '2048',
    title: '2048',
    tagline: 'Merge tiles to reach 2048.',
    icon: '🔢',
    scoreLabel: 'Best Score',
    sortOrder: 'desc',
    status: 'ready',
  },
  {
    id: 'endless-runner',
    title: 'Endless Runner',
    tagline: 'Run, jump, survive as long as you can.',
    icon: '🏃',
    scoreLabel: 'Best Distance',
    sortOrder: 'desc',
    status: 'ready',
  },
  {
    id: 'typing-speed',
    title: 'Typing Speed Test',
    tagline: 'Climb through 100 escalating levels before the clock runs out.',
    icon: '⌨️',
    thumbnail: typingSpeedThumbnail,
    scoreLabel: 'Highest Level',
    sortOrder: 'desc',
    status: 'ready',
  },
  {
    id: 'memory-flip',
    title: 'Memory Flip Card',
    tagline: 'Match every pair in the fastest time.',
    icon: '🧠',
    scoreLabel: 'Fastest Time',
    sortOrder: 'asc',
    status: 'ready',
  },
]
