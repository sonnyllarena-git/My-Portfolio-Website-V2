import { arcadeGreetings } from '../data/arcadeGreetings.js'

export function getTimeBucket(hour) {
  if (hour >= 5 && hour < 12) return 'morning'
  if (hour >= 12 && hour < 17) return 'afternoon'
  if (hour >= 17 && hour < 21) return 'evening'
  return 'night'
}

export function getGreeting(hour, name, randomFn = Math.random) {
  const templates = arcadeGreetings[getTimeBucket(hour)]
  const index = Math.floor(randomFn() * templates.length)
  const template = templates[Math.min(index, templates.length - 1)]
  return template.replace('{name}', name)
}
