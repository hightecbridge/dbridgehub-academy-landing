// src/components/Footer.tsx
import { Link, useLocation } from 'react-router-dom'

const LINKS = [
  { to: '/privacy', label: '개인정보처리방침' },
  { to: '/terms',   label: '이용약관' },
  { to: '/refund',  label: '환불정책' },
]

const COLS = [
  { title: '제품', items: [{ label: '기능 소개', to: '/#features' }, { label: '요금제', to: '/#pricing' }, { label: '사용 방법', to: '/#how' }] },
  { title: '고객 지원', items: [{ label: 'FAQ', to: '/#faq' }, { label: '도입 문의', to: '/#contact' }] },
  { title: '법적 고지', items: LINKS.map(l => ({ label: l.label, to: l.to })) },
]

export default function Footer() {
  const { pathname } = useLocation()
  return (
    <footer style={{ background: 'var(--navy)', padding: '60px 0 32px', color: 'rgba(255,255,255,.5)' }}>
      <div className="container">
        {/* 상단 그리드 */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 48 }} className="footer-grid">
          <div>
            <div style={{ fontFamily: 'var(--display)', fontSize: 20, fontWeight: 900, color: '#fff', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg,#8B83FF,#6C63FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 900, color: '#fff' }}>H</div>
              HiAcademy
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7, marginBottom: 20 }}>학원 운영의 새로운 기준.<br/>출석·수납·공지·학부모 소통을<br/>하나의 플랫폼으로.</p>
            <div style={{ display: 'flex', gap: 10 }}>
              {['🐦','📘','📸','▶️'].map((icon, i) => (
                <div key={i} style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, cursor: 'pointer' }}>{icon}</div>
              ))}
            </div>
          </div>
          {COLS.map(col => (
            <div key={col.title}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 14, textTransform: 'uppercase', letterSpacing: '.5px' }}>{col.title}</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
                {col.items.map(item => (
                  <li key={item.label}>
                    <Link to={item.to} style={{ fontSize: 13, color: 'rgba(255,255,255,.45)', transition: 'color .2s' }}
                      onMouseOver={e => (e.currentTarget.style.color = '#fff')}
                      onMouseOut={e => (e.currentTarget.style.color = 'rgba(255,255,255,.45)')}
                    >{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 하단 */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,.08)', paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 12 }}>
            © 2026 HiAcademy. All rights reserved. | 상호: 디브릿지허브 | 대표: 장경수 | 사업자등록번호: 599-26-02056 | 통신판매업신고번호: 제2026-서울동대문-0901호<br/>
            주소: 서울특별시 동대문구 장안벚꽃로5길 19, 103동 2107호 | 연락처: 010-5029-9455
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            {LINKS.map(l => (
              <Link key={l.to} to={l.to}
                style={{ fontSize: 12, color: pathname === l.to ? 'var(--acc)' : 'rgba(255,255,255,.35)', fontWeight: pathname === l.to ? 700 : 400, transition: 'color .2s' }}
              >{l.label}</Link>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width:768px){ .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media(max-width:480px){ .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  )
}
