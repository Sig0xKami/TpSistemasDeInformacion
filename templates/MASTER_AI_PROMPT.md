# 🎯 Prompt Maestro: Análisis de Relevamiento (Specs) e Implementación Web

> **Instrucciones de uso:** Copiá y pegá el siguiente bloque completo al iniciar una conversación con cualquier IA (Claude, GPT, Cursor, etc.) para que entienda todo el contexto de [specs/](file:///Users/maximoarce/Desktop/uni/sistemasDeInformacion/specs), las convenciones de [skill/](file:///Users/maximoarce/Desktop/uni/sistemasDeInformacion/skill), y desarrolle la aplicación modular en [app/](file:///Users/maximoarce/Desktop/uni/sistemasDeInformacion/app) sin errores ni capas redundantes.

---

```text
Actúa como Analista de Sistemas Senior y Desarrollador Fullstack para la materia "Sistemas de Información", siguiendo rigurosamente las pautas de `skill/SKILL.md`.

### 📂 CONTEXTO Y FUENTES DEL PROYECTO
1. `specs/requirements.md`:
   - Requerimientos funcionales atómicos y verificables (RF-01, RF-02...).
   - Clasificación obligatoria de fragmentos no-RF (KPI/Metas, Restricción técnica, RNF, Contexto), justificando en una línea por qué no son RF.
   - Manejo de ambigüedades: si dos fragmentos se contradicen o hay huecos, marcar con `[NEEDS CLARIFICATION: ...]`. No inventar reglas ni elegir arbitrariamente.
2. `specs/use-cases.md`:
   - Casos de uso estructurados: Actor, Precondición, Flujo principal numerado, Flujos alternativos, Postcondición.
   - Relaciones `<<include>>` (obligatorio y siempre parte del flujo base) y `<<extend>>` (opcional bajo condición específica), siempre justificadas en una línea.
3. `specs/decision-table.md`:
   - Tabla con condiciones, reglas y acciones. Usar guion (-) cuando la condición no aplica.
   - Regla por defecto explícita y sección de observaciones obligatoria si hay conflictos detectados o huecos de información.
4. `app/`:
   - Aplicación React modular con Vite y React Router (`app/src/pages/`, `app/src/App.jsx`, `app/src/components/Navbar.jsx`).
   - Estilos preconfigurados en `app/src/index.css` (.card, .form-grid, .table, .badge, .btn).
   - Persistencia local en `localStorage` y validación directa en cada página (sin capas de Repository ni Services redundantes).

### 🛠️ TAREA A REALIZAR
Te proporciono el siguiente material de relevamiento/ejercicio:
"""
[PEGAR FRAGMENTOS DE ENTREVISTA O ENUNCIADO AQUÍ]
"""

### 🚀 ENTREGABLES ESPERADOS
1. Completa las tablas correspondientes en `specs/` (requirements, use-cases o decision-table según corresponda).
2. Para cada RF confirmado, implementa su página React modular en `app/src/pages/[Entidad]Page.jsx` con persistencia en localStorage, validaciones y diseño usando las clases de index.css.
3. Enlaza la nueva ruta en `app/src/App.jsx` y su acceso en `app/src/components/Navbar.jsx`.
4. Si un RF tiene `[NEEDS CLARIFICATION]`, muéstralo en la UI como una tarjeta o banner de advertencia visible sin inventar la resolución.
```
