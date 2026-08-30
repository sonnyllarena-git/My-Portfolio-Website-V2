import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { ResumeGeneratorProvider } from '../ResumeGeneratorContext.jsx'
import WorkExperienceSection from './WorkExperienceSection.jsx'

afterEach(cleanup)

describe('WorkExperienceSection', () => {
  it('editing one entry does not affect a second added entry', () => {
    render(
      <ResumeGeneratorProvider>
        <WorkExperienceSection />
      </ResumeGeneratorProvider>,
    )

    const addButton = screen.getByText('+ one more employment')
    fireEvent.click(addButton)
    fireEvent.click(addButton)

    const employerInputs = screen.getAllByLabelText('Employer')
    expect(employerInputs).toHaveLength(2)

    fireEvent.change(employerInputs[0], { target: { value: 'Acme Corp' } })

    expect(employerInputs[0].value).toBe('Acme Corp')
    expect(employerInputs[1].value).toBe('')
  })
})
