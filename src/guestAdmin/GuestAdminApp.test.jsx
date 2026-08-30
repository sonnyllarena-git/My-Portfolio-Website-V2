import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from '@testing-library/react'
import GuestAdminApp from './GuestAdminApp.jsx'

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

describe('GuestAdminApp', () => {
  it('clears a locally-added product when Reset demo is clicked', async () => {
    render(<GuestAdminApp />)

    await waitFor(() => screen.getByText('No products yet.'))

    fireEvent.click(screen.getByText('Add product'))
    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { value: 'Demo Hoodie' },
    })
    fireEvent.click(screen.getByText('Save product'))
    expect(await screen.findByText('Demo Hoodie')).toBeTruthy()

    fireEvent.click(screen.getByText('Reset demo'))
    await waitFor(() => screen.getByText('No products yet.'))
    expect(screen.queryByText('Demo Hoodie')).toBeNull()
  })
})
