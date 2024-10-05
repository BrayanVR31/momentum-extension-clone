import { useState, useRef } from "react";
import TaskOptions from "./task-options";
import { Task } from "@shared/types";
import TaskField from "./task-field";

// Types
interface Props {
  task: Task;
}

function TaskItem({ task }: Props) {
  // Refs
  const taskNameRef = useRef<HTMLInputElement>(null);
  // State
  const [showOptions, setShowOptions] = useState(false);

  return (
    <li>
      <TaskField task={task} taskNameRef={taskNameRef} />
      <button onClick={() => setShowOptions(!showOptions)}>...</button>
      {showOptions && <TaskOptions id={task.id} taskNameRef={taskNameRef} />}
    </li>
  );
}

export default TaskItem;
