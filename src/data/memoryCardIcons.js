const iconModules = import.meta.glob(
  '../components/games/memory/assets/flip/*.{png,jpg,jpeg,svg,webp}',
  { eager: true, import: 'default' },
)

export const memoryCardIcons = Object.keys(iconModules)
  .sort()
  .map((path) => iconModules[path])
