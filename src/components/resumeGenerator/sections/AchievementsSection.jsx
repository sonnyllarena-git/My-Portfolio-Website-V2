import { useResumeGenerator } from '../ResumeGeneratorContext.jsx'
import RepeatableFieldList from '../RepeatableFieldList.jsx'
import LabeledInput from './LabeledInput.jsx'

const EMPTY_ENTRY = { description: '' }

function AchievementsSection() {
  const { achievements, setAchievements } = useResumeGenerator()

  return (
    <div className="p-6">
      <RepeatableFieldList
        items={achievements}
        onChange={setAchievements}
        emptyEntry={EMPTY_ENTRY}
        addLabel="one more achievement"
        renderItem={(item, index, update) => (
          <LabeledInput
            label="Achievement"
            value={item.description}
            onChange={(value) => update({ description: value })}
          />
        )}
      />
    </div>
  )
}

export default AchievementsSection
