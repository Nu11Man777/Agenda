import Modal from './Modal.jsx'

export default function DeleteConfirmModal({ actividadNombre, saving, onClose, onConfirm }) {
  return (
    <Modal title="Eliminar actividad" onClose={onClose}>
      <div className="text-sm text-zinc-200">
        ¿Seguro que deseas eliminar <span className="font-semibold">{actividadNombre}</span>?
      </div>

      <div className="mt-5 flex items-center justify-end gap-2">
        <button
          className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-zinc-100 transition hover:bg-white/10"
          type="button"
          onClick={onClose}
          disabled={saving}
        >
          Cancelar
        </button>
        <button
          className="inline-flex items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm font-semibold text-red-200 transition hover:bg-red-500/15 disabled:opacity-60"
          type="button"
          onClick={onConfirm}
          disabled={saving}
        >
          {saving ? 'Eliminando…' : 'Sí, eliminar'}
        </button>
      </div>
    </Modal>
  )
}
