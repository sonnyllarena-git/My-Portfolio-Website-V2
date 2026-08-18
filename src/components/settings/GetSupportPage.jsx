function GetSupportPage({ onOpenGmail }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Get Support</h2>
      <div className="rounded-lg border border-white/10 bg-[#181a20] p-4">
        <div className="mb-2 font-semibold">Need help or have a question?</div>
        <p className="mb-4 text-sm text-white/60">
          Reach out directly and Sonny will get back to you.
        </p>
        <button
          onClick={onOpenGmail}
          className="rounded bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-500"
        >
          ✉️ Contact Support via Email
        </button>
      </div>
    </div>
  )
}

export default GetSupportPage
