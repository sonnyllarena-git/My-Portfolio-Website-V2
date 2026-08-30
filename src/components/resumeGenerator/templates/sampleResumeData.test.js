import { describe, it, expect } from 'vitest'
import { sampleResumeData } from './sampleResumeData.js'

describe('sampleResumeData', () => {
  it('covers all nine resume sections', () => {
    expect(Object.keys(sampleResumeData)).toEqual([
      'personalInfo',
      'workExperience',
      'education',
      'trainings',
      'skills',
      'summary',
      'references',
      'achievements',
      'projects',
    ])
  })
})
