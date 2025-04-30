import { useState, useEffect } from "react";
import api from "../services/Api";

export default function TaskForm({ addTask, editingTask, onTaskSaved }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingTask) {
      const res = await api.put(`/${editingTask.id}`, { title, description });
      if (res.status === 200) {
        onTaskSaved();
      }
    } else {
      const res = await api.post('/', { title, description });
      if (res.status === 200) {
        addTask({ title, description, completed: false });
        onTaskSaved();
        window.location.reload();
      }
    }

    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <button type="submit">{editingTask ? 'Update' : 'Add'} Task</button>
    </form>
  );
}
