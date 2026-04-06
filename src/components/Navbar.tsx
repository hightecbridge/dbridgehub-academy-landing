// src/components/Navbar.tsx
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useModalStore } from '../store/modalStore'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { open } = useModalStore()
  const { pathname } = useLocation()

  // 법적 페이지에서는 항상 배경 적용
  const isLegalPage = ['/privacy', '/terms', '/refund'].includes(pathname)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    if (pathname !== '/') {
      window.location.href = `/#${id}`
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: '0 24px', transition: 'all .3s',
      background: scrolled || isLegalPage ? 'rgba(15,14,42,.95)' : 'transparent',
      backdropFilter: scrolled || isLegalPage ? 'blur(20px)' : 'none',
      borderBottom: scrolled || isLegalPage ? '1px solid rgba(108,99,255,.2)' : 'none',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', height: 70, display: 'flex', alignItems: 'center', gap: 32 }}>
        {/* 로고 */}
        <Link to="/" style={{ fontFamily: 'var(--display)', fontSize: 22, fontWeight: 900, color: '#fff', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg,#8B83FF,#6C63FF)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, fontWeight: 900, color: '#fff',
          }}>H</div>
          HiAcademy
        </Link>

        {/* 데스크톱 링크 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 28, marginLeft: 'auto' }} className="nav-links-desktop">
          {[['features','기능'],['how','사용방법'],['pricing','요금제'],['testimonials','후기'],['contact','문의']].map(([id, label]) => (
            <button key={id} onClick={() => scrollTo(id)}
              style={{ background: 'none', border: 'none', fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,.75)', cursor: 'pointer', transition: 'color .2s' }}
              onMouseOver={e => (e.currentTarget.style.color = '#fff')}
              onMouseOut={e => (e.currentTarget.style.color = 'rgba(255,255,255,.75)')}
            >{label}</button>
          ))}
        </div>

        {/* 로그인 / 시작 버튼 */}
        <button onClick={() => open('login')} style={{
          marginLeft: 12, padding: '10px 18px', borderRadius: 10,
          fontSize: 14, fontWeight: 600, background: 'rgba(255,255,255,.12)',
          color: '#fff', border: '1px solid rgba(255,255,255,.2)', cursor: 'pointer', transition: 'all .2s',
        }}>로그인</button>
        <button onClick={() => open('signup')} style={{
          padding: '10px 22px', borderRadius: 10, fontSize: 14, fontWeight: 700,
          background: 'var(--acc)', color: '#fff', border: 'none', cursor: 'pointer', transition: 'all .2s',
        }}>무료 시작하기</button>
      </div>

      <style>{`
        @media(max-width:768px){ .nav-links-desktop { display: none !important; } }
      `}</style>
    </nav>
  )
}
