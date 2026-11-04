import { useState, useEffect } from 'react'

const RESULTADOS_BANCO = ['Cuota acreditada', 'Cuota rechazada', 'No figura en el archivo']

function estadoBadgeClass(estado) {
  if (estado === 'Al día') return 'badge badge-success'
  if (estado === 'Anulada') return 'badge badge-neutral'
  return 'badge badge-warning'
}

function aplicarReglaConciliacion(estadoActual, resultadoBanco) {
  if (estadoActual === 'Anulada') {
    return { nuevoEstado: 'Anulada', regla: 'Regla 1', alerta: false }
  }
  if (resultadoBanco === 'No figura en el archivo') {
    return { nuevoEstado: estadoActual, regla: 'Regla 6 (SIGA-109)', alerta: true }
  }
  if (estadoActual === 'Al día' && resultadoBanco === 'Cuota acreditada') {
    return { nuevoEstado: 'Al día', regla: 'Regla 2', alerta: false }
  }
  if (estadoActual === 'Al día' && resultadoBanco === 'Cuota rechazada') {
    return { nuevoEstado: '1 cuota impaga', regla: 'Regla 3', alerta: false }
  }
  if (estadoActual === '1 cuota impaga' && resultadoBanco === 'Cuota rechazada') {
    return { nuevoEstado: '2 cuotas impagas', regla: 'Regla 4 (SIGA-109)', alerta: false }
  }
  if (estadoActual === '2 cuotas impagas' && resultadoBanco === 'Cuota rechazada') {
    return {
      nuevoEstado: 'Anulada',
      regla: 'Regla 5 (SIGA-109)',
      alerta: false,
      motivoAnulacion: 'Falta de pago: 3ra cuota impaga consecutiva (SIGA-108/SIGA-109)',
    }
  }
  return { nuevoEstado: null, regla: 'Regla por defecto', alerta: false }
}

export default function ConciliacionPage() {
  const [polizas, setPolizas] = useState(() => {
    const saved = localStorage.getItem('siga_polizas')
    return saved ? JSON.parse(saved) : []
  })

  const [historial, setHistorial] = useState(() => {
    const saved = localStorage.getItem('siga_conciliaciones')
    return saved ? JSON.parse(saved) : []
  })

  const [numeroPoliza, setNumeroPoliza] = useState('')
  const [resultado, setResultado] = useState(RESULTADOS_BANCO[0])
  const [error, setError] = useState('')
  const [ultimoResultado, setUltimoResultado] = useState(null)

  useEffect(() => {
    localStorage.setItem('siga_polizas', JSON.stringify(polizas))
  }, [polizas])

  useEffect(() => {
    localStorage.setItem('siga_conciliaciones', JSON.stringify(historial))
  }, [historial])

  const polizasActivas = polizas.filter(p => p.estado !== 'Anulada')

  const handleProcesar = (e) => {
    e.preventDefault()
    setError('')
    setUltimoResultado(null)

    const poliza = polizasActivas.find(p => p.numero === numeroPoliza)
    if (!poliza) {
      setError('Seleccioná una póliza activa. Las pólizas anuladas no participan de la conciliación bancaria (SIGA-106: Anulada es estado final).')
      return
    }

    const { nuevoEstado, regla, alerta, motivoAnulacion } = aplicarReglaConciliacion(poliza.estado, resultado)
    const fecha = new Date().toISOString().split('T')[0]

    const estadoResultante = alerta
      ? `${poliza.estado} (alerta de revisión manual)`
      : nuevoEstado ?? 'Sin cambio — pendiente de definición'

    const registro = {
      fecha,
      numero: poliza.numero,
      estadoAnterior: poliza.estado,
      resultadoBanco: resultado,
      estadoResultante,
      regla,
      alerta,
    }

    if (nuevoEstado && !alerta && nuevoEstado !== poliza.estado) {
      setPolizas(prev => prev.map(p => p.numero === poliza.numero
        ? { ...p, estado: nuevoEstado, motivoAnulacion: motivoAnulacion ?? p.motivoAnulacion }
        : p
      ))
    }

    setHistorial(prev => [registro, ...prev])
    setUltimoResultado(registro)
  }

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div>
            <h1 className="card-title">Conciliación bancaria mensual</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Actualiza el estado de pago de una póliza según el resultado del archivo del banco.
            </p>
          </div>
          <span className="badge">SIGA-101 · SIGA-108 · SIGA-109</span>
        </div>

        <div className="banner-warning">
          <span>⚠️</span>
          <div>
            <strong>Pendiente de aclaración con el cliente:</strong> el
            relevamiento no define el estado resultante cuando una póliza
            con 1 o 2 cuotas impagas recibe una cuota <strong>acreditada</strong>
            (¿vuelve a Al día?). Ese caso no cambia el estado automáticamente
            — decisores: H. Vidal / Cobranzas. El resto de las transiciones
            (1 cuota impaga + rechazo → 2 cuotas impagas; 2 cuotas impagas +
            nuevo rechazo → Anulada; póliza ausente del archivo → mantiene
            estado y genera alerta) ya están implementadas (SIGA-109, CR-01,
            propuesto por el grupo, a confirmar por H. Vidal / Cobranzas).
          </div>
        </div>

        {error && <div className="banner-danger">{error}</div>}

        <form onSubmit={handleProcesar}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Póliza</label>
              <select
                className="form-input"
                value={numeroPoliza}
                onChange={(e) => setNumeroPoliza(e.target.value)}
              >
                <option value="">Seleccionar póliza...</option>
                {polizasActivas.map(p => (
                  <option key={p.numero} value={p.numero}>
                    {p.numero} — {p.asegurado} ({p.estado})
                  </option>
                ))}
              </select>
              {polizas.length === 0 && (
                <span className="field-hint">No hay pólizas cargadas. Emití una desde el módulo Pólizas.</span>
              )}
              {polizas.length > 0 && polizasActivas.length === 0 && (
                <span className="field-hint">Todas las pólizas cargadas están anuladas: ninguna participa de la conciliación bancaria.</span>
              )}
            </div>
            <div className="form-group">
              <label className="form-label">Resultado en el archivo del banco</label>
              <select
                className="form-input"
                value={resultado}
                onChange={(e) => setResultado(e.target.value)}
              >
                {RESULTADOS_BANCO.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary" disabled={polizasActivas.length === 0}>
            Procesar archivo
          </button>
        </form>

        {ultimoResultado && (
          <div
            className={ultimoResultado.estadoResultante.startsWith('Sin cambio') ? 'banner-warning' : 'banner-warning'}
            style={ultimoResultado.estadoResultante.startsWith('Sin cambio')
              ? {}
              : { background: 'var(--success-light)', border: '1px solid #a7f3d0', color: '#065f46' }}
          >
            <span>{ultimoResultado.estadoResultante.startsWith('Sin cambio') ? '⚠️' : '✅'}</span>
            <div>
              Póliza <strong>{ultimoResultado.numero}</strong>: {ultimoResultado.estadoAnterior} → <strong>{ultimoResultado.estadoResultante}</strong> ({ultimoResultado.regla} de la tabla de decisión SIGA-101).
            </div>
          </div>
        )}
      </div>

      <div className="card">
        <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Historial de conciliaciones</h2>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Póliza</th>
                <th>Estado anterior</th>
                <th>Resultado del banco</th>
                <th>Estado resultante</th>
                <th>Regla aplicada</th>
              </tr>
            </thead>
            <tbody>
              {historial.length > 0 ? (
                historial.map((h, idx) => (
                  <tr key={idx}>
                    <td>{h.fecha}</td>
                    <td><code>{h.numero}</code></td>
                    <td><span className={estadoBadgeClass(h.estadoAnterior)}>{h.estadoAnterior}</span></td>
                    <td>{h.resultadoBanco}</td>
                    <td>
                      {h.estadoResultante.startsWith('Sin cambio') ? (
                        <span className="badge badge-warning">Sin cambio — pendiente</span>
                      ) : (
                        <span className={estadoBadgeClass(h.estadoResultante)}>{h.estadoResultante}</span>
                      )}
                    </td>
                    <td style={{ color: 'var(--text-muted)' }}>{h.regla}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="empty-state">
                    Todavía no se procesó ningún archivo del banco.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
