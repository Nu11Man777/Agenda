function pad2(n) {
  return String(n).padStart(2, '0')
}

export function toLocalDate(date) {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`
}

export function toLocalDateTime(date) {
  return `${toLocalDate(date)}T${pad2(date.getHours())}:${pad2(date.getMinutes())}:00`
}

export function splitDateTime(iso) {
  if (!iso || typeof iso !== 'string') return { date: '', time: '' }
  const [date, timeRaw] = iso.split('T')
  const time = (timeRaw || '').slice(0, 5)
  return { date: date || '', time }
}

export function combineDateTime(date, time) {
  if (!date || !time) return ''
  return `${date}T${time}:00`
}

export function formatDate(yyyyMmDd) {
  if (!yyyyMmDd) return ''
  const [y, m, d] = yyyyMmDd.split('-').map(Number)
  return new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium' }).format(
    new Date(y, (m ?? 1) - 1, d ?? 1),
  )
}

export function formatTimeRange(startIso, endIso) {
  if (!startIso || !endIso) return ''
  const toTime = (iso) =>
    new Intl.DateTimeFormat('es-MX', { timeStyle: 'short' }).format(new Date(iso))
  return `${toTime(startIso)} – ${toTime(endIso)}`
}

export function formatWorkHours(actividad) {
  const raw = actividad?.horasTrabajo
  if (raw !== undefined && raw !== null && raw !== '') {
    const n = Number(raw)
    if (Number.isFinite(n)) {
      return `${n.toFixed(2).replace(/\.00$/, '')} h`
    }
  }

  const { horaInicio, horaFin } = actividad ?? {}
  if (!horaInicio || !horaFin) return ''
  const startMs = new Date(horaInicio).getTime()
  const endMs = new Date(horaFin).getTime()
  if (Number.isNaN(startMs) || Number.isNaN(endMs)) return ''
  const diffHours = Math.max(0, (endMs - startMs) / 36e5)
  return `${diffHours.toFixed(2).replace(/\.00$/, '')} h`
}
