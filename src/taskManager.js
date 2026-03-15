export default class TaskManager {
  constructor() {
    this.tasks = this.loadTasks();
  }

  loadTasks() {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  }

  saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  addTask(title, description) {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      description,
      completed: false,
      createdAt: new Date().toISOString()
    };

    this.tasks.push(newTask);
    this.saveTasks();
    return newTask;
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.saveTasks();
  }

  editTask(id, newTitle, newDescription) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.title = newTitle;
      task.description = newDescription;
      this.saveTasks();
    }
  }

  toggleTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.saveTasks();
    }
  }

  // NUEVO: marcar todas como completadas
  completeAll() {
    this.tasks = this.tasks.map(task => ({
      ...task,
      completed: true
    }));
    this.saveTasks();
  }

  // NUEVO: borrar todas las completadas
  clearCompleted() {
    this.tasks = this.tasks.filter(task => !task.completed);
    this.saveTasks();
  }

  // NUEVO: estadísticas (opcional, app.js ya las calcula)
  getStats() {
    const total = this.tasks.length;
    const completed = this.tasks.filter(t => t.completed).length;
    const pending = total - completed;

    return { total, completed, pending };
  }
}
