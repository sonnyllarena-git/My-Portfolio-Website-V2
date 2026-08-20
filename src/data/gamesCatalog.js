import flappyBirdIcon from '../components/games/flappybird/assets/icon/flappy bird icon.png'
import flappyBirdThumbnail from '../components/games/flappybird/assets/components/spiderman thumbnail.png'
import typingSpeedThumbnail from '../components/games/typing/assets/components/typing speed test thumbnail.png'
import memoryFlipThumbnail from '../components/games/memory/assets/components/youtuber memory flip thumbnail.png'

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
    tagline: 'Climb as many levels as your memory (and lives) allow.',
    icon: '🧠',
    thumbnail: memoryFlipThumbnail,
    scoreLabel: 'Highest Level',
    sortOrder: 'desc',
    status: 'ready',
  },
]
