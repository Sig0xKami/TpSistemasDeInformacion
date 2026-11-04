## Qué cambia

Los pendientes de decisión (SIGA-101, 103, 104, 108) salen del texto del requerimiento y del criterio de verificación y pasan a una sección "Conflictos y pendientes" con la marca [NEEDS CLARIFICATION: …] y su decisor, como pide la plantilla.
Los requerimientos y criterios quedan redactados solo con lo que está confirmado por el caso (verificables y sin ambigüedad).
Se normaliza la columna Fuente: Caso 4(Vidal, Ponce) → Caso §4 (H. Vidal, J. Ponce), Caso 2.1;6 → Caso §2.1; Caso §6, Caso 2 → Caso §2.

### Por qué

En la E2 los pendientes estaban mezclados con el requerimiento, lo que lo volvía no verificable y no seguía el formato [NEEDS CLARIFICATION] de la plantilla.

### Alcance

Solo specs/requirements.md. No cambia ningún requerimiento ni su ID/issue de Jira.

Refs: SIGA-101, SIGA-103, SIGA-104, SIGA-108




3. El sistema calcula el importe a cobrar sumando los descuentos aplicables (débito automático 10%, otra póliza vigente 5%, antigüedad mayor a 3 años 5%) con un tope acumulado del 15% sobre el premio base. (include: Calcular el premio)
5b. El asegurado no paga al vencimiento: la póliza pasa a mora. Si la póliza está en 2 cuotas impagas y la conciliación registra un nuevo rechazo, pasa a Anulada por falta de pago.
6a. Una póliza que no figura en el archivo del banco mantiene su estado actual y genera una alerta de revisión manual.
