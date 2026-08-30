import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import {
  ResumeGeneratorProvider,
  useResumeGenerator,
} from './ResumeGeneratorContext.jsx'

afterEach(cleanup)

function TestConsumer() {
  const { workExperience, setWorkExperience } = useResumeGenerator()
  return (
    <div>
      <span data-testid="count">{workExperience.length}</span>
      <button
        onClick={() =>
          setWorkExperience((prev) => [...prev, { employer: 'Acme' }])
        }
      >
        Add
      </button>
    </div>
  )
}

describe('ResumeGeneratorContext', () => {
  it('adding a work-experience row appends it', () => {
    render(
      <ResumeGeneratorProvider>
        <TestConsumer />
      </ResumeGeneratorProvider>,
    )

    expect(screen.getByTestId('count').textContent).toBe('0')
    fireEvent.click(screen.getByText('Add'))
    expect(screen.getByTestId('count').textContent).toBe('1')
  })

  it('starts empty on a fresh mount', () => {
    render(
      <ResumeGeneratorProvider>
        <TestConsumer />
      </ResumeGeneratorProvider>,
    )

    expect(screen.getByTestId('count').textContent).toBe('0')
  })
})
