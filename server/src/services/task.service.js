let tasks = [
    { id: 1, title: 'Aprender Express', completed: false },
    { id: 2, title: 'Configurar TaskFlow API', completed: true }
];

const getAll = () => tasks;

const create = (data) => {
    const newTask = {
        id: Date.now(), // ID único simple
        title: data.title,
        completed: false
    };
    tasks.push(newTask);
    return newTask;
};

const remove = (id) => {
    const index = tasks.findIndex(t => t.id === parseInt(id));
    if (index === -1) throw new Error('NOT_FOUND');
    tasks.splice(index, 1);
    return true;
};

module.exports = { getAll, create, remove };