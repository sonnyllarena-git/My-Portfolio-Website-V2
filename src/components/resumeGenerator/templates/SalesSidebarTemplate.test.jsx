import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import SalesSidebarTemplate from './SalesSidebarTemplate.jsx'
import { sampleResumeData } from './sampleResumeData.js'

afterEach(cleanup)

describe('SalesSidebarTemplate', () => {
  it('renders all sections from sampleResumeData', () => {
    render(<SalesSidebarTemplate resumeData={sampleResumeData} />)

    expect(screen.getByText('Education')).toBeTruthy()
    expect(screen.getByText('Certifications')).toBeTruthy()
    expect(screen.getByText('Achievements')).toBeTruthy()
    expect(screen.getByText('Professional Summary')).toBeTruthy()
    expect(screen.getByText('Work Experience')).toBeTruthy()
    expect(screen.getByText('Projects')).toBeTruthy()
    expect(screen.getByText('Internal Design System')).toBeTruthy()
  })
})
