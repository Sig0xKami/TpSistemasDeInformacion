import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="card" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>404</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        La página o módulo que buscas no existe.
      </p>
      <Link to="/" className="btn btn-primary" style={{ textDecoration: 'none' }}>
        Volver al inicio
      </Link>
    </div>
  )
}
