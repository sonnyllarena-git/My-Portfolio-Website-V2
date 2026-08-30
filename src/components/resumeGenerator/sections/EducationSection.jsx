import { useResumeGenerator } from '../ResumeGeneratorContext.jsx'
import RepeatableFieldList from '../RepeatableFieldList.jsx'
import RichTextField from '../RichTextField.jsx'
import LabeledInput from './LabeledInput.jsx'

const EMPTY_ENTRY = {
  school: '',
  degree: '',
  startDate: '',
  endDate: '',
  cityState: '',
  description: '',
}

function EducationSection() {
  const { education, setEducation } = useResumeGenerator()

  return (
    <div className="p-6">
      <RepeatableFieldList
        items={education}
        onChange={setEducation}
        emptyEntry={EMPTY_ENTRY}
        addLabel="one more education"
        renderItem={(item, index, update) => (
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <LabeledInput
                label="School"
                value={item.school}
                onChange={(value) => update({ school: value })}
              />
              <LabeledInput
                label="Degree"
                value={item.degree}
                onChange={(value) => update({ degree: value })}
              />
              <LabeledInput
                label="Start date"
                value={item.startDate}
                onChange={(value) => update({ startDate: value })}
              />
              <LabeledInput
                label="End date"
                value={item.endDate}
                onChange={(value) => update({ endDate: value })}
              />
              <LabeledInput
                label="City, State"
                value={item.cityState}
                onChange={(value) => update({ cityState: value })}
                className="col-span-2"
              />
            </div>
            <RichTextField
              value={item.description}
              onChange={(html) => update({ description: html })}
              placeholder="e.g. Graduated with High Honors"
            />
          </div>
        )}
      />
    </div>
  )
}

export default EducationSection
