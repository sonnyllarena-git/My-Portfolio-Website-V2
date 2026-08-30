import { useResumeGenerator } from '../ResumeGeneratorContext.jsx'
import RepeatableFieldList from '../RepeatableFieldList.jsx'
import LabeledInput from './LabeledInput.jsx'

const EMPTY_ENTRY = { name: '', titleCompany: '', email: '', phone: '' }

function ReferencesSection() {
  const { references, setReferences } = useResumeGenerator()

  return (
    <div className="p-6">
      <RepeatableFieldList
        items={references}
        onChange={setReferences}
        emptyEntry={EMPTY_ENTRY}
        addLabel="one more reference"
        renderItem={(item, index, update) => (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <LabeledInput
              label="Name"
              value={item.name}
              onChange={(value) => update({ name: value })}
            />
            <LabeledInput
              label="Title / Company"
              value={item.titleCompany}
              onChange={(value) => update({ titleCompany: value })}
            />
            <LabeledInput
              label="Email"
              value={item.email}
              onChange={(value) => update({ email: value })}
            />
            <LabeledInput
              label="Phone"
              value={item.phone}
              onChange={(value) => update({ phone: value })}
            />
          </div>
        )}
      />
    </div>
  )
}

export default ReferencesSection
