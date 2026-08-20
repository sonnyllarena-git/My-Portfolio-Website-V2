function ProjectsHero({ project, isMobile = false }) {
  if (!project) {
    return (
      <div
        className={`flex items-center justify-center rounded-xl border border-white/10 bg-[#141414] text-white/40 ${
          isMobile ? 'py-16' : 'h-[500px]'
        }`}
      >
        Select a project
      </div>
    )
  }

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#141414] ${
        isMobile ? '' : 'h-[500px]'
      }`}
    >
      <div className="scrollbar-black flex-1 overflow-y-auto p-4">
        <div className="relative mx-auto mt-2 aspect-[1024/559] w-full max-w-[1024px] overflow-hidden rounded-xl border border-white/10 shadow-2xl">
          {project.photoSrc ? (
            <img
              src={project.photoSrc}
              alt=""
              className="h-full w-full object-cover object-center"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-white/5 text-6xl">
              📁
            </div>
          )}
        </div>
        <div className="pt-4">
          <h2 className="text-2xl font-bold text-white">{project.title}</h2>
          {project.description && (
            <p className="mt-2 text-sm leading-relaxed text-gray-400">
              {project.description}
            </p>
          )}
          {project.tags.length > 0 && (
            <>
              <div className="mt-6 mb-3 text-sm font-bold text-white">
                Tech Stack
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/5 bg-white/10 px-3 py-1.5 text-xs font-medium text-gray-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      {project.projectLink && (
        <div className="shrink-0 border-t border-white/10 bg-[#141414] px-6 py-4 text-center">
          <a
            href={project.projectLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-sm font-semibold text-blue-400 transition-colors hover:text-blue-300"
          >
            View Project ↗
          </a>
        </div>
      )}
    </div>
  )
}

export default ProjectsHero
