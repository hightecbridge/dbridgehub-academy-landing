// src/App.tsx
import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AuthModal from './components/AuthModal'
import LandingPage from './pages/landing'
import PrivacyPage from './pages/legal/Privacy'
import { TermsPage, RefundPage } from './pages/legal/Terms'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/"        element={<LandingPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms"   element={<TermsPage />} />
        <Route path="/refund"  element={<RefundPage />} />
        <Route path="*"        element={<LandingPage />} />
      </Routes>
      <Footer />
      <AuthModal />
    </>
  )
}
