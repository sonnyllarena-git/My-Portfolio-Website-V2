import Desktop from './components/Desktop.jsx'
import { GalleryProvider } from './context/GalleryContext.jsx'

function App() {
  return (
    <GalleryProvider>
      <Desktop />
    </GalleryProvider>
  )
}

export default App
