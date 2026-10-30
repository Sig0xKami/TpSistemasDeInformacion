import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">Módulos del Sistema</h1>
          <span className="badge">Arquitectura Modular</span>
        </div>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          Plataforma web configurada por páginas independientes, vinculadas a los requerimientos funcionales del proyecto.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1rem', background: '#fafafa' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1rem' }}>Gestión de Clientes</h3>
              <span className="badge">RF-01</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Alta y listado de clientes con identificación y nombre.
            </p>
            <Link to="/clientes" className="btn btn-primary" style={{ textDecoration: 'none', width: '100%' }}>
              Abrir módulo →
            </Link>
          </div>

          {/* ESPACIO PARA PROXIMOS MODULOS (RF-02, RF-03...) */}
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>Pautas del Relevamiento</h2>
        <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.7' }}>
          <li>Cada página responde a un requerimiento funcional atómico y verificable.</li>
          <li>Sin capas redundantes: el estado y la vista residen en componentes modulares independientes.</li>
          <li>Los datos se mantienen localmente o listos para conectar a API/Mock.</li>
        </ul>
      </div>
    </div>
  )
}
