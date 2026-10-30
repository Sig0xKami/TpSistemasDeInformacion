# 🚀 Plantilla Rápida y Atajos de IA para Sistemas de Información

Esta plantilla está diseñada para que cualquier IA (o desarrollador) implemente nuevos casos de uso y requerimientos funcionales a máxima velocidad, manteniendo arquitectura modular limpia, SOLID y cumplimiento estricto con las especificaciones.

---

## 📌 Contexto y Reglas del Proyecto (Para la IA)
1. **Reglas de Relevamiento:** Leer siempre `skill/SKILL.md`. Cada requerimiento funcional (`RF-XX`) debe ser atómico, verificable y con fragmento de origen.
2. **Arquitectura:** Modular por páginas (Single Page Application con `react-router-dom`), sin capas innecesarias (Services/Repositories aislados descartados; la lógica y el estado de la vista residen en cada página o componente directo).
3. **Estilos:** Se usan las clases CSS ya preparadas en `app/src/index.css` (`card`, `badge`, `form-grid`, `form-group`, `form-input`, `btn btn-primary`, `table`).

---

## ⚡ Atajo 1: Clasificar Relevamiento y Completar `specs/requirements.md`

> **Prompt para copiar y pegar a la IA:**
> ```text
> Actúa como analista funcional siguiendo las pautas de skill/SKILL.md.
> Analiza los siguientes fragmentos de entrevista del caso:
> [PEGAR FRAGMENTOS AQUÍ]
>
> Tareas:
> 1. Extrae los Requerimientos Funcionales (RF-XX) atómicos y verificables.
> 2. Clasifica los fragmentos que NO sean RF (KPI, restricción técnica, RNF, contexto) justificando en una línea.
> 3. Detecta y señala cualquier conflicto de valores con la marca [NEEDS CLARIFICATION: ...].
> 4. Actualiza la tabla de specs/requirements.md sin tocar el resto.
> ```

---

## ⚡ Atajo 2: Crear una Nueva Página / Módulo a partir de un RF

Para agregar cualquier requerimiento nuevo (`RF-XX`), la IA solo debe seguir estos 3 pasos exactos:

### Paso 1: Crear la página en `app/src/pages/[Nombre]Page.jsx`
Usar la siguiente estructura base de rápida implementación:

```jsx
import { useState, useEffect } from 'react'

export default function [Nombre]Page() {
  const STORAGE_KEY = 'siga_[entidad]'
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  })
  const [formData, setFormData] = useState({ /* campos */ })
  const [error, setError] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const handleSubmit = (e) => {
    e.preventDefault()
    // 1. Validaciones del RF
    // 2. Agregar item al estado
    // 3. Resetear formulario
  }

  const handleDelete = (id) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div>
            <h1 className="card-title">[Título del Módulo]</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Implementación de <strong>[RF-XX]</strong>: [Descripción breve]
            </p>
          </div>
          <span className="badge">[RF-XX]</span>
        </div>

        {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Controles usando .form-group, .form-label, .form-input */}
          </div>
          <button type="submit" className="btn btn-primary">+ Guardar</button>
        </form>
      </div>

      <div className="card">
        <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Registros ({items.length})</h2>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Campo 1</th>
                <th style={{ textAlign: 'right' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.nombre}</td>
                  <td style={{ textAlign: 'right' }}>
                    <button onClick={() => handleDelete(item.id)} className="btn btn-danger">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
```

### Paso 2: Registrar la Ruta en `app/src/App.jsx`
1. Importar la nueva página:
   ```jsx
   import [Nombre]Page from './pages/[Nombre]Page.jsx'
   ```
2. Agregar la ruta dentro de `<Route path="/" element={<Layout />}>`:
   ```jsx
   <Route path="[ruta]" element={<[Nombre]Page />} />
   ```

### Paso 3: Agregar el enlace en el menú `app/src/components/Navbar.jsx`
```jsx
<li>
  <NavLink 
    to="/[ruta]" 
    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
  >
    [Nombre] ([RF-XX])
  </NavLink>
</li>
```

---

## ⚡ Atajo 3: Prompt Maestro para que la IA cree el módulo completo en un solo tiro

> **Prompt para copiar y pegar a la IA:**
> ```text
> Necesito implementar [RF-XX] en la app web React.
> 
> Requerimiento: [Describir qué debe hacer]
> 
> Sigue la convención del proyecto:
> 1. Crea `app/src/pages/[Nombre]Page.jsx` con persistencia en localStorage, validaciones y diseño usando las clases de index.css.
> 2. Registra la ruta en `app/src/App.jsx`.
> 3. Agrega el acceso en `app/src/components/Navbar.jsx`.
> 
> Entrega el código modular, limpio y directamente funcional.
> ```

---

## 🛠️ Comandos Rápidos de Ejecución Local
```bash
cd app
npm install
npm run dev
```
La aplicación correrá en `http://localhost:3000`.
