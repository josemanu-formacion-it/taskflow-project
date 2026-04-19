# 📝 TaskFlow — Gestor de Tareas Full-Stack (Tailwind + Node.js/Express)

TaskFlow es una aplicación web desarrollada como proyecto práctico del bootcamp. Ha evolucionado de ser un proyecto puramente frontend (con LocalStorage) a una **aplicación Full-Stack** con arquitectura cliente-servidor. El proyecto aplica buenas prácticas de diseño responsive, migración a Tailwind CSS, y un backend robusto construido con Node.js y Express utilizando una arquitectura por capas.

---

## 🎯 Objetivos del proyecto

Este proyecto cumple todos los requisitos desde la Fase 1 hasta la Fase 3:

1. Configuración del entorno (Git, GitHub, ramas, .gitignore, README).
2. HTML semántico validado y Layout responsive con Tailwind CSS.
3. Lógica en JavaScript modular en el frontend.
4. Funcionalidades extra (filtros, búsqueda, edición, botones globales).
5. Migración completa a Tailwind + modo oscuro persistente.
6. **[Fase 3]** Creación de una API RESTful con Node.js y Express.
7. **[Fase 3]** Arquitectura backend por capas (Rutas, Controladores, Servicios).
8. **[Fase 3]** Sustitución de LocalStorage por peticiones HTTP asíncronas (`fetch`).
9. **[Fase 3]** Manejo global de errores y validación defensiva en la red.
10. **[Fase 3]** Configuración avanzada de despliegue Serverless en Vercel.

---

## 🏗️ Arquitectura Backend (Fase 3)

En su última iteración, la aplicación abandonó el almacenamiento local en el navegador para consumir una API RESTful propia. Se ha implementado una **Arquitectura por Capas (Layered Architecture)** para garantizar la separación de responsabilidades:

* **Capa de Enrutamiento (`routes/`):** Define los endpoints de la API y los verbos HTTP. Delega la ejecución.
* **Capa de Controladores (`controllers/`):** Extrae datos de la red (`req.body`), aplica validación estricta en la frontera de red y formatea la respuesta (códigos HTTP 200, 201, 204, 400, 404, 500).
* **Capa de Servicios (`services/`):** Contiene la lógica de negocio pura. Desconoce por completo el contexto HTTP.
* **Middlewares:** `express.json()` para parseo, `cors()` para seguridad, y un **Manejador Global de Errores** para evitar la caída del servidor.

---

## ✨ Funcionalidades principales

- **API RESTful:** Creación, lectura y eliminación de tareas a través de red.
- **Estados de UI:** Feedback visual durante la carga y manejo de errores de conexión.
- Filtros dinámicos (todas / pendientes / completadas) y buscador en tiempo real.
- Estadísticas dinámicas (total / completadas / pendientes).
- Modo oscuro persistente.
- Animaciones suaves.
- Renderizado mediante `<template>`.
- Arquitectura modular frontend (`app.js`, `taskManager.js`, `api/client.js`).

---

## 🛠️ Tecnologías utilizadas

### Frontend
- HTML5 semántico
- JavaScript ES Modules (`async/await`, `fetch`)
- Tailwind CSS (PostCSS + Autoprefixer)

### Backend
- Node.js
- Express.js (Framework minimalista)
- CORS & Dotenv (Variables de entorno)
- Arquitectura MVC / Por capas

### Herramientas & Despliegue
- Git & GitHub
- Postman (Pruebas de red y endpoints)
- Vercel (Despliegue de estáticos + Node.js Serverless Functions)

---

## 📁 Estructura del proyecto

```text
taskflow-project/
 ├── server/                      (NUEVO: Backend Node.js)
 │    ├── src/
 │    │    ├── config/env.js      (Validación de entorno)
 │    │    ├── controllers/       (Validación y códigos HTTP)
 │    │    ├── routes/            (Endpoints API)
 │    │    ├── services/          (Lógica de negocio)
 │    │    └── index.js           (Motor Express)
 │    ├── .env
 │    └── package.json
 ├── src/                         (Frontend JS)
 │    ├── api/client.js           (NUEVO: Cliente HTTP para hablar con la API)
 │    ├── app.js                  (Lógica de UI, eventos, render)
 │    └── taskManager.js          (Gestión de estado local)
 ├── index.html
 ├── tailwind.config.js
 ├── package.json
 ├── vercel.json                  (NUEVO: Configuración de rutas Serverless)
 └── docs/                        (Documentación e investigación IA/Backend)