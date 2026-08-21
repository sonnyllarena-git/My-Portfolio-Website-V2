import { useState } from 'react'
import loginBackground from './assets/components/blog login ui.png'
import { AVATAR_COLORS } from './avatarColors.js'

function BlogNameGate({ onSubmit, onCancel }) {
  const [name, setName] = useState('')
  const [avatarColor, setAvatarColor] = useState(null)
  const canContinue = name.trim().length > 0 && avatarColor !== null

  function handleSubmit(e) {
    e.preventDefault()
    if (!canContinue) return
    onSubmit(name.trim(), avatarColor)
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      onContextMenu={(e) => e.stopPropagation()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
    >
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-[1080px] overflow-hidden rounded-lg bg-cover bg-center bg-no-repeat shadow-2xl"
        style={{
          aspectRatio: '1080 / 500',
          backgroundImage: `url(${loginBackground})`,
        }}
      >
        <button
          type="button"
          onClick={onCancel}
          aria-label="Close"
          className="absolute top-[4%] right-[2%] h-[5%] w-[8%] cursor-pointer"
        />
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-label="Your name"
          className="absolute top-[18.5%] left-[58.3%] h-[7%] w-[31.9%] rounded-lg border-none bg-transparent px-4 text-sm text-slate-900 outline-none [font-size:clamp(10px,1.6vw,16px)]"
        />
        {AVATAR_COLORS.map((color, index) => {
          const row = Math.floor(index / 4)
          const col = index % 4
          const left = 59.7 + col * 7.9
          const top = row === 0 ? 38.9 : 50.1
          return (
            <button
              key={color.id}
              type="button"
              onClick={() => setAvatarColor(color.id)}
              aria-label={`Avatar color ${color.id}`}
              className={`absolute h-[9%] w-[4.17%] cursor-pointer rounded-full ${
                avatarColor === color.id
                  ? 'ring-2 ring-slate-900 ring-offset-2'
                  : ''
              }`}
              style={{ left: `${left}%`, top: `${top}%` }}
            />
          )
        })}
        <button
          type="submit"
          disabled={!canContinue}
          aria-label="Login"
          className={`absolute top-[65.6%] left-[58.3%] h-[9%] w-[31.9%] cursor-pointer rounded-full ${
            canContinue ? '' : 'bg-white/60'
          } disabled:cursor-not-allowed`}
        />
      </form>
    </div>
  )
}

export default BlogNameGate
