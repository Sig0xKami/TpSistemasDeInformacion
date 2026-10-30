# Casos de uso

## UC-01: Cobrar cuota de prima de la póliza

**Actor:** Operador de Mesa de Ayuda (actor principal — es el rol que
hoy carga todo en SIGA; si Cobranzas tiene un rol propio, se cambia).
Actores secundarios: Asegurado, Productor Asesor, Sistema de cobro
(débito automático / medio de pago).

**Precondición:** Existe una póliza emitida con una cuota de prima
pendiente y fecha de vencimiento.

**Flujo principal:**
1. El sistema detecta la cuota que vence y la presenta al operador.
2. El operador identifica la póliza y al asegurado.
3. El sistema calcula el importe a cobrar con los descuentos aplicables. (include: Calcular el premio)
4. El sistema muestra el importe al operador.
5. El asegurado paga por el medio elegido.
6. El sistema registra el cobro y actualiza el estado de pago de la póliza.
7. El sistema emite el comprobante de cobro. (include: Emitir comprobante)
8. El sistema deja la póliza como "al día".

**Flujo(s) alternativo(s):**
- 3a. El premio de SIGA no coincide con lo cotizado: hoy el operador decide a ojo si la diferencia es chica o grande. `[NEEDS CLARIFICATION: criterio/umbral para decidir si la diferencia es "chica" o "grande"; decisor Gerencia Comercial]`
- 5a. El pago es por débito automático y es rechazado: se registra la mora y se avisa al productor.
- 5b. El asegurado no paga al vencimiento: la póliza pasa a mora. `[NEEDS CLARIFICATION: plazo/condición hasta la anulación; decisores Cobranzas / Dirección]`

**Postcondición:** La cuota queda cobrada y registrada, y la póliza
sigue vigente. Si no se cobró, queda registrada la mora con su fecha.

**Relaciones con otros casos de uso:**

| Relación | Caso de uso relacionado | Tipo (include/extend) | Justificación |
|----------|--------------------------|------------------------|----------------|
| Paso 3 | Calcular el premio | include | Pasa siempre, incluso con importe 0 — no tiene sentido cobrar sin calcular antes el importe. |
| Paso 7 | Emitir comprobante de cobro | include | Pasa siempre — todo cobro registrado emite comprobante, sin excepción. |
| Flujo alt. 5a | Cobrar con débito automático | extend | Condicional al medio de pago elegido (punto de extensión: "medio de pago"); el flujo base (pago presencial u otro medio) es completo sin esta extensión. |
| Flujo alt. 5b | Anular póliza por falta de pago | extend | Condicional a que la cuota quede vencida sin cobrar (punto de extensión: "cuota vencida sin cobrar"); el flujo base no siempre llega a la anulación. |

Recordar (ver skill/SKILL.md): include = siempre se ejecuta como parte
del flujo, sin excepción. extend = extiende opcionalmente bajo una
condición específica, el flujo base es completo sin ella. Toda relación
sin justificación no cuenta como completa.

## Fragmentos considerados para este caso de uso

Listar qué fragmentos del relevamiento se usaron para armar este caso
de uso, y qué parte del flujo justifica cada uno.

| Fragmento | Qué aporta al caso de uso |
|-----------|------------------------------|
| Caso §2.1 | Detección del vencimiento, registro del cobro y actualización del estado de pago de la póliza (pasos 1, 6 y 8). |
| Caso §3.2 | Identificación de la póliza/asegurado y carga de los datos para calcular el importe (pasos 2 a 4). |
| Caso §4 (voz de H. Vidal, voz de J. Ponce) | Cálculo de los descuentos del premio (include: Calcular el premio); conflicto de tope entre H. Vidal y J. Ponce (SIGA-103). |
| Caso §6 | Anulación de la póliza por falta de pago (flujo alt. 5b / extend: Anular póliza por falta de pago); sin plazo/condición definida (SIGA-108). |
| Entrevista a Silvia (Mesa de Ayuda) | Criterio informal, sin umbral definido, para tolerar diferencias "chicas" entre el premio de SIGA y lo cotizado (flujo alt. 3a). |
| Voz de Julián Ponce | Rechazo del débito automático como medio de pago (flujo alt. 5a / extend: Cobrar con débito automático). |
