import { useContext } from "react";
import { TaskContext } from "../task-context";
import { TaskItem } from "../task-item";

function TaskList() {
  // Context
  const { taskState } = useContext(TaskContext);
  return (
    <ul>
      {taskState.tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}

export default TaskList;
