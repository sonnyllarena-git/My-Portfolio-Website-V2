import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import EngineerSidebarTemplate from './EngineerSidebarTemplate.jsx'
import { sampleResumeData } from './sampleResumeData.js'

afterEach(cleanup)

describe('EngineerSidebarTemplate', () => {
  it('renders all sections from sampleResumeData', () => {
    render(<EngineerSidebarTemplate resumeData={sampleResumeData} />)

    expect(screen.getByText('Summary')).toBeTruthy()
    expect(screen.getByText('Work Experience')).toBeTruthy()
    expect(screen.getByText('Education')).toBeTruthy()
    expect(screen.getByText('Additional Information')).toBeTruthy()
    expect(screen.getByText(/Technical Skills:/)).toBeTruthy()
    expect(screen.getByText(/Certifications:/)).toBeTruthy()
    expect(screen.getByText(/Awards & Activities:/)).toBeTruthy()
  })
})
