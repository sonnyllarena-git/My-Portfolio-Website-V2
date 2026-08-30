import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import RepeatableFieldList from './RepeatableFieldList.jsx'

afterEach(cleanup)

function renderList(items, onChange) {
  return render(
    <RepeatableFieldList
      items={items}
      onChange={onChange}
      emptyEntry={{ name: '' }}
      addLabel="entry"
      renderItem={(item, index) => <span>{item.name || `row-${index}`}</span>}
    />,
  )
}

describe('RepeatableFieldList', () => {
  it('appends a blank row when Add is clicked', () => {
    const handleChange = vi.fn()
    renderList([{ name: 'first' }], handleChange)

    fireEvent.click(screen.getByText('+ entry'))

    expect(handleChange).toHaveBeenCalledWith([{ name: 'first' }, { name: '' }])
  })

  it('removes only the targeted row', () => {
    const handleChange = vi.fn()
    renderList([{ name: 'first' }, { name: 'second' }], handleChange)

    const removeButtons = screen.getAllByLabelText('Remove')
    fireEvent.click(removeButtons[0])

    expect(handleChange).toHaveBeenCalledWith([{ name: 'second' }])
  })
})
