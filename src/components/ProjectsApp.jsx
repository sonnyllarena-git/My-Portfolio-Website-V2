import { useState } from 'react'
import { projects } from '../data/projectsLibrary.js'
import ProjectsCategorySidebar from './projects/ProjectsCategorySidebar.jsx'
import ProjectsHero from './projects/ProjectsHero.jsx'
import ProjectsMoreList from './projects/ProjectsMoreList.jsx'

function ProjectsApp() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedId, setSelectedId] = useState(projects[0]?.id ?? null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProjects = projects.filter(
    (project) =>
      (!selectedCategory || project.category === selectedCategory) &&
      project.title.toLowerCase().includes(searchTerm.trim().toLowerCase()),
  )
  const selectedProject = projects.find((project) => project.id === selectedId)

  return (
    <div className="scrollbar-dark h-full overflow-y-auto bg-[#0b0d12] text-white">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="mb-8 border-b border-white/10 pt-8 pb-6">
          <div className="text-xs font-semibold tracking-widest text-blue-400 uppercase">
            Official Projects
          </div>
          <h1 className="mt-2 text-4xl font-bold tracking-wide uppercase">
            Sonny Projects
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-white/60">
            AI integration, custom automation, software engineering, and social
            media management and end-to-end IT solutions.
          </p>
        </div>
        <div className="flex pb-8">
          <ProjectsCategorySidebar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onSelectCategory={setSelectedCategory}
            onSelectProject={setSelectedId}
          />
          <div className="flex-1 pl-6">
            <ProjectsHero project={selectedProject} />
            <ProjectsMoreList
              projects={filteredProjects}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectsApp
