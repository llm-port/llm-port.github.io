---
sidebar_position: 3
---

# Detección y Redacción de PII

El **módulo PII** (`llm_port_pii`) proporciona escaneo de PII basado en Presidio, redacción y tokenización reversible integrados en el pipeline del gateway.

## Cómo Funciona

La detección de PII se ejecuta como un servicio FastAPI **sin estado** al que el gateway llama durante el procesamiento de solicitudes. Cuando está habilitado, las solicitudes salientes pueden escanearse en busca de información de identificación personal antes de que lleguen a los proveedores upstream.

El servicio PII no tiene base de datos propia — los eventos de escaneo se reenvían al backend vía HTTP y se almacenan en la base de datos del backend para dashboards y auditoría.

## Tipos de Entidades

Detección configurable para:

| Entidad            | Ejemplo                                  |
| ------------------ | ---------------------------------------- |
| `PERSON`           | Juan García                              |
| `EMAIL_ADDRESS`    | usuario@ejemplo.com                      |
| `PHONE_NUMBER`     | +34-555-0100                             |
| `CREDIT_CARD`      | 4111-1111-1111-1111                      |
| `US_SSN`           | 123-45-6789                              |
| `IP_ADDRESS`       | 192.168.1.1                              |
| `LOCATION`         | Madrid, España                           |
| _Entidades custom_ | Configurables vía reconocedores Presidio |

## Políticas

Las políticas de PII siguen una **jerarquía de precedencia**:

1. **Política de tenant** — anulaciones por tenant
2. **Default del sistema** — política base global
3. **Ninguna** — escaneo de PII deshabilitado

Cada política configura:

- Qué tipos de entidades detectar
- Estrategia de redacción (máscara, reemplazo, hash)
- Comportamiento del modo de fallo

## Modos de Fallo

| Modo       | Comportamiento                                              |
| ---------- | ----------------------------------------------------------- |
| `block`    | Rechazar la solicitud si el servicio PII no está disponible |
| `allow`    | Dejar pasar si el servicio PII no está disponible           |
| `fallback` | Volver a la detección local basada en patrones              |

## Integración con el Gateway

- **Saneamiento de telemetría**: las entidades PII se redactan de los trazos de Langfuse según el modo de privacidad
- **Control de salida**: las solicitudes salientes pueden bloquearse o redactarse antes de llegar a proveedores remotos
- **UI consciente del módulo**: la configuración de PII se oculta en la consola de administración cuando el módulo está deshabilitado

## Dashboard y Registro de Eventos

Los eventos de escaneo PII se reenvían del servicio PII al backend y se almacenan en la tabla `pii_scan_events`. La consola de administración proporciona:

- **Dashboard de PII**: visión general de la actividad de escaneo, distribución de tipos de entidad y tasas de coincidencia de políticas
- **Registro de eventos**: historial buscable de todos los eventos de escaneo PII con detalles de entidades y acciones de redacción
- **Administración de políticas de tenant**: configurar políticas PII por tenant, tipos de entidad y modos de fallo desde la UI de configuración

![PII Detection](/img/screenshots/pii.png)
