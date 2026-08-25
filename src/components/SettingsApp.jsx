import { useState } from 'react'
import MonitorIcon from './icons/MonitorIcon.jsx'
import PaletteIcon from './icons/PaletteIcon.jsx'
import ShieldIcon from './icons/ShieldIcon.jsx'
import SupportIcon from './icons/SupportIcon.jsx'
import UserIcon from './icons/UserIcon.jsx'
import ContactPage from './settings/ContactPage.jsx'
import GetSupportPage from './settings/GetSupportPage.jsx'
import PersonalizationPage from './settings/PersonalizationPage.jsx'
import PrivacySecurityPage from './settings/PrivacySecurityPage.jsx'
import SystemPage from './settings/SystemPage.jsx'
import { useIsMobile } from '../hooks/useIsMobile.js'

const TABS = [
  { id: 'system', label: 'System', Icon: MonitorIcon },
  { id: 'personalization', label: 'Personalization', Icon: PaletteIcon },
  { id: 'contact', label: 'Contact', Icon: UserIcon },
  { id: 'privacy', label: 'Privacy & security', Icon: ShieldIcon },
  { id: 'support', label: 'Get Support', Icon: SupportIcon },
]

function SettingsApp({ onOpenGmail, onOpenZoomChat, initialTab = 'system' }) {
  const isMobile = useIsMobile()
  const [activeTab, setActiveTab] = useState(initialTab)

  return (
    <div className={`flex h-full text-white ${isMobile ? 'flex-col' : ''}`}>
      <div
        className={
          isMobile
            ? 'flex w-full shrink-0 items-center gap-1 overflow-x-auto border-b border-white/10 bg-[#12141a] p-2 text-sm'
            : 'w-56 shrink-0 border-r border-white/10 bg-[#12141a] p-4 text-sm'
        }
      >
        {!isMobile && <h2 className="mb-4 text-lg font-semibold">Settings</h2>}
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={
              isMobile
                ? `flex shrink-0 items-center gap-2 rounded px-3 py-1.5 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'hover:bg-white/5'
                  }`
                : `flex w-full items-center gap-2 rounded px-2 py-2 text-left ${
                    activeTab === tab.id
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'hover:bg-white/5'
                  }`
            }
          >
            <tab.Icon className="h-5 w-5" />
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto p-6 text-sm">
        {activeTab === 'system' && <SystemPage />}
        {activeTab === 'personalization' && <PersonalizationPage />}
        {activeTab === 'contact' && <ContactPage />}
        {activeTab === 'privacy' && <PrivacySecurityPage />}
        {activeTab === 'support' && (
          <GetSupportPage
            onOpenGmail={onOpenGmail}
            onOpenZoomChat={onOpenZoomChat}
          />
        )}
      </div>
    </div>
  )
}

export default SettingsApp
