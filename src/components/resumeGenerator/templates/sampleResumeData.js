export const sampleResumeData = {
  personalInfo: {
    firstName: 'Jamie',
    lastName: 'Rivera',
    targetRole: 'Frontend Developer',
    email: 'jamie.rivera@example.com',
    phone: '(555) 123-4567',
    address: '123 Maple Street',
    cityState: 'Austin, TX',
    country: 'United States',
    website: 'www.jamierivera.example.com',
    photoUrl: null,
  },
  workExperience: [
    {
      employer: 'Brightwave Studio',
      title: 'Frontend Developer',
      startDate: '2023-01',
      endDate: 'Present',
      cityState: 'Austin, TX',
      description:
        '<p>Built and maintained React interfaces for client dashboards.</p>',
    },
    {
      employer: 'Northline Labs',
      title: 'Junior Developer',
      startDate: '2021-06',
      endDate: '2022-12',
      cityState: 'Remote',
      description:
        '<p>Shipped bug fixes and small features across a Node/React codebase.</p>',
    },
  ],
  education: [
    {
      school: 'University of Texas',
      degree: 'B.S. Computer Science',
      startDate: '2017-09',
      endDate: '2021-05',
      cityState: 'Austin, TX',
      description: '<p>Graduated with honors.</p>',
    },
  ],
  trainings: [
    {
      name: 'AWS Certified Developer – Associate',
      issuer: 'Amazon Web Services',
      date: '2023-08',
    },
  ],
  skills: [
    { name: 'JavaScript', level: 'Expert' },
    { name: 'React', level: 'Expert' },
    { name: 'Node.js', level: 'Intermediate' },
  ],
  summary:
    '<p>Frontend developer with 3+ years of experience building responsive, accessible web applications.</p>',
  references: [
    {
      name: 'Alex Chen',
      titleCompany: 'Engineering Manager, Brightwave Studio',
      email: 'alex.chen@example.com',
      phone: '(555) 987-6543',
    },
  ],
  achievements: [
    { description: 'Reduced page load time by 40% through code-splitting.' },
    { description: 'Mentored 3 junior developers onto the team.' },
  ],
  projects: [
    {
      name: 'Internal Design System',
      date: '2024',
      description:
        '<p>Built a shared component library adopted across 4 product teams.</p>',
    },
  ],
}
