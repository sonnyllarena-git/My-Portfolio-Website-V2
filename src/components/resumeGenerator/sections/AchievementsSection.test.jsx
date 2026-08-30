import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { ResumeGeneratorProvider } from '../ResumeGeneratorContext.jsx'
import AchievementsSection from './AchievementsSection.jsx'

afterEach(cleanup)

describe('AchievementsSection', () => {
  it('adds and removes entries independently', () => {
    render(
      <ResumeGeneratorProvider>
        <AchievementsSection />
      </ResumeGeneratorProvider>,
    )

    const addButton = screen.getByText('+ one more achievement')
    fireEvent.click(addButton)
    fireEvent.click(addButton)

    const inputs = screen.getAllByLabelText('Achievement')
    fireEvent.change(inputs[0], { target: { value: 'Shipped v2.' } })
    expect(inputs[1].value).toBe('')

    fireEvent.click(screen.getAllByLabelText('Remove')[0])
    const remaining = screen.getAllByLabelText('Achievement')
    expect(remaining).toHaveLength(1)
    expect(remaining[0].value).toBe('')
  })
})
