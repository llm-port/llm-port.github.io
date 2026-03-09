---
sidebar_position: 2
---

# Seguridad y Políticas

**llm.Port** proporciona un modelo de seguridad integral que cubre autenticación, autorización, cifrado y aplicación de políticas.

## Autenticación

### Tokens JWT

- Autenticación con Bearer token para el gateway y las APIs de administración
- Claims con conciencia de tenant: `sub`, `tenant_id`, `roles`, `groups`
- Expiración de token configurable y refresco

### Autenticación por Cookie

- **Cookies httponly seguras** (`fapiauth`) para sesiones de navegador
- Conversión de cookie a JWT en la capa proxy del backend
- Utilizada por la consola de administración y la UI de chat para autenticación transparente en el navegador

### OAuth / SSO

- Gestión de proveedores **OIDC / OAuth2**
- Registro automático de usuarios en el primer inicio de sesión SSO
- Mapeo de grupos desde los claims del proveedor de identidad a roles de plataforma
- Soporte para múltiples proveedores

### Modo Root / Break-Glass

- Sesiones elevadas de tiempo limitado para operaciones de emergencia
- Rastro de auditoría obligatorio para todas las acciones en modo root
- Expiración automática tras el tiempo de espera configurado

## Autorización (RBAC)

Modelo de permisos completo de **recurso + acción**:

- **Roles**: conjuntos de permisos con nombre (p.ej., `admin`, `viewer`, `operator`)
- **Grupos**: colecciones de usuarios con asignaciones de roles compartidas
- **Recursos**: `containers`, `providers`, `models`, `rag`, `pii`, `settings`, …
- **Acciones**: `read`, `write`, `delete`, `execute`, `admin`

Los permisos se evalúan por solicitud tanto en la API de administración como en el gateway.

## Cifrado

### Secretos Almacenados en DB

- **Cifrado Fernet** con una sola clave maestra
- Todos los secretos (API keys, tokens, credenciales) cifrados en reposo en PostgreSQL
- Sin secretos almacenados en variables de entorno o archivos de configuración
- Cifrado/descifrado transparente a través del servicio de ajustes

### Límites del Cuerpo de Solicitud

- Aplicación del tamaño máximo de payload configurable
- Previene que solicitudes sobredimensionadas lleguen a los proveedores upstream

## Limitación de Velocidad

- Contadores de **ventana fija basados en Redis** para RPM y TPM
- Configuración de política por tenant
- Operaciones atómicas vía scripts Lua para consistencia

## Control de Concurrencia

- **Arrendamiento por instancia** distribuido vía Redis + scripts Lua
- Previene la sobrecarga de instancias individuales de proveedores
- Liberación automática del arrendamiento al completar (incluidos errores vía bloques `finally`)

![Security Overview](/img/screenshots/security_overview.png)

![User Profile](/img/screenshots/profile.png)
