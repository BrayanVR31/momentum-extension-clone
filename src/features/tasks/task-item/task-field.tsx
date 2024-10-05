import {
  useContext,
  KeyboardEvent,
  ChangeEvent,
  RefObject,
  useEffect,
} from "react";
import { TaskContext } from "../task-context";
import { Task } from "@shared/types";
import { useOutsideClick } from "@shared/hooks";
import { TaskActionTypes } from "../task-reducer";

// Types
interface Props {
  task: Task;
  taskNameRef: RefObject<HTMLInputElement>;
}

function TaskField({ task, taskNameRef }: Props) {
  // Context
  const { taskAction } = useContext(TaskContext);
  // Custom hooks
  const { isOutClick } = useOutsideClick(taskNameRef);
  // Event handlers
  const handleCompletedTask = (event: ChangeEvent<HTMLInputElement>) => {
    /// Mark as the completed task
    taskAction({
      type: TaskActionTypes.UPDATE,
      payload: {
        id: task.id,
        isCompleted: event.target.checked,
      },
    });
  };
  const handleUpdateTask = (event: KeyboardEvent<HTMLInputElement>) => {
    // Update task name when "Enter" key is pressed
    if (event.key === "Enter") {
      if (taskNameRef.current) {
        taskAction({
          type: TaskActionTypes.UPDATE,
          payload: {
            id: task.id,
            name: taskNameRef.current.value,
          },
        });
      }
    }
  };
  const handleFocus =
    (disable: boolean = false) =>
    () => {
      if (taskNameRef.current) {
        taskNameRef.current.readOnly = disable;
      }
    };
  // Effects
  useEffect(() => {
    if (isOutClick) {
      if (taskNameRef.current) {
        taskAction({
          type: TaskActionTypes.UPDATE,
          payload: {
            id: task.id,
            name: taskNameRef.current.value,
          },
        });
      }
    }
  }, [taskNameRef.current?.readOnly]);
  return (
    <>
      <input onChange={handleCompletedTask} type="checkbox" />
      <input
        ref={taskNameRef}
        defaultValue={task.name}
        onKeyDown={handleUpdateTask}
        readOnly
        onDoubleClick={handleFocus()}
        onClick={handleFocus(true)}
      />
    </>
  );
}

export default TaskField;
