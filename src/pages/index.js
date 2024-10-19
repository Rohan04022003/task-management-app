import { useEffect, useState } from "react";
import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";

export default function Home({ initialTasks }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSorted, setIsSorted] = useState(false); // State to track if tasks are sorted
  const [editTaskData, setEditTaskData] = useState(null);
  const [editButtonIsActive, setEditButtonIsActive] = useState(null);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks state changes
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = (task) => {
    if (editTaskData) {
      const updatedTasks = tasks.map((t) =>
        t.id === editTaskData.id
          ? { ...task, id: editTaskData.id, completed: editTaskData.completed }
          : t
      );
      setTasks(updatedTasks);
      setEditTaskData(null); // Reset after editing
    } else {
      setTasks([task, ...tasks]);
    }
  };

  const editTask = (id) => {
    setEditTaskData(tasks.find((task) => task.id === id));
    setEditButtonIsActive(id);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Update local storage
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const sortTasks = () => {
    const sortedTasks = [...tasks].sort((a, b) => {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
    setTasks(sortedTasks);
    setIsSorted(true); // Mark as sorted
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="main-container">
      <h1>Task Manager</h1>
      <div className="task-add-container">
        <AddTask
          onAdd={addTask}
          task={editTaskData}
          setEditButtonIsActive={setEditButtonIsActive}
        />
      </div>
      <div className="tasks-container">
        <div className="tasksNavigateTab">
          <div className="tasks-container-heading">List Of Your Tasks</div>
          <div className="sortTasks">
            <input
              className="search"
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={sortTasks} className="sort-btn">
              Sort by Priority
            </button>
          </div>
        </div>

        <div className="list-task-container">
          {
            <TaskList
              tasks={filteredTasks.sort((a, b) => a.completed - b.completed)}
              onToggleComplete={toggleComplete}
              onDelete={deleteTask}
              onEdit={editTask}
              editButtonIsActive={editButtonIsActive}
            />
          }
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const initialTasks = [];

  return { props: { initialTasks } };
}
