export const contactInfo = {
  headline: 'YOUR NAME - OFFICIAL CONTACT',
  fields: [
    { label: 'Name', value: 'Your Name' },
    { label: 'Based In', value: 'Your City, Country' },
    { label: 'Phone and WhatsApp', value: '+1 000 000 0000' },
    { label: 'Website', value: 'https://your-website.example', isLink: true },
  ],
  profiles: [
    { label: 'Twitter / X', url: 'https://x.com/yourhandle' },
    { label: 'Facebook', url: 'https://www.facebook.com/yourhandle' },
    { label: 'Instagram', url: 'https://www.instagram.com/yourhandle' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/yourhandle' },
    { label: 'Spotify', url: 'https://open.spotify.com/artist/yourid' },
  ],
}

export function buildContactText(info) {
  const lines = [info.headline, '']
  info.fields.forEach((field) => lines.push(`${field.label}: ${field.value}`))
  lines.push('', 'Official Profiles')
  info.profiles.forEach((profile) =>
    lines.push(`${profile.label}: ${profile.url}`),
  )
  return lines.join('\n')
}
