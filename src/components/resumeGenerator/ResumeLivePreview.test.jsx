import { useEffect } from 'react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import {
  ResumeGeneratorProvider,
  useResumeGenerator,
} from './ResumeGeneratorContext.jsx'
import ResumeLivePreview from './ResumeLivePreview.jsx'

afterEach(cleanup)

function TestHarness() {
  const { setSelectedTemplateKey, updatePersonalInfoField } =
    useResumeGenerator()

  useEffect(() => {
    setSelectedTemplateKey('classic')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <button onClick={() => updatePersonalInfoField('firstName', 'Taylor')}>
        Set name
      </button>
      <ResumeLivePreview onChangeTemplate={() => {}} />
    </>
  )
}

describe('ResumeLivePreview', () => {
  it('re-renders visible preview text when context data changes', () => {
    render(
      <ResumeGeneratorProvider>
        <TestHarness />
      </ResumeGeneratorProvider>,
    )

    expect(screen.getByText('Jamie Rivera')).toBeTruthy()
    fireEvent.click(screen.getByText('Set name'))
    expect(screen.getByText('Taylor Rivera')).toBeTruthy()
  })

  it('calls window.print when the button is clicked', () => {
    const printSpy = vi.spyOn(window, 'print').mockImplementation(() => {})

    render(
      <ResumeGeneratorProvider>
        <TestHarness />
      </ResumeGeneratorProvider>,
    )
    fireEvent.click(screen.getByText('Print / Save as PDF'))

    expect(printSpy).toHaveBeenCalled()
    printSpy.mockRestore()
  })
})
