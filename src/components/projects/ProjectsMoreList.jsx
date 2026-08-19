import { useState } from 'react'

function isTechStackHeader(line, prevLine) {
  const trimmed = line.trim()
  if (!trimmed || trimmed.startsWith('-')) return false
  if (trimmed.endsWith(':')) return true
  const prevBlank = !prevLine || !prevLine.trim()
  return prevBlank && trimmed.length <= 60 && !trimmed.endsWith('.')
}

function TechStack({ techStack, isExpanded }) {
  if (!isExpanded) {
    return (
      <div className="line-clamp-2 whitespace-pre-line text-xs text-white/40">
        {techStack}
      </div>
    )
  }
  const lines = techStack.split('\n')
  return (
    <div className="text-xs text-white/40">
      {lines.map((line, i) => {
        if (!line.trim()) return null
        const isHeader = isTechStackHeader(line, lines[i - 1])
        return (
          <div
            key={i}
            className={
              isHeader ? 'mt-2 font-bold text-white/80 first:mt-0' : ''
            }
          >
            {line}
          </div>
        )
      })}
    </div>
  )
}

function ProjectsMoreList({ projects, selectedId, onSelect }) {
  const [expandedIds, setExpandedIds] = useState(new Set())

  function toggleExpanded(e, id) {
    e.stopPropagation()
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <h3 className="font-semibold text-white">More Projects</h3>
        <span className="text-xs text-white/40">{projects.length} found</span>
      </div>
      {projects.length === 0 && (
        <div className="py-6 text-center text-sm text-white/40">
          No projects found
        </div>
      )}
      <div className="divide-y divide-white/10">
        {projects.map((project) => {
          const isExpanded = expandedIds.has(project.id)
          return (
            <div
              key={project.id}
              role="button"
              tabIndex={0}
              onClick={() => onSelect(project.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onSelect(project.id)
                }
              }}
              className={`flex w-full cursor-pointer items-start gap-4 py-4 text-left ${
                selectedId === project.id ? 'bg-white/5' : ''
              }`}
            >
              {project.photoSrc ? (
                <img
                  src={project.photoSrc}
                  alt=""
                  className="h-20 w-28 shrink-0 rounded object-cover"
                />
              ) : (
                <span className="flex h-20 w-28 shrink-0 items-center justify-center rounded bg-white/5 text-3xl">
                  📁
                </span>
              )}
              <div className="min-w-0 flex-1">
                <div className="font-medium text-white">{project.title}</div>
                {project.description && (
                  <p
                    className={`mt-1 text-xs text-white/60 ${isExpanded ? '' : 'line-clamp-3'}`}
                  >
                    {project.description}
                  </p>
                )}
                {project.techStack && (
                  <div className="mt-2">
                    <div className="text-sm font-bold text-white">
                      Tech Stack
                    </div>
                    <TechStack
                      techStack={project.techStack}
                      isExpanded={isExpanded}
                    />
                  </div>
                )}
                {(project.description || project.techStack) && (
                  <button
                    type="button"
                    onClick={(e) => toggleExpanded(e, project.id)}
                    className="mt-2 text-xs font-semibold text-blue-400 hover:text-blue-300"
                  >
                    {isExpanded ? 'Show less' : 'Show more'}
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProjectsMoreList
