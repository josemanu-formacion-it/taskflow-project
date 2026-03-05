// app.js - Taskflow: persistencia sin borrar tareas previas
const STORAGE_KEY = 'taskflow.tasks';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('task-form');
  const input = document.getElementById('task-input');
  const category = document.getElementById('task-category');
  const priority = document.getElementById('task-priority');
  const list = document.getElementById('tasks-list');
  const search = document.getElementById('search-input');

  // Cargar tareas existentes (si las hay) y renderizar
  let tasks = loadTasks();
  renderTasks(tasks, list);

  // Añadir tarea: no borra tareas previas, solo añade al array y guarda
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    const newTask = {
      id: Date.now().toString(),
      text,
      category: category.value,
      priority: priority.value,
      completed: false
    };
    // Añadir al inicio para que la nueva aparezca arriba; no se elimina nada
    tasks.unshift(newTask);
    saveTasks(tasks);
    renderTasks(tasks, list);
    form.reset();
    input.focus();
  });

  // Delegación de eventos en la lista: borrar y alternar completado
  list.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const taskEl = btn.closest('.tarea');
    if (!taskEl) return;
    const id = taskEl.dataset.id;
    if (!id) return;

    if (btn.dataset.action === 'delete') {
      // Eliminar solo la tarea seleccionada
      tasks = tasks.filter(t => t.id !== id);
      saveTasks(tasks);
      renderTasks(tasks, list);
      return;
    }

    if (btn.dataset.action === 'toggle') {
      tasks = tasks.map(t => t.id === id ? {...t, completed: !t.completed} : t);
      saveTasks(tasks);
      renderTasks(tasks, list);
      return;
    }
  });

  // Filtro de búsqueda (no modifica tareas guardadas)
  search.addEventListener('input', () => {
    const q = search.value.trim().toLowerCase();
    renderTasks(tasks, list, q);
  });
});

/* Renderiza tareas en el DOM; no altera el array original */
function renderTasks(tasks, container, query = '') {
  container.innerHTML = '';
  const filtered = tasks.filter(t => {
    if (!query) return true;
    return t.text.toLowerCase().includes(query) ||
           t.category.toLowerCase().includes(query) ||
           t.priority.toLowerCase().includes(query);
  });

  if (filtered.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'tarea';
    empty.setAttribute('aria-hidden', 'true');
    empty.textContent = 'No hay tareas';
    container.appendChild(empty);
    return;
  }

  filtered.forEach(task => {
    const el = document.createElement('article');
    el.className = 'tarea' + (task.completed ? ' completada' : '');
    el.dataset.id = task.id;

    const info = document.createElement('div');
    info.className = 'info';

    const title = document.createElement('h3');
    title.className = 'titulo';
    title.textContent = task.text;

    const cat = document.createElement('span');
    cat.className = 'categoria';
    cat.textContent = task.category;

    info.appendChild(title);
    info.appendChild(cat);

    const right = document.createElement('div');
    right.style.display = 'flex';
    right.style.alignItems = 'center';

    const badge = document.createElement('span');
    badge.className = 'badge ' + priorityClass(task.priority);
    badge.textContent = task.priority;

    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'btn-toggle';
    toggleBtn.textContent = task.completed ? 'Deshacer' : 'Hecho';
    toggleBtn.dataset.action = 'toggle';
    toggleBtn.type = 'button';

    const del = document.createElement('button');
    del.className = 'btn-delete';
    del.textContent = 'Borrar';
    del.dataset.action = 'delete';
    del.type = 'button';

    right.appendChild(badge);
    right.appendChild(toggleBtn);
    right.appendChild(del);

    el.appendChild(info);
    el.appendChild(right);

    container.appendChild(el);
  });
}

function priorityClass(priority) {
  switch ((priority || '').toLowerCase()) {
    case 'alta': return 'prioridad-alta';
    case 'media': return 'prioridad-media';
    case 'baja': return 'prioridad-baja';
    default: return '';
  }
}

/* Persistencia: guarda y carga sin borrar datos previos */
function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (err) {
    console.error('Error guardando en localStorage', err);
  }
}

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Error leyendo localStorage', err);
    return [];
  }
}
