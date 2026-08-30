function RepeatableFieldList({
  items,
  onChange,
  emptyEntry,
  renderItem,
  addLabel = 'Add',
}) {
  function addEntry() {
    onChange([...items, { ...emptyEntry }])
  }

  function removeEntry(index) {
    onChange(items.filter((_, i) => i !== index))
  }

  function updateEntry(index, patch) {
    onChange(
      items.map((item, i) => (i === index ? { ...item, ...patch } : item)),
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="relative rounded border border-white/10 p-3"
        >
          <button
            type="button"
            onClick={() => removeEntry(index)}
            aria-label="Remove"
            className="absolute top-2 right-2 text-white/50 hover:text-white"
          >
            ×
          </button>
          {renderItem(item, index, (patch) => updateEntry(index, patch))}
        </div>
      ))}
      <button
        type="button"
        onClick={addEntry}
        className="self-start text-sm text-blue-400 hover:underline"
      >
        + {addLabel}
      </button>
    </div>
  )
}

export default RepeatableFieldList
