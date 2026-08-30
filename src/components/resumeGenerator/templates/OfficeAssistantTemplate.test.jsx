import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import OfficeAssistantTemplate from './OfficeAssistantTemplate.jsx'
import { sampleResumeData } from './sampleResumeData.js'

afterEach(cleanup)

describe('OfficeAssistantTemplate', () => {
  it('renders all sections from sampleResumeData', () => {
    render(<OfficeAssistantTemplate resumeData={sampleResumeData} />)

    expect(screen.getByText('Career Overview')).toBeTruthy()
    expect(screen.getByText('Education')).toBeTruthy()
    expect(screen.getByText('Skills')).toBeTruthy()
    expect(screen.getByText('Reference')).toBeTruthy()
    expect(screen.getByText('Experience')).toBeTruthy()
    expect(screen.getByText('Alex Chen')).toBeTruthy()
  })
})
