function RibbonMenu({ tabs, activeTab, onToggleTab }) {
  return (
    <div className="flex gap-4 border-b border-white/10 bg-[#1a1c22] px-3 text-xs text-white/70">
      {tabs.map((tab) => (
        <div key={tab.label} className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggleTab(tab.label)
            }}
            className={`cursor-pointer border-b-2 py-2 hover:text-white ${
              activeTab === tab.label
                ? 'border-blue-500 text-white'
                : 'border-transparent'
            }`}
          >
            {tab.label}
          </button>
          {activeTab === tab.label && (
            <div className="absolute top-full left-0 z-40 w-48 rounded-b-md border border-white/10 bg-[#1f2126] py-1 text-white shadow-xl">
              {tab.items.map((item) =>
                item.header ? (
                  <div
                    key={item.label}
                    className="px-3 py-1 text-white/40 uppercase"
                  >
                    {item.label}
                  </div>
                ) : (
                  <button
                    key={item.label}
                    onClick={(e) => {
                      e.stopPropagation()
                      item.onClick?.()
                      onToggleTab(null)
                    }}
                    className="block w-full px-3 py-1.5 text-left hover:bg-white/10"
                  >
                    {item.label}
                  </button>
                ),
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default RibbonMenu
