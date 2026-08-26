export const contactInfo = {
  headline: 'YOUR NAME - OFFICIAL CONTACT',
  fields: [
    { label: 'Name', value: 'Your Name' },
    { label: 'Role', value: 'Your Role / Title' },
    { label: 'Based In', value: 'Your City, Country' },
    {
      label: 'Phone and WhatsApp',
      value: '+1 000 000 0000',
      kind: 'phone',
      stat: {
        label: 'Avg. Response Time',
        value: '< 24 hrs',
        isPlaceholder: true,
      },
    },
    {
      label: 'Website',
      value: 'https://your-website.example',
      isLink: true,
      kind: 'website',
      stat: { label: 'Monthly Visits', value: '8.2K', isPlaceholder: true },
    },
  ],
  profiles: [
    {
      label: 'Twitter / X',
      url: 'https://x.com/yourhandle',
      kind: 'twitter',
      stat: { label: 'Followers', value: '12.4K', isPlaceholder: true },
    },
    {
      label: 'Facebook',
      url: 'https://www.facebook.com/yourhandle',
      kind: 'facebook',
      stat: { label: 'Followers', value: '9.1K', isPlaceholder: true },
    },
    {
      label: 'Instagram',
      url: 'https://www.instagram.com/yourhandle',
      kind: 'instagram',
      stat: { label: 'Followers', value: '15.7K', isPlaceholder: true },
    },
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/yourhandle',
      kind: 'linkedin',
      stat: { label: 'Connections', value: '3.8K', isPlaceholder: true },
    },
    {
      label: 'Spotify',
      url: 'https://open.spotify.com/artist/yourid',
      kind: 'spotify',
      stat: { label: 'Monthly Listeners', value: '2.3K', isPlaceholder: true },
    },
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
