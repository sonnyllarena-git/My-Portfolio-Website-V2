export default function TypingWhiteboard({ sentence, typed }) {
  return (
    <div className="rounded-lg border-[10px] border-[#a5714a] bg-white p-6 shadow-2xl">
      <p className="font-mono text-lg leading-relaxed text-slate-400 sm:text-xl">
        {sentence.split('').map((char, index) => {
          let className = 'text-slate-400'
          if (index < typed.length) {
            className =
              typed[index] === char
                ? 'text-emerald-600'
                : 'bg-red-200 text-red-700 underline'
          }
          return (
            <span key={index} className={className}>
              {char}
            </span>
          )
        })}
      </p>
    </div>
  )
}
