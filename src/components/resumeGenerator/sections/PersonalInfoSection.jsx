import { useResumeGenerator } from '../ResumeGeneratorContext.jsx'

const FIELDS = [
  { name: 'targetRole', label: 'Target role' },
  { name: 'firstName', label: 'First name' },
  { name: 'lastName', label: 'Last name' },
  { name: 'email', label: 'Email' },
  { name: 'phone', label: 'Phone' },
  { name: 'address', label: 'Address' },
  { name: 'cityState', label: 'City, State' },
  { name: 'country', label: 'Country' },
  { name: 'website', label: 'Website' },
]

function PersonalInfoSection() {
  const { personalInfo, updatePersonalInfoField } = useResumeGenerator()

  function handlePhotoChange(event) {
    const file = event.target.files[0]
    if (!file) return
    updatePersonalInfoField('photoUrl', URL.createObjectURL(file))
  }

  return (
    <div className="flex flex-col gap-4 p-6">
      <label className="flex flex-col items-start gap-1 text-sm">
        Photo
        {personalInfo.photoUrl && (
          <img
            src={personalInfo.photoUrl}
            alt="Photo preview"
            className="h-20 w-20 rounded object-cover"
          />
        )}
        <input type="file" accept="image/*" onChange={handlePhotoChange} />
      </label>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {FIELDS.map(({ name, label }) => (
          <label key={name} className="flex flex-col gap-1 text-sm">
            {label}
            <input
              type="text"
              value={personalInfo[name]}
              onChange={(event) =>
                updatePersonalInfoField(name, event.target.value)
              }
              className="rounded border border-white/20 bg-white/5 p-2"
            />
          </label>
        ))}
      </div>
    </div>
  )
}

export default PersonalInfoSection
