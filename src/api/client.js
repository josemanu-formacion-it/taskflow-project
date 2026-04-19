const API_URL = 'http://localhost:3000/api/v1/tasks';

export const taskApi = {
    // Obtener todas las tareas
    async getAll() {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Error al obtener tareas');
        return await response.json();
    },

    // Crear una tarea
    async create(title) {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title })
        });
        if (!response.ok) throw new Error('Error al crear la tarea');
        return await response.json();
    },

    // Eliminar una tarea
    async delete(id) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Error al eliminar la tarea');
        return true;
    }
};