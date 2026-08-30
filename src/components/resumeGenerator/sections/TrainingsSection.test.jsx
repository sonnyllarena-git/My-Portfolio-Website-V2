import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { ResumeGeneratorProvider } from '../ResumeGeneratorContext.jsx'
import TrainingsSection from './TrainingsSection.jsx'

afterEach(cleanup)

describe('TrainingsSection', () => {
  it('adds and removes entries independently', () => {
    render(
      <ResumeGeneratorProvider>
        <TrainingsSection />
      </ResumeGeneratorProvider>,
    )

    const addButton = screen.getByText('+ one more training')
    fireEvent.click(addButton)
    fireEvent.click(addButton)

    const nameInputs = screen.getAllByLabelText('Name')
    fireEvent.change(nameInputs[0], { target: { value: 'AWS Certified' } })
    expect(nameInputs[1].value).toBe('')

    fireEvent.click(screen.getAllByLabelText('Remove')[0])
    const remaining = screen.getAllByLabelText('Name')
    expect(remaining).toHaveLength(1)
    expect(remaining[0].value).toBe('')
  })
})
