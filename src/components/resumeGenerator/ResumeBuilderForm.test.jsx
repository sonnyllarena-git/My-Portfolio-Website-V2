import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { ResumeGeneratorProvider } from './ResumeGeneratorContext.jsx'
import ResumeBuilderForm from './ResumeBuilderForm.jsx'
import { useResumeTemplates } from '../../context/ResumeTemplatesContext.jsx'

vi.mock('../../context/ResumeTemplatesContext.jsx', () => ({
  useResumeTemplates: vi.fn(),
}))

afterEach(cleanup)

describe('ResumeBuilderForm', () => {
  it('advances with Next and returns with Back', () => {
    useResumeTemplates.mockReturnValue({
      loading: false,
      error: '',
      templates: [
        { code: 'TPL-0001', templateKey: 'classic', name: 'Classic' },
      ],
    })

    render(
      <ResumeGeneratorProvider>
        <ResumeBuilderForm />
      </ResumeGeneratorProvider>,
    )

    fireEvent.click(screen.getByText('Classic'))
    expect(screen.getByLabelText('First name')).toBeTruthy()

    fireEvent.click(screen.getByText('Next'))
    expect(screen.getByText('+ one more employment')).toBeTruthy()

    fireEvent.click(screen.getByText('Back'))
    expect(screen.getByLabelText('First name')).toBeTruthy()
  })

  it('jumps directly to a step when its progress dot is clicked', () => {
    useResumeTemplates.mockReturnValue({
      loading: false,
      error: '',
      templates: [
        { code: 'TPL-0001', templateKey: 'classic', name: 'Classic' },
      ],
    })

    render(
      <ResumeGeneratorProvider>
        <ResumeBuilderForm />
      </ResumeGeneratorProvider>,
    )

    fireEvent.click(screen.getByText('Classic'))
    fireEvent.click(screen.getByLabelText('Education'))
    expect(screen.getByText('+ one more education')).toBeTruthy()
  })
})
