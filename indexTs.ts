// создание задач
// редактирование задач
// удаление задач
// завершение задач

type Task = {
  id: number;
  title: string;
  desc: string;
  isComplete: boolean;
};

const tasks: Task[] = [];

const createTask = (title: string, desc: string): Task => {
  const task = {
    id: Date.now(),
    title,
    desc,
    isComplete: false,
  };

  tasks.push(task);

  return task;
};

const getTaskById = (id: number) => tasks.find(t => t.id === id);

const removeTask = (id: number) => {
  const taskIndex = tasks.findIndex(t => t.id === id);
  const candidateTask = tasks[taskIndex];

  if (!candidateTask) throw new Error('Задача не найдена!');

  tasks.splice(taskIndex, 1);
};

const getFieldsForUpdate = <T>(prev: DeepPartial<T>, next: DeepPartial<T>): DeepPartial<T> => {
  return Object.entries(next).reduce<DeepPartial<T>>((acc, [key, value]) => {
    if (next[key] !== undefined && prev[key] !== value) {
      acc[key] = value;
    }
    return acc;
  }, prev);
};

const updateTask = (id: number, newFields: Omit<Partial<Task>, 'id'>) => {
  const taskIndex = tasks.findIndex(t => t.id === id);
  const candidateTask = tasks[taskIndex];

  if (!candidateTask) throw new Error('Задача не найдена!');

  const editedTask = {
    ...candidateTask,
    ...newFields,
    ...getFieldsForUpdate(candidateTask, newFields), // ts
  };

  tasks[taskIndex] = editedTask;
  return editedTask;
};

const toggleIsCompleteTask = (id: number, isComplete: boolean) => {
  // const task = getTaskById(id);
  // if(!task) throw new Error('Задача не найдена!')
  updateTask(id, { isComplete });
};

// Object.keys {id: 1, test: 2} => ['id', 'test']
// Object.entries {id: 1, test: 2} => [['id', 1], ['test', 2]]
// const getFieldsForUpdate = (oldFields: Partial<Task>, newFields: Partial<Task>) => {
//   return Object.entries(newFields).reduce<Task>((acc, [key, value]) => {
//     if (oldFields[key] !== undefined && oldFields[key] !== value && value) {
//       const res = acc[key];
//       acc[key] = res;
//     }
//     return acc;
//   }, {} as Task);
// };

const task1 = createTask('Новая задача', 'тест');
console.log('created: ', tasks);

updateTask(task1.id, { title: 'test' });
console.log('updated: ', tasks);

toggleIsCompleteTask(task1.id, false);
console.log('completed: ', tasks);

removeTask(task1.id);
console.log('deleted: ', tasks);

function fn<T extends object>(params: Partial<T>) {}
