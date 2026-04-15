/** 랜딩 요금제 섹션 · 어드민과 동기화 시 academy/shared/pricingPlans.ts 내용을 맞춥니다. */
export type PlanId = 'starter' | 'standard' | 'premium'

export type BillingMode = 'm' | 'y'

export interface PricingPlan {
  id: PlanId
  name: string
  desc: string
  priceM: number
  priceY: number
  popular?: boolean
  items: string[]
  nope: string[]
}

export const PLANS: PricingPlan[] = [
  { id: 'starter', name: '스타터', desc: '소규모 학원의 첫 디지털 전환.', priceM: 10000, priceY: 8000, items: ['학생 50명까지', '반 3개까지', '출석·수납 관리', '공지사항', '학부모 앱 기본'], nope: ['숙제 관리', '카카오 알림톡'] },
  { id: 'standard', name: '스탠다드', desc: '성장하는 중형 학원을 위한 완전한 솔루션.', priceM: 20000, priceY: 16000, popular: true, items: ['학생 100명까지', '반 무제한', '출석·수납·숙제 관리', '카카오 알림톡 연동', '학부모 앱 풀 기능', '엑셀 내보내기'], nope: [] },
  { id: 'premium', name: '프리미엄', desc: '대형 학원 & 프랜차이즈를 위한 엔터프라이즈.', priceM: 50000, priceY: 40000, items: ['학생 무제한', '반 무제한', '모든 기능 포함', '카카오 알림톡 연동', '다중 원장 계정', 'API 연동 지원'], nope: [] },
]

export function planById(id: string | undefined | null): PricingPlan {
  const found = PLANS.find((p) => p.id === id)
  return found ?? PLANS[1]
}

export function priceKrwPerMonth(planId: PlanId, mode: BillingMode): number {
  const p = planById(planId)
  return mode === 'm' ? p.priceM : p.priceY
}

export function fmtKrw(n: number): string {
  return n.toLocaleString('ko-KR')
}
