import { apiRequest } from './api.js'

export async function getActividades() {
  const res = await apiRequest('/api/activities')
  return res?.data ?? []
}

export async function getActividadById(id) {
  const res = await apiRequest(`/api/activities/${id}`)
  return res?.data
}

export async function createActividad(actividad) {
  const res = await apiRequest('/api/activities', {
    method: 'POST',
    body: actividad,
  })
  return res?.data
}

export async function updateActividad(id, actividad) {
  const res = await apiRequest(`/api/activities/${id}`, {
    method: 'PUT',
    body: actividad,
  })
  return res?.data
}

export async function deleteActividad(id) {
  const res = await apiRequest(`/api/activities/${id}`, {
    method: 'DELETE',
  })
  return res?.data ?? null
}


