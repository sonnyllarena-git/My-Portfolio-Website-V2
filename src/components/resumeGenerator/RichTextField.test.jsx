import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import RichTextField from './RichTextField.jsx'

describe('RichTextField', () => {
  beforeEach(() => {
    document.execCommand = vi.fn()
  })

  afterEach(cleanup)

  it('calls execCommand and reports updated HTML when Bold is clicked', () => {
    const handleChange = vi.fn()
    render(<RichTextField value="<p>hello</p>" onChange={handleChange} />)

    fireEvent.click(screen.getByRole('button', { name: 'Bold' }))

    expect(document.execCommand).toHaveBeenCalledWith('bold')
    expect(handleChange).toHaveBeenCalled()
  })

  it('reports sanitized HTML on input, stripping script tags', () => {
    const handleChange = vi.fn()
    render(<RichTextField value="" onChange={handleChange} />)

    const editor = screen.getByRole('textbox')
    editor.innerHTML = '<p>safe</p><script>alert(1)</script>'
    fireEvent.input(editor)

    expect(handleChange).toHaveBeenCalledWith('<p>safe</p>')
  })
})
