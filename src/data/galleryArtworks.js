function placeholderThumbnail(label, bg, fg) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><rect width="300" height="300" fill="${bg}"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="28" fill="${fg}">${label}</text></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

export const galleryArtworks = [
  {
    id: 'seed-1',
    title: 'Hello.png',
    author: 'Guest',
    timestamp: '2026-08-10T10:00:00.000Z',
    imageData: placeholderThumbnail('Hello', '#fef3c7', '#111827'),
  },
  {
    id: 'seed-2',
    title: 'DOG.png',
    author: 'Guest',
    timestamp: '2026-08-11T14:20:00.000Z',
    imageData: placeholderThumbnail('DOG', '#fee2e2', '#7f1d1d'),
  },
  {
    id: 'seed-3',
    title: 'Welcome.png',
    author: 'Guest',
    timestamp: '2026-08-12T09:05:00.000Z',
    imageData: placeholderThumbnail('Welcome', '#0f172a', '#e2e8f0'),
  },
  {
    id: 'seed-4',
    title: 'Scribble.png',
    author: 'Guest',
    timestamp: '2026-08-13T18:45:00.000Z',
    imageData: placeholderThumbnail('Scribble', '#dbeafe', '#1e3a8a'),
  },
  {
    id: 'seed-5',
    title: 'Sunset.png',
    author: 'Guest',
    timestamp: '2026-08-14T20:10:00.000Z',
    imageData: placeholderThumbnail('Sunset', '#ffedd5', '#7c2d12'),
  },
  {
    id: 'seed-6',
    title: 'Heart.png',
    author: 'Guest',
    timestamp: '2026-08-15T12:30:00.000Z',
    imageData: placeholderThumbnail('Heart', '#fce7f3', '#831843'),
  },
]
