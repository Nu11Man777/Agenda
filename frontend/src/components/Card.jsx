import { useRef } from 'react'
import { Calendar, MessageSquareText, Pencil, Timer, Trash2 } from 'lucide-react'
import { formatDate, formatTimeRange, formatWorkHours } from '../utils/datetime.js'

const STATUS_LABEL = {
  PENDIENTE: 'Pendiente',
  INICIADO: 'En progreso',
  FINALIZADO: 'Finalizado',
}

const STATUS_BADGE = {
  PENDIENTE: 'text-zinc-300 border-white/10 bg-white/5',
  INICIADO: 'text-sky-300 border-sky-400/20 bg-sky-500/10',
  FINALIZADO: 'text-emerald-300 border-emerald-400/20 bg-emerald-500/10',
}

const STATUS_OPTIONS = [
  { key: 'PENDIENTE', label: STATUS_LABEL.PENDIENTE },
  { key: 'INICIADO', label: STATUS_LABEL.INICIADO },
  { key: 'FINALIZADO', label: STATUS_LABEL.FINALIZADO },
]


export default function Card({ actividad, onChangeStatus, onEdit, onDelete }) {
  const statusText = STATUS_LABEL[actividad.estatus] ?? actividad.estatus
  const badgeClass = STATUS_BADGE[actividad.estatus] ?? STATUS_BADGE.PENDIENTE
  const detailsRef = useRef(null)
  const horasText = formatWorkHours(actividad)

  function handlePick(nextStatusKey) {
    if (typeof onChangeStatus === 'function') {
      onChangeStatus(actividad.id, nextStatusKey)
    }
    if (detailsRef.current) detailsRef.current.open = false
  }

  return (
    <article
      className="rounded-2xl border border-white/10 bg-[#1b1b1b] p-3 text-left transition hover:-translate-y-0.5 hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-schneider-500/50"
      tabIndex={0}
    >
      <div className="text-sm font-semibold tracking-tight text-zinc-100">{actividad.nombre}</div>

      <div className="mt-2 flex flex-col gap-1 text-xs text-zinc-400">
        <div className="flex items-center gap-2">
          <Calendar size={16} aria-hidden="true" className="text-zinc-500" />
          <span>{formatDate(actividad.fecha)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Timer size={16} aria-hidden="true" className="text-zinc-500" />
          <span>
            {formatTimeRange(actividad.horaInicio, actividad.horaFin)}
            {horasText ? ` · ${horasText}` : ''}
          </span>
        </div>
      </div>

      {actividad.comentarios ? (
        <div className="mt-3 flex items-start gap-2 text-xs text-zinc-200/90">
          <MessageSquareText size={16} aria-hidden="true" className="mt-0.5 text-zinc-500" />
          <span>{actividad.comentarios}</span>
        </div>
      ) : null}

      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/0 px-2 py-1 text-[11px] font-semibold text-zinc-300 transition hover:bg-white/5"
            type="button"
            onClick={() => (typeof onEdit === 'function' ? onEdit(actividad) : null)}
            aria-label="Editar actividad"
          >
            <Pencil size={14} aria-hidden="true" />
            Editar
          </button>

          <button
            className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/0 px-2 py-1 text-[11px] font-semibold text-zinc-300 transition hover:bg-white/5"
            type="button"
            onClick={() => (typeof onDelete === 'function' ? onDelete(actividad) : null)}
            aria-label="Eliminar actividad"
          >
            <Trash2 size={14} aria-hidden="true" />
            Eliminar
          </button>
        </div>

        <details ref={detailsRef} className="relative">
          <summary
            className={`inline-flex cursor-pointer list-none items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold ${badgeClass}`}
            aria-label="Cambiar estatus"
          >
            {statusText}
          </summary>

          <div
            className="absolute right-0 z-10 mt-2 w-40 overflow-hidden rounded-xl border border-white/10 bg-[#151515] p-1 shadow-sm"
            role="menu"
            aria-label="Opciones de estatus"
          >
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-xs text-zinc-100 transition hover:bg-white/5"
                type="button"
                role="menuitem"
                onClick={() => handlePick(opt.key)}
              >
                <span>{opt.label}</span>
                {actividad.estatus === opt.key ? (
                  <span className="text-[10px] font-semibold text-zinc-400">Actual</span>
                ) : null}
              </button>
            ))}
          </div>
        </details>
      </div>
    </article>
  )
}
