import { Link } from 'react-router-dom'

const MODULOS = [
  {
    titulo: 'Gestión de Pólizas',
    descripcion: 'Emisión de pólizas, cálculo automático del premio, endosos de domicilio/forma de pago y anulación.',
    ruta: '/polizas',
    rf: 'SIGA-102 · 106 · 107 · 108',
    pendiente: true,
  },
  {
    titulo: 'Conciliación bancaria',
    descripcion: 'Procesa el resultado mensual del banco y actualiza el estado de pago según la tabla de decisión.',
    ruta: '/conciliacion',
    rf: 'SIGA-101',
    pendiente: true,
  },
]

export default function HomePage() {
  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div>
            <h1 className="card-title">SIGA — Sistema de Gestión de Pólizas</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Módulos funcionales trazables a los requerimientos del relevamiento.
            </p>
          </div>
          <span className="badge">Arquitectura modular</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {MODULOS.map(m => (
            <div key={m.ruta} style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.25rem', background: 'var(--bg-main)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1rem' }}>{m.titulo}</h3>
                <span className="badge">{m.rf}</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                {m.descripcion}
              </p>
              {m.pendiente && (
                <p style={{ fontSize: '0.78rem', color: 'var(--warning)', marginBottom: '0.75rem' }}>
                  ⚠️ Incluye reglas pendientes de aclaración con el cliente.
                </p>
              )}
              <Link to={m.ruta} className="btn btn-primary" style={{ textDecoration: 'none', width: '100%' }}>
                Abrir módulo →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
