import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import ClassicTemplate from './ClassicTemplate.jsx'
import { sampleResumeData } from './sampleResumeData.js'

afterEach(cleanup)

describe('ClassicTemplate', () => {
  it('renders all six sections from sampleResumeData', () => {
    render(<ClassicTemplate resumeData={sampleResumeData} />)

    expect(screen.getByText('Jamie Rivera')).toBeTruthy()
    expect(screen.getByText('Professional Summary')).toBeTruthy()
    expect(screen.getByText('Professional Experience')).toBeTruthy()
    expect(screen.getByText('Education')).toBeTruthy()
    expect(screen.getByText('Trainings & Certifications')).toBeTruthy()
    expect(screen.getByText('Skills')).toBeTruthy()
  })
})
