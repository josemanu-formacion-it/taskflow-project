import { taskApi } from './api/client.js';

export default class TaskManager {
  constructor() {
    this.tasks = []; 
  }

  async loadTasks() {
    try {
      this.tasks = await taskApi.getAll();
      return this.tasks;
    } catch (error) {
      console.error("Error al cargar tareas:", error);
      return [];
    }
  }

  saveTasks() {
    // Ya no uso localStorage, pero mantengo el método para no romper mi estructura
    // En el futuro, aquí podría disparar una sincronización masiva
  }

  async addTask(title, description) {
    try {
      // Llamo a mi API para crear la tarea en el servidor
      const newTask = await taskApi.create(title);
      
      // Mantengo mi propiedad description aunque el servidor sea básico
      newTask.description = description;
      
      this.tasks.push(newTask);
      this.saveTasks();
      return newTask;
    } catch (error) {
      console.error("Error al añadir tarea:", error);
      alert("Error de red al añadir tarea");
    }
  }

  async deleteTask(id) {
    try {
      await taskApi.delete(id);
      this.tasks = this.tasks.filter(task => task.id != id);
      this.saveTasks();
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  }

  async editTask(id, newTitle, newDescription) {
    const task = this.tasks.find(t => t.id == id);
    if (task) {
      task.title = newTitle;
      task.description = newDescription;
      this.saveTasks();
      // TODO: Implementar PUT en el servidor
    }
  }

  async toggleTask(id) {
    const task = this.tasks.find(t => t.id == id);
    if (task) {
      task.completed = !task.completed;
      this.saveTasks();
      // TODO: Implementar PATCH en el servidor
    }
  }

  completeAll() {
    this.tasks = this.tasks.map(task => ({
      ...task,
      completed: true
    }));
    this.saveTasks();
  }

  clearCompleted() {
    this.tasks = this.tasks.filter(task => !task.completed);
    this.saveTasks();
  }

  getStats() {
    const total = this.tasks.length;
    const completed = this.tasks.filter(t => t.completed).length;
    const pending = total - completed;

    return { total, completed, pending };
  }
}