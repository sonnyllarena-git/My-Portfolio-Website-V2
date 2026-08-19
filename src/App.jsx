import Desktop from './components/Desktop.jsx'
import { GalleryProvider } from './context/GalleryContext.jsx'
import { MemoryWallProvider } from './context/MemoryWallContext.jsx'
import { SystemSettingsProvider } from './context/SystemSettingsContext.jsx'
import { GamesProvider } from './context/GamesContext.jsx'

function App() {
  return (
    <GalleryProvider>
      <MemoryWallProvider>
        <SystemSettingsProvider>
          <GamesProvider>
            <Desktop />
          </GamesProvider>
        </SystemSettingsProvider>
      </MemoryWallProvider>
    </GalleryProvider>
  )
}

export default App
