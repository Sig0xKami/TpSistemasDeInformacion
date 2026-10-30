import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'

export default function Layout() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="content-container">
        <Outlet />
      </main>
    </div>
  )
}
