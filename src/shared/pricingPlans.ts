/** 랜딩 요금제 섹션 · 어드민 pricingPlans.ts 와 학생 상한 정책을 맞춥니다. */
export type PlanId = 'basic' | 'standard' | 'premium' | 'enterprise'

export interface PricingPlan {
  id: PlanId
  name: string
  desc: string
  priceM: number
  popular?: boolean
  items: string[]
  nope: string[]
}

export const PLANS: PricingPlan[] = [
  {
    id: 'basic',
    name: '베이직',
    desc: '소형 학원을 위한 실속 플랜',
    priceM: 4400,
    items: ['학생 최대 50명', '출석·수납·공지·숙제 관리', '학부모 앱 기본 연동'],
    nope: [],
  },
  {
    id: 'standard',
    name: '스탠다드',
    desc: '중형 학원을 위한 확장 플랜',
    priceM: 8800,
    popular: true,
    items: ['학생 최대 100명', '반 무제한', '출석·수납·숙제 관리', '카카오 알림톡 연동', '학부모 앱 풀 기능'],
    nope: [],
  },
  {
    id: 'premium',
    name: '프리미엄',
    desc: '대형 학원 운영에 최적화된 플랜',
    priceM: 16500,
    items: ['학생 최대 200명', '반 무제한', '모든 기능 포함', '다중 원장 계정', 'API 연동 지원'],
    nope: [],
  },
  {
    id: 'enterprise',
    name: '엔터프라이즈',
    desc: '초대형 학원/지점형 운영 플랜',
    priceM: 33000,
    items: ['학생 최대 500명', '반 무제한', '모든 기능 포함', '전담 온보딩', 'API/운영 고도 지원'],
    nope: [],
  },
]

export function planById(id: string | undefined | null): PricingPlan {
  const found = PLANS.find((p) => p.id === id)
  return found ?? PLANS[0]
}

export function priceKrwPerMonth(planId: PlanId): number {
  const p = planById(planId)
  return p.priceM
}

export function fmtKrw(n: number): string {
  return n.toLocaleString('ko-KR')
}
