import { LayoutDashboard, LogOut, User as UserIcon } from 'lucide-react'
import KanbanBoard from '../components/KanbanBoard.jsx'
import { clearAuth, getAuth } from '../authStorage.js'
import { useNavigate } from 'react-router-dom'

export default function Dashboard({ onLogout }) {
  const navigate = useNavigate()
  const { user } = getAuth()

  function handleLogout() {
    clearAuth()
    if (typeof onLogout === 'function') onLogout()
    navigate('/login', { replace: true })
  }

  if (!user) return null

  return (
    <div className="min-h-screen px-4 py-6">
      <header className="mx-auto flex max-w-5xl flex-col gap-4 rounded-2xl border border-white/10 bg-[#151515] p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-schneider-500/30 bg-schneider-500/10 text-schneider-500">
            <LayoutDashboard size={18} aria-hidden="true" />
          </div>

          <div>
            <div className="text-sm font-semibold tracking-tight text-zinc-100">
              Bienvenido, {user.nombre} {user.apellido}
            </div>
            <div className="mt-1 flex items-center gap-2 text-xs text-zinc-400">
              <UserIcon size={16} aria-hidden="true" />
              <span>{user.correo}</span>
            </div>
          </div>
        </div>

        <button
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-zinc-100 transition hover:bg-white/10"
          type="button"
          onClick={handleLogout}
        >
          <LogOut size={18} aria-hidden="true" />
          Cerrar sesión
        </button>
      </header>

      <main className="mx-auto mt-4 max-w-5xl">
        <KanbanBoard />
      </main>
    </div>
  )
}
