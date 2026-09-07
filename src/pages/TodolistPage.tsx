import TaskCard from "../components/TaskCard";
import TodoModal from "../components/Modal";
import { type TaskCardProps } from "../libs/Todolist";
import { useEffect, useState } from "react";


const STORAGE_KEY = "lecture13.tasks";

function loadTasks(): TaskCardProps[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function App() {

  const [tasks, setTasks] = useState<TaskCardProps[]>(loadTasks);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const handleAdd = (newTask: TaskCardProps) => setTasks([...tasks, newTask]);

  const deleteTask = (taskId: string) =>
    setTasks(tasks.filter((t) => t.id !== taskId));

  const toggleDoneTask = (taskId: string) =>
    setTasks(
      tasks.map((t) => (t.id === taskId ? { ...t, isDone: !t.isDone } : t)),
    );

  return (
    <div className="container text-center">
      <h2>Todo List</h2>
      <br/>
      <span className="m-2 border rounded bg-primary text-white p-2"> ⫶☰ All : ({tasks.length}) </span>
      <span className="m-2 border rounded bg-success text-white p-2"> ✅️ Done : ({tasks.filter((t) => t.isDone).length})</span>
      <br/>
      <button
      className="btn btn-primary my-3"
      data-bs-toggle="modal"
      data-bs-target="#todoModal"
      >
      Add
      </button>
      
      <TodoModal onAdd={handleAdd} />

      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          isDone={task.isDone}
          deleteTaskFunc={deleteTask}
          toggleDoneTaskFunc={toggleDoneTask}
        />
      ))}
    </div>
  );
}


