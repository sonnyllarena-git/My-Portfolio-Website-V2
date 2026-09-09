import { useEffect, useState } from 'react'
import { apiFetch } from './api.js'
import AdminStatTile from './AdminStatTile.jsx'
import AdminBarChart from './AdminBarChart.jsx'
import AdminPieChart from './AdminPieChart.jsx'
import { ADMIN_CARD_BORDER, ADMIN_SECONDARY_TEXT } from './adminTheme.js'

const PALETTE = [
  '#3b82f6',
  '#22c55e',
  '#f59e0b',
  '#a855f7',
  '#ec4899',
  '#14b8a6',
  '#ef4444',
  '#64748b',
  '#0ea5e9',
  '#84cc16',
]

const EMPTY_SECTIONS = {
  inquiries: [],
  products: [],
  projects: [],
  templates: [],
  memoryWall: [],
  visitorArts: [],
  musicLab: [],
}

async function settle(path) {
  try {
    return await apiFetch(path)
  } catch {
    return []
  }
}

export default function AdminDashboardPage() {
  const [sections, setSections] = useState(EMPTY_SECTIONS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      settle('/inquiries'),
      settle('/products'),
      settle('/projects'),
      settle('/resume-templates'),
      settle('/memory-wall'),
      settle('/visitor-arts'),
      settle('/music-lab'),
    ]).then(
      ([
        inquiries,
        products,
        projects,
        templates,
        memoryWall,
        visitorArts,
        musicLab,
      ]) => {
        setSections({
          inquiries,
          products,
          projects,
          templates,
          memoryWall,
          visitorArts,
          musicLab,
        })
        setLoading(false)
      },
    )
  }, [])

  const {
    inquiries,
    products,
    projects,
    templates,
    memoryWall,
    visitorArts,
    musicLab,
  } = sections

  const unreadInquiries = inquiries.filter((i) => !i.read).length
  const publishedCount =
    products.filter((p) => p.published).length +
    projects.filter((p) => p.published).length +
    templates.filter((t) => t.published).length
  const draftCount =
    products.length + projects.length + templates.length - publishedCount
  const averageRating = memoryWall.length
    ? (
        memoryWall.reduce((sum, note) => sum + (note.rating ?? 0), 0) /
        memoryWall.length
      ).toFixed(1)
    : '—'
  const videoCount = musicLab.filter((item) => item.type === 'video').length
  const trackCount = musicLab.filter((item) => item.type === 'track').length

  const categoryTotals = new Map()
  for (const project of projects) {
    const key = project.category || 'Uncategorized'
    categoryTotals.set(key, (categoryTotals.get(key) ?? 0) + 1)
  }
  const categoryData = [...categoryTotals.entries()].map(
    ([label, value], index) => ({
      label,
      value,
      color: PALETTE[index % PALETTE.length],
    }),
  )

  const volumeData = [
    { label: 'Inquiries', value: inquiries.length, color: PALETTE[0] },
    { label: 'Products', value: products.length, color: PALETTE[1] },
    { label: 'Projects', value: projects.length, color: PALETTE[2] },
    { label: 'Resume Templates', value: templates.length, color: PALETTE[3] },
    { label: 'Memory Wall', value: memoryWall.length, color: PALETTE[4] },
    { label: 'Visitor Arts', value: visitorArts.length, color: PALETTE[5] },
    { label: 'Music Lab', value: musicLab.length, color: PALETTE[6] },
  ]

  const publishStatusData = [
    { label: 'Published', value: publishedCount, color: '#22c55e' },
    { label: 'Draft', value: draftCount, color: '#94a3b8' },
  ]

  const musicLabTypeData = [
    { label: 'Video', value: videoCount, color: '#3b82f6' },
    { label: 'Music', value: trackCount, color: '#f59e0b' },
  ]

  if (loading) {
    return <p className={`text-sm ${ADMIN_SECONDARY_TEXT}`}>Loading…</p>
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-lg font-semibold">Dashboard</h1>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <AdminStatTile
          label="Inquiries"
          value={inquiries.length}
          sublabel={`${unreadInquiries} unread`}
        />
        <AdminStatTile label="Products" value={products.length} />
        <AdminStatTile label="Projects" value={projects.length} />
        <AdminStatTile label="Resume Templates" value={templates.length} />
        <AdminStatTile
          label="Memory Wall"
          value={memoryWall.length}
          sublabel={`avg rating ${averageRating}`}
        />
        <AdminStatTile label="Visitor Arts" value={visitorArts.length} />
        <AdminStatTile label="Music Lab" value={musicLab.length} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className={`rounded-lg border ${ADMIN_CARD_BORDER} bg-white p-4`}>
          <h2 className="mb-3 text-sm font-semibold">Content by section</h2>
          <AdminBarChart data={volumeData} />
        </div>
        <div className={`rounded-lg border ${ADMIN_CARD_BORDER} bg-white p-4`}>
          <h2 className="mb-3 text-sm font-semibold">Projects by category</h2>
          <AdminPieChart data={categoryData} emptyLabel="No projects yet" />
        </div>
        <div className={`rounded-lg border ${ADMIN_CARD_BORDER} bg-white p-4`}>
          <h2 className="mb-3 text-sm font-semibold">
            Published vs draft (Products, Projects, Resume Templates)
          </h2>
          <AdminPieChart data={publishStatusData} />
        </div>
        <div className={`rounded-lg border ${ADMIN_CARD_BORDER} bg-white p-4`}>
          <h2 className="mb-3 text-sm font-semibold">
            Music Lab: video vs music
          </h2>
          <AdminPieChart
            data={musicLabTypeData}
            emptyLabel="No media uploaded yet"
          />
        </div>
      </div>
    </div>
  )
}
