const taskService = require('../services/task.service');

const getTasks = (req, res) => {
    const tasks = taskService.getAll();
    res.json(tasks);
};

const createTask = (req, res) => {
    const { title } = req.body;

    // Validación defensiva
    if (!title || title.trim().length < 3) {
        return res.status(400).json({ error: "El título debe tener al menos 3 caracteres" });
    }

    const newTask = taskService.create({ title });
    res.status(201).json(newTask);
};

const deleteTask = (req, res) => {
    try {
        taskService.remove(req.params.id);
        res.status(204).send(); // Éxito, sin contenido
    } catch (error) {
        if (error.message === 'NOT_FOUND') {
            res.status(404).json({ error: "Tarea no encontrada" });
        } else {
            res.status(500).json({ error: "Error interno" });
        }
    }
};

module.exports = { getTasks, createTask, deleteTask };