import { useState, useEffect } from "react";
import api from "../services/Api";

export default function TaskList({ onEdit, tasks, refreshTasks }) {
  const [localTasks, setLocalTasks] = useState([]);

  useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);

  const handleToggleComplete = async (id) => {
    try {
      await api.patch(`/${id}/complete`);
      setLocalTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, completed: task.completed ? 0 : 1 } : task
        )
      );
    } catch (err) {
      console.error("Error toggling task completion:", err);
      alert("Failed to update task status");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/${id}`);
      refreshTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
      alert("Failed to delete task");
    }
  };

  return (
    <div>
      {localTasks.map((task) => (
        <div
          key={task.id}
          style={{
            marginBottom: "10px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: task.completed ? "#e0ffe0" : "#fff",
          }}
        >
          <div>
            <strong
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.title}
            </strong>
            <p>{task.description}</p>
          </div>
          <button onClick={() => onEdit(task)}>Edit</button>
          <button onClick={() => handleDelete(task.id)}>Delete</button>
          <button onClick={() => handleToggleComplete(task.id)}>
            {task.completed ? "Undo" : "Complete"}
          </button>
        </div>
      ))}
    </div>
  );
}
