# Tabla de decisión

## SIGA-101 · Actualización del estado de pago tras la conciliación bancaria mensual

Condiciones: estado actual de la póliza antes de procesar el archivo, y
resultado que muestra el archivo del banco para esa póliza ese mes.
Acción: estado resultante de la póliza después de procesar el archivo.
Usar guion (`-`) donde la condición no importa para esa regla.

| Condición / Acción | Regla 1 | Regla 2 | Regla 3 | Regla por defecto |
|----------------------|---------|---------|---------|---------------------|
| Estado actual | Anulada | Al día | Al día | 1 cuota impaga / 2 cuotas impagas |
| Resultado en archivo del banco | - | Cuota acreditada | Cuota rechazada | - (no figura en el archivo) |
| **Acción: estado resultante** | Anulada (sin cambio) | Al día | 1 cuota impaga | `[NEEDS CLARIFICATION]` |

**Regla por defecto:** cubre dos casos sin dato de origen: (a) una
póliza con 1 o 2 cuotas impagas que recibe un nuevo resultado del
banco, y (b) cualquier póliza que no figura en el archivo del mes.
Ningún fragmento del relevamiento define el estado resultante para
estos casos — no se infiere un valor, queda marcado
`[NEEDS CLARIFICATION]` hasta que H. Vidal lo defina (SIGA-101).

**Cómo se lee esta tabla:** se evalúa primero el estado actual — si es
Anulada, el archivo del banco no se procesa para esa póliza (Regla 1,
SIGA-106 Escenario B: Anulada es estado final). Si el estado actual es
Al día, el resultado del archivo determina la Regla 2 o 3 (SIGA-101
Escenarios A y B). Cualquier combinación no cubierta por las Reglas
1–3 cae en la regla por defecto.

## Observaciones (obligatorio si el material relevado tiene conflictos o huecos)

- **Conflictos detectados:** ninguno — no hay dos fragmentos que
  asignen valores distintos a la misma condición para este caso.
- **Huecos del material:**
  - Qué estado resulta para una póliza que **no figura** en el
    archivo del banco de ese mes (SIGA-101: "Sin criterio... cualquier
    criterio elegiría una de las dos versiones").
  - Qué estado resulta cuando una póliza con **1 cuota impaga** recibe
    una cuota acreditada (¿vuelve a Al día?) o una nueva rechazada
    (¿pasa a 2 cuotas impagas?) — ningún fragmento lo dice.
  - Qué estado resulta cuando una póliza con **2 cuotas impagas**
    recibe un nuevo resultado del archivo (¿se anula? ¿se mantiene?)
    — relacionado con el hueco de SIGA-108 (cuándo anula SIGA por
    falta de pago).
- **Decisiones de negocio pendientes:** H. Vidal debe definir el
  estado para una póliza ausente del archivo del banco (SIGA-101).
  H. Vidal / Cobranzas deben definir el criterio de anulación por
  falta de pago, del cual depende completar las filas de 1 y 2 cuotas
  impagas (SIGA-108).
