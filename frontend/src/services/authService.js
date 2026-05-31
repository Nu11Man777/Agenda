import { apiRequest } from './api.js'

export async function login(correo, password) {
  const res = await apiRequest('/api/auth/login', {
    method: 'POST',
    body: { correo, password },
  })

  const data = res?.data
  if (!data?.token) throw new Error('Respuesta inválida del servidor (token faltante).')

  return {
    token: data.token,
    user: {
      userId: data.userId,
      nombre: data.nombre,
      apellido: data.apellido,
      correo: data.correo,
    },
  }
}

export async function register(data) {
  const res = await apiRequest('/api/auth/register', {
    method: 'POST',
    body: data,
  })

  return { message: res?.message || 'OK' }
}
