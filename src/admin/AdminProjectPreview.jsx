import {
  ADMIN_CARD_BORDER,
  ADMIN_ACCENT_BG,
  ADMIN_ACCENT_HOVER_BG,
  ADMIN_SECONDARY_TEXT,
} from './adminTheme.js'

export default function AdminProjectPreview({
  project,
  onClose,
  onPublish,
  publishing,
}) {
  return (
    <div
      className={`mb-4 overflow-hidden rounded-lg border ${ADMIN_CARD_BORDER} bg-white`}
    >
      <div
        className={`flex items-center justify-between border-b ${ADMIN_CARD_BORDER} p-3`}
      >
        <p className={`text-sm ${ADMIN_SECONDARY_TEXT}`}>
          Previewing as a visitor would see it —{' '}
          {project.published
            ? 'published'
            : 'draft, not visible on Sonny Projects yet'}
        </p>
        <div className="flex gap-2">
          {!project.published && (
            <button
              type="button"
              onClick={() => onPublish(project)}
              disabled={publishing}
              className={`rounded ${ADMIN_ACCENT_BG} ${ADMIN_ACCENT_HOVER_BG} px-3 py-1.5 text-sm font-medium text-white disabled:opacity-50`}
            >
              {publishing ? 'Publishing…' : 'Publish'}
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className={`rounded border ${ADMIN_CARD_BORDER} px-3 py-1.5 text-sm`}
          >
            Close preview
          </button>
        </div>
      </div>
      <div className="bg-[#0b0d12] p-6 text-white">
        <div className="relative mx-auto aspect-[1024/559] w-full max-w-2xl overflow-hidden rounded-xl border border-white/10 shadow-2xl">
          {project.photoUrl ? (
            <img
              src={project.photoUrl}
              alt=""
              className="h-full w-full object-cover object-center"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-white/5 text-6xl">
              📁
            </div>
          )}
        </div>
        <div className="mx-auto max-w-2xl pt-4">
          <div className="text-xs font-semibold tracking-widest text-blue-400 uppercase">
            {project.category}
          </div>
          <h2 className="mt-1 text-2xl font-bold text-white">
            {project.title}
          </h2>
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
          {project.projectLink && (
            <a
              href={project.projectLink}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-blue-400 hover:text-blue-300"
            >
              View Project ↗
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
