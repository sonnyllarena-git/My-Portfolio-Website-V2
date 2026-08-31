import { useEffect } from 'react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from '@testing-library/react'
import {
  ResumeGeneratorProvider,
  useResumeGenerator,
} from './ResumeGeneratorContext.jsx'
import ResumeLivePreview from './ResumeLivePreview.jsx'
import html2canvas from 'html2canvas-pro'
import jsPDF from 'jspdf'

vi.mock('html2canvas-pro', () => ({
  default: vi.fn().mockResolvedValue({
    width: 850,
    height: 1100,
    toDataURL: () => 'data:image/png;base64,fake',
  }),
}))

vi.mock('jspdf', () => {
  const instance = {
    internal: { pageSize: { getWidth: () => 8.5, getHeight: () => 11 } },
    addImage: vi.fn(),
    addPage: vi.fn(),
    save: vi.fn(),
  }
  return {
    default: vi.fn(function MockJsPdf() {
      return instance
    }),
  }
})

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

    // Rendered twice by design: once for on-screen viewing, once in a portal to
    // document.body reserved for print (see resumeGeneratorPrint.css).
    expect(screen.getAllByText('Jamie Rivera')).toHaveLength(2)
    fireEvent.click(screen.getByText('Set name'))
    expect(screen.getAllByText('Taylor Rivera')).toHaveLength(2)
  })

  it('calls window.print when the Print button is clicked', () => {
    const printSpy = vi.spyOn(window, 'print').mockImplementation(() => {})

    render(
      <ResumeGeneratorProvider>
        <TestHarness />
      </ResumeGeneratorProvider>,
    )
    fireEvent.click(screen.getByText('Print'))

    expect(printSpy).toHaveBeenCalled()
    printSpy.mockRestore()
  })

  it('generates and downloads a PDF named after the visitor when Download PDF is clicked', async () => {
    render(
      <ResumeGeneratorProvider>
        <TestHarness />
      </ResumeGeneratorProvider>,
    )
    fireEvent.click(screen.getByRole('button', { name: 'Download PDF' }))

    await waitFor(() => expect(html2canvas).toHaveBeenCalled())
    await waitFor(() => expect(jsPDF).toHaveBeenCalled())
    const pdfInstance = jsPDF.mock.results[0].value
    await waitFor(() =>
      expect(pdfInstance.save).toHaveBeenCalledWith('Jamie Rivera Resume.pdf'),
    )
  })
})
