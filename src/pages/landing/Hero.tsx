// src/pages/landing/Hero.tsx
import { useModalStore } from '../../store/modalStore'

export default function Hero() {
  const { open } = useModalStore()

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg,#0F0E2A 0%,#1A1840 40%,#252350 70%,#1A1840 100%)',
      position: 'relative', display: 'flex', alignItems: 'center',
      overflow: 'hidden', paddingTop: 70,
    }}>
      {/* 배경 */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', width: 600, height: 600, right: -150, top: -100, borderRadius: '50%', background: 'radial-gradient(circle,rgba(108,99,255,.35) 0%,transparent 70%)' }} />
        <div style={{ position: 'absolute', width: 400, height: 400, left: -100, bottom: -50, borderRadius: '50%', background: 'radial-gradient(circle,rgba(167,139,250,.2) 0%,transparent 70%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(108,99,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(108,99,255,.05) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%', padding: '80px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }} className="hero-grid">
          <div>
            {/* 배지 */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(108,99,255,.2)', border: '1px solid rgba(108,99,255,.4)', borderRadius: 999, padding: '8px 16px', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,.85)', marginBottom: 24 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#0BAB64', animation: 'pulse 2s infinite', display: 'inline-block' }} />
              🎉 학원 관리 솔루션의 새로운 기준
            </div>

            <h1 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(32px,5vw,60px)', fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: 22 }}>
              학원 운영,<br/>이제{' '}
              <span style={{ background: 'linear-gradient(135deg,#A78BFA,#6C63FF,#818CF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>스마트</span>하게<br/>관리하세요
            </h1>

            <p style={{ fontSize: 17, color: 'rgba(255,255,255,.6)', lineHeight: 1.7, marginBottom: 36 }}>
              출석·수납·공지·숙제·학부모 소통까지<br/>
              HiAcademy 하나로 모두 해결하세요.<br/>
              지금 바로 30일 무료 체험을 시작하세요.
            </p>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <button className="btn btn-primary btn-lg" onClick={() => open('signup')}>🚀 30일 무료 체험</button>
              <button className="btn btn-white btn-lg" onClick={() => scrollTo('features')}>기능 살펴보기 →</button>
            </div>
          </div>

          {/* 대시보드 미리보기 */}
          <div style={{ animation: 'float 6s ease-in-out infinite', position: 'relative' }} className="hero-visual">
            <div style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 20, padding: 20, backdropFilter: 'blur(10px)' }}>
              <MockCard />
              <MockStats />
              <MockChart />
            </div>
            <div style={{ position: 'absolute', top: -16, right: 20, background: 'rgba(11,171,100,.9)', backdropFilter: 'blur(10px)', borderRadius: 12, padding: '10px 14px', fontSize: 12, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', boxShadow: '0 8px 24px rgba(0,0,0,.3)' }}>✓ 출석 완료 · 15명</div>
            <div style={{ position: 'absolute', bottom: 10, left: -20, background: 'rgba(108,99,255,.9)', backdropFilter: 'blur(10px)', borderRadius: 12, padding: '10px 14px', fontSize: 12, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', boxShadow: '0 8px 24px rgba(0,0,0,.3)' }}>💳 수납률 98%</div>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-visual { display: none !important; }
        }
      `}</style>
    </section>
  )
}

function MockCard() {
  return (
    <div style={{ background: 'rgba(255,255,255,.06)', borderRadius: 12, padding: 14, marginBottom: 10, border: '1px solid rgba(255,255,255,.08)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,rgba(108,99,255,.4),rgba(167,139,250,.3))', flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ height: 8, borderRadius: 4, background: 'rgba(255,255,255,.15)', width: '60%', marginBottom: 5 }} />
          <div style={{ height: 8, borderRadius: 4, background: 'rgba(255,255,255,.15)', width: '40%' }} />
        </div>
        <div style={{ height: 20, borderRadius: 999, background: 'rgba(11,171,100,.3)', width: 48 }} />
      </div>
    </div>
  )
}

function MockStats() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 10 }}>
      {[['98%','출석률','#6C63FF'],['완납','이번달','#0BAB64'],['3개','공지','#F7A600']].map(([val, label, color]) => (
        <div key={label} style={{ background: 'rgba(255,255,255,.04)', borderRadius: 10, padding: 10, textAlign: 'center' }}>
          <div style={{ fontSize: 16, fontWeight: 700, color }}>{val}</div>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,.4)', marginTop: 2 }}>{label}</div>
        </div>
      ))}
    </div>
  )
}

function MockChart() {
  const bars = [40, 65, 55, 80, 70, 90, 75]
  return (
    <div style={{ height: 60, display: 'flex', alignItems: 'flex-end', gap: 4, padding: '8px 0' }}>
      {bars.map((h, i) => (
        <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: '4px 4px 0 0', background: 'linear-gradient(180deg,rgba(108,99,255,.5),rgba(108,99,255,.2))' }} />
      ))}
    </div>
  )
}
