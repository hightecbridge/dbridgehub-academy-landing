// src/api/client.ts
import axios from 'axios'

const client = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('hiacademy_web_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

client.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('hiacademy_web_token')
    }
    return Promise.reject(err)
  }
)

export default client

// ── API 함수 ──────────────────────────────────────

export interface SignupPayload {
  name: string
  email: string
  password: string
  phone: string
  academyName: string
  academyAddress?: string
  plan: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface ContactPayload {
  academyName: string
  name: string
  phone: string
  studentCount?: string
  message?: string
}

export const webApi = {
  // 회원가입
  signup: async (data: SignupPayload) => {
    const res = await client.post('/admin/auth/signup', {
      name:           data.name,
      email:          data.email,
      password:       data.password,
      phone:          data.phone,
      academyName:    data.academyName,
      academyAddress: data.academyAddress ?? '',
      plan:           data.plan,
    })
    return res.data.data
  },

  // 로그인
  login: async (data: LoginPayload) => {
    const res = await client.post('/admin/auth/login', {
      email:    data.email,
      password: data.password,
    })
    const result = res.data.data
    if (result?.token) {
      localStorage.setItem('hiacademy_web_token', result.token)
    }
    return result
  },

  // 도입 문의 저장
  contact: async (data: ContactPayload) => {
    const res = await client.post('/web/contact', data)
    return res.data
  },
}
