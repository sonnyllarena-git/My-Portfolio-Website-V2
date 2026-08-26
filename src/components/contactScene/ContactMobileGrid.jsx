function ContactMobileGrid({ icons, onSelectIcon }) {
  return (
    <div className="grid grid-cols-2 gap-3 p-4">
      {icons.map((icon) => (
        <button
          key={icon.id}
          type="button"
          onClick={() => onSelectIcon(icon.id)}
          className="flex flex-col items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-4 text-white transition hover:bg-white/10 active:scale-95"
        >
          <span className="text-3xl">{icon.glyph}</span>
          <span className="text-xs font-medium">{icon.label}</span>
        </button>
      ))}
    </div>
  )
}

export default ContactMobileGrid
