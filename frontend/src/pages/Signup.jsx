import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Mail, UserPlus, UserRound } from 'lucide-react'
import * as authService from '../services/authService.js'
import { setAuth } from '../authStorage.js'

export default function Signup({ onAuthed }) {
  const navigate = useNavigate()
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [touched, setTouched] = useState(false)
  const [serverError, setServerError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const error = useMemo(() => {
    if (!touched) return null
    if (!nombre.trim()) return 'El nombre es requerido.'
    if (!apellido.trim()) return 'El apellido es requerido.'
    if (!correo.trim()) return 'El correo es requerido.'
    if (!password) return 'La contraseña es requerida.'
    if (password.length < 8) return 'La contraseña debe tener al menos 8 caracteres.'
    return null
  }, [apellido, correo, nombre, password, touched])

  async function handleSubmit(e) {
    e.preventDefault()
    setTouched(true)
    if (error) return

    setServerError(null)
    setIsSubmitting(true)

    try {
      const payload = {
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        correo: correo.trim(),
        password: password,
      }

      await authService.register(payload)
      const result = await authService.login(payload.correo, payload.password)
      setAuth({ user: result.user, token: result.token })
      if (typeof onAuthed === 'function') onAuthed()
      navigate('/dashboard', { replace: true })
    } catch (err) {
      setServerError(err?.message || 'No se pudo registrar.')
    } finally {
      setIsSubmitting(false)
    }
  }

  function goLogin() {
    navigate('/login')
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#151515] p-6">
        <h1 className="text-xl font-semibold tracking-tight">Crear cuenta</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Completa tus datos para registrarte.
        </p>

        <form className="mt-5 flex flex-col gap-3" onSubmit={handleSubmit} noValidate>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-zinc-400">Nombre</span>
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#1b1b1b] px-3 py-2 focus-within:border-schneider-500/50">
              <UserRound size={18} className="text-zinc-500" aria-hidden="true" />
              <input
                className="w-full bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
                type="text"
                name="nombre"
                autoComplete="given-name"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                onBlur={() => setTouched(true)}
                required
              />
            </div>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-zinc-400">Apellido</span>
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#1b1b1b] px-3 py-2 focus-within:border-schneider-500/50">
              <UserRound size={18} className="text-zinc-500" aria-hidden="true" />
              <input
                className="w-full bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
                type="text"
                name="apellido"
                autoComplete="family-name"
                placeholder="Apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                onBlur={() => setTouched(true)}
                required
              />
            </div>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-zinc-400">Correo</span>
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#1b1b1b] px-3 py-2 focus-within:border-schneider-500/50">
              <Mail size={18} className="text-zinc-500" aria-hidden="true" />
              <input
                className="w-full bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
                type="email"
                name="correo"
                autoComplete="email"
                placeholder="tu@correo.com"
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
                autoComplete="new-password"
                placeholder="Mínimo 8 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setTouched(true)}
                required
                minLength={8}
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
            <UserPlus size={18} aria-hidden="true" />
            {isSubmitting ? 'Registrando…' : 'Registrarme'}
          </button>
        </form>

        <div className="mt-4 text-xs text-zinc-400">
          ¿Ya tienes cuenta?{' '}
          <button className="font-semibold text-schneider-500 hover:underline" type="button" onClick={goLogin}>
            Volver a login
          </button>
        </div>
      </div>
    </div>
  )
}
