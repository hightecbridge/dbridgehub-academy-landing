// src/pages/landing/Sections.tsx
import { useEffect, useRef, useState } from 'react'
import { useModalStore } from '../../store/modalStore'
import { webApi } from '../../api/client'
import { PLANS } from '@shared/pricingPlans'

/* ── 스크롤 애니메이션 훅 ── */
function useFadeUp() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('visible') }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

/* ══ FEATURES ════════════════════════════════════ */
const FEATURES = [
  { icon: '📋', title: '스마트 출석 관리', desc: 'QR코드·웹 어디서든 빠르게 출석 체크. 결석·지각·조퇴를 자동으로 학부모에게 알림.', items: ['실시간 출석 현황 대시보드', '자동 학부모 알림 발송', '출석 기록 조회'] },
  { icon: '💳', title: '수납 관리 자동화', desc: '수업료·교재비 청구부터 미납 알림, 영수증 발행까지 자동 처리. 현금흐름을 한눈에.', items: ['자동 청구서 발송', '미납 학부모 일괄 문자', '수납 현황 실시간 조회'] },
  { icon: '📱', title: '학부모 앱 연동', desc: '학부모가 스마트폰으로 자녀의 출석·숙제·수납·공지를 실시간 확인. 상담 신청도 앱에서.', items: ['iOS / Android 전용 앱', '실시간 푸시 알림', '온라인 상담 신청'] },
  { icon: '📝', title: '숙제 & 학습 관리', desc: '숙제 출제부터 완료 확인, 코멘트까지. 학생별 학습 이력을 체계적으로 기록·관리.', items: ['반별 숙제 일괄 출제', '완료 여부 실시간 확인', '선생님 코멘트 기능'] },
  { icon: '📢', title: '공지 & 메시지', desc: '학원 공지를 앱·카카오·문자로 동시 발송. 반별, 전체, 미납자 등 세밀한 대상 설정.', items: ['카카오 알림톡 연동', '이미지 첨부 공지', '발송 이력 관리'] },
]

export function FeaturesSection() {
  const ref = useFadeUp()
  return (
    <section id="features" style={{ padding: '120px 0', background: 'var(--g1)' }}>
      <div className="container">
        <div ref={ref} className="fade-up" style={{ textAlign: 'center' }}>
          <div className="section-label">핵심 기능</div>
          <h2 className="section-title" style={{ margin: '0 auto 14px' }}>학원 운영에 필요한<br/>모든 것이 하나에</h2>
          <p className="section-desc" style={{ margin: '0 auto', textAlign: 'center' }}>복잡한 학원 운영을 단순하게. 원장님이 학생에게 집중할 수 있도록 HiAcademy가 나머지를 처리합니다.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, marginTop: 60 }} className="features-grid">
          {FEATURES.map((f, i) => {
            const r = useFadeUp()
            return (
              <div key={i} ref={r} className="fade-up"
                style={{ background: '#fff', borderRadius: 20, padding: 32, border: '1px solid var(--bd)', transition: 'all .3s', cursor: 'default' }}
                onMouseOver={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--sh)' }}
                onMouseOut={e => { (e.currentTarget as HTMLDivElement).style.transform = ''; (e.currentTarget as HTMLDivElement).style.boxShadow = '' }}
              >
                <div style={{ width: 52, height: 52, borderRadius: 14, background: 'linear-gradient(135deg,var(--acc3),rgba(108,99,255,.1))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 20 }}>{f.icon}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--navy)', marginBottom: 10 }}>{f.title}</div>
                <div style={{ fontSize: 14, color: 'var(--slate)', lineHeight: 1.7, marginBottom: 14 }}>{f.desc}</div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {f.items.map(item => <li key={item} style={{ fontSize: 13, color: 'var(--slate)', display: 'flex', alignItems: 'center', gap: 7 }}><span style={{ color: 'var(--ok)', fontWeight: 700 }}>✓</span>{item}</li>)}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
      <style>{`
        @media(max-width:1024px){ .features-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media(max-width:768px) { .features-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}

/* ══ HOW IT WORKS ════════════════════════════════ */
const STEPS = [
  { n: '1', title: '회원가입 & 학원 등록', desc: '이메일로 가입 후 학원명·주소·연락처 입력. 3분이면 완료됩니다.' },
  { n: '2', title: '반 & 학생 등록', desc: '반을 만들고 학생·학부모 정보를 입력. 엑셀 일괄 등록도 지원합니다.' },
  { n: '3', title: '학부모 앱 초대', desc: '학부모에게 앱 설치 링크를 문자 발송. 설치하면 자동 연동됩니다.' },
  { n: '4', title: '운영 시작!', desc: '출석 체크, 수납 관리, 공지 발송 시작. 학원 운영이 훨씬 편해집니다.' },
]
const STATUS_DATA = [
  { name: '김민서', status: '출석', cls: 'ok', time: '16:02' },
  { name: '이준혁', status: '출석', cls: 'ok', time: '16:05' },
  { name: '박지윤', status: '지각', cls: 'warn', time: '16:18' },
  { name: '최수아', status: '결석', cls: 'err', time: '—' },
]

export function HowSection() {
  const ref = useFadeUp(); const ref2 = useFadeUp()
  const { open } = useModalStore()
  return (
    <section id="how" style={{ padding: '120px 0' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="how-grid">
          <div ref={ref} className="fade-up">
            <div className="section-label">사용 방법</div>
            <h2 className="section-title">3분이면<br/>시작할 수 있어요</h2>
            <p className="section-desc" style={{ marginBottom: 32 }}>복잡한 설치 없이 회원가입 즉시 사용 시작. 데이터 이전도 도와드립니다.</p>
            <div>
              {STEPS.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 20, padding: '24px 0', borderBottom: i < STEPS.length - 1 ? '1px solid var(--bd)' : 'none' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg,var(--acc),var(--acc2))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--display)', fontSize: 16, fontWeight: 800, color: '#fff', flexShrink: 0, boxShadow: '0 4px 12px rgba(108,99,255,.3)' }}>{s.n}</div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy)', marginBottom: 5 }}>{s.title}</div>
                    <div style={{ fontSize: 14, color: 'var(--slate)', lineHeight: 1.6 }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn btn-primary" style={{ marginTop: 28 }} onClick={() => open('signup')}>지금 바로 시작하기 →</button>
          </div>
          <div ref={ref2} className="fade-up">
            <div style={{ background: 'var(--g1)', borderRadius: 24, padding: 28, border: '1px solid var(--bd)' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--slate)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>어드민 대시보드 미리보기</div>
              <div style={{ background: '#fff', borderRadius: 16, padding: 20, boxShadow: '0 4px 20px rgba(0,0,0,.06)', marginBottom: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--navy)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--ok)', display: 'inline-block' }} />오늘 출석 현황 · A반
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                  <thead><tr>{['학생','상태','시각'].map(h => <th key={h} style={{ padding: '6px 8px', background: 'var(--g1)', textAlign: 'left', fontSize: 10, fontWeight: 600, color: 'var(--slate)' }}>{h}</th>)}</tr></thead>
                  <tbody>
                    {STATUS_DATA.map(row => (
                      <tr key={row.name}>
                        <td style={{ padding: '8px', borderBottom: '1px solid var(--bd)', color: 'var(--navy)' }}>{row.name}</td>
                        <td style={{ padding: '8px', borderBottom: '1px solid var(--bd)' }}>
                          <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 999, fontSize: 10, fontWeight: 700, background: row.cls === 'ok' ? '#E6F9F1' : row.cls === 'warn' ? '#FFF8E6' : '#FFF0EF', color: row.cls === 'ok' ? '#027A48' : row.cls === 'warn' ? '#B45309' : '#B42318' }}>{row.status}</span>
                        </td>
                        <td style={{ padding: '8px', borderBottom: '1px solid var(--bd)', color: 'var(--slate)' }}>{row.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ background: 'var(--acc3)', borderRadius: 12, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 20 }}>📱</span>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--acc)' }}>학부모 앱 자동 알림</div>
                  <div style={{ fontSize: 11, color: 'var(--slate)', marginTop: 2 }}>박지윤 학부모님께 미납 안내 발송 완료</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){ .how-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}

/* ══ PRICING ══════════════════════════════════════ */

export function PricingSection() {
  const [mode, setMode] = useState<'m' | 'y'>('m')
  const ref = useFadeUp()
  const { open } = useModalStore()
  const fmt = (n: number) => n.toLocaleString('ko-KR')

  return (
    <section id="pricing" style={{ padding: '120px 0', background: 'linear-gradient(160deg,var(--navy) 0%,var(--navy2) 100%)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(108,99,255,.15) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="container" style={{ position: 'relative' }}>
        <div ref={ref} className="fade-up" style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ color: 'rgba(255,255,255,.6)' }}>요금제</div>
          <h2 className="section-title" style={{ color: '#fff' }}>학원 규모에 맞는<br/>합리적인 요금제</h2>
          <p className="section-desc" style={{ margin: '0 auto', textAlign: 'center', color: 'rgba(255,255,255,.55)' }}>모든 요금제 30일 무료 체험 · 언제든 플랜 변경 · 약정 없음</p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,.08)', borderRadius: 999, padding: 6, margin: '28px 0 48px' }}>
            {[['m','월간 결제'],['y','연간 결제']].map(([key, label]) => (
              <button key={key} onClick={() => setMode(key as 'm'|'y')}
                style={{ padding: '8px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, transition: 'all .2s', background: mode === key ? '#fff' : 'transparent', color: mode === key ? 'var(--navy)' : 'rgba(255,255,255,.6)', border: 'none', cursor: 'pointer' }}>
                {label}{key === 'y' && <span style={{ color: '#F7A600', fontSize: 11, marginLeft: 4 }}>20% 할인</span>}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="pricing-grid">
          {PLANS.map(plan => (
            <div key={plan.id} style={{ background: plan.popular ? 'rgba(108,99,255,.15)' : 'rgba(255,255,255,.05)', border: `1px solid ${plan.popular ? 'rgba(108,99,255,.5)' : 'rgba(255,255,255,.1)'}`, borderRadius: 20, padding: 32, position: 'relative', transition: 'all .3s', transform: plan.popular ? 'scale(1.03)' : 'none' }}>
              {plan.popular && <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: 'var(--acc)', color: '#fff', padding: '5px 16px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' }}>🔥 가장 인기</div>}
              <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,.5)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>{plan.name}</div>
              <div style={{ fontFamily: 'var(--display)', fontSize: 44, fontWeight: 800, color: '#fff', lineHeight: 1, marginBottom: 6 }}>
                {fmt(mode === 'm' ? plan.priceM : plan.priceY)}<span style={{ fontSize: 18, fontWeight: 600, color: 'rgba(255,255,255,.5)' }}>원</span>
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,.45)', marginBottom: 24 }}>/ 월 · 부가세 별도</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,.6)', marginBottom: 24, lineHeight: 1.6, minHeight: 44 }}>{plan.desc}</div>
              <div style={{ height: 1, background: 'rgba(255,255,255,.1)', marginBottom: 24 }} />
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                {plan.items.map(item => (
                  <li key={item} style={{ fontSize: 14, color: 'rgba(255,255,255,.75)', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(11,171,100,.25)', color: '#0BAB64', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>✓</span>{item}
                  </li>
                ))}
                {plan.nope.map(item => (
                  <li key={item} style={{ fontSize: 14, color: 'rgba(255,255,255,.35)', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(240,68,56,.15)', color: 'rgba(255,255,255,.3)', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>✗</span>{item}
                  </li>
                ))}
              </ul>
              <button onClick={() => open('signup', plan.id)}
                style={{ width: '100%', padding: 14, borderRadius: 12, fontSize: 15, fontWeight: 700, transition: 'all .2s', cursor: 'pointer', background: plan.popular ? 'var(--acc)' : 'rgba(255,255,255,.08)', color: '#fff', border: plan.popular ? 'none' : '1px solid rgba(255,255,255,.15)', boxShadow: plan.popular ? '0 4px 20px rgba(108,99,255,.4)' : 'none' }}>
                30일 무료 시작
              </button>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', marginTop: 36, fontSize: 13, color: 'rgba(255,255,255,.35)' }}>💡 모든 플랜은 신용카드 없이 30일 무료 체험 가능 · 체험 종료 후 자동 결제 없음</p>
      </div>
      <style>{`
        @media(max-width:1024px){ .pricing-grid { grid-template-columns: 1fr !important; max-width: 420px; margin: 0 auto; } }
      `}</style>
    </section>
  )
}

/* ══ TESTIMONIALS ════════════════════════════════ */
const TESTIS = [
  { av: '김', color: ['#DBEAFE','#1D4ED8'], role: '수학 전문학원 · 서울 강남', body: '"수납 관리하느라 매달 3~4시간 걸렸는데 HiAcademy 쓰고 나서 30분으로 줄었어요. 미납 알림이 자동으로 가니 학부모한테 직접 연락 안 해도 돼서 너무 편해요."' },
  { av: '이', color: ['#D1FAE5','#065F46'], role: '영어 학원 · 경기 분당',    body: '"학부모님들이 앱으로 아이 출석을 바로 확인하니까 전화 문의가 70% 줄었어요. 수업에 집중할 수 있는 시간이 생겼습니다."' },
  { av: '박', color: ['#FEF3C7','#92400E'], role: '과학 실험 학원 · 부산',    body: '"다른 솔루션 3개 써봤는데 HiAcademy가 제일 직관적이에요. IT를 잘 몰라도 바로 쓸 수 있고 고객센터도 빠르게 답해줘서 믿음이 가요."' },
]
export function TestimonialsSection() {
  const ref = useFadeUp()
  return (
    <section id="testimonials" style={{ padding: '120px 0', background: 'var(--g1)' }}>
      <div className="container">
        <div ref={ref} className="fade-up" style={{ textAlign: 'center' }}>
          <div className="section-label">고객 후기</div>
          <h2 className="section-title">원장님들이<br/>직접 말하는 후기</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, marginTop: 60 }} className="testi-grid">
          {TESTIS.map((t, i) => {
            const r = useFadeUp()
            return (
              <div key={i} ref={r} className="fade-up" style={{ background: '#fff', borderRadius: 20, padding: 28, border: '1px solid var(--bd)' }}>
                <div style={{ color: '#F7A600', fontSize: 16, letterSpacing: 2, marginBottom: 14 }}>★★★★★</div>
                <p style={{ fontSize: 14, color: 'var(--slate)', lineHeight: 1.7, marginBottom: 20, fontStyle: 'italic' }}>{t.body}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: '50%', background: `linear-gradient(135deg,${t.color[0]},rgba(108,99,255,.2))`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: t.color[1], flexShrink: 0 }}>{t.av}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)' }}>{t.av}○○ 원장</div>
                    <div style={{ fontSize: 12, color: 'var(--slate)' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <style>{`@media(max-width:768px){ .testi-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}

/* ══ FAQ ══════════════════════════════════════════ */
const FAQS = [
  ['무료 체험에 카드 등록이 필요한가요?', '아니요, 30일 무료 체험은 신용카드 없이 시작 가능합니다. 체험 종료 후 결제를 원하실 때 카드 정보를 입력하시면 됩니다. 자동 결제는 절대 없습니다.'],
  ['기존 데이터를 가져올 수 있나요?', '엑셀 파일로 학생·학부모 정보를 일괄 업로드할 수 있습니다. 데이터 이전이 어려우시면 고객센터로 문의해 주시면 안내해드립니다.'],
  ['학부모 앱은 별도 비용이 있나요?', '학부모 앱은 모든 요금제에 무료로 포함됩니다. 학부모님들은 App Store / Google Play에서 무료로 다운로드하시면 됩니다.'],
  ['중도 해지 시 환불이 가능한가요?', '월간 요금제는 언제든 해지 가능하며 잔여 기간 비례 환불됩니다. 연간 요금제는 가입 후 30일 이내 100% 환불, 이후 잔여 월 기준 환불됩니다.'],
  ['데이터 보안은 어떻게 관리되나요?', 'AWS 서울 리전에서 운영되며 모든 데이터는 AES-256 암호화로 저장됩니다. 개인정보보호법을 준수하며 일 1회 자동 백업됩니다.'],
  ['태블릿·스마트폰에서도 사용 가능한가요?', '어드민 웹은 PC·태블릿·스마트폰 모두 최적화되어 있습니다. 출석 체크는 태블릿으로 가장 편리하게 사용하실 수 있습니다.'],
]
export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null)
  const ref = useFadeUp(); const ref2 = useFadeUp()
  return (
    <section id="faq" style={{ padding: '120px 0' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }} className="faq-grid">
          <div ref={ref} className="fade-up">
            <div className="section-label">자주 묻는 질문</div>
            <h2 className="section-title">궁금한 것을<br/>먼저 확인하세요</h2>
            <p className="section-desc">더 궁금한 사항은 이메일 또는 카카오 채널로 문의해주세요.</p>
            <button className="btn btn-outline" style={{ marginTop: 28 }} onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>1:1 문의하기</button>
          </div>
          <div ref={ref2} className="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 40 }}>
            {FAQS.map(([q, a], i) => (
              <div key={i} style={{ border: '1px solid var(--bd)', borderRadius: 14, overflow: 'hidden' }}>
                <button onClick={() => setOpen(open === i ? null : i)} style={{ width: '100%', textAlign: 'left', padding: '18px 20px', background: '#fff', fontSize: 15, fontWeight: 600, color: 'var(--navy)', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'background .2s' }}>
                  {q}
                  <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--g2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: 'var(--acc)', transition: 'transform .3s', transform: open === i ? 'rotate(45deg)' : 'none', flexShrink: 0 }}>+</span>
                </button>
                {open === i && <div style={{ fontSize: 14, color: 'var(--slate)', lineHeight: 1.7, padding: '0 20px 18px' }}>{a}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){ .faq-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}

/* ══ CONTACT ═════════════════════════════════════ */
export function ContactSection() {
  const ref = useFadeUp()
  const [form, setForm] = useState({ academy: '', name: '', phone: '', count: '', msg: '' })
  const [status, setStatus] = useState<'idle'|'loading'|'done'|'error'>('idle')

  const sf = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [key]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'loading') return
    const el = e.currentTarget
    // 제출 시점 DOM/FormData 기준 (한글 IME·상태 클로저 불일치 방지)
    const fd = new FormData(el)
    const academy = String(fd.get('signupAcademy') ?? '').trim()
    const name = String(fd.get('signupName') ?? '').trim()
    const phone = String(fd.get('signupPhone') ?? '').trim()
    const count = String(fd.get('signupCount') ?? '').trim()
    const message = String(fd.get('signupMessage') ?? '').trim()
    if (!academy || !name || !phone) {
      alert('학원명, 성함, 연락처를 모두 입력해 주세요.')
      return
    }
    setStatus('loading')
    try {
      await webApi.signupInquiry({
        academyName: academy,
        name,
        phone,
        studentCount: count || undefined,
        message: message || undefined,
        source: 'landing-contact',
      })
      setStatus('done')
      setForm({ academy: '', name: '', phone: '', count: '', msg: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" style={{ padding: '120px 0', background: 'var(--g1)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }} className="contact-grid">
          <div ref={ref} className="fade-up">
            <div className="section-label">가입 문의</div>
            <h2 className="section-title">도입 상담이<br/>필요하신가요?</h2>
            <p className="section-desc" style={{ marginBottom: 32 }}>HiAcademy 도입, 요금, 데모 등 원장님께서 남겨 주시는 <strong>가입 문의</strong>만 접수합니다. 빠르게 연락드리겠습니다.</p>
            {[['📞','전화 상담','010-5029-9455','평일 09:00 – 18:00'],['✉️','이메일','admin@dbridgehub.com','24시간 이내 답변'],['💬','카카오 채널','@디브릿지허브','실시간 채팅 상담']].map(([icon,label,value,sub]) => (
              <div key={String(label)} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 20 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--acc3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{icon}</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--slate)', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 3 }}>{label}</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--navy)' }}>{value}</div>
                  <div style={{ fontSize: 12, color: 'var(--slate)', marginTop: 2 }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
          <form
            noValidate
            onSubmit={(e) => void handleSubmit(e)}
            style={{ background: '#fff', borderRadius: 24, padding: 28, boxShadow: '0 8px 32px rgba(108,99,255,.08)', border: '1px solid var(--bd)' }}
          >
            <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--navy)', marginBottom: 8 }}>가입 문의 보내기</h3>
            <p style={{ fontSize: 13, color: 'var(--slate)', marginBottom: 16 }}>학원명과 연락처를 남겨 주시면 담당자가 연락드립니다.</p>
            {status === 'done' && <div className="form-success">✓ 가입 문의가 접수되었습니다.</div>}
            {status === 'error' && <div className="form-error">전송에 실패했습니다. 이메일 또는 전화로 문의해 주세요.</div>}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="signup-academy">학원명 *</label>
                <input id="signup-academy" name="signupAcademy" className="form-input" placeholder="Hi Academy 학원" autoComplete="organization" value={form.academy} onChange={sf('academy')} />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="signup-name">성함 *</label>
                <input id="signup-name" name="signupName" className="form-input" placeholder="홍길동" autoComplete="name" value={form.name} onChange={sf('name')} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="signup-phone">연락처 *</label>
              <input id="signup-phone" name="signupPhone" className="form-input" type="tel" inputMode="tel" placeholder="010-0000-0000" autoComplete="tel" value={form.phone} onChange={sf('phone')} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="signup-count">학생 수</label>
              <select id="signup-count" name="signupCount" className="form-select" value={form.count} onChange={sf('count')}>
                <option value="">선택</option>
                {['50명 미만','50 – 100명','100 – 200명','200명 이상'].map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="signup-message">문의 내용</label>
              <textarea id="signup-message" name="signupMessage" className="form-textarea" placeholder="도입 시기, 문의 사항 등" value={form.msg} onChange={sf('msg')} />
            </div>
            <button type="submit" className="form-submit" disabled={status === 'loading'}>{status === 'loading' ? '전송 중...' : '문의 보내기'}</button>
          </form>
        </div>
      </div>
      <style>{`@media(max-width:768px){ .contact-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}

/* ══ CTA BANNER ══════════════════════════════════ */
export function CtaBanner() {
  const { open } = useModalStore()
  return (
    <section style={{ padding: '80px 0', background: 'linear-gradient(135deg,var(--acc),var(--acc2),#818CF8)', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,.12) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="container" style={{ position: 'relative' }}>
        <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(26px,4vw,42px)', fontWeight: 900, color: '#fff', marginBottom: 14 }}>지금 바로 시작하세요</h2>
        <p style={{ fontSize: 17, color: 'rgba(255,255,255,.8)', marginBottom: 36 }}>30일 무료 체험 · 신용카드 불필요 · 언제든 취소 가능</p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-white btn-lg" onClick={() => open('signup')}>🚀 무료로 시작하기</button>
          <button className="btn btn-ghost btn-lg" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>상담 신청하기</button>
        </div>
      </div>
    </section>
  )
}
