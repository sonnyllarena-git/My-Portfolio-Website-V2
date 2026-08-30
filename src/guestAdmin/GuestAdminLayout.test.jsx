import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import GuestAdminLayout from './GuestAdminLayout.jsx'

afterEach(cleanup)

describe('GuestAdminLayout', () => {
  it('shows the guest-mode badge and calls onReset when clicked', () => {
    const onReset = vi.fn()
    render(
      <GuestAdminLayout
        activeView="products"
        onNavigate={() => {}}
        onReset={onReset}
      >
        <p>Body</p>
      </GuestAdminLayout>,
    )

    expect(
      screen.getByText('Guest Mode — changes reset on refresh'),
    ).toBeTruthy()

    fireEvent.click(screen.getByText('Reset demo'))
    expect(onReset).toHaveBeenCalledTimes(1)
  })
})
