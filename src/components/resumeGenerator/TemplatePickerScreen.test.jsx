import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import TemplatePickerScreen from './TemplatePickerScreen.jsx'
import { useResumeTemplates } from '../../context/ResumeTemplatesContext.jsx'

vi.mock('../../context/ResumeTemplatesContext.jsx', () => ({
  useResumeTemplates: vi.fn(),
}))

afterEach(cleanup)

describe('TemplatePickerScreen', () => {
  it('calls onSelect with the clicked template key', () => {
    useResumeTemplates.mockReturnValue({
      loading: false,
      error: '',
      templates: [
        { code: 'TPL-0001', templateKey: 'classic', name: 'Classic' },
        { code: 'TPL-0002', templateKey: 'modern', name: 'Modern' },
      ],
    })
    const handleSelect = vi.fn()

    render(<TemplatePickerScreen onSelect={handleSelect} />)
    fireEvent.click(screen.getByText('Modern'))

    expect(handleSelect).toHaveBeenCalledWith('modern')
  })

  it('shows an empty-state message when no templates are published', () => {
    useResumeTemplates.mockReturnValue({
      loading: false,
      error: '',
      templates: [],
    })

    render(<TemplatePickerScreen onSelect={vi.fn()} />)

    expect(
      screen.getByText(
        'No resume templates are available yet — please check back soon.',
      ),
    ).toBeTruthy()
  })
})
