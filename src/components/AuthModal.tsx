// src/components/AuthModal.tsx — 어드민 SignupPage와 동일 검증·동일 API (/academy/admin/auth)
import { useState, useEffect } from 'react'
import { useModalStore } from '../store/modalStore'
import { webApi, redirectToAdminDashboard } from '../api/client'
import { Link } from 'react-router-dom'

export default function AuthModal() {
  const { isOpen, tab, step, selectedPlan, close, setTab, setStep } = useModalStore()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw] = useState(false)

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    academyName: '',
    phone: '',
  })
  const [pwConfirm, setPwConfirm] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const [l, setL] = useState({ email: '', pw: '' })

  useEffect(() => {
    if (!isOpen) {
      setError('')
      setLoading(false)
      setFieldErrors({})
    }
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => { setError('') }, [tab, step])

  const setF = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((p) => ({ ...p, [key]: e.target.value }))
    setFieldErrors((fe) => { const n = { ...fe }; delete n[key]; return n })
    setError('')
  }

  const validateStep1 = () => {
    const errs: Record<string, string> = {}
    if (!form.name.trim()) errs.name = '이름을 입력해주세요.'
    if (!form.email.trim()) errs.email = '이메일을 입력해주세요.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = '올바른 이메일 형식이 아닙니다.'
    if (!form.password) errs.password = '비밀번호를 입력해주세요.'
    else if (form.password.length < 4) errs.password = '비밀번호는 4자 이상이어야 합니다.'
    if (form.password !== pwConfirm) errs.pwConfirm = '비밀번호가 일치하지 않습니다.'
    setFieldErrors(errs)
    return Object.keys(errs).length === 0
  }

  const validateStep2 = () => {
    const errs: Record<string, string> = {}
    if (!form.academyName.trim()) errs.academyName = '학원명을 입력해주세요.'
    if (!form.phone.trim()) errs.phone = '연락처를 입력해주세요.'
    if (!agreed) errs.agree = '이용약관에 동의해주세요.'
    setFieldErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSignupNext = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2)
    } else if (step === 2) {
      void submitSignup()
    }
  }

  const submitSignup = async () => {
    if (!validateStep2()) return
    setLoading(true)
    try {
      await webApi.signup({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        phone: form.phone.trim(),
        academyName: form.academyName.trim(),
        academyAddress: '',
      })
      setStep('done')
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } }
      setError(e.response?.data?.message ?? '회원가입 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (loading) return
    const fd = new FormData(e.currentTarget)
    const email = String(fd.get('loginEmail') ?? '').trim()
    const password = String(fd.get('loginPassword') ?? '')
    if (!email) {
      setError('이메일을 입력해주세요.')
      return
    }
    if (!password) {
      setError('비밀번호를 입력해주세요.')
      return
    }
    setLoading(true)
    setError('')
    try {
      await webApi.login({ email, password })
      close()
      redirectToAdminDashboard()
    } catch (err: unknown) {
      const ex = err as { response?: { data?: { message?: string } } }
      setError(ex.response?.data?.message ?? '이메일 또는 비밀번호를 확인해주세요.')
    } finally {
      setLoading(false)
    }
  }

  const goAdminAfterSignup = () => {
    close()
    redirectToAdminDashboard()
  }

  if (!isOpen) return null

  const fe = (k: string) => fieldErrors[k] ? ' field-error' : ''

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} role="presentation">
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">{tab === 'signup' ? '무료 회원가입' : '로그인'}</div>
          <button type="button" className="modal-close" onClick={close}>×</button>
        </div>
        <div className="modal-body">
          <div className="modal-tabs">
            <button type="button" className={`modal-tab ${tab === 'signup' ? 'active' : ''}`} onClick={() => setTab('signup')}>회원가입</button>
            <button type="button" className={`modal-tab ${tab === 'login' ? 'active' : ''}`} onClick={() => setTab('login')}>로그인</button>
          </div>

          {error && <div className="form-error">{error}</div>}

          {tab === 'signup' && (
            <>
              {step === 1 && (
                <>
                  <div className="pbar-wrap"><div className="pbar-label">STEP 1/2 — 기본 정보 (어드민과 동일)</div><div className="pbar-bg"><div className="pbar-fill" style={{ width: '50%' }} /></div></div>
                  <div className="form-group">
                    <label className="form-label">이름 *</label>
                    <input className={`form-input${fe('name')}`} placeholder="홍길동" value={form.name} onChange={setF('name')} autoComplete="name" />
                    {fieldErrors.name && <p className="field-hint-err">{fieldErrors.name}</p>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">이메일 *</label>
                    <input className={`form-input${fe('email')}`} type="email" placeholder="admin@hiacademy.kr" value={form.email} onChange={setF('email')} autoComplete="email" />
                    {fieldErrors.email && <p className="field-hint-err">{fieldErrors.email}</p>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">비밀번호 * (4자 이상)</label>
                    <div style={{ position: 'relative' }}>
                      <input className={`form-input${fe('password')}`} type={showPw ? 'text' : 'password'} placeholder="4자 이상" value={form.password} onChange={setF('password')} autoComplete="new-password" />
                      <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: 'var(--slate)' }}>{showPw ? '숨김' : '표시'}</button>
                    </div>
                    {fieldErrors.password && <p className="field-hint-err">{fieldErrors.password}</p>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">비밀번호 확인 *</label>
                    <input className={`form-input${fe('pwConfirm')}`} type={showPw ? 'text' : 'password'} placeholder="비밀번호 재입력" value={pwConfirm} onChange={(e) => { setPwConfirm(e.target.value); setFieldErrors((fe) => { const n = { ...fe }; delete n.pwConfirm; return n }); setError('') }} autoComplete="new-password" />
                    {fieldErrors.pwConfirm && <p className="field-hint-err">{fieldErrors.pwConfirm}</p>}
                  </div>
                  <button type="button" className="form-submit" onClick={handleSignupNext}>다음 → 학원 정보</button>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="pbar-wrap"><div className="pbar-label">STEP 2/2 — 학원 정보</div><div className="pbar-bg"><div className="pbar-fill" style={{ width: '100%' }} /></div></div>
                  <div style={{ background: 'var(--acc3)', borderRadius: 10, padding: '10px 14px', fontSize: 12, color: 'var(--acc)', marginBottom: 14 }}>
                    30일 무료 체험 후 관리자 화면 <strong>이용요금관리</strong>에서 결제할 수 있습니다. (선택 요금제: {selectedPlan})
                  </div>
                  <div className="form-group">
                    <label className="form-label">학원명 *</label>
                    <input className={`form-input${fe('academyName')}`} placeholder="Hi Academy" value={form.academyName} onChange={setF('academyName')} />
                    {fieldErrors.academyName && <p className="field-hint-err">{fieldErrors.academyName}</p>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">연락처 *</label>
                    <input className={`form-input${fe('phone')}`} type="tel" placeholder="010-0000-0000" value={form.phone} onChange={setF('phone')} />
                    {fieldErrors.phone && <p className="field-hint-err">{fieldErrors.phone}</p>}
                  </div>
                  <div style={{ borderRadius: 12, background: 'var(--g1)', padding: '12px 14px', marginBottom: 16, border: fieldErrors.agree ? '1.5px solid var(--err)' : '1px solid var(--bd)' }}>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', fontSize: 13, color: 'var(--slate)', lineHeight: 1.6 }}>
                      <input type="checkbox" checked={agreed} onChange={(e) => { setAgreed(e.target.checked); setFieldErrors((fe) => { const n = { ...fe }; delete n.agree; return n }) }} style={{ marginTop: 3 }} />
                      <span><Link to="/terms" onClick={close} style={{ color: 'var(--acc)', fontWeight: 600 }}>이용약관</Link> 및 <Link to="/privacy" onClick={close} style={{ color: 'var(--acc)', fontWeight: 600 }}>개인정보 처리방침</Link>에 동의합니다.</span>
                    </label>
                    {fieldErrors.agree && <p className="field-hint-err" style={{ marginTop: 8 }}>{fieldErrors.agree}</p>}
                  </div>
                  <button type="button" className="form-submit" onClick={handleSignupNext} disabled={loading}>{loading ? '처리 중...' : '가입 완료'}</button>
                  <div style={{ textAlign: 'center', marginTop: 10 }}><button type="button" onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: 'var(--slate)', fontSize: 13, cursor: 'pointer' }}>← 이전</button></div>
                </>
              )}

              {step === 'done' && (
                <div className="success-screen">
                  <div className="success-icon">🎉</div>
                  <div className="success-title">가입 완료!</div>
                  <div className="success-desc">
                    <strong>{form.academyName}</strong> 관리자 계정이 생성되었습니다.<br />
                    어드민에서 이용 요금·문자 포인트를 확인하세요.
                  </div>
                  <button type="button" className="form-submit" onClick={goAdminAfterSignup}>대시보드로 이동 →</button>
                </div>
              )}
            </>
          )}

          {tab === 'login' && (
            <form noValidate onSubmit={(e) => void handleLogin(e)}>
              <div className="form-group">
                <label className="form-label" htmlFor="login-email">이메일</label>
                <input
                  id="login-email"
                  name="loginEmail"
                  className="form-input"
                  type="email"
                  placeholder="admin@hiacademy.kr"
                  autoComplete="username"
                  value={l.email}
                  onChange={(e) => { setL((p) => ({ ...p, email: e.target.value })); setError('') }}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="login-password">비밀번호</label>
                <input
                  id="login-password"
                  name="loginPassword"
                  className="form-input"
                  type="password"
                  placeholder="비밀번호 입력"
                  autoComplete="current-password"
                  value={l.pw}
                  onChange={(e) => { setL((p) => ({ ...p, pw: e.target.value })); setError('') }}
                />
              </div>
              <button type="submit" className="form-submit" disabled={loading}>{loading ? '로그인 중...' : '로그인'}</button>
              <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--slate)', marginTop: 16 }}>
                계정이 없으신가요?{' '}
                <button type="button" onClick={() => setTab('signup')} style={{ background: 'none', border: 'none', color: 'var(--acc)', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>회원가입</button>
              </div>
            </form>
          )}
        </div>
      </div>
      <style>{`
        .field-hint-err { font-size: 11px; color: var(--err, #c00); margin: 6px 0 0; }
        .form-input.field-error { border-color: var(--err, #c00) !important; }
      `}</style>
    </div>
  )
}
