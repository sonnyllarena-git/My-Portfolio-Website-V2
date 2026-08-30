import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { ResumeGeneratorProvider } from '../ResumeGeneratorContext.jsx'
import PersonalInfoSection from './PersonalInfoSection.jsx'

afterEach(cleanup)

describe('PersonalInfoSection', () => {
  it('typing in a field updates context state', () => {
    render(
      <ResumeGeneratorProvider>
        <PersonalInfoSection />
      </ResumeGeneratorProvider>,
    )

    const firstNameInput = screen.getByLabelText('First name')
    fireEvent.change(firstNameInput, { target: { value: 'Jamie' } })

    expect(firstNameInput.value).toBe('Jamie')
  })

  it('typing in Website updates context state', () => {
    render(
      <ResumeGeneratorProvider>
        <PersonalInfoSection />
      </ResumeGeneratorProvider>,
    )

    const websiteInput = screen.getByLabelText('Website')
    fireEvent.change(websiteInput, { target: { value: 'jamie.example.com' } })

    expect(websiteInput.value).toBe('jamie.example.com')
  })

  it('selecting a photo file sets a preview image', () => {
    URL.createObjectURL = vi.fn().mockReturnValue('blob:preview-url')

    render(
      <ResumeGeneratorProvider>
        <PersonalInfoSection />
      </ResumeGeneratorProvider>,
    )

    const file = new File(['photo'], 'photo.png', { type: 'image/png' })
    const photoInput = screen.getByLabelText('Photo')
    fireEvent.change(photoInput, { target: { files: [file] } })

    expect(screen.getByAltText('Photo preview').src).toContain(
      'blob:preview-url',
    )
  })
})
