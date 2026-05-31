import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, LogIn, Mail } from 'lucide-react'
import * as authService from '../services/authService.js'
import { setAuth } from '../authStorage.js'

export default function Login({ onAuthed }) {
  const navigate = useNavigate()
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [touched, setTouched] = useState(false)
  const [serverError, setServerError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const error = useMemo(() => {
    if (!touched) return null
    if (!correo.trim()) return 'El correo es requerido.'
    if (!password) return 'La contraseña es requerida.'
    return null
  }, [correo, password, touched])

  async function handleSubmit(e) {
    e.preventDefault()
    setTouched(true)
    if (!correo.trim() || !password) return

    setServerError(null)
    setIsSubmitting(true)

    try {
      const result = await authService.login(correo.trim(), password)
      setAuth({ user: result.user, token: result.token })
      if (typeof onAuthed === 'function') onAuthed()
      navigate('/dashboard', { replace: true })
    } catch (err) {
      setServerError(err?.message || 'No se pudo iniciar sesión.')
    } finally {
      setIsSubmitting(false)
    }
  }

  function goSignup() {
    navigate('/signup')
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#151515] p-6">
        <h1 className="text-xl font-semibold tracking-tight">Iniciar sesión</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Ingresa con tu correo y contraseña.
        </p>

        <form className="mt-5 flex flex-col gap-3" onSubmit={handleSubmit} noValidate>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-zinc-400">Correo</span>
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#1b1b1b] px-3 py-2 focus-within:border-schneider-500/50">
              <Mail size={18} className="text-zinc-500" aria-hidden="true" />
              <input
                className="w-full bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
                type="email"
                name="correo"
                autoComplete="email"
                placeholder="example@gmail.com"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                onBlur={() => setTouched(true)}
                required
              />
            </div>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-zinc-400">Password</span>
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#1b1b1b] px-3 py-2 focus-within:border-schneider-500/50">
              <Lock size={18} className="text-zinc-500" aria-hidden="true" />
              <input
                className="w-full bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
                type="password"
                name="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setTouched(true)}
                required
                minLength={1}
              />
            </div>
          </label>

          {error ? (
            <p className="text-xs text-red-400" role="alert">
              {error}
            </p>
          ) : null}

          {serverError ? (
            <p className="text-xs text-red-400" role="alert">
              {serverError}
            </p>
          ) : null}

          <button
            className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-schneider-500 px-3 py-2.5 text-sm font-semibold text-black transition hover:bg-[#00c247]"
            type="submit"
            disabled={isSubmitting}
          >
            <LogIn size={18} aria-hidden="true" />
            {isSubmitting ? 'Ingresando...' : 'Entrar'}
          </button>
        </form>

        <div className="mt-4 text-xs text-zinc-400">
          ¿No tienes cuenta?{' '}
          <button
            className="font-medium text-schneider-500 hover:underline"
            type="button"
            onClick={goSignup}
          >
            Crear cuenta
          </button>
        </div>
      </div>
    </div>
  )
}