import { clearAuth, getAuth } from '../authStorage.js'

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8080').replace(/\/+$/, '')

export async function apiRequest(path, { method = 'GET', token, body } = {}) {
  const urlPath = path.startsWith('/') ? path : `/${path}`
  const authToken = token ?? getAuth().token
  const res = await fetch(`${API_URL}${urlPath}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    },
    body: body == null ? undefined : JSON.stringify(body),
  })

  let json = null
  try {
    json = await res.json()
  } catch {
    // ignorado: backend siempre responde JSON
  }

  if (res.status === 401) {
    clearAuth()
    window.location.replace('/login')
    return
  }

  if (!res.ok) {
    const message = json?.message || res.statusText || 'Error de red'
    throw new Error(message)
  }

  return json
}
