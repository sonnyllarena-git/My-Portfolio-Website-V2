import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act, waitFor, cleanup } from '@testing-library/react'
import { useSandboxCollection } from './useSandboxCollection.js'

beforeEach(() => {
  globalThis.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve([{ code: 'PROD-0001', name: 'Seed Item' }]),
  })
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('useSandboxCollection', () => {
  it('seeds once from the given URL, then mutates only local state', async () => {
    const { result } = renderHook(() =>
      useSandboxCollection('/api/products?published=true', 'PROD'),
    )

    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.items).toEqual([
      { code: 'PROD-0001', name: 'Seed Item' },
    ])

    act(() => {
      result.current.add({ name: 'New Item' })
    })
    expect(result.current.items).toHaveLength(2)
    expect(result.current.items[1].code).toBe('PROD-DEMO-0001')

    act(() => {
      result.current.publish('PROD-DEMO-0001')
    })
    expect(result.current.items[1].published).toBe(true)

    act(() => {
      result.current.remove('PROD-0001')
    })
    expect(result.current.items).toHaveLength(1)

    expect(globalThis.fetch).toHaveBeenCalledTimes(1)
  })
})
