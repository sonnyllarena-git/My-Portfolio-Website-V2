import { useResumeGenerator } from '../ResumeGeneratorContext.jsx'
import RepeatableFieldList from '../RepeatableFieldList.jsx'
import LabeledInput from './LabeledInput.jsx'

const EMPTY_ENTRY = { name: '', issuer: '', date: '' }

function TrainingsSection() {
  const { trainings, setTrainings } = useResumeGenerator()

  return (
    <div className="p-6">
      <RepeatableFieldList
        items={trainings}
        onChange={setTrainings}
        emptyEntry={EMPTY_ENTRY}
        addLabel="one more training"
        renderItem={(item, index, update) => (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <LabeledInput
              label="Name"
              value={item.name}
              onChange={(value) => update({ name: value })}
              className="col-span-2"
            />
            <LabeledInput
              label="Issuing organization"
              value={item.issuer}
              onChange={(value) => update({ issuer: value })}
            />
            <LabeledInput
              label="Date"
              value={item.date}
              onChange={(value) => update({ date: value })}
            />
          </div>
        )}
      />
    </div>
  )
}

export default TrainingsSection
