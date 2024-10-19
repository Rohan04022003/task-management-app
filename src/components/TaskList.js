import { IoMdCheckmark } from "react-icons/io";
import { IoCheckmarkDone } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";

export default function TaskList({
  tasks,
  onEdit,
  onToggleComplete,
  onDelete,
  editButtonIsActive,
}) {
  console.log(editButtonIsActive ? editButtonIsActive.id : null);

  return (
    <div>
      {tasks.length === 0 ? (
        <p className="no-task-found">No Tasks Available</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              style={{ backgroundColor: getPriorityColor(task.priority) }}
            >
              <div>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
              </div>
              <div className="complete-delete-btn">
                <button
                  onClick={() => onEdit(task.id)}
                  disabled={editButtonIsActive === task.id}
                >
                  <CiEdit fontSize={20} />
                </button>
                <button
                  onClick={() => onToggleComplete(task.id)}
                  disabled={editButtonIsActive === task.id}
                >
                  {task.completed ? (
                    <IoCheckmarkDone fontSize={20} />
                  ) : (
                    <IoMdCheckmark fontSize={20} />
                  )}
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  disabled={editButtonIsActive === task.id}
                >
                  <AiOutlineDelete fontSize={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const getPriorityColor = (priority) => {
  switch (priority) {
    case "high":
      return "#C7253E";
    case "medium":
      return "#F3C623";
    case "low":
      return "#00712D";
    default:
      return "white";
  }
};
