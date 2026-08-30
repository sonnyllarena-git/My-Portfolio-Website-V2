import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from '@testing-library/react'
import GuestAdminResumeTemplatesPage from './GuestAdminResumeTemplatesPage.jsx'

beforeEach(() => {
  globalThis.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve([]),
  })
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('GuestAdminResumeTemplatesPage', () => {
  it('adds a template locally without any network write calls', async () => {
    render(<GuestAdminResumeTemplatesPage />)

    await waitFor(() => screen.getByText('No templates yet.'))

    fireEvent.click(screen.getByText('Add template'))
    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { value: 'Demo Template' },
    })
    fireEvent.click(screen.getByText('Save template'))

    expect(await screen.findByText('Demo Template')).toBeTruthy()
    expect(screen.getByText('TPL-DEMO-0001')).toBeTruthy()
    expect(globalThis.fetch).toHaveBeenCalledTimes(1)
  })
})
