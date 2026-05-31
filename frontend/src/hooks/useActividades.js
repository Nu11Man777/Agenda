import { useEffect, useState } from 'react'
import {
  createActividad,
  deleteActividad,
  getActividades,
  updateActividad,
} from '../services/actividadService.js'

function toRequest(actividad, overrides = {}) {
  return {
    nombre: actividad.nombre,
    fecha: actividad.fecha,
    horaInicio: actividad.horaInicio,
    horaFin: actividad.horaFin,
    comentarios: actividad.comentarios ?? null,
    estatus: actividad.estatus,
    ...overrides,
  }
}

export function useActividades() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let alive = true
    setLoading(true)
    setError(null)

    getActividades()
      .then((data) => {
        if (!alive) return
        setActivities(Array.isArray(data) ? data : [])
      })
      .catch((e) => {
        if (!alive) return
        setError(e?.message || 'No se pudieron cargar las actividades.')
        setActivities([])
      })
      .finally(() => {
        if (!alive) return
        setLoading(false)
      })

    return () => {
      alive = false
    }
  }, [])

  async function changeStatus(activityId, nextStatusKey) {
    const prev = activities
    const current = prev.find((a) => a.id === activityId)
    if (!current || current.estatus === nextStatusKey) return

    setActivities((list) =>
      list.map((a) => (a.id === activityId ? { ...a, estatus: nextStatusKey } : a)),
    )

    try {
      const updated = await updateActividad(activityId, toRequest(current, { estatus: nextStatusKey }))
      setActivities((list) => list.map((a) => (a.id === activityId ? updated : a)))
    } catch (e) {
      setActivities(prev)
      setError(e?.message || 'No se pudo actualizar el estatus.')
    }
  }

  async function addActivity(payload) {
    const created = await createActividad(payload)
    setActivities((list) => [...list, created])
    return created
  }

  async function editActivity(id, payload) {
    const updated = await updateActividad(id, payload)
    setActivities((list) => list.map((a) => (a.id === id ? updated : a)))
    return updated
  }

  async function removeActivity(id) {
    await deleteActividad(id)
    setActivities((list) => list.filter((a) => a.id !== id))
  }

  return { activities, loading, error, setError, changeStatus, addActivity, editActivity, removeActivity }
}
