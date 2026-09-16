import { lazy, Suspense, useEffect, useState } from 'react'
import StartupLoadingScreen from './components/startup/StartupLoadingScreen.jsx'
import { GalleryProvider } from './context/GalleryContext.jsx'
import { MemoryWallProvider } from './context/MemoryWallContext.jsx'
import { SystemSettingsProvider } from './context/SystemSettingsContext.jsx'
import { GamesProvider } from './context/GamesContext.jsx'
import { BlogProvider } from './context/BlogContext.jsx'

// Desktop pulls in every desktop app's import graph — loading it lazily lets
// the boot screen appear without waiting on that download first.
const Desktop = lazy(() => import('./components/Desktop.jsx'))

function App() {
  const [phase, setPhase] = useState('boot')

  // Start fetching the Desktop chunk in the background as soon as the boot
  // screen appears, so it's likely already cached by the time sign-in happens.
  useEffect(() => {
    import('./components/Desktop.jsx')
  }, [])

  if (phase === 'boot') {
    return <StartupLoadingScreen onSignIn={() => setPhase('desktop')} />
  }

  return (
    <GalleryProvider>
      <MemoryWallProvider>
        <SystemSettingsProvider>
          <GamesProvider>
            <BlogProvider>
              <Suspense fallback={null}>
                <Desktop onExitToBoot={() => setPhase('boot')} />
              </Suspense>
            </BlogProvider>
          </GamesProvider>
        </SystemSettingsProvider>
      </MemoryWallProvider>
    </GalleryProvider>
  )
}

export default App
