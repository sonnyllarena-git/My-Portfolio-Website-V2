import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import {
  ResumeGeneratorProvider,
  useResumeGenerator,
} from '../ResumeGeneratorContext.jsx'
import ProfessionalSummarySection from './ProfessionalSummarySection.jsx'

afterEach(cleanup)

function SummaryProbe() {
  const { summary } = useResumeGenerator()
  return <span data-testid="summary-probe">{summary}</span>
}

describe('ProfessionalSummarySection', () => {
  it('typing updates context state', () => {
    render(
      <ResumeGeneratorProvider>
        <ProfessionalSummarySection />
        <SummaryProbe />
      </ResumeGeneratorProvider>,
    )

    const editor = screen.getByRole('textbox')
    editor.innerHTML = '<p>Curious developer.</p>'
    fireEvent.input(editor)

    expect(screen.getByTestId('summary-probe').textContent).toBe(
      '<p>Curious developer.</p>',
    )
  })
})
