import { typingTiers, TIER_WARNINGS } from '../../data/typingTiers.js'

export function getLevelInfo(level) {
  const tierIndex = typingTiers.findIndex(
    (tier) => level >= tier.levelStart && level <= tier.levelEnd,
  )
  const tier = typingTiers[tierIndex]
  const sentence = tier.sentences[level - tier.levelStart]
  return { level, tierIndex, tierName: tier.name, sentence }
}

export function isTierStart(level) {
  if (level <= 1) return false
  return typingTiers.some((tier) => tier.levelStart === level)
}

export function pickWarning() {
  return TIER_WARNINGS[Math.floor(Math.random() * TIER_WARNINGS.length)]
}
