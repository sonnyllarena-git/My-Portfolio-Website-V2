export function mapCatalogProjectToProject(row) {
  return {
    id: row.code,
    title: row.title,
    description: row.description ?? '',
    techStack: row.techStack ?? '',
    category: row.category ?? '',
    projectLink: row.projectLink ?? '',
    tags: row.tags ?? [],
    photoSrc: row.photoUrl ?? null,
  }
}
