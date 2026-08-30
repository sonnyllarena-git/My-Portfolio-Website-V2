import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { ResumeGeneratorProvider } from '../ResumeGeneratorContext.jsx'
import ReferencesSection from './ReferencesSection.jsx'

afterEach(cleanup)

describe('ReferencesSection', () => {
  it('adds and removes entries independently', () => {
    render(
      <ResumeGeneratorProvider>
        <ReferencesSection />
      </ResumeGeneratorProvider>,
    )

    const addButton = screen.getByText('+ one more reference')
    fireEvent.click(addButton)
    fireEvent.click(addButton)

    const nameInputs = screen.getAllByLabelText('Name')
    fireEvent.change(nameInputs[0], { target: { value: 'Alex Chen' } })
    expect(nameInputs[1].value).toBe('')

    fireEvent.click(screen.getAllByLabelText('Remove')[0])
    const remaining = screen.getAllByLabelText('Name')
    expect(remaining).toHaveLength(1)
    expect(remaining[0].value).toBe('')
  })
})
