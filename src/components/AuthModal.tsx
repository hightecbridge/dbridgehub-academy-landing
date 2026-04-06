// src/components/AuthModal.tsx
import { useState, useEffect } from 'react'
import { useModalStore } from '../store/modalStore'
import { webApi } from '../api/client'
import { Link } from 'react-router-dom'

const PLANS = [
  { id: 'starter',  name: '스타터',  desc: '학생 50명 · 반 3개',   price: '10,000원/월' },
  { id: 'standard', name: '스탠다드', desc: '학생 100명 · 전 기능',  price: '20,000원/월', popular: true },
  { id: 'premium',  name: '프리미엄', desc: '학생 무제한 · 전담 지원', price: '50,000원/월' },
]

export default function AuthModal() {
  const { isOpen, tab, step, selectedPlan, close, setTab, setStep, setPlan } = useModalStore()
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  // 회원가입 폼
  const [s, setS] = useState({ name: '', phone: '', email: '', pw: '', academy: '', address: '', count: '50 – 100명', subject: '수학' })
  const [agreeTerms, setAgreeTerms]   = useState(false)
  const [agreeMarketing, setAgreeMarketing] = useState(false)

  // 로그인 폼
  const [l, setL] = useState({ email: '', pw: '' })

  useEffect(() => {
    if (!isOpen) { setError(''); setLoading(false) }
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => { setError('') }, [tab, step])

  const sf = (key: keyof typeof s) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setS(prev => ({ ...prev, [key]: e.target.value }))
    setError('')
  }

  const nextStep = (n: 2 | 3) => {
    setError('')
    if (n === 2) {
      if (!s.name.trim()) return setError('성함을 입력해주세요.')
      if (!s.phone.trim()) return setError('연락처를 입력해주세요.')
      if (!s.email.trim() || !s.email.includes('@')) return setError('올바른 이메일을 입력해주세요.')
      if (s.pw.length < 8) return setError('비밀번호는 8자 이상이어야 합니다.')
    }
    if (n === 3) {
      if (!s.academy.trim()) return setError('학원명을 입력해주세요.')
    }
    setStep(n)
  }

  const doSignup = async () => {
    if (!agreeTerms) return setError('이용약관에 동의해주세요.')
    setLoading(true)
    try {
      await webApi.signup({
        name: s.name, email: s.email, password: s.pw,
        phone: s.phone, academyName: s.academy,
        academyAddress: s.address, plan: selectedPlan,
      })
      setStep('done')
    } catch (err: any) {
      setError(err.response?.data?.message ?? '회원가입 중 오류가 발생했습니다.')
    } finally { setLoading(false) }
  }

  const doLogin = async () => {
    if (!l.email.trim()) return setError('이메일을 입력해주세요.')
    if (!l.pw.trim()) return setError('비밀번호를 입력해주세요.')
    setLoading(true)
    try {
      await webApi.login({ email: l.email, password: l.pw })
      // 로그인 성공 → 어드민 대시보드로 이동
      window.location.href = 'http://localhost:3000'
    } catch (err: any) {
      setError(err.response?.data?.message ?? '이메일 또는 비밀번호를 확인해주세요.')
    } finally { setLoading(false) }
  }

  if (!isOpen) return null

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={e => e.target === e.currentTarget && close()}>
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">{tab === 'signup' ? '무료 회원가입' : '로그인'}</div>
          <button className="modal-close" onClick={close}>×</button>
        </div>
        <div className="modal-body">
          {/* 탭 */}
          <div className="modal-tabs">
            <button className={`modal-tab ${tab === 'signup' ? 'active' : ''}`} onClick={() => setTab('signup')}>회원가입</button>
            <button className={`modal-tab ${tab === 'login'  ? 'active' : ''}`} onClick={() => setTab('login')}>로그인</button>
          </div>

          {/* 에러 */}
          {error && <div className="form-error">{error}</div>}

          {/* ── 회원가입 ── */}
          {tab === 'signup' && (
            <>
              {/* Step 1 */}
              {step === 1 && (
                <>
                  <div className="pbar-wrap"><div className="pbar-label">STEP 1/3 — 기본 정보</div><div className="pbar-bg"><div className="pbar-fill" style={{ width: '33%' }} /></div></div>
                  <div className="form-row">
                    <div className="form-group"><label className="form-label">성함 *</label><input className="form-input" placeholder="홍길동" value={s.name} onChange={sf('name')} /></div>
                    <div className="form-group"><label className="form-label">연락처 *</label><input className="form-input" placeholder="010-0000-0000" value={s.phone} onChange={sf('phone')} /></div>
                  </div>
                  <div className="form-group"><label className="form-label">이메일 *</label><input className="form-input" type="email" placeholder="admin@example.kr" value={s.email} onChange={sf('email')} /></div>
                  <div className="form-group"><label className="form-label">비밀번호 * (8자 이상)</label><input className="form-input" type="password" placeholder="비밀번호 입력" value={s.pw} onChange={sf('pw')} /></div>
                  <button className="form-submit" onClick={() => nextStep(2)}>다음 → 학원 정보</button>
                </>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <>
                  <div className="pbar-wrap"><div className="pbar-label">STEP 2/3 — 학원 정보</div><div className="pbar-bg"><div className="pbar-fill" style={{ width: '66%' }} /></div></div>
                  <div className="form-group"><label className="form-label">학원명 *</label><input className="form-input" placeholder="Hi Academy 수학학원" value={s.academy} onChange={sf('academy')} /></div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">학생 수</label>
                      <select className="form-select" value={s.count} onChange={sf('count')}>
                        {['50명 미만','50 – 100명','100 – 200명','200명 이상'].map(v => <option key={v}>{v}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">주요 과목</label>
                      <select className="form-select" value={s.subject} onChange={sf('subject')}>
                        {['수학','영어','과학','국어','기타'].map(v => <option key={v}>{v}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="form-group"><label className="form-label">학원 주소</label><input className="form-input" placeholder="서울시 강남구 테헤란로 123" value={s.address} onChange={sf('address')} /></div>
                  <button className="form-submit" onClick={() => nextStep(3)}>다음 → 요금제 선택</button>
                  <div style={{ textAlign: 'center', marginTop: 10 }}><button onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: 'var(--slate)', fontSize: 13, cursor: 'pointer' }}>← 이전으로</button></div>
                </>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <>
                  <div className="pbar-wrap"><div className="pbar-label">STEP 3/3 — 요금제 선택</div><div className="pbar-bg"><div className="pbar-fill" style={{ width: '100%' }} /></div></div>
                  {PLANS.map(plan => (
                    <div key={plan.id} className={`plan-card ${selectedPlan === plan.id ? 'selected' : ''}`} onClick={() => setPlan(plan.id)}>
                      {plan.popular && <div className="plan-popular-tag">인기</div>}
                      <div className="plan-card-radio">{selectedPlan === plan.id && <div className="plan-card-radio-dot" />}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--navy)' }}>{plan.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--slate)', marginTop: 2 }}>{plan.desc}</div>
                      </div>
                      <div style={{ fontFamily: 'var(--display)', fontSize: 16, fontWeight: 800, color: 'var(--acc)' }}>{plan.price}</div>
                    </div>
                  ))}
                  <div style={{ background: 'var(--acc3)', borderRadius: 10, padding: '10px 14px', fontSize: 12, color: 'var(--acc)', marginBottom: 16 }}>🎉 30일 무료 체험 · 이후 결제 · 언제든 취소</div>
                  <div className="form-check">
                    <input type="checkbox" id="ag1" checked={agreeTerms} onChange={e => setAgreeTerms(e.target.checked)} />
                    <label htmlFor="ag1"><Link to="/terms" onClick={close} style={{ color: 'var(--acc)', fontWeight: 600 }}>이용약관</Link> 및 <Link to="/privacy" onClick={close} style={{ color: 'var(--acc)', fontWeight: 600 }}>개인정보처리방침</Link>에 동의합니다 *</label>
                  </div>
                  <div className="form-check">
                    <input type="checkbox" id="ag2" checked={agreeMarketing} onChange={e => setAgreeMarketing(e.target.checked)} />
                    <label htmlFor="ag2">마케팅 정보 수신 동의 (선택)</label>
                  </div>
                  <button className="form-submit" onClick={doSignup} disabled={loading}>
                    {loading ? '처리 중...' : '🚀 무료 체험 시작하기'}
                  </button>
                  <div style={{ textAlign: 'center', marginTop: 10 }}><button onClick={() => setStep(2)} style={{ background: 'none', border: 'none', color: 'var(--slate)', fontSize: 13, cursor: 'pointer' }}>← 이전으로</button></div>
                </>
              )}

              {/* 완료 */}
              {step === 'done' && (
                <div className="success-screen">
                  <div className="success-icon">🎉</div>
                  <div className="success-title">환영합니다!</div>
                  <div className="success-desc">HiAcademy 가입이 완료되었습니다.<br/>이메일로 인증 링크를 발송했습니다.<br/>30일 무료 체험을 시작해보세요!</div>
                  <button className="form-submit" onClick={close}>어드민 대시보드 열기 →</button>
                </div>
              )}
            </>
          )}

          {/* ── 로그인 ── */}
          {tab === 'login' && (
            <>
              <div className="form-group"><label className="form-label">이메일</label><input className="form-input" type="email" placeholder="admin@example.kr" value={l.email} onChange={e => { setL(p => ({ ...p, email: e.target.value })); setError('') }} /></div>
              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
                  <label className="form-label" style={{ margin: 0 }}>비밀번호</label>
                  <a href="#" style={{ fontSize: 12, color: 'var(--acc)', fontWeight: 600 }}>비밀번호 찾기</a>
                </div>
                <input className="form-input" type="password" placeholder="비밀번호 입력" value={l.pw} onChange={e => { setL(p => ({ ...p, pw: e.target.value })); setError('') }} onKeyDown={e => e.key === 'Enter' && doLogin()} />
              </div>
              <button className="form-submit" onClick={doLogin} disabled={loading}>{loading ? '로그인 중...' : '로그인'}</button>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '18px 0', color: 'var(--slate)', fontSize: 12 }}>
                <div style={{ flex: 1, height: 1, background: 'var(--bd)' }} /><span>또는</span><div style={{ flex: 1, height: 1, background: 'var(--bd)' }} />
              </div>
              <button style={{ width: '100%', height: 48, borderRadius: 12, background: '#FEE500', border: 'none', fontSize: 14, fontWeight: 700, color: '#3C1E1E', cursor: 'pointer', marginBottom: 10 }}>💬 카카오로 로그인</button>
              <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--slate)', marginTop: 16 }}>
                계정이 없으신가요? <button onClick={() => setTab('signup')} style={{ background: 'none', border: 'none', color: 'var(--acc)', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>회원가입</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
