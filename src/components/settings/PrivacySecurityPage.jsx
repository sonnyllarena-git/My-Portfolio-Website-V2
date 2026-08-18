function InfoBlock({ title, children }) {
  return (
    <div className="rounded-lg border border-white/10 bg-[#181a20] p-4">
      <h3 className="mb-2 font-semibold">{title}</h3>
      <p className="text-sm text-white/60">{children}</p>
    </div>
  )
}

function PrivacySecurityPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Privacy & security</h2>
      <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#181a20] p-4">
        <span className="text-2xl text-blue-400">🛡️</span>
        <div>
          <div className="font-semibold">Privacy & Security</div>
          <div className="text-sm text-white/60">Your data is protected</div>
        </div>
      </div>
      <InfoBlock title="Terms of Use">
        Welcome to SonnyOS. This is the interactive portfolio environment built
        by Sonny Llarena. Please respect the creative work, original content,
        and system design. Reach out via Get Support for collaboration,
        licensing, or project inquiries.
      </InfoBlock>
      <InfoBlock title="Copyright">
        &copy; 2026 Sonny Llarena. All rights reserved. This operating-system
        simulation, including its components, design, and functionality, is the
        intellectual property of Sonny Llarena. Unauthorized reproduction,
        distribution, or modification is prohibited.
      </InfoBlock>
      <InfoBlock title="Data Collection">
        SonnyOS temporarily holds Memory Wall notes and Visitor Arts submissions
        in your current browser session so you can see them appear on the shared
        wall/gallery while you're here. Nothing is saved after you close or
        reload the page, and no personal information is required to explore the
        portfolio.
      </InfoBlock>
    </div>
  )
}

export default PrivacySecurityPage
