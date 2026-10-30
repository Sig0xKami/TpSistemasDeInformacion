# Requerimientos

Completar a partir de los fragmentos de relevamiento del caso. Seguir
la convención de `skill/SKILL.md` (atómico, verificable, sin tecnología
mezclada).

## Requerimientos funcionales

| ID | Requerimiento | Fragmento(s) de origen | Criterio de aceptación (Dado/Cuando/Entonces) |
|----|---------------|--------------------------|--------------------------------------------------|
| SIGA-101 | SIGA actualiza el estado de pago de las pólizas mediante una conciliación mensual contra el archivo provisto por el banco. `[NEEDS CLARIFICATION: qué estado asigna SIGA a una póliza que no figura en el archivo; decisor H. Vidal]` | Caso §2.1 | **A.** Dado que la póliza 1001 está Al día y el archivo del banco del mes la muestra con la cuota acreditada, cuando el operador procesa el archivo, entonces la póliza 1001 sigue Al día. **B.** Dado que la póliza 1002 está Al día y el archivo del banco la muestra con la cuota rechazada, cuando el operador procesa el archivo, entonces la póliza 1002 pasa a 1 cuota impaga. Sin criterio para una póliza que no figura en el archivo (ver observaciones). |
| SIGA-102 | SIGA calcula el premio al cargar los datos de la solicitud. | Caso §3.2 | Dado que el operador carga una solicitud completa de Juan Pérez, con el vehículo de patente AB 123 CD y cobertura Terceros Completo, cuando termina de cargar los datos, entonces SIGA muestra el valor del premio calculado sin que el operador lo escriba a mano. |
| SIGA-103 | SIGA aplica los descuentos del premio con topes definidos en el código. `[NEEDS CLARIFICATION: H. Vidal dice que están topeados y no se acumulan todos; J. Ponce dice que se suman los tres (débito automático, otra póliza, antigüedad); no se conoce el tope; decisores M. Duarte y H. Vidal]` | Caso §4 (voz de H. Vidal, voz de J. Ponce) | Sin criterio: pendiente de decisión (ver observaciones). Cualquier criterio elegiría una de las dos versiones en conflicto. |
| SIGA-106 | SIGA maneja el estado de pago de la póliza con cuatro estados: Al día, 1 cuota impaga, 2 cuotas impagas y Anulada. Anulada es el estado final. | Corrección de la cátedra a la E1; Caso §2.1 | **A.** Dado que la póliza 1003 está en cualquier momento de su vida, cuando se consulta su estado de pago, entonces tiene uno solo de estos: Al día, 1 cuota impaga, 2 cuotas impagas o Anulada. **B.** Dado que la póliza 1004 está Anulada, cuando se procesa un archivo del banco que muestra una cuota acreditada, entonces la póliza 1004 sigue Anulada. |
| SIGA-107 | SIGA permite hacer endosos solo de domicilio y de forma de pago sobre una póliza emitida. Los cambios de vehículo y de cobertura se resuelven anulando y reemitiendo la póliza. | Caso §2.1; Caso §6 | **A.** Dado que la póliza 1001 está emitida, cuando el operador cambia el domicilio, entonces SIGA guarda el cambio sin anular ni reemitir la póliza. **B.** Dado que la póliza 1001 está emitida con el vehículo de patente AB 123 CD, cuando el asegurado quiere cambiar el vehículo, entonces SIGA no lo permite como endoso y hay que anular la póliza y emitir una nueva. |
| SIGA-108 | SIGA permite anular una póliza por falta de pago o por pedido del asegurado. Anulada no vuelve a otro estado. `[NEEDS CLARIFICATION: cuándo anula SIGA por falta de pago; el glosario define el término pero el texto no lo dice; decisores H. Vidal / Cobranzas]` | Caso §6 | **A.** Dado que la póliza 1005 está Al día, cuando el asegurado pide la anulación, entonces la póliza queda Anulada y no vuelve a ningún otro estado. Sin criterio para la anulación por falta de pago (ver observaciones). |

## Fragmentos que NO son requerimientos funcionales

Para cada fragmento del relevamiento que no calificó como RF, clasificar
según las categorías de `skill/SKILL.md` (objetivo/meta de negocio,
restricción técnica, RNF, dato de contexto) y justificar en una línea
por qué no es un RF. Igual se documenta cómo se verifica, cuando aplica.

| Fragmento | Texto | Categoría | Justificación | Cómo se verifica |
|-----------|-------|-----------|----------------|--------------------|
| SIGA-104 | SIGA es una aplicación Visual Basic 6 con base SQL Server, instalada en las PC de casa central y sucursales; los productores no tienen acceso. `[NEEDS CLARIFICATION: dónde está físicamente la base; decisor H. Vidal]` | Restricción técnica | Nombra la tecnología de implementación (VB6, SQL Server) y una restricción de plataforma/acceso, no una función verificable del sistema. | **A.** Dado que un operador de casa central abre SIGA desde su PC, cuando guarda la cobranza de la póliza 1001, entonces el dato queda guardado en la base SQL Server. **B.** Dado que Julián Ponce es productor, cuando intenta entrar a SIGA, entonces no tiene acceso. |
| SIGA-105 | El mantenimiento de SIGA está a cargo de una sola persona (H. Vidal, desde 2011), que se jubila en marzo del año próximo, y no existe documentación técnica ni funcional. | RNF (mantenibilidad / continuidad) | Describe una cualidad de continuidad y mantenibilidad del sistema (dependencia de una sola persona, falta de documentación), no una función que SIGA deba realizar. | **A.** Dado que se pide la documentación técnica y funcional de SIGA, cuando se revisa lo que tiene la empresa, entonces no existe ningún documento. **B.** Dado que se pregunta quién mantiene SIGA, cuando se consulta a la empresa, entonces la única persona es H. Vidal, desde 2011, y se jubila en marzo. |

## Conflictos u observaciones detectadas

Si al procesar los fragmentos aparece un conflicto de valores (ver
"Detección de conflictos" en la skill), documentarlo acá aunque no
afecte directamente un RF puntual.

- **SIGA-101**: sin criterio para el estado que asigna SIGA a una póliza que no figura en el archivo del banco del mes. Pendiente — decisor H. Vidal.
- **SIGA-103**: conflicto de valores entre H. Vidal ("los descuentos están topeados, no se acumulan los tres") y J. Ponce ("se suman los tres: débito automático, otra póliza, antigüedad"). No se elige un valor arbitrariamente. Pendiente — decisores M. Duarte y H. Vidal.
- **SIGA-104**: sin dato sobre la ubicación física de la base SQL Server (¿casa central, sucursal, nube?). Pendiente — decisor H. Vidal.
- **SIGA-108**: sin criterio sobre el plazo/condición que dispara la anulación por falta de pago (el glosario define "anulación" pero no el disparador). Pendiente — decisores H. Vidal / Cobranzas.
