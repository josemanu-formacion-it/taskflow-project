# 📝 TaskFlow — Gestor de Tareas con Tailwind, LocalStorage y Modo Oscuro

TaskFlow es una aplicación web desarrollada como proyecto práctico del bootcamp, cuyo objetivo es construir un gestor de tareas completo aplicando buenas prácticas de HTML semántico, diseño responsive, arquitectura modular en JavaScript, persistencia con LocalStorage y migración total a Tailwind CSS. Incluye funcionalidades avanzadas como filtros, buscador en tiempo real, edición mediante modal, estadísticas dinámicas, animaciones suaves y modo oscuro persistente.

---

## 🎯 Objetivos del proyecto

Este proyecto cumple todos los requisitos del ejercicio:

1. Configuración del entorno (Git, GitHub, ramas, .gitignore, README).
2. Planificación y diseño previo (wireframe + explicación).
3. HTML semántico validado.
4. Layout responsive con CSS (migrado a Tailwind).
5. Adaptación móvil completa.
6. Lógica en JavaScript modular.
7. Persistencia con LocalStorage.
8. Funcionalidades extra (filtros, búsqueda, edición, botones globales).
9. Migración completa a Tailwind + modo oscuro.
10. Testing manual documentado.
11. Accesibilidad básica.
12. Despliegue en Vercel.

---

## 🧩 Planificación y diseño

### ✏️ Wireframe inicial

El diseño se realizó previamente en papel/Figma, definiendo:

- Cabecera con título y selector de modo oscuro.
- Formulario para añadir tareas.
- Lista principal de tareas.
- Panel lateral con estadísticas.
- Filtros y buscador.
- Modal para edición.

El wireframe se encuentra en:

`docs/design/wireframe.png`


### 🧠 Decisiones de diseño

- Layout dividido en contenido principal + panel lateral.
- Tarjetas con sombras suaves y bordes redondeados.
- Modo oscuro basado en clase `dark`.
- Animaciones suaves al añadir/eliminar tareas.
- Interfaz limpia y minimalista.

---

## 🏗️ HTML semántico

El proyecto utiliza:

- `<header>`, `<main>`, `<section>`, `<aside>`, `<footer>`
- Un único `<h1>`
- Labels correctamente asociados
- Template `<template>` para renderizar tareas
- Validación con W3C sin errores

---

## 📱 Diseño responsive

El diseño se adapta a:

- Móviles
- Tablets
- Escritorio

Cambios clave:

- El panel lateral pasa debajo del contenido en pantallas pequeñas.
- El formulario se reorganiza verticalmente.
- Botones y tarjetas se ajustan automáticamente con Tailwind.

---

## ✨ Funcionalidades principales

- Crear tareas con título y descripción.
- Editar tareas mediante modal.
- Eliminar tareas con animación.
- Marcar tareas como completadas.
- Filtros dinámicos: todas / pendientes / completadas.
- Buscador en tiempo real.
- Botón “Marcar todas como completadas”.
- Botón “Eliminar completadas”.
- Estadísticas: total / completadas / pendientes.
- Persistencia con LocalStorage.
- Modo oscuro con persistencia.
- Animaciones suaves.
- Renderizado mediante `<template>`.
- Arquitectura modular (`src/app.js` + `src/taskManager.js`).

---

## 🛠️ Tecnologías utilizadas

- HTML5 semántico
- JavaScript ES Modules
- Tailwind CSS
- PostCSS + Autoprefixer
- LocalStorage
- Vercel

---

## 📁 Estructura del proyecto

```
taskflow-project/
 ├── index.html
 ├── input.css
 ├── output.css
 ├── tailwind.config.js
 ├── postcss.config.js
 ├── package.json
 ├── package-lock.json
 ├── node_modules/
 ├── docs/
 │    └── design/
 │         └── wireframe.png
 └── src/
      ├── app.js
      └── taskManager.js
```

---

## 🚀 Instalación y ejecución en local

### 1. Clonar el repositorio

`git clone https://github.com/josemanu-formacion-it/taskflow-project
cd taskflow-project`


### 2. Instalar dependencias

`npm install`


### 3. Generar Tailwind CSS

`npm run dev`


### 4. Abrir el proyecto

Abre `index.html` en tu navegador.

---

## 🌙 Modo oscuro

- Basado en la clase `dark` en `<html>`.
- Persistencia en `localStorage`.
- Botones para alternar entre modos.
- Colores adaptados automáticamente con Tailwind.

---

## 🔍 Buscador en tiempo real

Filtra tareas por coincidencia en:

- Título
- Descripción

Funciona junto con los filtros de estado.

---

## 🧩 Filtros de tareas

- Todas
- Pendientes
- Completadas

El filtro activo se guarda en `localStorage`.

---

## 🖼️ Modal de edición

Incluye:

- Animación de entrada/salida
- Inputs estilizados
- Botones modernos
- Modo oscuro
- Persistencia tras guardar

---

## 🎨 Migración completa a Tailwind

El CSS tradicional fue reemplazado por:

- Clases utilitarias
- `dark:` para modo oscuro
- Sombras, bordes, espaciado
- Transiciones
- Layout responsive

---

## 🧪 Testing manual

Pruebas realizadas:

- Lista vacía → funciona correctamente.
- Añadir tarea sin título → bloqueado.
- Añadir tarea larga → se muestra correctamente.
- Marcar tareas como completadas → correcto.
- Eliminar tareas → animación + borrado.
- Recargar página → datos persisten.
- Filtros → funcionan correctamente.
- Buscador → filtra en tiempo real.
- Modal → edita correctamente.
- Modo oscuro → persistente.
- Responsive → probado en móvil y escritorio.

---

## ♿ Accesibilidad

- Navegación por teclado.
- Foco visible.
- Labels asociados.
- Botones con `aria-label`.
- Contraste adecuado.
- Modal accesible.

---

## ☁️ Despliegue en Vercel

URL pública: `https://taskflow-project-josemanu-formacion-it.vercel.app/`

Cada push a `main` genera un nuevo despliegue automático.

---

## 📄 Licencia

Proyecto educativo y personal.  
Libre para modificar y extender.
