import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import ResumeGeneratorApp from './ResumeGeneratorApp.jsx'

beforeEach(() => {
  globalThis.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: () =>
      Promise.resolve([
        { code: 'TPL-0001', templateKey: 'classic', name: 'Classic' },
      ]),
  })
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('ResumeGeneratorApp', () => {
  it('selects a template and advances the wizard through to the preview step', async () => {
    render(<ResumeGeneratorApp />)

    const templateCard = await screen.findByText('Classic')
    fireEvent.click(templateCard)

    for (let i = 0; i < 20 && screen.queryByText('Next'); i += 1) {
      fireEvent.click(screen.getByText('Next'))
    }

    expect(screen.getByRole('button', { name: 'Download PDF' })).toBeTruthy()
  })
})
