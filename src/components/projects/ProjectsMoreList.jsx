function ProjectsMoreList({ projects, selectedId, onSelect }) {
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
        {projects.map((project) => (
          <button
            key={project.id}
            type="button"
            onClick={() => onSelect(project.id)}
            className={`flex w-full items-start gap-4 py-4 text-left ${
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
                <p className="mt-1 line-clamp-3 text-xs text-white/60">
                  {project.description}
                </p>
              )}
              {project.techStack && (
                <div className="mt-2 line-clamp-2 text-xs whitespace-pre-line text-white/40">
                  Tech Stack: {project.techStack}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProjectsMoreList
