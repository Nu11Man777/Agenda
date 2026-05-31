import Modal from './Modal.jsx'

export default function ActividadFormModal({
  mode,
  form,
  setForm,
  saving,
  onClose,
  onSubmit,
}) {
  const isCreate = mode === 'create'
  const title = isCreate ? 'Nueva actividad' : 'Editar actividad'
  const submitLabel = isCreate ? 'Crear' : 'Guardar'
  const canSubmit =
    Boolean(form.nombre?.trim()) && Boolean(form.fecha) && Boolean(form.horaInicio) && Boolean(form.horaFin)

  return (
    <Modal title={title} onClose={onClose}>
      <div className="flex flex-col gap-3">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-zinc-400">Nombre</span>
          <input
            className="w-full rounded-xl border border-white/10 bg-[#1b1b1b] px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-schneider-500/30"
            value={form.nombre}
            onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
            placeholder={isCreate ? 'Ej. Llamar a cliente' : undefined}
          />
        </label>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <label className="flex flex-col gap-1.5 sm:col-span-1">
            <span className="text-xs font-medium text-zinc-400">Fecha</span>
            <input
              className="w-full rounded-xl border border-white/10 bg-[#1b1b1b] px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-schneider-500/30"
              type="date"
              value={form.fecha}
              onChange={(e) => setForm((f) => ({ ...f, fecha: e.target.value }))}
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-zinc-400">Inicio</span>
            <input
              className="w-full rounded-xl border border-white/10 bg-[#1b1b1b] px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-schneider-500/30"
              type="time"
              value={form.horaInicio}
              onChange={(e) => setForm((f) => ({ ...f, horaInicio: e.target.value }))}
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-zinc-400">Fin</span>
            <input
              className="w-full rounded-xl border border-white/10 bg-[#1b1b1b] px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-schneider-500/30"
              type="time"
              value={form.horaFin}
              onChange={(e) => setForm((f) => ({ ...f, horaFin: e.target.value }))}
            />
          </label>
        </div>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-zinc-400">Estatus</span>
          <select
            className="w-full rounded-xl border border-white/10 bg-[#1b1b1b] px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-schneider-500/30"
            value={form.estatus}
            onChange={(e) => setForm((f) => ({ ...f, estatus: e.target.value }))}
          >
            <option value="PENDIENTE">Pendiente</option>
            <option value="INICIADO">En progreso</option>
            <option value="FINALIZADO">Finalizado</option>
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-zinc-400">Comentarios</span>
          <textarea
            className="min-h-24 w-full resize-none rounded-xl border border-white/10 bg-[#1b1b1b] px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-schneider-500/30"
            value={form.comentarios}
            onChange={(e) => setForm((f) => ({ ...f, comentarios: e.target.value }))}
            placeholder="Opcional"
          />
        </label>

        <div className="mt-1 flex items-center justify-end gap-2">
          <button
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-zinc-100 transition hover:bg-white/10"
            type="button"
            onClick={onClose}
            disabled={saving}
          >
            Cancelar
          </button>
          <button
            className="inline-flex items-center justify-center rounded-xl bg-schneider-500 px-3 py-2 text-sm font-semibold text-black transition hover:bg-[#00c247] disabled:opacity-60"
            type="button"
            onClick={onSubmit}
            disabled={saving || !canSubmit}
          >
            {saving ? 'Guardando…' : submitLabel}
          </button>
        </div>
      </div>
    </Modal>
  )
}
