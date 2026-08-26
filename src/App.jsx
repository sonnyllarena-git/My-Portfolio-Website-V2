import { useState } from 'react'
import StartupLoadingScreen from './components/startup/StartupLoadingScreen.jsx'
import Desktop from './components/Desktop.jsx'
import { GalleryProvider } from './context/GalleryContext.jsx'
import { MemoryWallProvider } from './context/MemoryWallContext.jsx'
import { SystemSettingsProvider } from './context/SystemSettingsContext.jsx'
import { GamesProvider } from './context/GamesContext.jsx'
import { BlogProvider } from './context/BlogContext.jsx'

function App() {
  const [phase, setPhase] = useState('boot')

  if (phase === 'boot') {
    return <StartupLoadingScreen onSignIn={() => setPhase('desktop')} />
  }

  return (
    <GalleryProvider>
      <MemoryWallProvider>
        <SystemSettingsProvider>
          <GamesProvider>
            <BlogProvider>
              <Desktop onExitToBoot={() => setPhase('boot')} />
            </BlogProvider>
          </GamesProvider>
        </SystemSettingsProvider>
      </MemoryWallProvider>
    </GalleryProvider>
  )
}

export default App
