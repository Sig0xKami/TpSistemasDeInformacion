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
            to="/polizas"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Pólizas
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/conciliacion"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Conciliación bancaria
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
