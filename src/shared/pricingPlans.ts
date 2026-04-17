/** 랜딩 요금제 섹션 · 어드민 pricingPlans.ts 와 학생 상한 정책을 맞춥니다. */
export type PlanId = 'standard' | 'premium' | 'enterprise'

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
  {
    id: 'standard',
    name: '스탠다드',
    desc: '성장하는 중형 학원을 위한 기본 플랜.',
    priceM: 10000,
    priceY: 8000,
    popular: true,
    items: ['학생 최대 50명', '반 무제한', '출석·수납·숙제 관리', '카카오 알림톡 연동', '학부모 앱 풀 기능'],
    nope: [],
  },
  {
    id: 'premium',
    name: '프리미엄',
    desc: '대형 학원·다지점 운영에 맞춘 확장 플랜.',
    priceM: 20000,
    priceY: 16000,
    items: ['학생 최대 100명', '반 무제한', '모든 기능 포함', '다중 원장 계정', 'API 연동 지원'],
    nope: [],
  },
  {
    id: 'enterprise',
    name: '엔터프라이즈',
    desc: '프랜차이즈·대규모 학원을 위한 맞춤형 플랜.',
    priceM: 50000,
    priceY: 40000,
    items: ['학생 수 무제한', '반 무제한', '모든 기능 포함', '전담 온보딩', 'SLA·보안 옵션'],
    nope: [],
  },
]

export function planById(id: string | undefined | null): PricingPlan {
  const found = PLANS.find((p) => p.id === id)
  return found ?? PLANS[0]
}

export function priceKrwPerMonth(planId: PlanId, mode: BillingMode): number {
  const p = planById(planId)
  return mode === 'm' ? p.priceM : p.priceY
}

export function fmtKrw(n: number): string {
  return n.toLocaleString('ko-KR')
}
