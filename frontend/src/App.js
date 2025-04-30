import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import api from "./services/Api";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    const res = await api.get('/');
    if (res.status === 200) {
      setTasks(res.data);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskSaved = () => {
    fetchTasks();
    setEditingTask(null); // reset form
  };

  const handleAddTask = (task) => {
    // no need to manually add since fetchTasks will refresh
    fetchTasks();
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto' }}>
      <h2>Task Manager</h2>
      <TaskForm
        addTask={handleAddTask}
        editingTask={editingTask}
        onTaskSaved={handleTaskSaved}
      />
      <hr />
      <TaskList
        tasks={tasks}
        onEdit={handleEdit}
        refreshTasks={fetchTasks}
      />
    </div>
  );
}
