import Desktop from './components/Desktop.jsx'
import { GalleryProvider } from './context/GalleryContext.jsx'
import { MemoryWallProvider } from './context/MemoryWallContext.jsx'
import { SystemSettingsProvider } from './context/SystemSettingsContext.jsx'

function App() {
  return (
    <GalleryProvider>
      <MemoryWallProvider>
        <SystemSettingsProvider>
          <Desktop />
        </SystemSettingsProvider>
      </MemoryWallProvider>
    </GalleryProvider>
  )
}

export default App
