// создание задач
// редактирование задач
// удаление задач
// завершение задач

const tasks = [];

const createTask = (title, desc) => {
  const task = {
    id: Date.now(),
    title,
    desc,
    isComplete: false,
  };

  tasks.push(task);

  return task;
};

const getTaskById = id => tasks.find(t => t.id === id);

const removeTask = id => {
  const taskIndex = tasks.findIndex(t => t.id === id);
  const candidateTask = tasks[taskIndex];

  if (!candidateTask) throw new Error('Задача не найдена!');

  tasks.splice(taskIndex, 1);
};

const updateTask = (id, newFields) => {
  const taskIndex = tasks.findIndex(t => t.id === id);
  const candidateTask = tasks[taskIndex];

  if (!candidateTask) throw new Error('Задача не найдена!');

  const editedTask = {
    ...candidateTask,
    ...getFieldsForUpdate(candidateTask, newFields), // ts
  };

  tasks[taskIndex] = editedTask;
  return editedTask;
};

const toggleIsCompleteTask = (id, isComplete) => {
  const task = getTaskById(id);
  updateTask(task.id, { title: '!@#', isComplete });
};

// Object.keys {id: 1, test: 2} => ['id', 'test']
// Object.entries {id: 1, test: 2} => [['id', 1], ['test', 2]]
const getFieldsForUpdate = (oldFields, newFields) => {
  return Object.entries(newFields).reduce((acc, [key, value]) => {
    if (oldFields[key] !== undefined && oldFields[key] !== value) acc[key] = value;
    return acc;
  }, {});
};

const task = createTask('Новая задача', 'тест');
console.log('created: ', tasks);

updateTask(task.id, { title: 'test', test: '123' });
console.log('updated: ', tasks);

toggleIsCompleteTask(task.id, false);
console.log('completed: ', tasks);

removeTask(task.id);
console.log('deleted: ', tasks);
