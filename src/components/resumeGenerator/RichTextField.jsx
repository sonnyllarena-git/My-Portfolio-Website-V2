import { useEffect, useRef } from 'react'

const COMMANDS = [
  { command: 'bold', label: 'B', ariaLabel: 'Bold', className: 'font-bold' },
  { command: 'italic', label: 'I', ariaLabel: 'Italic', className: 'italic' },
  {
    command: 'underline',
    label: 'U',
    ariaLabel: 'Underline',
    className: 'underline',
  },
  {
    command: 'insertUnorderedList',
    label: '•',
    ariaLabel: 'Bullet list',
    className: '',
  },
  {
    command: 'insertOrderedList',
    label: '1.',
    ariaLabel: 'Numbered list',
    className: '',
  },
]

function sanitizeHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/ on\w+="[^"]*"/gi, '')
    .replace(/ on\w+='[^']*'/gi, '')
}

function RichTextField({ value, onChange, placeholder }) {
  const editorRef = useRef(null)

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== (value || '')) {
      editorRef.current.innerHTML = value || ''
    }
  }, [value])

  function handleInput(event) {
    onChange(sanitizeHtml(event.currentTarget.innerHTML))
  }

  function runCommand(command) {
    document.execCommand(command)
    if (editorRef.current) onChange(sanitizeHtml(editorRef.current.innerHTML))
  }

  return (
    <div className="rounded border border-white/20 bg-white/5">
      <div className="flex gap-1 border-b border-white/10 p-1">
        {COMMANDS.map(({ command, label, ariaLabel, className }) => (
          <button
            key={command}
            type="button"
            aria-label={ariaLabel}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => runCommand(command)}
            className={`h-7 w-7 rounded text-sm hover:bg-white/10 ${className}`}
          >
            {label}
          </button>
        ))}
      </div>
      <div
        ref={editorRef}
        contentEditable
        role="textbox"
        aria-multiline="true"
        aria-label={placeholder}
        data-placeholder={placeholder}
        onInput={handleInput}
        className="min-h-24 p-2 text-sm outline-none empty:before:text-white/40 empty:before:content-[attr(data-placeholder)]"
      />
    </div>
  )
}

export default RichTextField
