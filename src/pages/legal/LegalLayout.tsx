// src/pages/legal/LegalLayout.tsx
import { Link, useLocation } from 'react-router-dom'

interface Props { title: string; tag: string; children: React.ReactNode }

const INFO = [
  { to: '/privacy', label: '개인정보처리방침' },
  { to: '/terms',   label: '이용약관' },
  { to: '/refund',  label: '환불정책' },
]

const s: Record<string, React.CSSProperties> = {
  wrap:    { maxWidth: 900, margin: '0 auto', padding: '48px 24px 80px' },
  header:  { background: 'linear-gradient(135deg,var(--navy),#2D2A6E)', borderRadius: 20, padding: '36px 40px', marginBottom: 36, color: '#fff' },
  tag:     { display: 'inline-block', background: 'rgba(108,99,255,.35)', border: '1px solid rgba(108,99,255,.4)', borderRadius: 999, padding: '5px 14px', fontSize: 12, fontWeight: 700, letterSpacing: 1, color: 'rgba(255,255,255,.85)', marginBottom: 16, textTransform: 'uppercase' as const },
  title:   { fontFamily: 'var(--display)', fontSize: 28, fontWeight: 900, marginBottom: 10 },
  meta:    { fontSize: 13, color: 'rgba(255,255,255,.5)', display: 'flex', gap: 20, flexWrap: 'wrap' as const },
  toc:     { background: '#fff', borderRadius: 16, padding: '24px 28px', marginBottom: 28, border: '1px solid var(--bd)' },
  section: { background: '#fff', borderRadius: 16, padding: 32, marginBottom: 16, border: '1px solid var(--bd)' },
  sNum:    { fontSize: 12, fontWeight: 700, color: 'var(--acc)', textTransform: 'uppercase' as const, letterSpacing: 1, marginBottom: 8 },
  sTitle:  { fontSize: 18, fontWeight: 800, color: 'var(--navy)', marginBottom: 16, paddingBottom: 12, borderBottom: '2px solid var(--acc3)' },
  table:   { width: '100%', borderCollapse: 'collapse' as const, fontSize: 13, margin: '12px 0' },
  thStyle: { padding: '10px 12px', background: 'var(--g1)', border: '1px solid var(--bd)', textAlign: 'left' as const, fontWeight: 700, color: 'var(--navy)' },
  tdStyle: { padding: '10px 12px', border: '1px solid var(--bd)', color: 'var(--slate)' },
  hl:      { background: 'var(--acc3)', borderRadius: 12, padding: '14px 18px', fontSize: 13, color: 'var(--acc)', margin: '12px 0', borderLeft: '4px solid var(--acc)' },
  info:    { background: 'var(--g1)', borderRadius: 12, padding: '16px 20px', fontSize: 13, color: 'var(--slate)', margin: '12px 0', border: '1px solid var(--bd)' },
}

export function Sec({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <div style={s.section} id={`s${num}`}>
      <div style={s.sNum}>제{num}조</div>
      <div style={s.sTitle}>{title}</div>
      {children}
    </div>
  )
}

export function Hl({ children }: { children: React.ReactNode }) {
  return <div style={s.hl}>{children}</div>
}

export function InfoBox({ children }: { children: React.ReactNode }) {
  return <div style={s.info}>{children}</div>
}

export function LTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <table style={s.table}>
      <thead><tr>{headers.map(h => <th key={h} style={s.thStyle}>{h}</th>)}</tr></thead>
      <tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j} style={s.tdStyle}>{cell}</td>)}</tr>)}</tbody>
    </table>
  )
}

export function Ul({ items }: { items: string[] }) {
  return (
    <ul style={{ paddingLeft: 20, margin: '0 0 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
      {items.map(item => <li key={item} style={{ fontSize: 14, color: 'var(--slate)' }}>{item}</li>)}
    </ul>
  )
}

export function P({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 14, color: 'var(--slate)', marginBottom: 12 }}>{children}</p>
}

export default function LegalLayout({ title, tag, children }: Props) {
  const { pathname } = useLocation()
  return (
    <div style={{ background: 'var(--g1)', minHeight: '100vh' }}>
      <div style={s.wrap}>
        <div style={s.header}>
          <div style={s.tag}>{tag}</div>
          <div style={s.title}>{title}</div>
          <div style={s.meta}>
            <span>📅 시행일자: 2026년 04월 01일</span>
            <span>🏢 디브릿지허브</span>
            <span>👤 대표 장경수</span>
          </div>
        </div>
        {children}
        <div style={{ ...s.info, textAlign: 'center', fontSize: 12, marginTop: 24 }}>
          상호: 디브릿지허브 | 대표자: 장경수 | 사업자등록번호: 599-26-02056<br/>
          주소: 서울특별시 동대문구 장안벚꽃로5길 19, 103동 2107호<br/>
          공고일자: 2026년 04월 01일 | <strong>시행일자: 2026년 04월 01일</strong>
        </div>
      </div>
      <style>{`@media(max-width:600px){ #legal-header { padding: 24px 20px !important; } }`}</style>
    </div>
  )
}
