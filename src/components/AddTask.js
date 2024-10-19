import { useState, useEffect } from "react";

export default function AddTask({ onAdd, task, setEditButtonIsActive }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      id: task ? task.id : Date.now(),
      title,
      description,
      priority,
      completed: task ? task.completed : false,
    });
    setTitle("");
    setDescription("");
    setPriority("low");
    setEditButtonIsActive(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="title-description">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
          required
        />
      </div>
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button className="submit" type="submit">
        {task ? "Edit Task" : "Add Task"}
      </button>
    </form>
  );
}
