import TaskManager from "./taskManager.js";

const taskManager = new TaskManager();

const taskForm = document.getElementById("taskForm");
const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const taskList = document.getElementById("taskList");

function renderTasks() {
  taskList.innerHTML = "";

  taskManager.tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "p-4 border rounded flex justify-between items-start bg-gray-50";

    li.innerHTML = `
      <div>
        <h4 class="font-semibold ${task.completed ? "line-through text-gray-500" : ""}">
          ${task.title}
        </h4>
        <p class="text-gray-600">${task.description || ""}</p>
      </div>

      <div class="flex gap-2">
        <button data-id="${task.id}" class="toggle bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">
          ${task.completed ? "Desmarcar" : "Completar"}
        </button>

        <button data-id="${task.id}" class="edit bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">
          Editar
        </button>

        <button data-id="${task.id}" class="delete bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
          Borrar
        </button>
      </div>
    `;

    taskList.appendChild(li);
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
    taskManager.deleteTask(id);
    renderTasks();
  }

  if (e.target.classList.contains("toggle")) {
    taskManager.toggleTask(id);
    renderTasks();
  }

  if (e.target.classList.contains("edit")) {
    const newTitle = prompt("Nuevo título:");
    const newDesc = prompt("Nueva descripción:");

    if (newTitle !== null) {
      taskManager.editTask(id, newTitle, newDesc || "");
      renderTasks();
    }
  }
});

renderTasks();
