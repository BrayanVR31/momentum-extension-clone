import { useContext, RefObject } from "react";
import { TaskActionTypes } from "../task-reducer";
import { TaskContext } from "../task-context";
import { Task } from "@shared/types";

// Types
type ID = Pick<Task, "id">["id"];

interface Props {
  id: ID;
  taskNameRef: RefObject<HTMLInputElement>;
}

function TaskOptions({ id, taskNameRef }: Props) {
  // Context
  const { taskAction } = useContext(TaskContext);
  // Event handlers
  const handleEdit = () => {
    if (taskNameRef.current) {
      taskNameRef.current.readOnly = false;
      taskNameRef.current.focus();
    }
  };
  const handleDelete = () => {
    console.log("id", id);
    taskAction({ type: TaskActionTypes.DELETE, payload: { id } });
  };

  return (
    <div>
      <ul>
        <li onClick={handleEdit} style={{ cursor: "pointer" }}>
          Edit
        </li>
        <li onClick={handleDelete} style={{ cursor: "pointer" }}>
          Delete
        </li>
      </ul>
    </div>
  );
}

export default TaskOptions;
