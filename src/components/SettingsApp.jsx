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

const TABS = [
  { id: 'system', label: 'System', Icon: MonitorIcon },
  { id: 'personalization', label: 'Personalization', Icon: PaletteIcon },
  { id: 'contact', label: 'Contact', Icon: UserIcon },
  { id: 'privacy', label: 'Privacy & security', Icon: ShieldIcon },
  { id: 'support', label: 'Get Support', Icon: SupportIcon },
]

function SettingsApp({ onOpenGmail }) {
  const [activeTab, setActiveTab] = useState('system')

  return (
    <div className="flex h-full text-white">
      <div className="w-56 shrink-0 border-r border-white/10 bg-[#12141a] p-4 text-sm">
        <h2 className="mb-4 text-lg font-semibold">Settings</h2>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex w-full items-center gap-2 rounded px-2 py-2 text-left ${
              activeTab === tab.id
                ? 'bg-blue-500/20 text-blue-400'
                : 'hover:bg-white/5'
            }`}
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
          <GetSupportPage onOpenGmail={onOpenGmail} />
        )}
      </div>
    </div>
  )
}

export default SettingsApp
