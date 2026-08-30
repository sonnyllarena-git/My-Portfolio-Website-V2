import { createContext, useContext, useState } from 'react'

const ResumeGeneratorContext = createContext(null)

const EMPTY_PERSONAL_INFO = {
  firstName: '',
  lastName: '',
  targetRole: '',
  email: '',
  phone: '',
  address: '',
  cityState: '',
  country: '',
  website: '',
  photoUrl: '',
}

export function ResumeGeneratorProvider({ children }) {
  const [selectedTemplateKey, setSelectedTemplateKey] = useState(null)
  const [personalInfo, setPersonalInfo] = useState(EMPTY_PERSONAL_INFO)
  const [workExperience, setWorkExperience] = useState([])
  const [education, setEducation] = useState([])
  const [trainings, setTrainings] = useState([])
  const [skills, setSkills] = useState([])
  const [summary, setSummary] = useState('')
  const [references, setReferences] = useState([])
  const [achievements, setAchievements] = useState([])
  const [projects, setProjects] = useState([])

  function updatePersonalInfoField(field, value) {
    setPersonalInfo((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <ResumeGeneratorContext.Provider
      value={{
        selectedTemplateKey,
        setSelectedTemplateKey,
        personalInfo,
        setPersonalInfo,
        updatePersonalInfoField,
        workExperience,
        setWorkExperience,
        education,
        setEducation,
        trainings,
        setTrainings,
        skills,
        setSkills,
        summary,
        setSummary,
        references,
        setReferences,
        achievements,
        setAchievements,
        projects,
        setProjects,
      }}
    >
      {children}
    </ResumeGeneratorContext.Provider>
  )
}

export function useResumeGenerator() {
  const context = useContext(ResumeGeneratorContext)
  if (!context) {
    throw new Error(
      'useResumeGenerator must be used within a ResumeGeneratorProvider',
    )
  }
  return context
}
