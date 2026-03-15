import TaskManager from "./taskManager.js";

const taskManager = new TaskManager();

// Formulario
const taskForm = document.getElementById("taskForm");
const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");

// Lista
const taskList = document.getElementById("taskList");

// Template
const taskTemplate = document.getElementById("taskTemplate");

// Estadísticas
const statTotal = document.getElementById("statTotal");
const statCompleted = document.getElementById("statCompleted");
const statPending = document.getElementById("statPending");

// Botones extra
const completeAllBtn = document.getElementById("completeAllBtn");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");

// Modal
const editModal = document.getElementById("editModal");
const editForm = document.getElementById("editForm");
const editTitle = document.getElementById("editTitle");
const editDescription = document.getElementById("editDescription");
const cancelEdit = document.getElementById("cancelEdit");
let editingTaskId = null;

// Filtros
const filterButtons = document.querySelectorAll(".filter-btn");
let currentFilter = localStorage.getItem("taskFilter") || "all";

// Buscador
const searchInput = document.getElementById("searchInput");
let searchQuery = "";

// Animación al añadir tareas
function animateTask(element) {
  element.classList.add("opacity-0", "translate-y-2");
  requestAnimationFrame(() => {
    element.classList.remove("opacity-0", "translate-y-2");
    element.classList.add("opacity-100", "translate-y-0");
  });
}

// Modal
function openModal(task) {
  editingTaskId = task.id;
  editTitle.value = task.title;
  editDescription.value = task.description;

  editModal.classList.remove("hidden");
  const box = editModal.querySelector("div");
  requestAnimationFrame(() => {
    box.classList.remove("opacity-0", "scale-95");
    box.classList.add("opacity-100", "scale-100");
  });
}

function closeModal() {
  const box = editModal.querySelector("div");
  box.classList.add("opacity-0", "scale-95");
  box.classList.remove("opacity-100", "scale-100");

  setTimeout(() => {
    editModal.classList.add("hidden");
  }, 150);
}

cancelEdit.addEventListener("click", closeModal);

editForm.addEventListener("submit", e => {
  e.preventDefault();

  taskManager.editTask(editingTaskId, editTitle.value, editDescription.value);
  closeModal();
  renderTasks();
});

// Filtro visual activo
function updateFilterButtons() {
  filterButtons.forEach(btn => {
    if (btn.dataset.filter === currentFilter) {
      btn.classList.add("bg-blue-600", "text-white", "dark:bg-blue-500");
      btn.classList.remove("bg-gray-200", "dark:bg-gray-700");
    } else {
      btn.classList.remove("bg-blue-600", "text-white", "dark:bg-blue-500");
      btn.classList.add("bg-gray-200", "dark:bg-gray-700");
    }
  });
}

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    localStorage.setItem("taskFilter", currentFilter);
    updateFilterButtons();
    renderTasks();
  });
});

// Buscador
searchInput.addEventListener("input", e => {
  searchQuery = e.target.value.toLowerCase();
  renderTasks();
});

// Estadísticas
function updateStats() {
  const tasks = taskManager.tasks;
  const completed = tasks.filter(t => t.completed).length;

  statTotal.textContent = tasks.length;
  statCompleted.textContent = completed;
  statPending.textContent = tasks.length - completed;
}

// Botón: marcar todas como completadas
completeAllBtn.addEventListener("click", () => {
  taskManager.completeAll();
  renderTasks();
});

// Botón: borrar completadas
clearCompletedBtn.addEventListener("click", () => {
  taskManager.clearCompleted();
  renderTasks();
});

// Renderizado con template
function renderTasks() {
  taskList.innerHTML = "";

  let tasksToShow = taskManager.tasks;

  // Filtro por estado
  if (currentFilter === "pending") {
    tasksToShow = tasksToShow.filter(t => !t.completed);
  } else if (currentFilter === "completed") {
    tasksToShow = tasksToShow.filter(t => t.completed);
  }

  // Filtro por texto
  if (searchQuery.trim() !== "") {
    tasksToShow = tasksToShow.filter(t =>
      t.title.toLowerCase().includes(searchQuery) ||
      t.description.toLowerCase().includes(searchQuery)
    );
  }

  tasksToShow.forEach(task => {
    const clone = taskTemplate.content.cloneNode(true);
    const li = clone.querySelector("li");

    // Título y descripción
    clone.querySelector(".task-title").textContent = task.title;
    clone.querySelector(".task-desc").textContent = task.description || "";

    // Estilo si está completada
    if (task.completed) {
      clone.querySelector(".task-title").classList.add("line-through", "text-gray-500", "dark:text-gray-400");
    }

    // Botones
    clone.querySelector(".task-check").dataset.id = task.id;
    clone.querySelector(".edit-btn").dataset.id = task.id;
    clone.querySelector(".delete-btn").dataset.id = task.id;

    taskList.appendChild(clone);
    animateTask(li);
  });

  updateStats();
}

// Crear tarea
taskForm.addEventListener("submit", e => {
  e.preventDefault();

  const title = taskTitle.value.trim();
  const description = taskDescription.value.trim();

  if (!title) return;

  taskManager.addTask(title, description);
  renderTasks();

  taskForm.reset();
});

// Delegación de eventos
taskList.addEventListener("click", e => {
  const id = e.target.dataset.id;

  if (!id) return;

  if (e.target.classList.contains("delete-btn")) {
    const li = e.target.closest("li");
    li.classList.add("opacity-0", "translate-y-2");
    setTimeout(() => {
      taskManager.deleteTask(id);
      renderTasks();
    }, 200);
  }

  if (e.target.classList.contains("task-check")) {
    taskManager.toggleTask(id);
    renderTasks();
  }

  if (e.target.classList.contains("edit-btn")) {
    const task = taskManager.tasks.find(t => t.id === id);
    openModal(task);
  }
});

updateFilterButtons();
renderTasks();
