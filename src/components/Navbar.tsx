// src/components/Navbar.tsx
import { useEffect, useLayoutEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useModalStore } from '../store/modalStore'

const NAV_ITEMS: [string, string][] = [
  ['features', '기능'],
  ['how', '사용방법'],
  ['pricing', '요금제'],
  ['testimonials', '후기'],
  ['contact', '문의'],
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { open } = useModalStore()
  const { pathname } = useLocation()

  const isLegalPage = ['/privacy', '/terms', '/refund'].includes(pathname)
  const navSolid = scrolled || isLegalPage

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useLayoutEffect(() => {
    setScrolled(window.scrollY > 50)
  }, [pathname])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [menuOpen])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    if (pathname !== '/') {
      window.location.href = `/#${id}`
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const openLogin = () => {
    setMenuOpen(false)
    open('login')
  }

  const openSignup = () => {
    setMenuOpen(false)
    open('signup')
  }

  return (
    <nav
      className="site-nav"
      style={{
        background: navSolid ? 'rgba(15,14,42,.95)' : 'transparent',
        backdropFilter: navSolid ? 'blur(20px)' : 'none',
        borderBottom: navSolid ? '1px solid rgba(108,99,255,.2)' : 'none',
      }}
    >
      <div className="site-nav-inner">
        <Link to="/" className="site-nav-brand">
          <span className="site-nav-brand-mark">H</span>
          <span className="site-nav-brand-text">HiAcademy</span>
        </Link>

        <div className="site-nav-links-desktop">
          {NAV_ITEMS.map(([id, label]) => (
            <button key={id} type="button" onClick={() => scrollTo(id)}>
              {label}
            </button>
          ))}
        </div>

        <div className="site-nav-cta site-nav-cta--desktop">
          <button type="button" className="site-nav-btn site-nav-btn--ghost" onClick={() => open('login')}>
            로그인
          </button>
          <button type="button" className="site-nav-btn site-nav-btn--primary" onClick={() => open('signup')}>
            무료 시작하기
          </button>
        </div>

        <button
          type="button"
          className="site-nav-burger"
          aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      <div
        className={`site-nav-backdrop ${menuOpen ? 'is-visible' : ''}`}
        aria-hidden
        onClick={() => setMenuOpen(false)}
      />

      <div className={`site-nav-mobile ${menuOpen ? 'is-open' : ''}`} id="site-nav-mobile-panel">
        <div className="site-nav-mobile-list">
          {NAV_ITEMS.map(([id, label]) => (
            <button key={id} type="button" onClick={() => scrollTo(id)}>
              {label}
            </button>
          ))}
        </div>
        <div className="site-nav-mobile-actions">
          <button type="button" className="site-nav-btn site-nav-btn--ghost" onClick={openLogin}>
            로그인
          </button>
          <button type="button" className="site-nav-btn site-nav-btn--primary" onClick={openSignup}>
            무료 시작하기
          </button>
        </div>
      </div>
    </nav>
  )
}
