import { useState, useEffect, Fragment } from 'react'

export const ESTADOS = ['Al día', '1 cuota impaga', '2 cuotas impagas', 'Anulada']

export const COBERTURAS = [
  { nombre: 'Responsabilidad Civil', premioBase: 15000 },
  { nombre: 'Terceros Completo', premioBase: 28000 },
  { nombre: 'Todo Riesgo', premioBase: 52000 },
]

const MEDIOS_PAGO = ['Débito automático', 'Transferencia', 'Pago presencial']

export const TOPE_DESCUENTO_PCT = 15

export const BONIFICACIONES = [
  { key: 'debitoAutomatico', label: 'Débito automático', pct: 10 },
  { key: 'otraPoliza', label: 'Otra póliza vigente', pct: 5 },
  { key: 'antiguedad', label: 'Antigüedad mayor a 3 años', pct: 5 },
]

function calcularPremio(coberturaNombre) {
  const cobertura = COBERTURAS.find(c => c.nombre === coberturaNombre)
  return cobertura ? cobertura.premioBase : 0
}

export function aplicarTopeDescuentos(premioBase, bonificaciones) {
  const sumaLineal = BONIFICACIONES.reduce(
    (acc, b) => acc + (bonificaciones[b.key] ? b.pct : 0),
    0
  )
  const descuentoPct = Math.min(sumaLineal, TOPE_DESCUENTO_PCT)
  const descuento = Math.round((premioBase * descuentoPct) / 100)
  const premioFinal = premioBase - descuento
  return { descuentoPct, descuento, premioFinal }
}

function estadoBadgeClass(estado) {
  if (estado === 'Al día') return 'badge badge-success'
  if (estado === 'Anulada') return 'badge badge-neutral'
  return 'badge badge-warning'
}

const emptyForm = {
  numero: '',
  asegurado: '',
  patente: '',
  cobertura: COBERTURAS[0].nombre,
  medioPago: MEDIOS_PAGO[0],
  domicilio: '',
  bonificaciones: { debitoAutomatico: false, otraPoliza: false, antiguedad: false },
}

export default function PolizasPage() {
  const [polizas, setPolizas] = useState(() => {
    const saved = localStorage.getItem('siga_polizas')
    return saved ? JSON.parse(saved) : []
  })

  const [formData, setFormData] = useState(emptyForm)
  const [error, setError] = useState('')
  const [filtro, setFiltro] = useState('')
  const [endosoAbierto, setEndosoAbierto] = useState(null)
  const [endosoForm, setEndosoForm] = useState({ campo: 'domicilio', valor: '' })

  useEffect(() => {
    localStorage.setItem('siga_polizas', JSON.stringify(polizas))
  }, [polizas])

  const handleSubmit = (e) => {
    e.preventDefault()
    const numero = formData.numero.trim()

    if (!numero || !formData.asegurado.trim() || !formData.patente.trim() || !formData.domicilio.trim()) {
      setError('Todos los campos son obligatorios.')
      return
    }

    if (polizas.some(p => p.numero.toLowerCase() === numero.toLowerCase())) {
      setError('Ya existe una póliza con ese número.')
      return
    }

    const premioBase = calcularPremio(formData.cobertura)
    const { descuentoPct, descuento, premioFinal } = aplicarTopeDescuentos(
      premioBase,
      formData.bonificaciones
    )

    const nuevaPoliza = {
      numero,
      asegurado: formData.asegurado.trim(),
      patente: formData.patente.trim().toUpperCase(),
      cobertura: formData.cobertura,
      premioBase,
      bonificaciones: formData.bonificaciones,
      descuentoPct,
      descuento,
      premio: premioFinal,
      medioPago: formData.medioPago,
      domicilio: formData.domicilio.trim(),
      estado: 'Al día',
      motivoAnulacion: null,
      endosos: [],
    }

    setPolizas(prev => [...prev, nuevaPoliza])
    setFormData(emptyForm)
    setError('')
  }

  const abrirEndoso = (numero) => {
    setEndosoAbierto(numero)
    setEndosoForm({ campo: 'domicilio', valor: '' })
  }

  const aplicarEndoso = (numero) => {
    if (!endosoForm.valor.trim()) return

    setPolizas(prev => prev.map(p => {
      if (p.numero !== numero) return p
      const campoLabel = endosoForm.campo === 'domicilio' ? 'Domicilio' : 'Forma de pago'
      const valorAnterior = endosoForm.campo === 'domicilio' ? p.domicilio : p.medioPago
      const registro = {
        fecha: new Date().toISOString().split('T')[0],
        campo: campoLabel,
        de: valorAnterior,
        a: endosoForm.valor.trim(),
      }
      return {
        ...p,
        [endosoForm.campo]: endosoForm.valor.trim(),
        endosos: [...p.endosos, registro],
      }
    }))
    setEndosoAbierto(null)
  }

  const anularPoliza = (numero, motivo) => {
    setPolizas(prev => prev.map(p =>
      p.numero === numero && p.estado !== 'Anulada'
        ? { ...p, estado: 'Anulada', motivoAnulacion: motivo }
        : p
    ))
  }

  const polizasFiltradas = polizas.filter(p =>
    p.numero.toLowerCase().includes(filtro.toLowerCase()) ||
    p.asegurado.toLowerCase().includes(filtro.toLowerCase())
  )

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div>
            <h1 className="card-title">Gestión de Pólizas</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Emisión de pólizas, cálculo de premio, endosos y anulación.
            </p>
          </div>
          <span className="badge">SIGA-102 · SIGA-103 · SIGA-106 · SIGA-107 · SIGA-108</span>
        </div>

        {error && <div className="banner-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Número de póliza</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ej: 1001"
                value={formData.numero}
                onChange={(e) => setFormData(prev => ({ ...prev, numero: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Asegurado</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ej: Juan Pérez"
                value={formData.asegurado}
                onChange={(e) => setFormData(prev => ({ ...prev, asegurado: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Patente del vehículo</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ej: AB 123 CD"
                value={formData.patente}
                onChange={(e) => setFormData(prev => ({ ...prev, patente: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Cobertura</label>
              <select
                className="form-input"
                value={formData.cobertura}
                onChange={(e) => setFormData(prev => ({ ...prev, cobertura: e.target.value }))}
              >
                {COBERTURAS.map(c => (
                  <option key={c.nombre} value={c.nombre}>{c.nombre}</option>
                ))}
              </select>
              <span className="field-hint">
                Premio base: ${calcularPremio(formData.cobertura).toLocaleString('es-AR')} (SIGA-102, calculado automáticamente)
              </span>
            </div>
            <div className="form-group">
              <label className="form-label">Forma de pago</label>
              <select
                className="form-input"
                value={formData.medioPago}
                onChange={(e) => setFormData(prev => ({ ...prev, medioPago: e.target.value }))}
              >
                {MEDIOS_PAGO.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Domicilio</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ej: Av. Siempre Viva 742"
                value={formData.domicilio}
                onChange={(e) => setFormData(prev => ({ ...prev, domicilio: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Bonificaciones (SIGA-103, tope {TOPE_DESCUENTO_PCT}%)</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                {BONIFICACIONES.map(b => (
                  <label key={b.key} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem' }}>
                    <input
                      type="checkbox"
                      checked={formData.bonificaciones[b.key]}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        bonificaciones: { ...prev.bonificaciones, [b.key]: e.target.checked },
                      }))}
                    />
                    {b.label} ({b.pct}%)
                  </label>
                ))}
              </div>
            </div>
          </div>
          {(() => {
            const premioBasePreview = calcularPremio(formData.cobertura)
            const preview = aplicarTopeDescuentos(premioBasePreview, formData.bonificaciones)
            return (
              <p className="field-hint" style={{ marginBottom: '0.75rem' }}>
                Premio base: ${premioBasePreview.toLocaleString('es-AR')} · Descuento: {preview.descuentoPct}%
                (${preview.descuento.toLocaleString('es-AR')}) · Premio final: <strong>${preview.premioFinal.toLocaleString('es-AR')}</strong>
              </p>
            )
          })()}
          <button type="submit" className="btn btn-primary">
            + Emitir póliza
          </button>
        </form>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 style={{ fontSize: '1.1rem' }}>Pólizas emitidas ({polizas.length})</h2>
          <input
            type="text"
            className="form-input"
            style={{ maxWidth: '240px' }}
            placeholder="Buscar por número o asegurado..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </div>

        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Póliza</th>
                <th>Asegurado</th>
                <th>Cobertura</th>
                <th>Premio</th>
                <th>Forma de pago</th>
                <th>Domicilio</th>
                <th>Estado</th>
                <th style={{ textAlign: 'right' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {polizasFiltradas.length > 0 ? (
                polizasFiltradas.map((p) => (
                  <Fragment key={p.numero}>
                    <tr>
                      <td><code>{p.numero}</code></td>
                      <td><strong>{p.asegurado}</strong><br /><span className="field-hint">{p.patente}</span></td>
                      <td>{p.cobertura}</td>
                      <td>
                        <strong>${p.premio.toLocaleString('es-AR')}</strong>
                        {p.descuento > 0 && (
                          <div className="field-hint">
                            Base ${p.premioBase.toLocaleString('es-AR')} − {p.descuentoPct}% (${p.descuento.toLocaleString('es-AR')})
                          </div>
                        )}
                      </td>
                      <td>{p.medioPago}</td>
                      <td>{p.domicilio}</td>
                      <td>
                        <span className={estadoBadgeClass(p.estado)}>{p.estado}</span>
                        {p.estado === 'Anulada' && p.motivoAnulacion && (
                          <div className="field-hint">{p.motivoAnulacion}</div>
                        )}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        {p.estado !== 'Anulada' && (
                          <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                            <button
                              className="btn btn-secondary"
                              style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}
                              onClick={() => abrirEndoso(p.numero)}
                            >
                              Endoso
                            </button>
                            <button
                              className="btn btn-secondary"
                              style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}
                              onClick={() => anularPoliza(p.numero, 'Pedido del asegurado')}
                            >
                              Anular (asegurado)
                            </button>
                            <button
                              className="btn btn-danger"
                              style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}
                              onClick={() => anularPoliza(p.numero, 'Falta de pago (criterio pendiente de definición — SIGA-108)')}
                            >
                              Anular (falta de pago)
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                    {endosoAbierto === p.numero && (
                      <tr>
                        <td colSpan="8">
                          <div style={{ background: 'var(--bg-main)', borderRadius: 'var(--radius)', padding: '1rem' }}>
                            <p className="section-title" style={{ marginBottom: '0.5rem' }}>
                              Endoso sobre póliza {p.numero} (SIGA-107 — solo domicilio o forma de pago)
                            </p>
                            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                              <div className="form-group">
                                <label className="form-label">Campo a endosar</label>
                                <select
                                  className="form-input"
                                  value={endosoForm.campo}
                                  onChange={(e) => setEndosoForm(prev => ({ ...prev, campo: e.target.value }))}
                                >
                                  <option value="domicilio">Domicilio</option>
                                  <option value="medioPago">Forma de pago</option>
                                </select>
                              </div>
                              <div className="form-group">
                                <label className="form-label">Nuevo valor</label>
                                {endosoForm.campo === 'medioPago' ? (
                                  <select
                                    className="form-input"
                                    value={endosoForm.valor}
                                    onChange={(e) => setEndosoForm(prev => ({ ...prev, valor: e.target.value }))}
                                  >
                                    <option value="">Seleccionar...</option>
                                    {MEDIOS_PAGO.map(m => <option key={m} value={m}>{m}</option>)}
                                  </select>
                                ) : (
                                  <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Nuevo domicilio"
                                    value={endosoForm.valor}
                                    onChange={(e) => setEndosoForm(prev => ({ ...prev, valor: e.target.value }))}
                                  />
                                )}
                              </div>
                              <button className="btn btn-primary" onClick={() => aplicarEndoso(p.numero)}>
                                Confirmar endoso
                              </button>
                              <button className="btn btn-secondary" onClick={() => setEndosoAbierto(null)}>
                                Cancelar
                              </button>
                            </div>
                            <p className="field-hint" style={{ marginTop: '0.5rem' }}>
                              Cambios de vehículo o cobertura no se endosan: la póliza debe anularse y reemitirse (SIGA-107).
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="empty-state">
                    No hay pólizas emitidas todavía.
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
