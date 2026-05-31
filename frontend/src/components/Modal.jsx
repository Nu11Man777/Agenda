export default function Modal({ title, children, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-white/10 bg-[#151515] p-5"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="text-sm font-semibold tracking-tight text-zinc-100">{title}</div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  )
}
