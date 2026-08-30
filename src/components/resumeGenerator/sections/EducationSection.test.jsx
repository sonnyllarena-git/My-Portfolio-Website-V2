import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { ResumeGeneratorProvider } from '../ResumeGeneratorContext.jsx'
import EducationSection from './EducationSection.jsx'

afterEach(cleanup)

describe('EducationSection', () => {
  it('adds, edits, and removes entries independently', () => {
    render(
      <ResumeGeneratorProvider>
        <EducationSection />
      </ResumeGeneratorProvider>,
    )

    const addButton = screen.getByText('+ one more education')
    fireEvent.click(addButton)
    fireEvent.click(addButton)

    const schoolInputs = screen.getAllByLabelText('School')
    fireEvent.change(schoolInputs[0], { target: { value: 'UT Austin' } })
    expect(schoolInputs[1].value).toBe('')

    fireEvent.click(screen.getAllByLabelText('Remove')[0])
    const remaining = screen.getAllByLabelText('School')
    expect(remaining).toHaveLength(1)
    expect(remaining[0].value).toBe('')
  })
})
