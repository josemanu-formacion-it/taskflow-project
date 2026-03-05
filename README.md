# 📝 **TaskFlow — Gestor de Tareas con Tailwind, Modo Oscuro y Filtros**

TaskFlow es una aplicación web moderna para gestionar tareas de forma sencilla y visual. Está construida con **JavaScript**, **Tailwind CSS**, **LocalStorage** y un diseño totalmente responsive con **modo oscuro**, **filtros**, **buscador en tiempo real**, **modal de edición**, y **animaciones suaves**.

Este proyecto forma parte de un ejercicio práctico de rediseño completo utilizando **Tailwind CSS** y buenas prácticas de arquitectura frontend.

---

## ✨ Características principales

- **Crear tareas** con título y descripción.  
- **Editar tareas** mediante un modal elegante.  
- **Eliminar tareas** con animación de salida.  
- **Marcar tareas como completadas**.  
- **Filtros dinámicos**:
  - Todas  
  - Pendientes  
  - Completadas  
- **Buscador en tiempo real** para filtrar por texto.  
- **Modo oscuro** con persistencia en `localStorage`.  
- **Animaciones suaves** al añadir y borrar tareas.  
- **Diseño moderno** con Tailwind CSS.  
- **Persistencia local** mediante LocalStorage.  
- **Arquitectura modular** (`src/app.js` + `src/taskManager.js`).  
- **Despliegue en Vercel**.

---

## 🛠️ Tecnologías utilizadas

- **HTML5**
- **JavaScript (ES Modules)**
- **Tailwind CSS**
- **PostCSS**
- **LocalStorage**
- **Vercel (deploy)**

---

## 📁 Estructura del proyecto

```
TASKFLOW-PROJECT/
 ├── index.html
 ├── input.css
 ├── output.css
 ├── tailwind.config.js
 ├── postcss.config.js
 ├── package.json
 ├── node_modules/
 └── src/
      ├── app.js
      └── taskManager.js
```

---

## 🚀 Instalación y ejecución en local

### 1. Clonar el repositorio

```
git clone https://github.com/tu-usuario/taskflow.git
cd taskflow
```

### 2. Instalar dependencias

```
npm install
```

### 3. Generar Tailwind CSS

```
npx tailwindcss -i ./input.css -o ./output.css --watch
```

### 4. Abrir el proyecto

Simplemente abre `index.html` en tu navegador.

---

## 🌙 Modo oscuro

TaskFlow incluye un **selector de modo oscuro** que alterna la clase `dark` en el elemento raíz (`<html>`).  
El estado se guarda en `localStorage`, por lo que el usuario mantiene su preferencia al recargar.

---

## 🔍 Buscador en tiempo real

El buscador filtra tareas por coincidencia en:

- Título  
- Descripción  

Funciona en combinación con los filtros de estado.

---

## 🧩 Filtros de tareas

Los filtros permiten mostrar:

- **Todas** las tareas  
- Solo **pendientes**  
- Solo **completadas**  

El filtro seleccionado se guarda en `localStorage`.

---

## 🖼️ Modal de edición

La edición de tareas se realiza mediante un modal con:

- Animación de entrada/salida  
- Inputs estilizados  
- Botones modernos  
- Modo oscuro  

---

## 🎨 Diseño con Tailwind

Todo el CSS personalizado ha sido sustituido por clases de utilidad de Tailwind, cumpliendo los requisitos del ejercicio:

- Uso de `dark:` para modo oscuro  
- Escala de colores y espaciado por defecto  
- Transiciones en botones e inputs  
- Tarjetas con sombras, bordes redondeados y animaciones  

---

## ☁️ Despliegue en Vercel

El proyecto está desplegado en:

```
https://taskflow-project-josemanu-formacion-it.vercel.app/
```

Para desplegar una nueva versión:

```
git add .
git commit -m "update"
git push
```

Vercel detectará los cambios y generará un nuevo build automáticamente.

---

## 📸 Capturas (opcional)

Puedes añadir capturas como:

```
![TaskFlow Light Mode](./screenshots/light-mode.png)
![TaskFlow Dark Mode](./screenshots/dark-mode.png)
```

---

## 📄 Licencia

Este proyecto es de uso educativo y personal.  
Puedes modificarlo y adaptarlo libremente.
