import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { ResumeGeneratorProvider } from '../ResumeGeneratorContext.jsx'
import SkillsSection from './SkillsSection.jsx'

afterEach(cleanup)

describe('SkillsSection', () => {
  it('adds and removes entries independently', () => {
    render(
      <ResumeGeneratorProvider>
        <SkillsSection />
      </ResumeGeneratorProvider>,
    )

    const addButton = screen.getByText('+ one more skill')
    fireEvent.click(addButton)
    fireEvent.click(addButton)

    const skillInputs = screen.getAllByLabelText('Skill')
    fireEvent.change(skillInputs[0], { target: { value: 'React' } })
    expect(skillInputs[1].value).toBe('')

    fireEvent.click(screen.getAllByLabelText('Remove')[0])
    const remaining = screen.getAllByLabelText('Skill')
    expect(remaining).toHaveLength(1)
    expect(remaining[0].value).toBe('')
  })
})
