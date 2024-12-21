import { BrowserRouter, Routes, Route } from 'react-router'
import SharedLayout from '@/components/SharedLayout'
import { AboutPage, ContactPage, DonatePage, Home, NotFoundPage } from '@/pages'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path='about' element={<AboutPage />} />
          <Route path='contact' element={<ContactPage />} />
          <Route path='donate' element={<DonatePage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
