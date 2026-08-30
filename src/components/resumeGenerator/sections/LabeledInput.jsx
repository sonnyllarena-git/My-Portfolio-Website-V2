function LabeledInput({ label, value, onChange, className = '' }) {
  return (
    <label className={`flex flex-col gap-1 text-sm ${className}`}>
      {label}
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded border border-white/20 bg-white/5 p-2"
      />
    </label>
  )
}

export default LabeledInput
