import TaskManager from "./taskManager.js";

const taskManager = new TaskManager();

const taskForm = document.getElementById("taskForm");
const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const taskList = document.getElementById("taskList");

// Modal
const editModal = document.getElementById("editModal");
const editForm = document.getElementById("editForm");
const editTitle = document.getElementById("editTitle");
const editDescription = document.getElementById("editDescription");
const cancelEdit = document.getElementById("cancelEdit");

// Filtros
const filterButtons = document.querySelectorAll(".filter-btn");
let currentFilter = localStorage.getItem("taskFilter") || "all";

// Buscador
const searchInput = document.getElementById("searchInput");
let searchQuery = "";

// Modal
let editingTaskId = null;

// Animación al añadir tareas
function animateTask(element) {
  element.classList.add("opacity-0", "translate-y-2");
  requestAnimationFrame(() => {
    element.classList.remove("opacity-0", "translate-y-2");
    element.classList.add("opacity-100", "translate-y-0");
  });
}

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

// Buscador en tiempo real
searchInput.addEventListener("input", e => {
  searchQuery = e.target.value.toLowerCase();
  renderTasks();
});

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
    const li = document.createElement("li");

    li.className =
      "p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow transition hover:shadow-md flex justify-between items-start gap-4 opacity-0 translate-y-2";

    li.innerHTML = `
      <div class="flex-1 space-y-1">
        <h4 class="font-semibold text-lg ${
          task.completed ? "line-through text-gray-500 dark:text-gray-400" : "text-gray-900 dark:text-gray-100"
        }">
          ${task.title}
        </h4>
        <p class="text-gray-600 dark:text-gray-300 text-sm">${task.description || ""}</p>
      </div>

      <div class="flex gap-2">
        <button data-id="${task.id}"
          class="toggle px-3 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition shadow">
          ✔
        </button>

        <button data-id="${task.id}"
          class="edit px-3 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition shadow">
          ✎
        </button>

        <button data-id="${task.id}"
          class="delete px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition shadow">
          🗑
        </button>
      </div>
    `;

    taskList.appendChild(li);
    animateTask(li);
  });
}

taskForm.addEventListener("submit", e => {
  e.preventDefault();

  const title = taskTitle.value.trim();
  const description = taskDescription.value.trim();

  if (!title) return;

  taskManager.addTask(title, description);
  renderTasks();

  taskForm.reset();
});

taskList.addEventListener("click", e => {
  const id = e.target.dataset.id;

  if (e.target.classList.contains("delete")) {
    const li = e.target.closest("li");
    li.classList.add("opacity-0", "translate-y-2");
    setTimeout(() => {
      taskManager.deleteTask(id);
      renderTasks();
    }, 200);
  }

  if (e.target.classList.contains("toggle")) {
    taskManager.toggleTask(id);
    renderTasks();
  }

  if (e.target.classList.contains("edit")) {
    const task = taskManager.tasks.find(t => t.id === id);
    openModal(task);
  }
});

updateFilterButtons();
renderTasks();
