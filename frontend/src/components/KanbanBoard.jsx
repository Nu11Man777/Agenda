import { useMemo, useState } from 'react'
import { CheckCircle2, Clock, Plus, PlayCircle } from 'lucide-react'
import ActividadFormModal from './ActividadFormModal.jsx'
import Column from './Column.jsx'
import DeleteConfirmModal from './DeleteConfirmModal.jsx'
import { useActividades } from '../hooks/useActividades.js'
import { combineDateTime, splitDateTime, toLocalDate, toLocalDateTime } from '../utils/datetime.js'

const STATUS = {
  PENDIENTE: { label: 'Pendiente', icon: Clock },
  INICIADO: { label: 'En progreso', icon: PlayCircle },
  FINALIZADO: { label: 'Finalizado', icon: CheckCircle2 },
}

function formToPayload(form) {
  return {
    nombre: form.nombre.trim(),
    fecha: form.fecha,
    horaInicio: combineDateTime(form.fecha, form.horaInicio),
    horaFin: combineDateTime(form.fecha, form.horaFin),
    comentarios: form.comentarios.trim() || null,
    estatus: form.estatus,
  }
}

export default function KanbanBoard() {
  const { activities, loading, error, setError, changeStatus, addActivity, editActivity, removeActivity } =
    useActividades()

  const [modal, setModal] = useState(null)
  const [form, setForm] = useState({
    nombre: '',
    fecha: '',
    horaInicio: '',
    horaFin: '',
    comentarios: '',
    estatus: 'PENDIENTE',
  })
  const [saving, setSaving] = useState(false)

  const grouped = useMemo(() => {
    const base = { PENDIENTE: [], INICIADO: [], FINALIZADO: [] }
    for (const a of activities) {
      if (Object.hasOwn(base, a.estatus)) {
        base[a.estatus].push(a)
      } else {
        console.warn(`Estatus desconocido omitido: "${a.estatus}" (id: ${a.id})`)
      }
    }
    return base
  }, [activities])

  function openCreate(statusKey) {
    const now = new Date()
    const end = new Date(now.getTime() + 30 * 60 * 1000)
    setForm({
      nombre: '',
      fecha: toLocalDate(now),
      horaInicio: splitDateTime(toLocalDateTime(now)).time,
      horaFin: splitDateTime(toLocalDateTime(end)).time,
      comentarios: '',
      estatus: statusKey,
    })
    setModal({ type: 'create', statusKey })
  }

  function openEdit(actividad) {
    const start = splitDateTime(actividad.horaInicio)
    const end = splitDateTime(actividad.horaFin)
    setForm({
      nombre: actividad.nombre || '',
      fecha: actividad.fecha || start.date || '',
      horaInicio: start.time || '',
      horaFin: end.time || '',
      comentarios: actividad.comentarios || '',
      estatus: actividad.estatus || 'PENDIENTE',
    })
    setModal({ type: 'edit', actividad })
  }

  function openDelete(actividad) {
    setModal({ type: 'delete', actividad })
  }

  async function submitCreate() {
    if (!form.nombre.trim() || !form.fecha || !form.horaInicio || !form.horaFin) return
    setSaving(true)
    try {
      setError(null)
      await addActivity(formToPayload(form))
      setModal(null)
    } catch (e) {
      setError(e?.message || 'No se pudo crear la actividad.')
    } finally {
      setSaving(false)
    }
  }

  async function submitEdit(actividad) {
    if (!actividad) return
    if (!form.nombre.trim() || !form.fecha || !form.horaInicio || !form.horaFin) return
    setSaving(true)
    try {
      setError(null)
      await editActivity(actividad.id, formToPayload(form))
      setModal(null)
    } catch (e) {
      setError(e?.message || 'No se pudo actualizar la actividad.')
    } finally {
      setSaving(false)
    }
  }

  async function confirmDelete(actividad) {
    if (!actividad) return
    setSaving(true)
    try {
      setError(null)
      await removeActivity(actividad.id)
      setModal(null)
    } catch (e) {
      setError(e?.message || 'No se pudo eliminar la actividad.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="flex flex-col gap-3" aria-label="Tablero Kanban">
      {error ? (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-200">
          {error}
        </div>
      ) : null}

      {modal?.type === 'create' ? (
        <ActividadFormModal
          mode="create"
          form={form}
          setForm={setForm}
          saving={saving}
          onClose={() => (saving ? null : setModal(null))}
          onSubmit={submitCreate}
        />
      ) : null}

      {modal?.type === 'edit' ? (
        <ActividadFormModal
          mode="edit"
          form={form}
          setForm={setForm}
          saving={saving}
          onClose={() => (saving ? null : setModal(null))}
          onSubmit={() => submitEdit(modal.actividad)}
        />
      ) : null}

      {modal?.type === 'delete' ? (
        <DeleteConfirmModal
          actividadNombre={modal.actividad?.nombre}
          saving={saving}
          onClose={() => (saving ? null : setModal(null))}
          onConfirm={() => confirmDelete(modal.actividad)}
        />
      ) : null}

      <div className="flex flex-col gap-4 lg:flex-row">
        {Object.entries(STATUS).map(([key, meta]) => (
          <Column
            key={key}
            title={meta.label}
            icon={meta.icon}
            items={grouped[key]}
            onAdd={() => openCreate(key)}
            addIcon={Plus}
            onChangeStatus={changeStatus}
            onEdit={openEdit}
            onDelete={openDelete}
            loading={loading}
          />
        ))}
      </div>
    </section>
  )
}
