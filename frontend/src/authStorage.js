const KEY = 'auth'

// Revisar si es que existe algún token guardado...
export function getAuth() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { user: null, token: null }
    const parsed = JSON.parse(raw)
    return {
      user: parsed?.user ?? null,
      token: parsed?.token ?? null,
    }
  } catch {
    return { user: null, token: null }
  }
}

export function setAuth({ user, token }) {
  localStorage.setItem(KEY, JSON.stringify({ user, token }))
}

export function clearAuth() {
  localStorage.removeItem(KEY)
}
