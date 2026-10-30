# Skill: Implementación Automática de Requerimientos en App Web React

Esta skill instruye a la IA para interpretar `specs/requirements.md` (y su contexto en `skill/SKILL.md`) y traducir cada requerimiento funcional directamente a la aplicación web React modular en `app/`.

---

## 🎯 Rol y Principio Rector
Sos un desarrollador fullstack pragmático y analista de sistemas. Tu objetivo es transformar cada `RF-XX` verificado en una interfaz funcional, simple y modular, sin inventar lógica no relevada ni agregar capas redundantes (sin Repository, sin Service externo: el estado vive en el módulo).

---

## 📋 Reglas de Oro de Interpretación (Zero-Hallucination)

1. **Solo Requerimientos Confirmados:**
   - Si un requerimiento tiene la etiqueta `[NEEDS CLARIFICATION: ...]`, **NO** asumas un valor ni implementes la regla en conflicto como definitiva.
   - En la UI, mostrá una tarjeta o banner amarillo de advertencia: *"Regla pendiente de aclaración con el cliente"*.
2. **Atómico y Verificable:**
   - Cada página implementa exactamente el comportamiento que el criterio de verificación exige (ej: "validar que el ID no se repita", "campo obligatorio").
3. **Consistencia Visual:**
   - Usar las clases predefinidas en `app/src/index.css`: `.card`, `.badge`, `.form-grid`, `.form-group`, `.form-input`, `.btn .btn-primary`, `.btn .btn-danger`, `.table`.

---

## ⚡ Flujo de Ejecución Paso a Paso

Al recibir la orden *"Implementá los requerimientos de specs/requirements.md"*, la IA debe ejecutar estrictamente estos 3 pasos:

### Paso 1: Mapeo Requerimiento -> Entidad
Para cada `RF-XX`:
- Identificar la entidad principal (ej: `Cliente`, `Préstamo`, `Devolución`).
- Nombre del archivo: `app/src/pages/[Entidad]Page.jsx`.
- Determinar campos y tipo de datos basados en el enunciado y verificación.

### Paso 2: Generación del Módulo (`app/src/pages/[Entidad]Page.jsx`)
Estructura obligatoria del componente:
- **Estado Local y Persistencia:** `localStorage.getItem('siga_[entidad]')`.
- **Validaciones:** Comprobar tipos, duplicados y campos obligatorios antes del guardado.
- **Formulario de Carga:** Usando `.form-grid` y controles claros.
- **Tabla de Resultados:** Con buscador/filtro en tiempo real y acción de eliminación.
- **Trazabilidad:** Etiqueta `<span className="badge">[RF-XX]</span>` visible en la cabecera.

### Paso 3: Registro en el Enrutador y Menú
- En `app/src/App.jsx`: Importar el componente y declarar `<Route path="[entidad]" element={<[Entidad]Page />} />`.
- En `app/src/components/Navbar.jsx`: Agregar `<NavLink to="/[entidad]">Nombre (RF-XX)</NavLink>`.
- En `app/src/pages/HomePage.jsx`: Añadir la card de acceso rápido con descripción.

---

## 🧪 Criterio de Verificación de la IA (Checklist de Salida)
Antes de dar la tarea por concluida, la IA debe autocertificar:
- [ ] ¿Compila limpiamente sin warnings de React/Vite?
- [ ] ¿Los datos persisten tras recargar el navegador (`localStorage`)?
- [ ] ¿Las rutas del navbar funcionan sin recargar la página completa?
- [ ] ¿Se respetó el principio de no agregar capas innecesarias?
