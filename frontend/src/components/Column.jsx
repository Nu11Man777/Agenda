import { createElement } from 'react'
import Card from './Card.jsx'

export default function Column({
  title,
  icon: Icon,
  items,
  onAdd,
  addIcon: AddIcon,
  onChangeStatus,
  onEdit,
  onDelete,
  loading,
}) {
  return (
    <section
      className="flex min-w-0 flex-1 flex-col gap-3 rounded-2xl border border-white/10 bg-[#151515] p-3"
      aria-label={title}
    >
      <header className="flex items-center justify-between px-1 py-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-zinc-100">
          {Icon
            ? createElement(Icon, {
                size: 18,
                'aria-hidden': true,
                className: 'text-zinc-300',
              })
            : null}
          <span>{title}</span>
          <span
            className="ml-1 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-zinc-400"
            aria-label={`Total: ${items.length}`}
          >
            {items.length}
          </span>
        </div>

        <button
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-100 transition hover:bg-white/10"
          type="button"
          onClick={onAdd}
          aria-label={`Agregar en ${title}`}
        >
          {AddIcon
            ? createElement(AddIcon, {
                size: 18,
                'aria-hidden': true,
              })
            : null}
        </button>
      </header>

      <div className="flex flex-col gap-3">
        {loading ? (
          <div className="rounded-xl border border-dashed border-white/10 px-3 py-6 text-center text-xs text-zinc-500">
            Cargando…
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/10 px-3 py-6 text-center text-xs text-zinc-500">
            Sin actividades
          </div>
        ) : (
          items.map((a) => (
            <Card
              key={a.id}
              actividad={a}
              onChangeStatus={onChangeStatus}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </section>
  )
}
