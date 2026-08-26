import { describe, expect, it } from 'vitest'
import { buildContactIcons } from './buildContactIcons.js'
import { contactInfo } from '../data/contactInfo.js'

describe('buildContactIcons', () => {
  it('maps the real contactInfo data to icon descriptors', () => {
    const icons = buildContactIcons(contactInfo)

    expect(icons).toHaveLength(7)

    const website = icons.find((icon) => icon.id === 'website')
    expect(website).toMatchObject({
      id: 'website',
      label: 'Website',
      href: 'https://your-website.example',
    })
    expect(website.stat.isPlaceholder).toBe(true)

    const phone = icons.find((icon) => icon.id === 'phone')
    expect(phone).toMatchObject({
      id: 'phone',
      label: 'Phone and WhatsApp',
      href: '+1 000 000 0000',
    })

    ;['twitter', 'facebook', 'instagram', 'linkedin', 'spotify'].forEach(
      (id) => {
        const icon = icons.find((entry) => entry.id === id)
        expect(icon).toBeDefined()
        expect(icon.href).toMatch(/^https:\/\//)
        expect(icon.stat.isPlaceholder).toBe(true)
      },
    )
  })

  it('excludes entries without a kind and never throws on empty input', () => {
    const withoutKind = {
      fields: [{ label: 'Name', value: 'Your Name' }],
      profiles: [],
    }
    expect(buildContactIcons(withoutKind)).toEqual([])

    const empty = { fields: [], profiles: [] }
    expect(buildContactIcons(empty)).toEqual([])
  })
})
