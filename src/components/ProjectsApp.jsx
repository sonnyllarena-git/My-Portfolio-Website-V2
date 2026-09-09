import { useState } from 'react'
import ProjectsCategorySidebar from './projects/ProjectsCategorySidebar.jsx'
import ProjectsHero from './projects/ProjectsHero.jsx'
import ProjectsMoreList from './projects/ProjectsMoreList.jsx'
import { useIsMobile } from '../hooks/useIsMobile.js'
import {
  ProjectsCatalogProvider,
  useProjectsCatalog,
} from '../context/ProjectsCatalogContext.jsx'
import projectsBackground from './projects/assets/Futuristic.png'

function ProjectsAppContent() {
  const isMobile = useIsMobile()
  const { projects, loading, error } = useProjectsCatalog()
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedId, setSelectedId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const effectiveSelectedId = selectedId ?? projects[0]?.id ?? null

  const filteredProjects = projects.filter(
    (project) =>
      (!selectedCategory || project.category === selectedCategory) &&
      project.title.toLowerCase().includes(searchTerm.trim().toLowerCase()),
  )
  const selectedProject = projects.find(
    (project) => project.id === effectiveSelectedId,
  )

  return (
    <div
      className="scrollbar-dark h-full overflow-y-auto bg-[#0b0d12] bg-center bg-no-repeat text-white"
      style={{
        backgroundImage: `url(${projectsBackground})`,
        backgroundSize: '1672px 940px',
      }}
    >
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
        {error && (
          <p className="mb-6 rounded bg-red-500/10 p-3 text-center text-sm text-red-400">
            {error}
          </p>
        )}
        {!loading && !error && projects.length === 0 && (
          <p className="mb-6 text-center text-sm text-white/40">
            No projects published yet.
          </p>
        )}
        <div className={`pb-8 ${isMobile ? 'flex flex-col gap-6' : 'flex'}`}>
          <ProjectsCategorySidebar
            projects={projects}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onSelectCategory={setSelectedCategory}
            onSelectProject={setSelectedId}
            isMobile={isMobile}
          />
          <div className={isMobile ? 'flex-1' : 'flex-1 pl-6'}>
            <ProjectsHero project={selectedProject} isMobile={isMobile} />
            <ProjectsMoreList
              projects={filteredProjects}
              selectedId={effectiveSelectedId}
              onSelect={setSelectedId}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectsApp() {
  return (
    <ProjectsCatalogProvider>
      <ProjectsAppContent />
    </ProjectsCatalogProvider>
  )
}

export default ProjectsApp
