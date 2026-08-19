function ProjectsHero({ project }) {
  if (!project) {
    return (
      <div className="flex h-64 items-center justify-center rounded-xl border border-white/10 bg-[#141414] text-white/40">
        Select a project
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 items-start gap-6 rounded-xl border border-white/10 bg-[#141414] p-6 md:grid-cols-12">
      <div className="md:col-span-5">
        {project.photoSrc ? (
          <img
            src={project.photoSrc}
            alt=""
            className="aspect-[4/3] w-full rounded-lg object-cover object-center"
          />
        ) : (
          <div className="flex aspect-[4/3] w-full items-center justify-center rounded-lg bg-white/5 text-6xl">
            📁
          </div>
        )}
      </div>
      <div className="md:col-span-7">
        <h2 className="text-2xl font-semibold text-white">{project.title}</h2>
        {project.description && (
          <p className="mt-3 line-clamp-3 text-sm text-white/60">
            {project.description}
          </p>
        )}
        {project.techStack && (
          <div className="mt-3 text-sm text-white/70">
            <span className="font-semibold text-white/90">Tech Stack</span>
            <div className="mt-1 whitespace-pre-line">{project.techStack}</div>
          </div>
        )}
        {project.projectLink && (
          <a
            href={project.projectLink}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block rounded bg-blue-500/20 px-4 py-2 text-sm text-blue-400 hover:bg-blue-500/30"
          >
            View Project ↗
          </a>
        )}
      </div>
    </div>
  )
}

export default ProjectsHero
