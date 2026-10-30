import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-brand">
        <span>●</span> Sistemas de Información
      </NavLink>
      <ul className="nav-links">
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            end
          >
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/clientes" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Clientes (RF-01)
          </NavLink>
        </li>
        {/* NUEVOS MODULOS / RUTAS AQUI */}
      </ul>
    </nav>
  )
}
