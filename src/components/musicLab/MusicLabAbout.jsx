import { aboutArticle } from '../../data/musicLabLibrary.js'

function MusicLabAbout() {
  return (
    <div className="mx-6 my-5 rounded-lg border border-white/10 bg-[#181a20] p-5 text-white">
      <h3 className="mb-3 text-lg font-bold">About</h3>
      <div className="flex flex-col gap-3 text-sm leading-relaxed text-white/70">
        {aboutArticle.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  )
}

export default MusicLabAbout
