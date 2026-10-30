import { useState, useEffect } from 'react'

export default function ClientesPage() {
  const [clientes, setClientes] = useState(() => {
    const saved = localStorage.getItem('siga_clientes')
    return saved ? JSON.parse(saved) : [
      { id: 'CLI-001', nombre: 'Juan Pérez', fecha: '2026-10-30' },
      { id: 'CLI-002', nombre: 'María González', fecha: '2026-10-30' }
    ]
  })

  const [formData, setFormData] = useState({ id: '', nombre: '' })
  const [filtro, setFiltro] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    localStorage.setItem('siga_clientes', JSON.stringify(clientes))
  }, [clientes])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.id.trim() || !formData.nombre.trim()) {
      setError('Todos los campos son obligatorios.')
      return
    }

    if (clientes.some(c => c.id.toLowerCase() === formData.id.trim().toLowerCase())) {
      setError('Ya existe un cliente con ese identificador.')
      return
    }

    const nuevoCliente = {
      id: formData.id.trim(),
      nombre: formData.nombre.trim(),
      fecha: new Date().toISOString().split('T')[0]
    }

    setClientes(prev => [...prev, nuevoCliente])
    setFormData({ id: '', nombre: '' })
    setError('')
  }

  const handleDelete = (id) => {
    setClientes(prev => prev.filter(c => c.id !== id))
  }

  const clientesFiltrados = clientes.filter(c =>
    c.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    c.id.toLowerCase().includes(filtro.toLowerCase())
  )

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div>
            <h1 className="card-title">Gestión de Clientes</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Implementación de <strong>RF-01</strong>: Registro de clientes con ID y nombre.
            </p>
          </div>
          <span className="badge">RF-01</span>
        </div>

        {error && (
          <div style={{ background: 'var(--danger-light)', color: 'var(--danger)', padding: '0.65rem 1rem', borderRadius: 'var(--radius)', marginBottom: '1rem', fontSize: '0.85rem' }}>
            {error}
          </div>
        )}

        {/* Formulario de Alta */}
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Identificador (ID)</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ej: CLI-003"
                value={formData.id}
                onChange={(e) => setFormData(prev => ({ ...prev, id: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Nombre Completo</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ej: Carlos Gómez"
                value={formData.nombre}
                onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            + Registrar Cliente
          </button>
        </form>
      </div>

      {/* Listado y Búsqueda */}
      <div className="card">
        <div className="card-header">
          <h2 style={{ fontSize: '1.1rem' }}>Clientes Registrados ({clientes.length})</h2>
          <input
            type="text"
            className="form-input"
            style={{ maxWidth: '240px' }}
            placeholder="Buscar por ID o nombre..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </div>

        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Fecha de Alta</th>
                <th style={{ textAlign: 'right' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientesFiltrados.length > 0 ? (
                clientesFiltrados.map((cliente) => (
                  <tr key={cliente.id}>
                    <td><code>{cliente.id}</code></td>
                    <td><strong>{cliente.nombre}</strong></td>
                    <td style={{ color: 'var(--text-muted)' }}>{cliente.fecha}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        onClick={() => handleDelete(cliente.id)}
                        className="btn btn-danger"
                        style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="empty-state">
                    No se encontraron clientes registrados.
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
