import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from '@testing-library/react'
import GuestAdminProductsPage from './GuestAdminProductsPage.jsx'

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

describe('GuestAdminProductsPage', () => {
  it('adds a product locally without any network write calls', async () => {
    render(<GuestAdminProductsPage />)

    await waitFor(() => screen.getByText('No products yet.'))

    fireEvent.click(screen.getByText('Add product'))
    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { value: 'Demo Hoodie' },
    })
    fireEvent.click(screen.getByText('Save product'))

    expect(await screen.findByText('Demo Hoodie')).toBeTruthy()
    expect(screen.getByText('PROD-DEMO-0001')).toBeTruthy()
    expect(globalThis.fetch).toHaveBeenCalledTimes(1)
  })
})
