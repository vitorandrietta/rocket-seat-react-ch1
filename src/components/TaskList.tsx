import { useRef, useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

const findTaskIndexById = (tasks: Task[], id: number): number => tasks.findIndex(({ id: taskId }) => taskId === id);

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const nextTaskIdRef = useRef<number>(0);

  function handleCreateNewTask() {
    if (newTaskTitle.trim()) {
      setTasks([...tasks, {
        id: nextTaskIdRef.current++,
        title: newTaskTitle,
        isComplete: false,
      }]);
    }
  }

  function handleToggleTaskCompletion(id: number) {
    const taskIndex = findTaskIndexById(tasks, id);
    if (taskIndex !== -1) {
      const selectedTask = tasks[taskIndex];
      setTasks([...tasks.slice(0, taskIndex),
      { ...selectedTask, isComplete: !selectedTask.isComplete },
      ...tasks.slice(taskIndex + 1, tasks.length)
      ]);
    }
  }

  function handleRemoveTask(id: number) {
    const taskIndex = findTaskIndexById(tasks, id);
    if(taskIndex !== -1) {
      setTasks([...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1, tasks.length)]);
    }
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}
