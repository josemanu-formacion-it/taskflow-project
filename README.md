# 📦 TaskFlow - De Aplicación Local a Arquitectura Cliente-Servidor

TaskFlow es mi proyecto principal dentro del bootcamp InfraOps. Lo que comenzó como una sencilla lista de tareas en el navegador, ha evolucionado a través de diferentes fases hasta convertirse en una aplicación Full-Stack profesional con su propia API RESTful.

------

## 🚀 Fase 1 y 2: Los Cimientos y la IA (Resumen)

### Fase 1: Frontend y LocalStorage
En la primera etapa de mi proyecto, me centré en los fundamentos de la web. Construí la interfaz de TaskFlow utilizando **HTML5 semántico**, **CSS3** y **Tailwind CSS** para garantizar un diseño responsivo y modo oscuro. La lógica de la aplicación se desarrolló con **JavaScript (ES6+)**, gestionando el estado de las tareas y persistiendo los datos temporalmente en el `LocalStorage` del navegador. Finalmente, desplegué esta primera versión estática en Vercel.

### Fase 2: Inteligencia Artificial en el Flujo de Trabajo
Posteriormente, integré herramientas de IA en mi día a día. Utilicé **Cursor IDE**, **ChatGPT** y **Claude** para auditar mi código, sugerir mejoras, refactorizar métodos complejos y aplicar técnicas avanzadas de *Prompt Engineering*. Toda esta investigación, incluyendo comparativas de IA, experimentos con servidores MCP y reflexiones personales, la documenté exhaustivamente en la carpeta `docs/ai/` de mi repositorio.

---

## 🧠 Fase 3: El Gran Salto al Backend (Node.js y Express)

Esta fase representa un punto de inflexión crítico en mi proyecto. He abandonado el entorno confinado del navegador para adentrarme en la ingeniería de servidores, transformando TaskFlow en una aplicación con una verdadera **arquitectura cliente-servidor**.

### 1. El Cambio de Paradigma: Adiós LocalStorage, Hola API REST
He eliminado por completo la dependencia del `LocalStorage` en mi frontend. Ahora, mi interfaz web se comunica de forma asíncrona a través de la red con mi propio servidor **Node.js**. Esto me ha obligado a gestionar la física del mundo real en mi UI: latencia, tiempos de carga y posibles caídas del servidor. 

He implementado un sistema de gestión de estados en `app.js` que muestra feedback visual al usuario (estado de *carga*, *éxito* o *error*) mientras espera la respuesta de la red.

### 2. Arquitectura por Capas (Separación de Responsabilidades)
No me he limitado a escribir "endpoints rápidos". He diseñado mi servidor Express siguiendo un estricto patrón de separación de preocupaciones (SoC) en tres capas unidireccionales dentro de la carpeta `server/`:

* **Capa de Enrutamiento (`routes/`):** Escucha la red y mapea las URLs y verbos HTTP hacia el controlador adecuado. Es una capa puramente de tráfico.
* **Capa de Controladores (`controllers/`):** Actúa como director de orquesta. Extrae los datos de `req.body` o `req.params`, aplica **validaciones defensivas en la frontera de red** (rechazando con un HTTP 400 si un título viene vacío, por ejemplo) y formatea la respuesta.
* **Capa de Servicios (`services/`):** El corazón de mi lógica de negocio. Son funciones de JavaScript puro que desconocen por completo qué es Express o HTTP. Aquí se realiza la manipulación de datos reales.

### 3. Semántica HTTP y Middlewares
He diseñado una **API RESTful** estricta que respeta la idempotencia y la semántica de la red:

| Verbo HTTP | Endpoint | Acción | Código de Éxito |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/v1/tasks` | Recupera todas las tareas | `200 OK` |
| **POST** | `/api/v1/tasks` | Crea una nueva tarea | `201 Created` |
| **DELETE** | `/api/v1/tasks/:id` | Elimina una tarea por ID | `204 No Content` |

Además, he implementado un sistema de **Middlewares**:
* `express.json()` para parsear los payloads.
* `cors()` para asegurar que solo orígenes permitidos consuman mi API.
* **Middleware global de errores:** Un interceptor final que captura fallos (como un `NOT_FOUND`) y los traduce a códigos HTTP semánticos (404, 500) evitando que el servidor "caiga" o filtre trazas de error (stack traces) al cliente.

### 4. Seguridad y Configuración (12-Factor App)
Siguiendo los estándares de la industria, he extraído toda la configuración de mi servidor a variables de entorno usando `dotenv`. Mi módulo de configuración (`config/env.js`) evalúa antes de arrancar que las variables vitales (como el `PORT`) existan; si no, el servidor se niega a iniciar.

---

## 📂 Estructura Actual del Proyecto

Mi repositorio ahora se divide claramente en Cliente y Servidor:

```text
taskflow-project/
 ├── docs/
 │    ├── ai/              # Documentación de la Fase 2 (Prompt Engineering, etc.)
 │    └── backend-api.md   # Documentación técnica (Axios, Postman, Swagger)
 ├── server/               # ⚙️ NUEVO: El corazón del backend (Node + Express)
 │    ├── src/
 │    │    ├── config/     # Variables de entorno
 │    │    ├── controllers/# Validación e interfaces HTTP
 │    │    ├── routes/     # Endpoints REST
 │    │    ├── services/   # Lógica de negocio
 │    │    └── index.js    # Entrada del servidor y middlewares
 │    ├── .env             # Credenciales locales (ignorado en Git)
 │    └── package.json
 ├── src/                  # 💻 El Frontend
 │    ├── api/
 │    │    └── client.js   # NUEVO: Capa de red (fetch) hacia el servidor
 │    ├── app.js           # UI, DOM y manejo de estados asíncronos (await)
 │    └── taskManager.js   # Lógica de cliente adaptada a promesas
 ├── index.html
 └── package.json          # Herramientas de frontend (Tailwind)
