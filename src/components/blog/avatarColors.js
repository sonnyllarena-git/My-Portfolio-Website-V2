export const AVATAR_COLORS = [
  { id: 'rose', bg: 'bg-rose-500' },
  { id: 'amber', bg: 'bg-amber-500' },
  { id: 'emerald', bg: 'bg-emerald-500' },
  { id: 'sky', bg: 'bg-sky-500' },
  { id: 'violet', bg: 'bg-violet-500' },
  { id: 'fuchsia', bg: 'bg-fuchsia-500' },
  { id: 'orange', bg: 'bg-orange-500' },
  { id: 'teal', bg: 'bg-teal-500' },
]

export function getAvatarColorClass(colorId) {
  return (
    AVATAR_COLORS.find((color) => color.id === colorId)?.bg ?? 'bg-slate-400'
  )
}
