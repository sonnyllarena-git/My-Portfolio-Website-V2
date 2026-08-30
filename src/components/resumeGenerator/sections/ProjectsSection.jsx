import { useResumeGenerator } from '../ResumeGeneratorContext.jsx'
import RepeatableFieldList from '../RepeatableFieldList.jsx'
import RichTextField from '../RichTextField.jsx'
import LabeledInput from './LabeledInput.jsx'

const EMPTY_ENTRY = { name: '', date: '', description: '' }

function ProjectsSection() {
  const { projects, setProjects } = useResumeGenerator()

  return (
    <div className="p-6">
      <RepeatableFieldList
        items={projects}
        onChange={setProjects}
        emptyEntry={EMPTY_ENTRY}
        addLabel="one more project"
        renderItem={(item, index, update) => (
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <LabeledInput
                label="Project name"
                value={item.name}
                onChange={(value) => update({ name: value })}
              />
              <LabeledInput
                label="Date"
                value={item.date}
                onChange={(value) => update({ date: value })}
              />
            </div>
            <RichTextField
              value={item.description}
              onChange={(html) => update({ description: html })}
              placeholder="Describe the project and its outcomes"
            />
          </div>
        )}
      />
    </div>
  )
}

export default ProjectsSection
