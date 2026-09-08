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
        Memory Wall notes (name, message, and rating) are stored in a shared
        database and visible to every visitor of the portfolio — please avoid
        sharing anything personal or sensitive. Visitor Arts submissions still
        only live in your current browser session and are not saved after you
        close or reload the page. No account is required for either, and Memory
        Wall notes may be removed at Sonny's discretion.
      </InfoBlock>
    </div>
  )
}

export default PrivacySecurityPage
