import { useResumeGenerator } from '../ResumeGeneratorContext.jsx'
import RepeatableFieldList from '../RepeatableFieldList.jsx'
import LabeledInput from './LabeledInput.jsx'

const LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert']
const EMPTY_ENTRY = { name: '', level: 'Intermediate' }

function SkillsSection() {
  const { skills, setSkills } = useResumeGenerator()

  return (
    <div className="p-6">
      <RepeatableFieldList
        items={skills}
        onChange={setSkills}
        emptyEntry={EMPTY_ENTRY}
        addLabel="one more skill"
        renderItem={(item, index, update) => (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <LabeledInput
              label="Skill"
              value={item.name}
              onChange={(value) => update({ name: value })}
            />
            <label className="flex flex-col gap-1 text-sm">
              Level
              <select
                value={item.level}
                onChange={(event) => update({ level: event.target.value })}
                className="rounded border border-white/20 bg-white/5 p-2"
              >
                {LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}
      />
    </div>
  )
}

export default SkillsSection
