import { FormEvent, useRef, useContext } from "react";
import { TaskContext } from "../task-context";
import { TaskActionTypes } from "../task-reducer";

function TaskForm() {
  // Context
  const {
    taskState: { tasks },
    taskAction,
  } = useContext(TaskContext);
  // Refs
  const taskRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  // Event handlers
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (taskRef.current) {
      // Create a new task
      taskAction({
        type: TaskActionTypes.CREATE,
        payload: {
          id: tasks.length > 0 ? tasks.length + 1 : 1,
          name: taskRef.current.value,
        },
      });
      if (formRef.current) formRef.current.reset();
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <input
        required
        defaultValue=""
        ref={taskRef}
        type="text"
        placeholder="New Task"
      />
    </form>
  );
}

export default TaskForm;
