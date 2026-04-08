// src/api/client.ts — 어드민과 동일 API, 환경별 baseURL 은 config/apiBase.ts
import axios from 'axios'
import { LANDING_API_BASE_URL } from '../config/apiBase'

const client = axios.create({
  baseURL: LANDING_API_BASE_URL,
  timeout: 15000,
})

/** 어드민 앱과 동일 키 — 랜딩 가입/로그인 후 어드민으로 이동 시 세션 공유 */
const TOKEN_KEY = 'hiacademy_token'
const USER_KEY = 'hiacademy_user'

client.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

client.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
    }
    return Promise.reject(err)
  }
)

export default client

function mapAuthUser(d: Record<string, unknown>) {
  const academy = d.academy as Record<string, unknown> | undefined
  return {
    id: String(d.id ?? ''),
    name: String(d.name ?? ''),
    email: String(d.email ?? ''),
    role: String(d.role ?? 'ADMIN').toLowerCase() === 'admin' ? 'admin' : 'teacher',
    createdAt: String(d.createdAt ?? ''),
    phone: String(d.phone ?? academy?.phone ?? ''),
    academyName: String(academy?.name ?? ''),
    academyAddress: String(academy?.address ?? ''),
    academyDesc: String(academy?.desc ?? ''),
    profileImage: (d.profileImageBase64 ?? d.profileImage) as string | undefined,
    academyLogo: academy?.logoBase64 as string | undefined,
    academyId: academy?.id as number | undefined,
  }
}

export interface LoginPayload {
  email: string
  password: string
}

export interface SignupPayload {
  name: string
  email: string
  password: string
  phone: string
  academyName: string
  academyAddress?: string
}

export const webApi = {
  signup: async (data: SignupPayload) => {
    const res = await client.post('/academy/admin/auth/signup', {
      email: data.email,
      password: data.password,
      name: data.name,
      phone: data.phone,
      academyName: data.academyName,
      academyAddress: data.academyAddress ?? '',
    })
    const payload = res.data.data as Record<string, unknown> & { token?: string }
    if (payload?.token) {
      localStorage.setItem(TOKEN_KEY, payload.token)
      localStorage.setItem(USER_KEY, JSON.stringify(mapAuthUser(payload)))
    }
    return payload
  },

  login: async (data: LoginPayload) => {
    const res = await client.post('/academy/admin/auth/login', {
      email: data.email,
      password: data.password,
    })
    const payload = res.data.data as Record<string, unknown> & { token?: string }
    if (payload?.token) {
      localStorage.setItem(TOKEN_KEY, payload.token)
      localStorage.setItem(USER_KEY, JSON.stringify(mapAuthUser(payload)))
    }
    return payload
  },

  /** 랜딩 — 학원 가입(도입) 문의만 */
  signupInquiry: async (body: {
    academyName: string
    name: string
    phone: string
    studentCount?: string
    message?: string
    source?: string
  }) => {
    const res = await client.post('/homepage/signup-inquiries', body)
    return res.data
  },
}

export function getAdminOrigin() {
  return import.meta.env.VITE_ADMIN_ORIGIN ?? 'http://localhost:3000'
}

/** 랜딩·어드민이 포트/도메인이 달라 localStorage가 공유되지 않음 → 해시로 토큰 전달 (어드민 bootstrap에서 소비) */
const ADMIN_HANDOFF_HASH = 'hiacademy_handoff'

export function redirectToAdminDashboard() {
  const origin = getAdminOrigin().replace(/\/$/, '')
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) {
    window.location.href = `${origin}/#${ADMIN_HANDOFF_HASH}=${encodeURIComponent(token)}`
    return
  }
  window.location.href = `${origin}/`
}
