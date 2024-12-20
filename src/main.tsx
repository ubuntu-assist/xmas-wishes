import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Example from './components/Loader.tsx'
import './i18n/i18n.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<Example />}>
      <App />
    </Suspense>
  </StrictMode>
)
