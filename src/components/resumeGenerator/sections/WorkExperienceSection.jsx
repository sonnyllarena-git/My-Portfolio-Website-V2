import { useResumeGenerator } from '../ResumeGeneratorContext.jsx'
import RepeatableFieldList from '../RepeatableFieldList.jsx'
import RichTextField from '../RichTextField.jsx'
import LabeledInput from './LabeledInput.jsx'

const EMPTY_ENTRY = {
  employer: '',
  title: '',
  startDate: '',
  endDate: '',
  cityState: '',
  description: '',
}

function WorkExperienceSection() {
  const { workExperience, setWorkExperience } = useResumeGenerator()

  return (
    <div className="p-6">
      <RepeatableFieldList
        items={workExperience}
        onChange={setWorkExperience}
        emptyEntry={EMPTY_ENTRY}
        addLabel="one more employment"
        renderItem={(item, index, update) => (
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <LabeledInput
                label="Employer"
                value={item.employer}
                onChange={(value) => update({ employer: value })}
              />
              <LabeledInput
                label="Job title"
                value={item.title}
                onChange={(value) => update({ title: value })}
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
              placeholder="Describe your responsibilities and achievements"
            />
          </div>
        )}
      />
    </div>
  )
}

export default WorkExperienceSection
