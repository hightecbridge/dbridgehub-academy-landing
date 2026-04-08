/**
 * 랜딩 Axios `baseURL` — 서블릿 컨텍스트 `/api` 까지 (경로 끝 슬래시 없음).
 *
 * 우선순위: `VITE_API_BASE_URL` → 모드별 기본값
 * - 로컬: Vite 프록시 → `/api`
 * - 운영: `https://api.dbridgehub.com/api`
 */
const DEFAULT_LOCAL = '/api'
const DEFAULT_PRODUCTION = 'https://api.dbridgehub.com/api'

export const LANDING_API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? (import.meta.env.PROD ? DEFAULT_PRODUCTION : DEFAULT_LOCAL)
