import { useState } from 'react'
import { projects } from '../../data/projectsLibrary.js'
import { CATEGORIES } from '../../data/projectCategories.js'

function ProjectsCategorySidebar({
  searchTerm,
  onSearchChange,
  onSelectCategory,
  onSelectProject,
}) {
  const [expandedCategory, setExpandedCategory] = useState(null)

  function categoryProjects(category) {
    return projects.filter(
      (project) =>
        project.category === category &&
        project.title.toLowerCase().includes(searchTerm.trim().toLowerCase()),
    )
  }

  function handleCategoryClick(category) {
    const next = expandedCategory === category ? null : category
    setExpandedCategory(next)
    onSelectCategory(next)
  }

  return (
    <div className="w-72 min-w-[280px] shrink-0 rounded-xl border border-white/10 bg-[#141414] p-4 text-sm text-white">
      <input
        type="text"
        placeholder="Search Project"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="mb-4 w-full rounded-lg bg-white/5 px-3 py-2 placeholder-white/40 focus:outline-none"
      />
      <h3 className="mb-2 font-semibold text-white/70">Categories</h3>
      <div className="space-y-2">
        {CATEGORIES.map((category) => {
          const items = categoryProjects(category)
          const isExpanded = expandedCategory === category
          return (
            <div key={category}>
              <button
                type="button"
                onClick={() => handleCategoryClick(category)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left ${
                  isExpanded
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/5 text-white/80 hover:bg-white/10'
                }`}
              >
                <span className="truncate">{category}</span>
                <span className="ml-2 shrink-0">{items.length}</span>
              </button>
              {isExpanded && (
                <div className="mt-1 space-y-1 rounded-lg bg-black/30 p-2">
                  {items.length === 0 && (
                    <div className="px-2 py-1 text-xs text-white/40">
                      No projects yet
                    </div>
                  )}
                  {items.map((project) => (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => onSelectProject(project.id)}
                      className="block w-full rounded px-2 py-1 text-left text-xs text-white/70 hover:bg-white/10"
                    >
                      {project.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProjectsCategorySidebar
