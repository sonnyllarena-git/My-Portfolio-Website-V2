import Desktop from './components/Desktop.jsx'
import { GalleryProvider } from './context/GalleryContext.jsx'
import { MemoryWallProvider } from './context/MemoryWallContext.jsx'

function App() {
  return (
    <GalleryProvider>
      <MemoryWallProvider>
        <Desktop />
      </MemoryWallProvider>
    </GalleryProvider>
  )
}

export default App
